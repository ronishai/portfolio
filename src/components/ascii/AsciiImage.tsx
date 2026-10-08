import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import {
  adjustBrightness,
  brightnessToAsciiCharacter,
  clamp,
  DEFAULT_IMAGE_CHARSET,
  getPixelBrightness,
  normalizeCharset,
  type AsciiSampleMethod,
} from './ascii.utils';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

export type AsciiImageAnimationMode = 'none' | 'always' | 'hover' | 'always-and-hover';
export type AsciiAlphaBackground = 'white' | 'black' | 'transparent';

type AsciiPixel = {
  brightness: number;
  alpha: number;
};

export type AsciiImageProps = {
  src: string;
  alt: string;
  columns?: number;
  rows?: number;
  charset?: string;
  invert?: boolean;
  threshold?: number;
  sampleMethod?: AsciiSampleMethod;
  brightness?: number;
  contrast?: number;
  gamma?: number;
  characterAspectRatio?: number;
  transparentThreshold?: number;
  alphaBackground?: AsciiAlphaBackground;
  animation?: AsciiImageAnimationMode;
  fps?: number;
  animationDensity?: number;
  variation?: number;
  hoverMultiplier?: number;
  animateWhitespace?: boolean;
  imageSmoothing?: boolean;
  crossOrigin?: 'anonymous' | 'use-credentials';
  respectReducedMotion?: boolean;
  loadingFallback?: ReactNode;
  errorFallback?: ReactNode;
  onImageLoad?: () => void;
  onImageError?: (error: Error) => void;
} & Omit<HTMLAttributes<HTMLElement>, 'children'>;

