import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import prisma from "@/lib/prisma";
import { Label } from "@radix-ui/react-label";
import { redirect } from "next/navigation";
import React from "react";

const Createsnippetpage = () => {
  

  async function createSnippet(Formdata: FormData) {
    "use server";
    const title = Formdata.get("title")?.toString() || "";
    const code = Formdata.get("code")?.toString() || "";
    
    const snippet = await prisma.snippets.create({
      data: {
        title,
        code,
      },
    });

    console.log(snippet);
    // Redirect to the snippet page or show a success message
    redirect("/")
  }




  return (
    <form action={createSnippet} className="flex flex-col w-full max-w-md mx-auto mt-10">
      <div>
        <Label> Title </Label>
        <Input type="text" placeholder="Title" id="title" name="title" className="w-full" />
      </div>
      <div className="mt-4">
        <Label> Snippet </Label>
        <Textarea
          name="code"
          placeholder="Snippet"
          id="code"
          className="w-full"
        />
      </div>
      <Button type="submit" className="bg-black text-white mt-6">New</Button>
    </form>
  );
};

export default Createsnippetpage;
