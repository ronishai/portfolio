export const DEFAULT_IMAGE_CHARSET = "@%#*+=-:. ";

export const DEFAULT_MORPH_CHARSET = "@#%$%&*+=-;:/\\|<>[]{}01";

export type AsciiSampleMethod = "luminance" | "average" | "lightness";

export function clamp(value: number, minimum: number, maximum: number): number {
  return Math.min(maximum, Math.max(minimum, value));
}

export function normalizeCharset(charset: string): string[] {
  const characters = Array.from(charset);

  if (characters.length >= 2) {
    return characters;
  }

  return Array.from(DEFAULT_IMAGE_CHARSET);
}

export function getRandomCharacter(charset: string): string {
  const characters = Array.from(charset);

  if (characters.length === 0) {
    return "#";
  }

  const randomIndex = Math.floor(Math.random() * characters.length);

  return characters[randomIndex] ?? "#";
}

export function getRandomInteger(minimum: number, maximum: number): number {
  const normalizedMinimum = Math.ceil(minimum);
  const normalizedMaximum = Math.floor(maximum);

  return Math.floor(
    Math.random() * (normalizedMaximum - normalizedMinimum + 1) +
      normalizedMinimum,
  );
}

export function getPixelBrightness(
  red: number,
  green: number,
  blue: number,
  method: AsciiSampleMethod,
): number {
  switch (method) {
    case "average":
      return (red + green + blue) / 3;

    case "lightness": {
      const highest = Math.max(red, green, blue);
      const lowest = Math.min(red, green, blue);

      return (highest + lowest) / 2;
    }

    case "luminance":
    default:
      return red * 0.2126 + green * 0.7152 + blue * 0.0722;
  }
}

export function adjustBrightness(
  value: number,
  brightnessOffset: number,
  contrast: number,
  gamma: number,
): number {
  const safeContrast = Math.max(0, contrast);
  const safeGamma = Math.max(0.01, gamma);

  const contrastedValue = (value - 128) * safeContrast + 128 + brightnessOffset;

  const normalizedValue = clamp(contrastedValue, 0, 255) / 255;

  const gammaCorrectedValue = Math.pow(normalizedValue, safeGamma);

  return clamp(gammaCorrectedValue * 255, 0, 255);
}

export function brightnessToAsciiCharacter({
  brightness,
  charset,
  invert,
  threshold,
  variation,
}: {
  brightness: number;
  charset: string[];
  invert: boolean;
  threshold?: number;
  variation: number;
}): string {
    const finalBrightness = invert ? 255 - brightness : brightness;
    
    if (threshold !== undefined) {
        const safeThreshold = clamp(threshold, 0, 255);

        return finalBrightness < safeThreshold ? (charset[0] ?? "@") : (charset[charset.length - 1] ?? " ");
    }

    const normalizedBrightness = finalBrightness / 255;

    const baseIndex = Math.round(normalizedBrightness * (charset.length - 1));

    const safeVariation = Math.max(0, Math.floor(variation));

    const randomOffset = safeVariation === 0 ? 0 : getRandomInteger(-safeVariation, safeVariation);

    const finalIndex = clamp(baseIndex + randomOffset, 0, charset.length - 1);

    return charset[finalIndex] ?? " ";
}
