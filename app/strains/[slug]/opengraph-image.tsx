import { ImageResponse } from "next/server";
import { StrainExtended } from "@/types/interfaces";

// Route segment config
export const runtime = "edge";

type Colors = {
  [key: string]: string;
};

const terpenes: Colors = {
  myrcene: "#7EBF73",
  caryophyllene: "#B25C52",
  terpinolene: "#4A7597",
  linalool: "#9A67B5",
  pinene: "#3B8A5A",
  limonene: "#F9B122",
  ocimene: "#2AA39F",
};

const effects: Colors = {
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

// Image metadata
export const alt = "About Acme";
export const size = {
  width: 1200,
  height: 630,
};

const getStrain = async (slug: string) => {
  const res = await fetch(`http://localhost:3000/api/strains/${slug}`);
  const data = await res.json();
  return data.strain as StrainExtended;
};

export default async function Image({ params }: { params: { slug: string } }) {
  const strain = await getStrain(params.slug);

  if (!strain) return null;
  console.log(strain);

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          gap: "1.25rem",
          padding: "2rem",
          border: "1px solid #E5E7EB",
          boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
          backgroundColor: "#fff",
          width: "1200px",
          height: "630px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "50%",
            border: "1px solid #E5E7EB",
            borderRadius: "0.5rem",
          }}
        >
          <img
            style={{
              maxHeight: "450px",
              objectFit: "contain",
              width: "450px",
              height: "450px",
              backgroundColor: "#fff",
              border: "1px solid #fff",
              borderRadius: "0.5rem",
            }}
            src={strain.nugImage}
            alt={strain.name}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0.25rem 0.5rem",
              fontSize: "0.75rem",
              fontWeight: "500",
              backgroundColor: "#E5E7EB",
              borderRadius: "0.25rem",
              maxWidth: "60px",
              transform: "scale(1.35)",
            }}
          >
            {strain.phenotype}
          </div>
          <h1 style={{ fontSize: "44px", fontWeight: "bold" }}>
            {strain.name}
          </h1>
          <p style={{ fontSize: "23px", color: "#4B5563" }}>
            {strain.subtitle}
          </p>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
