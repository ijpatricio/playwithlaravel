// CodeEditor.js
import {useRef, useState} from 'react'
import AceEditor from 'react-ace'
import ace from 'ace-builds/src-noconflict/ace'
import {sendMessageFor} from 'php-cgi-wasm/msg-bus'
import { Save } from 'lucide-react'
import { useToast } from "@/components/ui/use-toast"

const sendMessage = sendMessageFor((`${window.location.origin}/cgi-worker.mjs`))

// Import the modes you need
import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/mode-html'
import 'ace-builds/src-noconflict/mode-css'
import 'ace-builds/src-noconflict/mode-json'
import 'ace-builds/src-noconflict/mode-markdown'
import 'ace-builds/src-noconflict/mode-text'
import 'ace-builds/src-noconflict/mode-yaml'
import 'ace-builds/src-noconflict/mode-php.js'
import 'ace-builds/src-noconflict/mode-php_laravel_blade.js'

// Import a theme
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/theme-nord_dark'


export function CodeEditor() {

    const { toast } = useToast()

    const editor = useRef(null)
    const [currentPath, setCurrentPath] = useState(null)


// Listen for 'editor-open-file' event
    window.addEventListener('editor-open-file', async event => {
        const path = event.detail

        setCurrentPath(path)

        const code = new TextDecoder().decode(
            await sendMessage('readFile', [path])
        )

        if (path) {
            const editor = ace.edit('code-editor', {
                mode: 'ace/mode/php',
                theme: 'ace/theme/monokai',
            })
            editor.setValue(code)
            editor.clearSelection()
            editor.gotoLine(1, 0, true)
            editor.focus()
        }
    })

    const handleSave = () => {
        const editor = ace.edit('code-editor')
        const contents = editor.getValue()

        sendMessage('writeFile', [
            currentPath,
            new TextEncoder().encode(contents),
        ])

        // toast({
        //     description: "Saved.",
        // })
    }

    const getLanguage = (filename) => {
        const extension = filename.split('.').pop()
        switch (extension) {
            case 'html':
                return 'html'
            case 'css':
                return 'css'
            case 'json':
                return 'json'
            default:
                return 'javascript'
        }
    }

    return (
        <>
            <div className={'flex my-1 pr-1 justify-end'}>
                <Save size={20} onClick={handleSave}/>
            </div>
            <AceEditor
                ref={editor}
                mode={'javascript'}
                theme="nord_dark"
                name="code-editor"
                editorProps={{$blockScrolling: true}}
                value={'// Select a file from the tree to start editing'}
                fontSize={14}
                width="100%"
                height="100%"
                setOptions={{
                    useWorker: false,
                    showPrintMargin: false,
                }}
            />
        </>
    )
}
