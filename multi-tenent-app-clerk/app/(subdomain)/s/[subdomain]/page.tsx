import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { db } from "@/db";
import { blogTable } from "@/db/schema";
import { clerkClient } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export default async function HomePage({
  params,
}: {
  params: Promise<{ subdomain: string }>;
}) {
  const { subdomain } = await params;
  const client = await clerkClient();
  const org = await client.organizations.getOrganization({ slug: subdomain });
  console.log(org);
  const orgId = org.id;

  const blogs = await db
    .select()
    .from(blogTable)
    .where(eq(blogTable.orgId, orgId));

  return (
    <div className="w-[80%] mx-auto pt-5">
      {blogs.map((blog) => (
        <Card className="p-2 mb-2" key={blog.id}>
          <CardTitle>{blog.title}</CardTitle>
          <CardContent>{blog.content}</CardContent>
        </Card>
      ))}
    </div>
  );
}
