import { useEffect, useState } from "react";

export const useTypeWriter = (
  text: string,
  speed: number,
  startDelay: number,
  start: boolean,
) => {
  const [displayText, setDisplayText] = useState("");
  const [hasTyped, setHasTyped] = useState(false);

  useEffect(() => {
    if (!start || hasTyped) return;

    let currentIndex = 0;
    const startTyping = setTimeout(() => {
      const intervalId = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(intervalId);
          setHasTyped(true);
        }
      }, speed);

      return () => clearInterval(intervalId);
    }, startDelay);

    return () => clearTimeout(startTyping);
  }, [start, hasTyped, speed, startDelay, text]);

  return { displayText, hasTyped };
};

export const useTypeWriterList = (
  texts: string[],
  speed: number,
  startDelay: number,
  delayBetweenTexts: number,
  start: boolean,
) => {
  const [displayText, setDisplayText] = useState("");
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!start || texts.length === 0) return;

    const currentText = texts[currentTextIndex];
    let timeoutId: NodeJS.Timeout;

    if (!started) {
      timeoutId = setTimeout(() => setStarted(true), startDelay);
      return () => clearTimeout(timeoutId);
    }

    if (isDeleting) {
      if (charIndex > 0) {
        timeoutId = setTimeout(() => {
          setDisplayText(currentText.slice(0, charIndex - 1));
          setCharIndex((prev) => prev - 1);
        }, speed);
      } else {
        setIsDeleting(false);
        setCurrentTextIndex((prev) => (prev + 1) % texts.length);
      }
    } else {
      if (charIndex < currentText.length) {
        timeoutId = setTimeout(() => {
          setDisplayText(currentText.slice(0, charIndex + 1));
          setCharIndex((prev) => prev + 1);
        }, speed);
      } else {
        timeoutId = setTimeout(() => {
          setIsDeleting(true);
        }, delayBetweenTexts); // pause before deleting
      }
    }

    return () => clearTimeout(timeoutId);
  }, [
    start,
    started,
    isDeleting,
    charIndex,
    currentTextIndex,
    texts,
    speed,
    startDelay,
    delayBetweenTexts,
  ]);

  return { displayText };
};