export function AsciiImage({
  src,
  alt,
  columns = 60,
  rows,
  charset = DEFAULT_IMAGE_CHARSET,
  invert = false,
  threshold,
  sampleMethod = 'luminance',
  brightness = 0,
  contrast = 1,
  gamma = 1,
  characterAspectRatio = 0.5,
  transparentThreshold = 20,
  alphaBackground = 'white',
  animation = 'none',
  fps = 8,
  animationDensity = 0.2,
  variation = 1,
  hoverMultiplier = 2.5,
  animateWhitespace = false,
  imageSmoothing = true,
  crossOrigin,
  respectReducedMotion = true,
  loadingFallback = 'Converting image to ASCII',
  errorFallback,
  onImageLoad,
  onImageError,
  className = '',
  onPointerEnter,
  onPointerLeave,
  ...figureProps
}: AsciiImageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const preRef = useRef<HTMLPreElement>(null);

  const [pixels, setPixels] = useState<AsciiPixel[][]>([]);
  const [status, setStatus] = useState<'loading' | 'error' | 'ready'>('loading');
  const [errorMessage, setErrorMessage] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  const prefersReducedMotion = usePrefersReducedMotion();
  const safeColumns = clamp(Math.floor(columns), 4, 300);
  const safeRows = rows === undefined ? undefined : clamp(Math.floor(rows), 1, 300);
  const safeFps = clamp(fps, 1, 60);
  const safeAnimationDensity = clamp(animationDensity, 0, 1);

  const charsetCharacters = useMemo(() => normalizeCharset(charset), [charset]);

  useEffect(() => {
    let isMounted = true;

    const img = new Image();
    if (crossOrigin) {
      img.crossOrigin = crossOrigin;
    }
    img.src = src;

    img.onload = () => {
      if (!isMounted) return;

      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) return;

      const targetCols = safeColumns;
      const computedRows =
        safeRows ??
        Math.max(1, Math.round((img.height / img.width) * targetCols * characterAspectRatio));

      canvas.width = targetCols;
      canvas.height = computedRows;

      ctx.imageSmoothingEnabled = imageSmoothing;
      ctx.drawImage(img, 0, 0, targetCols, computedRows);

      const imgData = ctx.getImageData(0, 0, targetCols, computedRows);
      const data = imgData.data;

      const grid: AsciiPixel[][] = [];

      for (let y = 0; y < computedRows; y++) {
        const row: AsciiPixel[] = [];
        for (let x = 0; x < targetCols; x++) {
          const idx = (y * targetCols + x) * 4;
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];
          const a = data[idx + 3];

          const pixelBrightness = getPixelBrightness(r, g, b, sampleMethod);
          row.push({ brightness: pixelBrightness, alpha: a });
        }
        grid.push(row);
      }

      setPixels(grid);
      setStatus('ready');
      onImageLoad?.();
    };

    img.onerror = () => {
      if (!isMounted) return;
      const err = new Error(`Failed to load image at "${src}"`);
      setStatus('error');
      setErrorMessage(err.message);
      onImageError?.(err);
    };

    return () => {
      isMounted = false;
    };
  }, [
    src,
    safeColumns,
    safeRows,
    characterAspectRatio,
    sampleMethod,
    imageSmoothing,
    crossOrigin,
    onImageLoad,
    onImageError,
  ]);
    
  const createAsciiOutput = useCallback(
    (activeVariation: number): string => {
      return pixels
        .map((row) =>
          row
            .map((pixel) => {
              if (pixel.alpha <= transparentThreshold) {
                return ' ';
              }

              const alpha = pixel.alpha / 255;
              const backgroundBrightness = alphaBackground === 'white' ? 255 : 0;

              const compositedBrightness =
                pixel.brightness * alpha + backgroundBrightness * (1 - alpha);

              const adjustedPixelBrightness = adjustBrightness(
                compositedBrightness,
                brightness,
                contrast,
                gamma
              );

              const staticCharacter = brightnessToAsciiCharacter({
                brightness: adjustedPixelBrightness,
                charset: charsetCharacters,
                invert,
                threshold,
                variation: 0,
              });

              const canAnimateCharacter = animateWhitespace || staticCharacter !== ' ';

              const shouldAnimate =
                activeVariation > 0 && canAnimateCharacter && Math.random() < safeAnimationDensity;

              if (!shouldAnimate) {
                return staticCharacter;
              }

              return brightnessToAsciiCharacter({
                brightness: adjustedPixelBrightness,
                charset: charsetCharacters,
                invert,
                threshold,
                variation: activeVariation,
              });
            })
            .join('')
        )
        .join('\n');
    },
    [
      pixels,
      transparentThreshold,
      alphaBackground,
      brightness,
      contrast,
      gamma,
      charsetCharacters,
      invert,
      threshold,
      animateWhitespace,
      safeAnimationDensity,
    ]
  );
    
  useEffect(() => {
    if (pixels.length === 0 || status !== 'ready') {
      return;
    }

    const reducedMotionActive = respectReducedMotion && prefersReducedMotion;
    let activeVariation = 0;

    if (!reducedMotionActive) {
      switch (animation) {
        case 'always':
          activeVariation = variation;
          break;

        case 'hover':
          activeVariation = isHovered ? variation : 0;
          break;

        case 'always-and-hover':
          activeVariation = isHovered ? variation * hoverMultiplier : variation;
          break;

        case 'none':
        default:
          activeVariation = 0;
      }
    }

    const updateFrame = () => {
      if (preRef.current) {
        preRef.current.textContent = createAsciiOutput(activeVariation);
      }
    };

    updateFrame();

    if (activeVariation <= 0) {
      return;
    }

    const intervalId = window.setInterval(updateFrame, 1000 / safeFps);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [
    pixels,
    status,
    animation,
    variation,
    hoverMultiplier,
    isHovered,
    safeFps,
    createAsciiOutput,
    respectReducedMotion,
    prefersReducedMotion,
  ]);

  return (
    <figure
      {...figureProps}
      className={`ascii-image-wrapper ${className}`}
      onPointerEnter={(event) => {
        setIsHovered(true);
        onPointerEnter?.(event);
      }}
      onPointerLeave={(event) => {
        setIsHovered(false);
        onPointerLeave?.(event);
      }}
    >
      <canvas ref={canvasRef} style={{ display: 'none' }} aria-hidden="true" />

      {status === 'loading' && (
        <div className="ascii-image-status" role="status">
          {loadingFallback}
        </div>
      )}

      {status === 'error' && (
        <div className="ascii-image-error" role="alert">
          {errorFallback ?? errorMessage}
        </div>
      )}

      {status === 'ready' && (
        <>
          <pre
            ref={preRef}
            className="ascii-image-text font-mono leading-none select-none whitespace-pre"
            aria-hidden="true"
          />
          <figcaption className="sr-only">{alt}</figcaption>
        </>
      )}
    </figure>
  );
}
