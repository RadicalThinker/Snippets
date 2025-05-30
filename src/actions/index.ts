"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const saveSnippet = async (id: number, code: string) => {
    await prisma.snippets.update({
        where: { id },
        data: { code },
    });
    revalidatePath(`/snippet/${id}`)
    redirect(`/snippet/${id}`)
}

export const deleteSnippet = async (id: number) => {
    await prisma.snippets.delete({
        where: { id },
    });
    revalidatePath("/");
    redirect('/')
}