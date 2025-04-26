// import { Editor } from '@monaco-editor/react'
import EditSnippetForm from '@/components/EditSnippetForm'
import prisma from '@/lib/prisma'
import React from 'react'

const EditPageSnippet = async ({params}:{params:Promise<{id:string}>}) => {
    const id = parseInt((await params).id)
    if (isNaN(id)) {
        return <div>Invalid ID</div>
    }
    const snippet = await prisma.snippets.findUnique({
        where: {
            id,
        },
    })
    if (!snippet) {
        return <div>Snippet not found</div>
    }
  return (
    <div>
        <EditSnippetForm snippet = {snippet} />
    </div>
  )
}

export default EditPageSnippet
