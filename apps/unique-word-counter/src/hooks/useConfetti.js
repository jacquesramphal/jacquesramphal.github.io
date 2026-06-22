import { useState, useCallback } from 'react';
import confetti from 'canvas-confetti';

const useConfetti = () => {
  const [activeConfetti, setActiveConfetti] = useState(false);
  const [lastWordTime, setLastWordTime] = useState(null);

  const fireConfetti = useCallback((options = {}) => {
    const defaults = {
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#0984E3', '#6C5CE7', '#00B894', '#FF7675'],
      startVelocity: 30,
      decay: 0.95,
      scalar: 1,
      ticks: 100,
      shapes: ['square', 'circle'],
      zIndex: 100
    };

    confetti({
      ...defaults,
      ...options,
    });
  }, []);

  const getRandomPosition = useCallback(() => {
    return {
      x: 0.1 + Math.random() * 0.8,
      y: 0.6
    };
  }, []);

  const calculateConfettiIntensity = useCallback((wordCount) => {
    if (wordCount <= 5) return 'small';
    if (wordCount <= 15) return 'medium';
    if (wordCount <= 30) return 'large';
    return 'epic';
  }, []);

  const triggerConfetti = useCallback((wordCount) => {
    const now = Date.now();
    const timeSinceLastWord = lastWordTime ? now - lastWordTime : Infinity;
    const intensity = calculateConfettiIntensity(wordCount);

    // Base confetti configuration based on word count
    const confettiConfig = {
      small: { particleCount: 30, spread: 50 },
      medium: { particleCount: 50, spread: 70 },
      large: { particleCount: 80, spread: 90 },
      epic: { particleCount: 100, spread: 120 }
    }[intensity];

    // If confetti is already active and word entered within 5 seconds
    if (activeConfetti && timeSinceLastWord < 5000) {
      // Fire additional confetti from random positions
      const position = getRandomPosition();
      fireConfetti({
        ...confettiConfig,
        origin: position
      });
    } else {
      // Standard celebration pattern
      setActiveConfetti(true);

      // Center burst
      fireConfetti({
        ...confettiConfig,
        origin: { x: 0.5, y: 0.6 }
      });

      // For medium or better celebrations, add side bursts
      if (intensity !== 'small') {
        setTimeout(() => {
          fireConfetti({
            ...confettiConfig,
            particleCount: Math.floor(confettiConfig.particleCount * 0.6),
            origin: { x: 0.2, y: 0.6 }
          });
        }, 150);

        setTimeout(() => {
          fireConfetti({
            ...confettiConfig,
            particleCount: Math.floor(confettiConfig.particleCount * 0.6),
            origin: { x: 0.8, y: 0.6 }
          });
        }, 300);
      }

      setTimeout(() => setActiveConfetti(false), 2000);
    }

    setLastWordTime(now);
  }, [activeConfetti, lastWordTime, fireConfetti, getRandomPosition, calculateConfettiIntensity]);

  return { triggerConfetti };
};

export default useConfetti;
