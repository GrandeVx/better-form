'use client';

import confetti from 'canvas-confetti';
import { useEffect } from 'react';

interface SuccessConfettiProps {
  trigger: boolean;
}

export function SuccessConfetti({ trigger }: SuccessConfettiProps) {
  useEffect(() => {
    if (trigger) {
      // First burst
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF6B9D', '#FFE566', '#6BC5FF', '#7FE57F', '#B388FF'],
      });

      // Second burst with delay
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#FF6B9D', '#FFE566', '#6BC5FF', '#7FE57F', '#B388FF'],
        });
      }, 200);

      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#FF6B9D', '#FFE566', '#6BC5FF', '#7FE57F', '#B388FF'],
        });
      }, 400);
    }
  }, [trigger]);

  return null;
}
