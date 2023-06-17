import React from "react";

interface SquareProps {
  name: string;
  color: string;
}

const Square: React.FC<SquareProps> = ({ name, color }) => {
  return (
    <div
      className="w-20 h-20 bg-gray-100 text-center flex items-center justify-center m-2"
      style={{ backgroundColor: color }}
    >
      <span className="text-xs font-bold">{name}</span>
    </div>
  );
};

const colors = {
  Hungry: "#FF8C00",
  Giggly: "#FF69B4",
  Euphoric: "#9370DB",
  Energetic: "#F5A623",
  Uplifted: "#20B2AA",
  Aroused: "#FF4500",
  Tingly: "#BA55D3",
  Happy: "#00FF00",
  Focused: "#FFD700",
  null: "#778899",
  Talkative: "#4682B4",
  Creative: "#FFA07A",
  Relaxed: "#8B4513",
  Sleepy: "#1E90FF",
};

const ColorGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-3 gap-4 w-72">
      {Object.entries(colors).map(([name, color]) => (
        <Square key={name} name={name} color={color} />
      ))}
    </div>
  );
};

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 pt-16">
      <ColorGrid />
    </main>
  );
}
