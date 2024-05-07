import { ImageResponse } from "next/og";

export const alt = "About Acme";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image({ params }: { params: { slug: string } }) {
  // const post = await fetch(`https://.../posts/${params.slug}`).then((res) =>
  //   res.json()
  // );

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          backgroundImage: "linear-gradient(to bottom, #dbf4ff, #fff1f1)",
          fontSize: 60,
          letterSpacing: -2,
          fontWeight: 700,
          textAlign: "center",
        }}>
        <div
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgb(0, 124, 240), rgb(0, 223, 216))",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}>
          {params.slug}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
