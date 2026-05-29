import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/posts/$postsId")({
  component: RouteComponent,
  loader: async ({ params }) => {
    // Here you can fetch something from db using params
    // Later we can return the response and we can add it in Actual COmpoenent
    return {
      postId: params.postsId,
    };
  },
});

function RouteComponent() {
  const { postId } = Route.useLoaderData();

  return <div>Hello "/posts/$postsId"! - ${postId}</div>;
}
