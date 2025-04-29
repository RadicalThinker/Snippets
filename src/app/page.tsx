// import Image from "next/image";

import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
// import { link } from "fs";
import Link from "next/link";

export default async function Home() {
  const snippets = await prisma.snippets.findMany() 
  
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="font-bold text-gray-800 text-3xl mb-8">Code Snippets</h1>
      
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-medium text-gray-700">Your Collection</h2>
        <Link href="/snippet/new">
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition-colors">
            Add New Snippet
          </Button>
        </Link>
      </div>
      
      {snippets.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <p className="text-gray-500">You don't have any snippets yet. Create your first one!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {snippets.map((snippet) => (
            <div key={snippet.id} className="border border-gray-200 rounded-lg bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
              <h2 className="font-bold text-xl text-gray-800 mb-2">{snippet.title}</h2>  
              
              <div className="flex flex-col gap-3">
                <p className="text-gray-600 text-sm font-mono bg-gray-50 p-3 rounded border border-gray-100 overflow-hidden text-ellipsis whitespace-nowrap">
                  {snippet.code}
                </p>
                <div className="flex justify-end">
                  <Link href={`/snippet/${snippet.id}`}>
                    <Button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md transition-colors">
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

