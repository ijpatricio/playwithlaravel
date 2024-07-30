import {useEffect, useMemo, useRef, useState} from 'react'
import {sendMessageFor} from 'php-cgi-wasm/msg-bus'
import EditorFile from './EditorFile'

import fileIcon from './nomo-dark/file.svg'
import folderOpen from './nomo-dark/folder.open.svg'
import folderClose from './nomo-dark/folder.close.svg'
import loader from './tail-spin.svg'

const sendMessage = sendMessageFor((`${window.location.origin}/cgi-worker.mjs`))

const pathStates = new Map()

export function EditorFolder({path = '/', name = ''}) {
    const [dirs, setDirs] = useState([])
    const [showContext, setShowContext] = useState(false)
    const [showNewFile, setShowNewFile] = useState(false)
    const [showNewFolder, setShowNewFolder] = useState(false)
    const [files, setFiles] = useState([])
    const [loading, setLoading] = useState(false)
    const box = useRef(null)


    const query = useMemo(() => new URLSearchParams(window.location.search), [])
    const startPath = query.has('path') ? query.get('path') : '/'

    const startOpened = pathStates.has(path)
        ? pathStates.get(path)
        : (path === startPath.substr(0, path.length))

    const [expanded, setExpanded] = useState(startOpened)

    const onContext = event => {
        event.preventDefault()
        setExpanded(true)
        setShowNewFolder(false)
        setShowNewFile(false)
        setShowContext(true)
    }

    const onBlur = event => setTimeout(() => setShowContext(false), 160)

    const newFileKeyUp = async event => {
        if (event.key === 'Enter') {
            if (event.target.value) {
                const newName = path + '/' + event.target.value
                sendMessage('writeFile', [newName, new TextEncoder().encode('')])
                loadFiles()
            }

            setShowNewFile(false)
            event.target.value = ''
        }

        if (event.key === 'Escape') {
            setShowNewFile(false)
            event.target.value = ''
        }
    }

    const newFolderKeyUp = async event => {
        if (event.key === 'Enter') {
            if (event.target.value) {
                const newName = path + '/' + event.target.value
                sendMessage('mkdir', [newName])
                loadFiles()
            }

            setShowNewFolder(false)
            event.target.value = ''
        }

        if (event.key === 'Escape') {
            setShowNewFolder(false)
            event.target.value = ''
        }
    }

    const loadFiles = () => {
        setLoading(true)
        sendMessage('readdir', [path]).then(async entries => {
            entries = entries.filter(f => f !== '.' && f !== '..')
            const types = await Promise.all(entries.map(async f =>
                (await sendMessage('analyzePath', [path + (path[path.length - 1] !== '/' ? '/' : '') + f]))
                    .object.isFolder
            ))

            const dirs = entries.filter((_, k) => types[k])
            const files = entries.filter((_, k) => !types[k])
            setDirs(dirs)
            setFiles(files)
            setLoading(false)
        })
    }

    useEffect(() => {
        if (startPath === path) {
            loadFiles()
            box.current.focus()
        }
    }, [])

    useEffect(() => {
        loadFiles()
    }, [])

    const toggleExpanded = event => {
        event.stopPropagation()
        setExpanded(!expanded)
        pathStates.set(path, !expanded)
    }

    return (
        <div className="text-sm truncate">
            <p className={'flex gap-2 cursor-pointer rounded hover:bg-blue-500'} onClick={toggleExpanded} onContextMenu={onContext} onBlur={onBlur} tabIndex="0"
               ref={box}>
                <img
                    className="h-6" src={
                    !loading
                        ? (expanded ? folderOpen : folderClose)
                        : loader
                } alt=""/>
                {name}
            </p>

            {showContext && <span className="contents only-focus">
				2<p className="context" onClick={() => setShowNewFile(true)}>
					<img className="file icon" src={fileIcon} alt=""/>
					Create New File...
				</p>
				<p className="context" onClick={() => setShowNewFolder(true)}>
					<img className="file icon" src={folderClose} alt=""/>
					Create New Folder...
				</p>
			</span>}
            {showNewFile && <p className="context">
                3<img className="file icon" src={fileIcon} alt=""/>
                <input placeholder="filename" onKeyUp={newFileKeyUp} autoFocus={true}/>
            </p>}
            {showNewFolder && <p className="context">
                4<img className="file icon" src={folderClose} alt=""/>
                <input placeholder="filename" onKeyUp={newFolderKeyUp} autoFocus={true}/>
            </p>}

            {expanded && dirs.map(dir =>
                <div className={'flex pl-2'} key={dir}>
                    <EditorFolder name={dir} path={path + (path[path.length - 1] !== '/' ? '/' : '') + dir}/>
                </div>
            )}
            {expanded && files.map(file =>
                <div className={'pl-8'} key={file}>
                    <EditorFile name={file} path={path + (path[path.length - 1] !== '/' ? '/' : '') + file}/>
                </div>
            )}
        </div>
    )
}
