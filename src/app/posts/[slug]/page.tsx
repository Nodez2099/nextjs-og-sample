import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import { headers } from "next/headers";

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
    title: `Post - ${searchParams.title}`,
    openGraph: {
      images: [searchParams.image as string, ...previousImages],
    },
    description: searchParams.description as string,
  };
}

export default function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const headersList = headers();
  const host = headersList.get("host") || "";

  return (
    <div className="min-h-svh flex flex-col gap-4 justify-center items-center">
      <div className="text-5xl font-medium">
        Your social shared link preview
      </div>
      <div className="max-w-3xl rounded-2xl overflow-clip">
        <Image
          className="w-full max-h-[512px] object-cover"
          src={searchParams.image as string}
          alt=""
          width={512}
          height={512}
        />
        <div className="p-3 bg-[#DCDCDC]">
          <div className="text-blue-400">{host}</div>
          <div className="font-bold">{`Post - ${searchParams.title}`}</div>
          <p className="line-clamp-1">{searchParams.description}</p>
        </div>
      </div>
    </div>
  );
}
