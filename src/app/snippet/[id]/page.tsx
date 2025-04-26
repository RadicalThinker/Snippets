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
