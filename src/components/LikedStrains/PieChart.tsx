import { Group } from "@visx/group";
import { ParentSize } from "@visx/responsive";
import { scaleOrdinal } from "@visx/scale";
import { Pie } from "@visx/shape";
import { Text } from "@visx/text";
import { isEqual } from "lodash";
import { useTheme } from "next-themes";

import React from "react";

const PieChart = React.memo(
  ({ data }: { data: Record<string, number> }) => {
    const { theme } = useTheme();

    const axisColor = theme === "dark" ? "#FFFFFF" : "#000000";

    const parsedData = Object.keys(data).map((key) => ({
      label: key,
      value: data[key],
    }));

    const colorScale = scaleOrdinal({
      domain: parsedData.map((item) => item.label),
      range: [
        "#f00e",
        "#0f0",
        "#00f",
        "#ff0",
        "#0ff",
        "#f0f",
        "#f90",
        "#09f",
        "#90f",
        "#9f0",
        "#f09",
        "#0f9",
        "#09f",
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
                  pieValue={(data) => data.value ?? 0}
                  outerRadius={radius}
                  innerRadius={({ data }) => {
                    // Optional: if you want a donut chart with variable thickness
                    const size = data.value! * radius;
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
                            d={pie.path(arc) ?? undefined}
                            fill={colorScale(arc.data.label)}
                            fillOpacity={0.4}
                          />
                          <Text
                            x={centroidX}
                            y={centroidY}
                            fontWeight={400}
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
  },
  (prevProps, nextProps) => {
    return isEqual(prevProps.data, nextProps.data);
  },
);

PieChart.displayName = "PieChart";

export default PieChart;
