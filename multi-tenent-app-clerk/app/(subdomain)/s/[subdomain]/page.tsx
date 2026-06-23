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
    <div>
      {blogs.map((blog) => (
        <div>
          <h3>{blog.title}</h3>
          <p>{blog.content}</p>
        </div>
      ))}
    </div>
  );
}
