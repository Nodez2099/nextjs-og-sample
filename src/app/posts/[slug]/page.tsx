import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug;

  // // fetch data
  // const product = await fetch(`https://.../${id}`).then((res) => res.json())

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `Post - ${slug}`,
    openGraph: {
      images: [
        `https://nextjs-og-sample.vercel.app/posts/${slug}/opengraph-image`,
        ...previousImages,
      ],
    },
    description: `Description for ${slug}`,
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <div
      style={{
        display: "flex",
        height: "100svh",
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
  );
}
