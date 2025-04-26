import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";
import React from "react";

const Createsnippetpage = () => {
  return (
    <form>
      <div>
        <Label> Title </Label>
        <Input type="text" placeholder="Title" id="title" className="w-full" />
      </div>
      <div className="mt-4">
        <Label> Snippet </Label>
        <Textarea
          name="text"
          placeholder="Snippet"
          id="title"
          className="w-full"
        />
      </div>
      <Button type="submit" className="bg-black text-white mt-6">New</Button>
    </form>
  );
};

export default Createsnippetpage;
