'use client';

import { loadSlim } from 'tsparticles-slim';
import Particles from 'react-particles';
import { useTheme } from 'next-themes';
import { useCallback } from 'react';
import React from 'react';

import type { Engine } from 'tsparticles-engine';

type Props = { disabled?: boolean; className?: string };

function ClientParticles({ disabled, className }: Props) {
  const { theme } = useTheme();
  const particlesInit = useCallback(async (engine: Engine) => {
    console.log(engine);
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    //await loadFull(engine);
    await loadSlim(engine);
  }, []);

  if (disabled) {
    return null;
  }

  return (
    <Particles
      id="tsparticles"
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