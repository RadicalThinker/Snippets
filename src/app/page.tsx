// import Image from "next/image";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div>
      <h1 className="font-bold text-black text-4xl">Home</h1>
      <div className="flex items-center justify-between">
        <h1>Snippets</h1>
        <Button className="bg-black text-white">New</Button>
      </div>
    </div>
  );
}
