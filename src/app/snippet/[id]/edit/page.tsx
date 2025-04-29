// import { Editor } from '@monaco-editor/react'
import EditSnippetForm from '@/components/EditSnippetForm'
import prisma from '@/lib/prisma'
import Link from 'next/link'
import React from 'react'

const EditPageSnippet = async ({params}:{params:Promise<{id:string}>}) => {
    const id = parseInt((await params).id)
    
    if (isNaN(id)) {
        return (
            <div className="flex items-center justify-center h-[60vh]">
                <div className="p-6 bg-red-50 border border-red-200 rounded-lg text-red-600 font-medium">
                    Invalid ID
                </div>
            </div>
        )
    }
    
    const snippet = await prisma.snippets.findUnique({
        where: {
            id,
        },
    })
    
    if (!snippet) {
        return (
            <div className="flex items-center justify-center h-[60vh] flex-col gap-4">
                <div className="p-6 bg-amber-50 border border-amber-200 rounded-lg text-amber-600 font-medium">
                    Snippet not found
                </div>
                <Link href='/snippet/new' className="text-indigo-600 hover:text-indigo-700 font-medium">
                    Create a new snippet
                </Link>
            </div>
        )
    }
    
    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            <div className="mb-2 text-sm text-gray-500 font-medium">
                Editing Snippet #{id}
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <EditSnippetForm snippet={snippet} />
            </div>
        </div>
    )
}

export default EditPageSnippet
