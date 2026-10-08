import {
  useState,
  useEffect,
  useRef,
  useMemo,
  type CSSProperties,
  type HTMLAttributes,
} from 'react';
import { clamp, DEFAULT_MORPH_CHARSET, getRandomCharacter } from './ascii.utils';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

export type AsciiRevealMode = 'type' | 'scramble';
export type AsciiDeleteMode = 'backspace' | 'scramble' | 'instant' | 'none';

export type AsciiMorphTextProps = {
  text: string | string[];
  charset?: string;
  revealMode?: AsciiRevealMode;
  typeSpeed?: number;
  scrambleSpeed?: number;
  trailLength?: number;
  startDelay?: number;
  holdDuration?: number;
  cycleDelay?: number;
  loop?: boolean;
  deleteMode?: AsciiDeleteMode;
  deleteSpeed?: number;
  preserveSpaces?: boolean;
  showCursor?: boolean;
  cursorCharacter?: string;
  cursorBlinkMs?: number;
  restartOnHover?: boolean;
  replayKey?: string | number;
  paused?: boolean;
  respectReducedMotion?: boolean;
  ariaLabel?: string;
  onPhraseComplete?: (phrase: string, index: number) => void;
  onComplete?: () => void;
  onLoopComplete?: () => void;
} & Omit<HTMLAttributes<HTMLSpanElement>, 'children'>;

function createUnresolvedCharacter(
  character: string,
  charset: string,
  preserveSpaces: boolean
): string {
  if (preserveSpaces && /\s/.test(character)) {
    return character;
  }

  return getRandomCharacter(charset);
}

function createTypingFrame({
  characters,
  settledCount,
  trailLength,
  revealMode,
  charset,
  preserveSpaces,
}: {
  characters: string[];
  settledCount: number;
  trailLength: number;
  revealMode: AsciiRevealMode;
  charset: string;
  preserveSpaces: boolean;
}): string {
  const visibleCount =
    revealMode === 'scramble'
      ? characters.length
      : Math.min(characters.length, settledCount + trailLength);

  return characters
    .slice(0, visibleCount)
    .map((character, index) => {
      if (index < settledCount) {
        return character;
      }

      return createUnresolvedCharacter(character, charset, preserveSpaces);
    })
    .join('');
}

function createDeletingFrame({
  characters,
  remainingCount,
  deleteMode,
  trailLength,
  charset,
  preserveSpaces,
}: {
  characters: string[];
  remainingCount: number;
  deleteMode: AsciiDeleteMode;
  trailLength: number;
  charset: string;
  preserveSpaces: boolean;
}): string {
  const remainingCharacters = characters.slice(0, remainingCount);

  if (deleteMode !== 'scramble') {
    return remainingCharacters.join('');
  }

  const scrambleStart = Math.max(0, remainingCharacters.length - trailLength);

  return remainingCharacters
    .map((character, index) => {
      if (index < scrambleStart) {
        return character;
      }

      return createUnresolvedCharacter(character, charset, preserveSpaces);
    })
    .join('');
}

