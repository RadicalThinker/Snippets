"use client"
import { snippets } from '@/generated/prisma'
import { Editor } from '@monaco-editor/react'
import React from 'react'
import { Button } from './ui/button'
import { saveSnippet } from '@/actions'
const EditSnippetForm = ({snippet}:{snippet:snippets}) => {

    const [code, setCode] = React.useState(snippet.code)

    const saveSnippetAction = saveSnippet.bind(null, snippet.id , code)

  return (
    <div>
        <form className='flex items-center justify-between mb-4' action={saveSnippetAction}>
            <h1 className='font-bold text-xl '>Your Code Editor</h1>
            <Button type='submit' className="bg-black text-white hover:bg-gray-600">Save</Button>
        </form>
        <Editor
        height="90vh"
        defaultLanguage="javascript"
        defaultValue={code}
        theme='vs-dark'
        // onMount={handleEditorDidMount}
        onChange={(value) => setCode(value || '')}
      />
    </div>
  )
}

export default EditSnippetForm
