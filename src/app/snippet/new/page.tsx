import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import prisma from "@/lib/prisma";
import { Label } from "@radix-ui/react-label";
import { revalidatePath } from "next/cache";
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
    revalidatePath("/");
    redirect("/");
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="mb-6">
        <h1 className="font-bold text-2xl text-gray-800 mb-1">Create New Snippet</h1>
        <p className="text-gray-500 text-sm">Add a new code snippet to your collection</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <form action={createSnippet} className="flex flex-col w-full">
          <div className="mb-5">
            <Label className="block text-gray-700 font-medium mb-2"> Title </Label>
            <Input 
              type="text" 
              placeholder="Enter snippet title" 
              id="title" 
              name="title" 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          
          <div className="mb-6">
            <Label className="block text-gray-700 font-medium mb-2"> Code </Label>
            <Textarea
              name="code"
              placeholder="Paste your code snippet here"
              id="code"
              className="w-full min-h-[200px] px-3 py-2 font-mono text-sm bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          
          <div className="flex justify-end gap-3">
            <Button 
              type="button" 
              onClick={() => window.history.back()} 
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md transition-colors"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition-colors"
            >
              Create Snippet
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Createsnippetpage;