export function AsciiMorphText({
  text,
  charset = DEFAULT_MORPH_CHARSET,
  revealMode = 'type',
  typeSpeed = 80,
  scrambleSpeed = 35,
  trailLength = 3,
  startDelay = 200,
  holdDuration = 1200,
  cycleDelay = 250,
  loop = false,
  deleteMode = 'backspace',
  deleteSpeed = 45,
  preserveSpaces = true,
  showCursor = true,
  cursorCharacter = '_',
  cursorBlinkMs = 700,
  restartOnHover = false,
  replayKey = 0,
  paused = false,
  respectReducedMotion = true,
  ariaLabel,
  onPhraseComplete,
  onComplete,
  onLoopComplete,
  className = '',
  style,
  onPointerEnter,
  ...spanProps
}: AsciiMorphTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [hoverReplayKey, setHoverReplayKey] = useState(0);

  const prefersReducedMotion = usePrefersReducedMotion();

  const onPhraseCompleteRef = useRef(onPhraseComplete);
  const onCompleteRef = useRef(onComplete);
  const onLoopCompleteRef = useRef(onLoopComplete);

  useEffect(() => {
    onPhraseCompleteRef.current = onPhraseComplete;
  }, [onPhraseComplete]);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    onLoopCompleteRef.current = onLoopComplete;
  }, [onLoopComplete]);

  const phrases = useMemo(() => {
    const nextPhrases = Array.isArray(text) ? text : [text];
    return nextPhrases.length > 0 ? nextPhrases : [''];
  }, [text]);

  useEffect(() => {
    if (paused) {
      return;
    }

    const reducedMotionActive = respectReducedMotion && prefersReducedMotion;

    if (reducedMotionActive) {
      return;
    }

    let phraseIndex = 0;
    let cycleStartedAt = performance.now();
    let firstCycle = true;
    let phraseCompletionReported = false;
    let finished = false;

    const safeTypeSpeed = Math.max(1, typeSpeed);
    const safeDeleteSpeed = Math.max(1, deleteSpeed);
    const safeTrailLength = Math.max(0, Math.floor(trailLength));
    const safeStartDelay = Math.max(0, startDelay);
    const safeHoldDuration = Math.max(0, holdDuration);
    const safeCycleDelay = Math.max(0, cycleDelay);

    const transitionToNextPhrase = (now: number) => {
      const isLastPhrase = phraseIndex === phrases.length - 1;

      if (isLastPhrase && loop) {
        onLoopCompleteRef.current?.();
      }

      phraseIndex = isLastPhrase ? 0 : phraseIndex + 1;
      cycleStartedAt = now;
      firstCycle = false;
      phraseCompletionReported = false;

      setDisplayedText('');
    };

    const updateAnimation = () => {
      if (finished) {
        return;
      }

      const now = performance.now();
      const phrase = phrases[phraseIndex] ?? '';
      const characters = Array.from(phrase);
      const delay = firstCycle ? safeStartDelay : safeCycleDelay;
      const elapsed = now - cycleStartedAt;

      if (elapsed < delay) {
        setDisplayedText('');
        return;
      }

      const activeElapsed = elapsed - delay;
      const typingDuration = characters.length * safeTypeSpeed;
      const typingEnd = typingDuration;
      const holdEnd = typingEnd + safeHoldDuration;
      const hasNextPhrase = phraseIndex < phrases.length - 1;
      const shouldAdvance = hasNextPhrase || loop;

      if (activeElapsed < typingEnd) {
        const settledCount = clamp(Math.floor(activeElapsed / safeTypeSpeed), 0, characters.length);

        setDisplayedText(
          createTypingFrame({
            characters,
            settledCount,
            trailLength: safeTrailLength,
            revealMode,
            charset,
            preserveSpaces,
          })
        );
        return;
      }

      if (activeElapsed < holdEnd) {
        setDisplayedText(phrase);
        return;
      }

      if (!phraseCompletionReported) {
        phraseCompletionReported = true;
        onPhraseCompleteRef.current?.(phrase, phraseIndex);
      }

      if (!shouldAdvance) {
        setDisplayedText(phrase);
        finished = true;
        onCompleteRef.current?.();
        return;
      }

      if (deleteMode === 'instant' || deleteMode === 'none') {
        transitionToNextPhrase(now);
        return;
      }

      const deletingElapsed = activeElapsed - holdEnd;
      const deletingDuration = characters.length * safeDeleteSpeed;

      if (deletingElapsed < deletingDuration) {
        const removedCount = Math.floor(deletingElapsed / safeDeleteSpeed);
        const remainingCount = clamp(characters.length - removedCount, 0, characters.length);

        setDisplayedText(
          createDeletingFrame({
            characters,
            remainingCount,
            deleteMode,
            trailLength: safeTrailLength,
            charset,
            preserveSpaces,
          })
        );
        return;
      }

      transitionToNextPhrase(now);
    };

    const intervalId = window.setInterval(updateAnimation, Math.max(16, scrambleSpeed));

    return () => {
      window.clearInterval(intervalId);
    };
  }, [
    phrases,
    charset,
    revealMode,
    typeSpeed,
    scrambleSpeed,
    trailLength,
    startDelay,
    holdDuration,
    cycleDelay,
    loop,
    deleteMode,
    deleteSpeed,
    preserveSpaces,
    replayKey,
    hoverReplayKey,
    paused,
    respectReducedMotion,
    prefersReducedMotion,
  ]);

  const accessibleText = ariaLabel ?? phrases[0] ?? '';

  const morphStyle = {
    ...style,
    '--ascii-cursor-blink-duration': `${Math.max(100, cursorBlinkMs)}ms`,
  } as CSSProperties;

  const visibleText =
    respectReducedMotion && prefersReducedMotion ? (phrases[0] ?? '') : displayedText;

  return (
    <span
      {...spanProps}
      className={`ascii-morph-wrapper ${className}`}
      style={morphStyle}
      onPointerEnter={(event) => {
        if (restartOnHover) {
          setHoverReplayKey((currentKey) => currentKey + 1);
        }
        onPointerEnter?.(event);
      }}
    >
      <span className="ascii-morph-visible" aria-hidden="true">
        {visibleText}
        {showCursor && <span className="ascii-morph-cursor">{cursorCharacter}</span>}
      </span>

      <span className="ascii-screen-reader-only">{accessibleText}</span>
    </span>
  );
}
