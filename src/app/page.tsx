// import Image from "next/image";

import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
// import { link } from "fs";
import Link from "next/link";

export default async function Home() {

  const snippets = await prisma.snippets.findMany()
  return (
    <div>
      <h1 className="font-bold text-black text-4xl">Home</h1>
      <div className="flex items-center justify-between">
        <h1>Snippets</h1>
        <Link href="/snippet/new">
          <Button className="bg-black text-white">New</Button>
        </Link>

      </div>
        {snippets.map((snippet) => (
          <div key={snippet.id} className="border p-4 my-4">
            <h2 className="font-bold text-lg">{snippet.title}</h2>  

            <div className="flex items-center justify-between">
            <p>{snippet.code}</p>
            <Link href={`/snippet/${snippet.id}`}>
              <Button className=" mt-4" variant="link">View</Button>
            </Link>

            </div>
          </div>
        ))}
    </div>
  );
}
