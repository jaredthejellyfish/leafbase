import React from 'react';
import { Group } from '@visx/group';
import { Pie } from '@visx/shape';
import { scaleOrdinal } from '@visx/scale';
import { ParentSize } from '@visx/responsive';
import { Text } from '@visx/text';
import { useTheme } from 'next-themes';

const PieChart = ({ data }: { data: { [key: string]: number } }) => {
  const { theme } = useTheme();

  const axisColor = theme === 'dark' ? '#FFFFFF' : '#000000';
  
  const parsedData = Object.keys(data).map((key) => ({
    label: key,
    value: data[key],
  }));

  const colorScale = scaleOrdinal({
    domain: parsedData.map((item) => item.label),
    range: [
      '#f00e',
      '#0f0',
      '#00f',
      '#ff0',
      '#0ff',
      '#f0f',
      '#f90',
      '#09f',
      '#90f',
      '#9f0',
      '#f09',
      '#0f9',
      '#09f',
    ],
  });

  return (
    <ParentSize>
      {({ width, height }) => {
        const radius = Math.min(width, height) / 2;
        const centerY = height / 2;
        const centerX = width / 2;
        return (
          <svg width={width} height={height}>
            <Group top={centerY} left={centerX}>
              <Pie
                data={parsedData}
                pieValue={(data) => data.value}
                outerRadius={radius}
                innerRadius={({ data }) => {
                  // Optional: if you want a donut chart with variable thickness
                  const size = data.value * radius;
                  return size > radius / 2 ? size - radius / 4 : radius / 2;
                }}
                padAngle={0.01}
              >
                {(pie) => {
                  return pie.arcs.map((arc) => {
                    const [centroidX, centroidY] = pie.path.centroid(arc);
                    return (
                      <g key={`arc-${arc.data.label}`}>
                        <path
                          d={pie.path(arc) || undefined}
                          fill={colorScale(arc.data.label)}
                          fillOpacity={0.4}
                        />
                        <Text
                          x={centroidX}
                          y={centroidY}
                          dy=".33em"
                          fontSize={10}
                          textAnchor="middle"
                          fill={axisColor}
                        >
                          {arc.data.label}
                        </Text>
                      </g>
                    );
                  });
                }}
              </Pie>
            </Group>
          </svg>
        );
      }}
    </ParentSize>
  );
};

export default PieChart;
