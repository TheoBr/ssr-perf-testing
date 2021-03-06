import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Content from "~/components/render-content";

export const loader: LoaderFunction = async (req) => {
  const startedAt = new Date();
  const githubProfile = await (
    await fetch("https://api.github.com/users/theobr")
  ).json();

  const endedAt = new Date();

  const timeElapsed = endedAt.getTime() - startedAt.getTime();

  console.log("Time to fetch github info", timeElapsed);

  return {
    startedAt: startedAt.getTime(),
    endedAt: endedAt.getTime(),
    timeElapsed,
    ...githubProfile,
  };
};

export function headers() {
  return {
    "Cache-Control": "max-age=300, s-maxage=3600",
  };
}

export default function Index() {
  const data = useLoaderData();

  return (
    <Content {...data}>
      <h1>This page is rendered on first request and then cached</h1>
      <h4>
        (That means all the ssr timings will be wrong because the times in them
        are old)
      </h4>
    </Content>
  );
}
