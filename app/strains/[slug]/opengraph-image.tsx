import { ImageResponse, NextResponse } from "next/server";

import React from "react";
import StarRating from "@/components/StarRating/StarRating";

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

export const runtime = "edge";
// Image metadata
export const alt = "Leafbase Strain Image";
export const size = {
  width: 1200,
  height: 490,
};

export const contentType = "image/png";

const getStrainBySlug = async (slug: string) => {
  const res = await fetch(`https://leafbase.xyz/api/strains/${slug}`);
  const strain = await res.json();
  return strain;
};

// Image generation
export default async function Image({ params }: { params: { slug: string } }) {
  const { strain } = await getStrainBySlug(params.slug);

  if (!strain) {
    return new NextResponse("Not found", { status: 404 });
  }

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          flexDirection: "row",
          alignItems: "center",
          padding: "0 5%",
          background: "#fff",
          transform: "scale(1.15)",
        }}
      >
        <img
          src={strain.nugImage}
          alt={strain.name}
          style={{
            width: "45%",
            height: "90%",
            objectFit: "contain",
            background: "#fff",
            padding: "20px",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "400px",
            marginLeft: "5%",
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
              height: "90%",
              gap: 0,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "40px",
                width: "90px",
                borderRadius: "10px",
                backgroundColor: "#F4F6F7",
                marginBottom: "4px",
              }}
            >
              <p>{strain.category}</p>
            </div>
            <h1
              style={{
                padding: "0 4px",
                marginTop: "8px",
                fontWeight: "bold",
                fontSize: "29px",
              }}
            >
              {strain.name}
            </h1>
            <h2
              style={{
                fontSize: "22px",
                fontWeight: "400",
                color: "#6B7280",
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: "4",
                WebkitBoxOrient: "vertical",
                marginTop: "0px",
                wordWrap: "break-word",
                maxWidth: "70%",
                textOverflow: "ellipsis",
                padding: "0 4px",
              }}
            >
              {strain.shortDescription}
            </h2>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
              }}
            >
              <p>{strain.averageRating.toFixed(1)}</p>
              <StarRating rating={strain.averageRating} />
            </div>
            <div
              style={{
                display: "flex",
                gap: "0.75rem",
              }}
            >
              <p>THC: {strain.thcPercent}%</p>
              <p>CBD: 0%</p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                height: "40px",
                fontSize: "12px",
                fontWeight: "500",
                textTransform: "capitalize",
                alignItems: "center",
                borderRight: "1px solid #E5E7EB",
              }}
            >
              <span
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "4px",
                  fontSize: "15px",
                }}
              >
                <div
                  style={{
                    backgroundColor: effects[strain.topEffect],
                    borderRadius: "50%",
                    width: "10px",
                    height: "10px",
                  }}
                ></div>
                <p style={{ padding: "0" }}>{strain.topEffect}</p>
              </span>
              <span
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "4px",
                  fontSize: "15px",
                  marginLeft: "18px",
                }}
              >
                <div
                  style={{
                    backgroundColor: terpenes[strain.topTerpene],
                    borderRadius: "50%",
                    width: "10px",
                    height: "10px",
                  }}
                ></div>
                <p style={{ padding: "0" }}>{strain.topTerpene}</p>
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
    }
  );
}
