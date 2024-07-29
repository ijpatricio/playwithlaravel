import React, {useCallback, useState} from 'react'
import {FolderIcon, FileIcon} from 'lucide-react'
import sendMessage from '@/lib/cgiWorkerMsgBus'

console.log(sendMessage)

export function FileTree({structure, onFileSelect, path = '/persist/01J3YR5QM15578K6YRACP6X3RA'}) {

    const [dirs, setDirs] = useState([])
    const [files, setFiles] = useState([])
    const [isLoading, setIsLoading] = useState(false)


    const loadFiles = () => {

        sendMessage('readdir', [path])
            .then(async entries => {
                setIsLoading(true)
                console.log('heeey1')
                console.log(entries)
            })
    }

    loadFiles()


    return (
        <ul className="text-sm">

        </ul>
    )
}
