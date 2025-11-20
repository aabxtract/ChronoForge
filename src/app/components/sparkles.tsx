"use client";

import React, { useEffect, useState } from 'react';

const random = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min;

const generateSparkle = () => {
  const sparkle = {
    id: String(random(10000, 99999)),
    createdAt: Date.now(),
    color: ['#fcd34d', '#fef08a', '#fff'][random(0,3)],
    size: random(1, 3),
    style: {
      top: random(0, 100) + '%',
      left: random(0, 100) + '%',
      animationName: 'fade-out-and-up',
      animationDuration: '1000ms',
      animationTimingFunction: 'ease-out',
    },
  };
  return sparkle;
};

const Sparkles: React.FC = () => {
  const [sparkles, setSparkles] = useState<ReturnType<typeof generateSparkle>[]>([]);

  useEffect(() => {
    const sparkleInterval = setInterval(() => {
      const now = Date.now();
      const newSparkle = generateSparkle();
      const nextSparkles = sparkles.filter(sp => (now - sp.createdAt) < 1000);
      nextSparkles.push(newSparkle);
      setSparkles(nextSparkles);
    }, 200);

    return () => clearInterval(sparkleInterval);
  }, [sparkles]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
       <style>
        {`
          @keyframes fade-out-and-up {
            from {
              opacity: 1;
              transform: translateY(0);
            }
            to {
              opacity: 0;
              transform: translateY(-20px);
            }
          }
        `}
      </style>
      {sparkles.map(({ id, color, size, style }) => (
        <div
          key={id}
          className="absolute rounded-full"
          style={{
            ...style,
            width: `${size}px`,
            height: `${size}px`,
            backgroundColor: color,
          }}
        />
      ))}
    </div>
  );
};

export default Sparkles;
