// App.js
import React, { useState } from 'react';
import { FileTree } from './FileTree';
import { CodeEditor } from './CodeEditor';
import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

const fileStructure = {
    'project': {
        'src': {
            'components': {
                'Header.js': 'function Header() { return <header>Header</header>; }',
                'Footer.js': 'function Footer() { return <footer>Footer</footer>; }'
            },
            'pages': {
                'Home.js': 'function Home() { return <div>Home Page</div>; }',
                'About.js': 'function About() { return <div>About Page</div>; }'
            },
            'App.js': 'function App() { return <div>App</div>; }',
            'index.js': 'ReactDOM.render(<App />, document.getElementById("root"));'
        },
        'public': {
            'index.html': '<!DOCTYPE html>\n<html>\n<body>\n\t<div id="root"></div>\n</body>\n</html>',
            'styles.css': 'body {\n\tbackground-color: #f0f0f0;\n}'
        },
        'package.json': '{\n\t"name": "my-project",\n\t"version": "1.0.0"\n}'
    }
};

function App() {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileSelect = (path, content) => {
        setSelectedFile({ path, content });
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Web-based Code Editor</h1>
            <ResizablePanelGroup direction="horizontal">
                <ResizablePanel defaultSize={25}>
                    <div className="bg-white p-4 rounded-l shadow-md overflow-auto h-[600px]">
                        <h2 className="text-lg font-semibold mb-2">File Tree</h2>
                        <FileTree structure={fileStructure} onFileSelect={handleFileSelect} />
                    </div>
                </ResizablePanel>
                <ResizablePanel defaultSize={75}>
                    <div className="bg-white p-4 rounded-r shadow-md h-[600px]">
                        <CodeEditor file={selectedFile} />
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
}

export default App;
