"use client";

import Nav from "@/app/components/nav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { createBlog } from "./actions";
import { useOrganization } from "@clerk/nextjs";

const OrgLandingPage = () => {
  const [blogTitle, setBlogTitle] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const selectedOrganisation = useOrganization();

  const handleCreateBlog = async () => {
    if (!selectedOrganisation.organization?.id) return;
    await createBlog({
      title: blogTitle,
      content: blogContent,
      orgId: selectedOrganisation.organization?.id,
    });
  };

  return (
    <main>
      <Nav />
      <div className="flex justify-center">
        <div className="p-10 flex flex-col gap-2 w-[600px]">
          <Input
            placeholder="Title"
            value={blogTitle}
            onChange={(e) => setBlogTitle(e.target.value)}
          />
          <Textarea
            placeholder="Write your blog here..."
            value={blogContent}
            onChange={(e) => setBlogContent(e.target.value)}
          />
          <Button onClick={handleCreateBlog}>Create Blog</Button>
        </div>
      </div>
    </main>
  );
};

export default OrgLandingPage;
