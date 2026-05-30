import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/posts/$postsId")({
  component: RouteComponent,
  loader: async ({ params }) => {
    // Here you can fetch something from db using params
    // Later we can return the response and we can add it in Actual COmpoenent
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {
      postId: params.postsId,
    };
  },
  pendingComponent: () => <div> Loading...</div>,
  errorComponent: () => <div>Error occured</div>,
});

function RouteComponent() {
  const { postId } = Route.useLoaderData();

  return <div>Hello "/posts/$postsId"! - ${postId}</div>;
}
