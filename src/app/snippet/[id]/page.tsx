import { deleteSnippet } from "@/actions";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import Link from "next/link";
import React from "react";

type SnippetDetailProps = {
  params: Promise<{ id: string }>;
};

const SnippetDetailPage: React.FC<SnippetDetailProps> = async ({ params }) => {
  const id = parseInt((await params).id);

  if (isNaN(id)) {
    return <div>Invalid ID</div>;
  }

  const snippet = await prisma.snippets.findUnique({
    where: {
      id,
    },
  });

  if (!snippet) {
    return <div>Snippet not found</div>;
  }

  const deleteSnippetAction = deleteSnippet.bind(null, snippet.id);

  return (
    <div>
      snippet no: {id}
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-xl text-black">{snippet.title}</h1>
        <div className="flex items-center gap-4">

            <Link href={`/snippet/${snippet.id}/edit`}>
          <Button className="bg-black text-white hover:bg-gray-600">
            Edit
          </Button>
          </Link>
          <form action={deleteSnippetAction}>
          <Button type="submit" className="bg-red-500 text-white hover:bg-red-400">
            Delete
          </Button>

          </form>
        </div>
      </div>
      <pre className="p-3 bg-gray-200 rounded-md border border-gray-300 mt-4">
        <code>{snippet.code}</code>
      </pre>
    </div>
  );
};

export default SnippetDetailPage;

// caching and generating static snippets that are present in the database
// This function will be called at build time to generate static pages for each snippet
// It fetches all snippets from the database and returns an array of objects
// with the snippet ID as a parameter
// This is useful for static generation, allowing Next.js to pre-render the pages
// for each snippet at build time
// This function is used to generate static paths for dynamic routes
export async function generateStaticParams() {
  const snippets = await prisma.snippets.findMany();
  return snippets.map((snippet) => ({
    id: snippet.id.toString(),
  }));
}

