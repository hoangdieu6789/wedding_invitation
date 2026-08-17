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
          borderRadius: "50%",
          background: "#7E1220",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="36" height="36" viewBox="0 0 24 24" fill="#FCF6EA">
          <path d="M12 21s-7.5-4.6-10.2-9.1C.2 9.1 1.3 5.5 4.6 4.6c2-.5 3.9.4 5 2 .3.4.9.4 1.2 0 1.1-1.6 3-2.5 5-2 3.3.9 4.4 4.5 2.8 7.3C19.5 16.4 12 21 12 21z" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
