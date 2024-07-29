// CodeEditor.js
import React from 'react';
import AceEditor from 'react-ace';

// Import the modes you need
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/mode-css';
import 'ace-builds/src-noconflict/mode-json';

// Import a theme
import 'ace-builds/src-noconflict/theme-monokai';

export function CodeEditor({ file }) {
    const getLanguage = (filename) => {
        const extension = filename.split('.').pop();
        switch (extension) {
            case 'html':
                return 'html';
            case 'css':
                return 'css';
            case 'json':
                return 'json';
            default:
                return 'javascript';
        }
    };

    return (
        <AceEditor
            mode={file ? getLanguage(file.path) : 'javascript'}
            theme="monokai"
            name="code-editor"
            editorProps={{ $blockScrolling: true }}
            value={file ? file.content : '// Select a file from the tree to start editing'}
            fontSize={14}
            width="100%"
            height="100%"
            setOptions={{
                useWorker: false,
                showPrintMargin: false,
            }}
        />
    );
}
