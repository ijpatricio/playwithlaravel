// CodeEditor.js
import React from 'react'
import AceEditor from 'react-ace'
import { sendMessageFor } from 'php-cgi-wasm/msg-bus';
const sendMessage = sendMessageFor((`${window.location.origin}/cgi-worker.mjs`))

// Import the modes you need
import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/mode-html'
import 'ace-builds/src-noconflict/mode-css'
import 'ace-builds/src-noconflict/mode-json'
import 'ace-builds/src-noconflict/mode-php.js'
import 'ace-builds/src-noconflict/mode-php_laravel_blade.js'

// Import a theme
import 'ace-builds/src-noconflict/theme-monokai'

const openFile = async path => {
    const name = path.split('/').pop()
    const newFile = openFilesMap.has(path)
        ? openFilesMap.get(path)
        : {name, path}

    query.set('path', path)

    window.history.replaceState({}, null, window.location.pathname + '?' + query)

    currentPath.current = path

    editor.current.editor.setReadOnly(false)

    if (!newFile.session) {
        openFilesMap.set(path, newFile)
    }

    const openFilesList = [...openFilesMap.entries()].map(e => e[1])

    openFilesList.map(f => f.active = false)

    newFile.active = true

    setOpenFiles(openFilesList)

    if (newFile.session) {
        editor.current.editor.setSession(newFile.session)
        return
    }

    const code = new TextDecoder().decode(
        await sendMessage('readFile', [path])
    )

    setContents(code)

    const extension = path.split('.').pop()
    const mode = modes[extension] ?? 'ace/mode/text'

    newFile.session = ace.createEditSession(code, mode)

    newFile.dirty = false

    newFile.session.on('change', () => {
        newFile.dirty = true
        const openFilesList = [...openFilesMap.entries()].map(e => e[1])
        setOpenFiles(openFilesList)
    })

    editor.current.editor.setSession(newFile.session)

    tabBox.current.scrollTo({left: -tabBox.current.scrollWidth, behavior: 'smooth'})
}


export function CodeEditor({file}) {
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
        <AceEditor
            mode={file ? getLanguage(file.path) : 'javascript'}
            theme="monokai"
            name="code-editor"
            editorProps={{$blockScrolling: true}}
            value={file ? file.content : '// Select a file from the tree to start editing'}
            fontSize={14}
            width="100%"
            height="100%"
            setOptions={{
                useWorker: false,
                showPrintMargin: false,
            }}
        />
    )
}
