import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0B0B0B",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#F5C518",
          fontSize: 36,
          fontWeight: 800,
          fontStyle: "italic",
        }}
      >
        FC
      </div>
    ),
    size,
  );
}
