import { FiThumbsUp, FiThumbsDown } from 'react-icons/fi';
import { TbMedicalCross } from 'react-icons/tb';
import React from 'react';

import type { Strain } from '@/lib/types';
import Badge from './Badge';

type Effect = {
  [key: string]: string;
};

type Props = {
  strain: Strain;
};

const effects: Effect = {
  aroused: 'uninterested',
  creative: 'unimaginative',
  energetic: 'lethargic',
  euphoric: 'dysphoric',
  focused: 'distracted',
  giggly: 'serious',
  happy: 'sad',
  hungry: 'full',
  relaxed: 'tense',
  sleepy: 'alert',
  talkative: 'quiet',
  tingly: 'numb',
  uplifted: 'downcast',
};

const positiveEffects: Effect = {
  aroused: 'low libido',
  creative: 'creative block',
  energetic: 'fatigue',
  euphoric: 'depression',
  focused: 'ADD',
  giggly: 'apathy',
  happy: 'sadness',
  hungry: 'loss of appetite',
  relaxed: 'anxiety',
  sleepy: 'insomnia',
  talkative: 'social anxiety',
  tingly: 'lack of sensation',
  uplifted: 'low mood',
};

const effectColors: Effect = {
  aroused: 'indigo',
  uninterested: 'yellow',
  creative: 'green',
  unimaginative: 'red',
  energetic: 'purple',
  lethargic: 'dark',
  euphoric: 'pink',
  dysphoric: 'default',
  focused: 'blue',
  distracted: 'orange',
  giggly: 'yellow',
  serious: 'default',
  happy: 'green',
  sad: 'red',
  hungry: 'purple',
  full: 'dark',
  relaxed: 'indigo',
  tense: 'yellow',
  sleepy: 'blue',
  alert: 'red',
  talkative: 'green',
  quiet: 'dark',
  tingly: 'pink',
  numb: 'default',
  uplifted: 'yellow',
  downcast: 'red',
};

function getTopThreeEffects(strain: Strain): string[] {
  try {
    const effects = Object.values(strain.effects);
    const sortedEffects = effects.sort((a, b) => b.score - a.score);
    const topThree = sortedEffects.slice(0, 3);
    return topThree.map((effect) => effect.name);
  } catch (error) {
    console.error(error);
  }
  return [];
}

function getTopThreeEffectsNegative(strain: Strain): string[] {
  try {
    const effects = Object.values(strain.effects);
    const sortedEffects = effects.sort((a, b) => a.score - b.score);
    const topThree = sortedEffects.slice(0, 3);
    return topThree.map((effect) => effect.name);
  } catch (error) {
    console.error(error);
  }
  return [];
}

function getPositivesFromTopThree(strain: Strain): string[] {
  try {
    const topThree = getTopThreeEffects(strain);
    const positives = topThree.map((effect) => positiveEffects[effect]);
    return positives;
  } catch (error) {
    console.error(error);
  }
  return [];
}

const StrainSoma = (props: Props) => {
  const { strain } = props;
  const topThreeEffects = getTopThreeEffects(strain);
  const topThreeEffectsNegative = getTopThreeEffectsNegative(strain).map(
    (effect) => effects[effect]
  );
  const positives = getPositivesFromTopThree(strain);

  return (
    <div className="flex flex-col gap-2 rounded border border-zinc-200 p-2 px-3 dark:border-zinc-600 dark:bg-zinc-800 md:mt-7" id="strain-soma">
      <h3 className="text-sm font-bold uppercase">Strain soma</h3>
      {topThreeEffects.length >= 3 && (
        <div className="flex w-full flex-row flex-wrap items-center gap-2 text-xs">
          <FiThumbsUp className={'z-auto'} size={12} />
          <p className="hidden sm:hidden md:block xl:block">Feelings:</p>
          <div className="flex flex-row flex-wrap gap-2">
            {topThreeEffects.map((effect) => (
              <Badge key={effect} text={effect} color={effectColors[effect]} />
            ))}
          </div>
        </div>
      )}
      {topThreeEffects.length >= 3 && (
        <div className="flex w-full flex-row flex-wrap items-center gap-2 text-xs">
          <FiThumbsDown size={12} style={{}} />
          <p className="hidden sm:hidden md:block xl:block">Negatives:</p>
          <div className="flex flex-row flex-wrap gap-2">
            {topThreeEffectsNegative.map((effect) => (
              <Badge key={effect} text={effect} color={effectColors[effect]} />
            ))}
          </div>
        </div>
      )}
      {positives.length >= 3 && (
        <div className="flex w-full flex-row flex-wrap items-center gap-2 text-xs">
          <TbMedicalCross size={12} />
          <p className="hidden sm:hidden md:block xl:block">Helps with:</p>
          <div className="-gap-x-2 flex flex-row flex-wrap gap-y-2">
            {positives.map((effect) => (
              <Badge key={effect} text={effect} color={effectColors[effect]} />
            ))}
          </div>
        </div>
      )}
      <div className="mt-2">
        <div className="mb-1 flex flex-row items-center justify-between px-1 text-xs">
          <p>calm</p> <p>energizing</p>
        </div>
        <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
          <div
            className="h-2.5 rounded-full bg-green-700/70"
            style={{
              width:
                strain?.effects?.relaxed?.score &&
                `${Math.min(
                  Math.ceil(strain.effects.relaxed.score * 100),
                  100
                )}%`,
            }}
          ></div>
        </div>
      </div>
      <div className="mt-2">
        <div className="mb-1 flex flex-row items-center justify-between px-1 text-xs">
          <p>low THC</p> <p>high THC</p>
        </div>
        <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
          <div
            className="h-2.5 rounded-full bg-green-700/70"
            style={{
              width: `${Math.min(
                Math.ceil(
                  Math.max(
                    0,
                    Math.min(100, ((strain.thcPercent || 0 - 10) / 20) * 100)
                  )
                ),
                100
              )}%`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default StrainSoma;
