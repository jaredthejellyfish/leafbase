'use client';

import { useTheme } from 'next-themes';
import Particles from 'react-particles';
import type { Engine } from 'tsparticles-engine';
import { loadSlim } from 'tsparticles-slim';

import { useCallback } from 'react';
import React from 'react';

type Props = { disabled?: boolean; className?: string; id?: string };

function ClientParticles({ disabled, className, id = 'tsparticles' }: Props) {
  const { theme } = useTheme();
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  if (disabled) {
    return null;
  }

  return (
    <Particles
      id={id}
      className={className}
      style={{
        opacity: 0.5,
        zIndex: -50, // Make sure this zIndex is less than the content of the section
      }}
      options={{
        fullScreen: false,
        fpsLimit: 120,
        interactivity: {
          events: {
            onClick: {
              enable: false,
            },
            onHover: {
              enable: false,
            },
            resize: true,
          },
          modes: {
            push: {
              quantity: 4,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: theme !== 'light' ? '#ffffff' : '#000000',
          },
          links: {
            color: theme !== 'light' ? '#ffffff' : '#000000',
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1,
          },
          move: {
            direction: 'none',
            enable: true,
            outModes: {
              default: 'bounce',
            },
            random: false,
            speed: 1,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 80,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: 'circle',
          },
          size: {
            value: { min: 1, max: 5 },
          },
        },
        detectRetina: true,
      }}
      init={particlesInit}
    />
  );
}

export default ClientParticles;
