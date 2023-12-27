import ParentSize from '@visx/responsive/lib/components/ParentSize';
import type { TransformMatrix } from '@visx/zoom/lib/types';
import { GridRows, GridColumns } from '@visx/grid';
import { RefreshCcw } from 'lucide-react';
import { scaleLinear } from '@visx/scale';
import { useTheme } from 'next-themes';
import { Circle } from '@visx/shape';
import { Group } from '@visx/group';
import { Zoom } from '@visx/zoom';
import { Text } from '@visx/text';
import React from 'react';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import { FaSpinner } from 'react-icons/fa';

type Data = {
  x: number;
  y: number;
  size: number;
  label: string;
  color?: string;
}[];

function stringToColor(str: string) {
  let hash = 0;
  if (str.length === 0) return hash.toString();
  for (let i = 0; i < str.length; i++) {
    const chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }
  return `hsl(${hash % 360},50%,50%)`;
}

function LoadingScatterPlot({
  width = 400,
  height = 400,
  axisColor = '#FFFFFF',
}: {
  width?: number;
  height?: number;
  axisColor?: string;
}) {
  return (
    <div className="relative">
      <FaSpinner
        className="h-10 w-10"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          animation: 'spin 1s linear infinite', // Add this line for animation
        }}
      />

      <svg width={width} height={height} style={{ touchAction: 'none' }}>
        <GridRows
          scale={scaleLinear({ domain: [0, 1], range: [height, 0] })}
          width={width}
          strokeDasharray="2, 2"
          strokeOpacity={0.2}
          stroke={axisColor}
        />
        <GridColumns
          scale={scaleLinear({ domain: [0, 1], range: [width, 0] })}
          height={height}
          strokeDasharray="2, 2"
          strokeOpacity={0.2}
          stroke={axisColor}
        />
      </svg>
    </div>
  );
}

export const ScatterPlot = ({ data }: { data?: Data | null }) => {
  const { theme } = useTheme();

  const axisColor = theme === 'dark' ? '#FFFFFF' : '#000000';
  const initialTransform: TransformMatrix = {
    scaleX: 1,
    scaleY: 1,
    translateX: 0,
    translateY: 0,
    skewX: 0,
    skewY: 0,
  };

  return (
    <ParentSize>
      {({ width, height }) => {
        const xMax = width;
        const yMax = height;

        if (!data) {
          return (
            <LoadingScatterPlot
              width={width}
              height={height}
              axisColor={axisColor}
            />
          );
        }

        const xScale = scaleLinear({
          domain: [
            Math.min(...data.map((d) => d.x)),
            Math.max(...data.map((d) => d.x)),
          ],
          range: [0, xMax],
          nice: true,
        });

        const yScale = scaleLinear({
          domain: [
            Math.min(...data.map((d) => d.y)),
            Math.max(...data.map((d) => d.y)),
          ],
          range: [yMax, 0],
          nice: true,
        });

        return (
          <Zoom
            width={width}
            height={height}
            scaleXMin={0.5} // more reasonable min scale
            scaleXMax={100} // more reasonable max scale
            scaleYMin={0.5} // more reasonable min scale
            scaleYMax={100} // more reasonable max scale
            initialTransformMatrix={initialTransform}
          >
            {(zoom) => (
              <>
                {zoom.transformMatrix !== initialTransform && (
                  <div className="absolute right-8 top-16 z-50">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <button onClick={zoom.reset}>
                            <RefreshCcw />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="font-semibold">Reset Zoom</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                )}
                <svg
                  width={width}
                  height={height}
                  style={{ touchAction: 'none' }}
                  ref={zoom.containerRef as React.LegacyRef<SVGSVGElement>}
                >
                  <GridRows
                    scale={yScale}
                    width={xMax}
                    strokeDasharray="2, 2"
                    strokeOpacity={0.2}
                    stroke={axisColor}
                  />
                  <GridColumns
                    scale={xScale}
                    height={yMax}
                    strokeDasharray="2, 2"
                    strokeOpacity={0.2}
                    stroke={axisColor}
                  />
                  <Group transform={zoom.toString()}>
                    {data.map((point, i) => (
                      <React.Fragment key={i}>
                        {point.size / zoom.transformMatrix.scaleX}
                        <Circle
                          cx={
                            xScale(point.x) +
                            (point.size * 1.5) / zoom.transformMatrix.scaleX
                          }
                          cy={yScale(point.y)}
                          r={point.size / zoom.transformMatrix.scaleX}
                          fill={point.color || stringToColor(point.label)}
                        />
                        <Text
                          x={
                            xScale(point.x) +
                            (point.size < 5
                              ? 25 / zoom.transformMatrix.scaleX
                              : 22 / zoom.transformMatrix.scaleX)
                          }
                          y={yScale(point.y)}
                          fill={axisColor}
                          fontSize={
                            point.size < 5
                              ? 0
                              : 12 / zoom.transformMatrix.scaleX
                          }
                          fontWeight={400}
                          textAnchor="start"
                          verticalAnchor="middle"
                        >
                          {point.label}
                        </Text>
                      </React.Fragment>
                    ))}
                  </Group>
                </svg>
              </>
            )}
          </Zoom>
        );
      }}
    </ParentSize>
  );
};

export default ScatterPlot;
