import { readFileSync } from "fs";
import { join } from "path";
import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  const monogram = readFileSync(join(process.cwd(), "public/img/mono-dm2.png")).toString("base64");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          background: "#7E1220",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`data:image/png;base64,${monogram}`}
          width={38}
          height={38}
          style={{ filter: "brightness(0) invert(1)" }}
        />
      </div>
    ),
    { ...size },
  );
}
