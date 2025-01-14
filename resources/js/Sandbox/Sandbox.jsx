// App.js
import React, { useState } from 'react';
import { CodeEditor } from './CodeEditor';
import { ResizablePanel, ResizablePanelGroup, ResizableHandle } from "@/components/ui/resizable";
import {EditorFolder} from './EditorFolder.jsx'
import { Toaster } from "@/components/ui/toaster"

function App() {
    return (
        <div className="mx-auto mt-2 h-screen flex flex-col">
            <h1 className="text-xl font-bold pl-3 mb-4">
                PHP Playground in the browser. No server required.
            </h1>
            <ResizablePanelGroup
                direction="horizontal"
                className="flex-grow rounded-lg border"
            >
                <ResizablePanel defaultSize={25} minSize={20}>
                    <div className="h-full pl-3 py-1 bg-white overflow-auto">
                        <h2 className="text-lg font-semibold mb-2">Project files</h2>
                        <EditorFolder path="/persist/01J3YR5QM15578K6YRACP6X3RA" name="/" />
                    </div>
                </ResizablePanel>

                <ResizableHandle />

                <ResizablePanel defaultSize={75}>
                    <div className="h-full bg-white">
                        <CodeEditor />
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>

            <Toaster />
        </div>
    );
}
export default App;
