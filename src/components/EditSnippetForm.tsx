"use client"
import { snippets } from '@/generated/prisma'
import { Editor } from '@monaco-editor/react'
import React from 'react'
import { Button } from './ui/button'
import { saveSnippet } from '@/actions'
import Link from 'next/link'

const EditSnippetForm = ({snippet}:{snippet:snippets}) => {
    const [code, setCode] = React.useState(snippet.code)
    const saveSnippetAction = saveSnippet.bind(null, snippet.id, code)

    return (
        <div>
            <form action={saveSnippetAction}>
                <div className='flex items-center justify-between mb-4'>
                    <div>
                        <h1 className='font-bold text-xl text-gray-800'>{snippet.title}</h1>
                        <p className='text-gray-500 text-sm mt-1'>Edit your code below</p>
                    </div>
                    <div className='flex items-center gap-3'>
                        <Link href={`/snippet/${snippet.id}`}>
                            <Button 
                                type='button' 
                                className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md transition-colors"
                            >
                                Cancel
                            </Button>
                        </Link>
                        <Button 
                            type='submit' 
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition-colors"
                        >
                            Save Changes
                        </Button>
                    </div>
                </div>
                
                <div className="rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                    <Editor
                        height="70vh"
                        defaultLanguage="javascript"
                        defaultValue={code}
                        theme='vs-dark'
                        onChange={(value) => setCode(value || '')}
                        options={{
                            minimap: { enabled: true },
                            scrollBeyondLastLine: false,
                            automaticLayout: true,
                            fontFamily: 'monospace',
                            fontSize: 14,
                        }}
                    />
                </div>
            </form>
        </div>
    )
}

export default EditSnippetForm
