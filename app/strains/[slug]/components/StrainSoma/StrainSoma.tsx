import { FiThumbsUp, FiThumbsDown } from 'react-icons/fi';
import { TbMedicalCross } from 'react-icons/tb';
import React from 'react';

import { StrainExtended } from '@/types/interfaces';
import Badge from '@/components/Badge/Badge';

type Effect = {
  [key: string]: string;
};

type Props = {
  strain: StrainExtended;
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

function getTopThreeEffects(strain: StrainExtended): string[] {
  const effects = Object.values(strain.effects);
  const sortedEffects = effects.sort((a, b) => b.score - a.score);
  const topThree = sortedEffects.slice(0, 3);
  return topThree.map((effect) => effect.name);
}

function getTopThreeEffectsNegative(strain: StrainExtended): string[] {
  const effects = Object.values(strain.effects);
  const sortedEffects = effects.sort((a, b) => a.score - b.score);
  const topThree = sortedEffects.slice(0, 3);
  return topThree.map((effect) => effect.name);
}

function getPositivesFromTopThree(strain: StrainExtended): string[] {
  const topThree = getTopThreeEffects(strain);
  const positives = topThree.map((effect) => positiveEffects[effect]);
  return positives;
}

const StrainSoma = (props: Props) => {
  const { strain } = props;
  const topThreeEffects = getTopThreeEffects(strain);
  const topThreeEffectsNegative = getTopThreeEffectsNegative(strain).map(
    (effect) => effects[effect]
  );
  const positives = getPositivesFromTopThree(strain);

  return (
    <div className="flex flex-col gap-2 p-2 px-3 border rounded border-zinc-200 dark:border-zinc-600 dark:bg-zinc-800 md:mt-7">
      <h3 className="text-sm font-bold uppercase">Strain soma</h3>
      <div className="flex flex-row flex-wrap items-center w-full gap-2 text-xs">
        <FiThumbsUp size={12} />
        <p className="hidden sm:hidden md:block xl:block">Feelings:</p>
        <div className="flex flex-row flex-wrap gap-y-2 gap-x-2">
          {topThreeEffects.map((effect) => (
            <Badge key={effect} text={effect} color={effectColors[effect]} />
          ))}
        </div>
      </div>
      <div className="flex flex-row flex-wrap items-center w-full text-xs gap-y-2 gap-x-2">
        <FiThumbsDown size={12} className="transform scale-x-[-1]" />
        <p className="hidden sm:hidden md:block xl:block">Negatives:</p>
        <div className="flex flex-row flex-wrap gap-y-2 gap-x-2">
          {topThreeEffectsNegative.map((effect) => (
            <Badge key={effect} text={effect} color={effectColors[effect]} />
          ))}
        </div>
      </div>
      <div className="flex flex-row flex-wrap items-center w-full gap-2 text-xs">
        <TbMedicalCross size={12} className="transform scale-x-[-1]" />
        <p className="hidden sm:hidden md:block xl:block">Helps with:</p>
        <div className="flex flex-row flex-wrap gap-y-2 -gap-x-2">
          {positives.map((effect) => (
            <Badge key={effect} text={effect} color={effectColors[effect]} />
          ))}
        </div>
      </div>
      <div className="mt-2">
        <div className="flex flex-row items-center justify-between px-1 mb-1 text-xs">
          <p>calm</p> <p>energizing</p>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div
            className="bg-green-700/70 h-2.5 rounded-full"
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
        <div className="flex flex-row items-center justify-between px-1 mb-1 text-xs">
          <p>low THC</p> <p>high THC</p>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div
            className="bg-green-700/70 h-2.5 rounded-full"
            style={{
              width: `${Math.min(
                Math.ceil(
                  Math.max(
                    0,
                    Math.min(100, ((strain.thcPercent - 10) / 20) * 100)
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
