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
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="p-6 bg-red-50 border border-red-200 rounded-lg text-red-600 font-medium">
          Invalid ID
        </div>
      </div>
    );
  }

  const snippet = await prisma.snippets.findUnique({
    where: {
      id,
    },
  });

  if (!snippet) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="p-6 bg-amber-50 border border-amber-200 rounded-lg text-amber-600 font-medium">
          Snippet not found
        </div>
      </div>
    );
  }

  const deleteSnippetAction = deleteSnippet.bind(null, snippet.id);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="mb-2 text-sm text-gray-500 font-medium">
        Snippet #{id}
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-bold text-2xl text-gray-800">{snippet.title}</h1>
          <div className="flex items-center gap-3">
            <Link href={`/snippet/${snippet.id}/edit`}>
              <Button className="bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 rounded-md transition-colors">
                Edit
              </Button>
            </Link>
            <form action={deleteSnippetAction}>
              <Button 
                type="submit" 
                className="bg-red-500 text-white hover:bg-red-600 px-4 py-2 rounded-md transition-colors"
              >
                Delete
              </Button>
            </form>
          </div>
        </div>
        
        <div className="relative">
          <pre className="p-5 bg-gray-50 rounded-lg border border-gray-200 mt-4 overflow-x-auto text-sm font-mono shadow-inner">
            <code className="text-gray-800">{snippet.code}</code>
          </pre>
        </div>
      </div>
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

