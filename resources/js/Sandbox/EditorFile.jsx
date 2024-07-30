import fileIcon from './nomo-dark/file.svg'
import filePhpIcon from './nomo-dark/file.php.svg'
import fileJsIcon from './nomo-dark/file.js.svg'
import fileTxtIcon from './nomo-dark/file.txt.svg'
import fileHtmlIcon from './nomo-dark/file.html.svg'
import fileMdIcon from './nomo-dark/file.markdown.svg'
import fileJsonIcon from './nomo-dark/file.json.svg'
import fileShIcon from './nomo-dark/file.sh.svg'
import fileCssIcon from './nomo-dark/file.css.svg'
import fileXmlIcon from './nomo-dark/file.xml.svg'
import fileYmlIcon from './nomo-dark/file.yaml.svg'
import fileZipIcon from './nomo-dark/file.zip.svg'

import renameIcon from './icons/rename-icon-16.png'
import deleteIcon from './icons/delete-icon-16.png'

import {useEffect, useMemo, useRef, useState} from 'react'
import {sendMessageFor} from 'php-cgi-wasm/msg-bus'

import { cn } from "@/lib/utils"

const sendMessage = sendMessageFor((`${window.location.origin}/cgi-worker.mjs`))

const icons = {
    php: filePhpIcon
    , module: filePhpIcon
    , inc: filePhpIcon
    , js: fileJsIcon
    , mjs: fileJsIcon
    , txt: fileTxtIcon
    , html: fileHtmlIcon
    , json: fileJsonIcon
    , md: fileMdIcon
    , sh: fileShIcon
    , css: fileCssIcon
    , xml: fileXmlIcon
    , yml: fileYmlIcon
    , yaml: fileYmlIcon
    , zip: fileZipIcon
}

let init = false

export default function EditorFile({path, name}) {
    const [showContext, setShowContext] = useState(false)
    const [showRename, setShowRename] = useState(false)
    const [deleted, setDeleted] = useState(false)
    const [_name, setName] = useState(name)
    const [_path, setPath] = useState(path)
    const [isSelected, setIsSelected] = useState(false)
    const box = useRef(null)

    const query = useMemo(() => new URLSearchParams(window.location.search), [])
    const startPath = query.has('path') ? query.get('path') : '/'

    const onContext = event => {
        event.preventDefault()
        if (!showRename) {
            setShowContext(true)
        }
    }

    const onBlur = event => setTimeout(() => setShowContext(false), 160)

    const openFile = () => {
        window.dispatchEvent(new CustomEvent('editor-open-file', {detail: _path}))

        setIsSelected(true)

        query.set('path', _path)

        window.history.replaceState({}, null, window.location.pathname + '?' + query)
    }

    const renameFile = () => {
        setShowRename(true)
    }

    const deleteFile = async () => {
        await sendMessage('unlink', [_path])
        setShowContext(false)
        setDeleted(true)
    }

    const renameKeyUp = async event => {
        if (event.key === 'Enter') {
            if (event.target.value) {
                const dirPath = _path.substr(0, _path.length - _name.length)
                const newPath = dirPath + event.target.value

                await sendMessage('rename', [_path, newPath])

                setName(event.target.value)
                setPath(newPath)
            }

            setShowRename(false)
        }

        if (event.key === 'Escape') {
            setShowRename(false)
        }
    }

    useEffect(() => {
        if (startPath === path && !init) {
            box.current.focus()
            openFile()
            init = true
        }
    }, [])

    const extension = _path.split('.').pop()

    return !deleted && (
        <div className="editor-entry editor-file">
            <p
                className={cn(
                    'flex gap-1 px-2 cursor-pointer rounded hover:bg-blue-500 whitespace-nowrap',
                    isSelected && 'bg-blue-500',
                )}
                onClick={openFile}
                tabIndex="0"
                onContextMenu={onContext}
                onBlur={onBlur}
                ref={box}
            >
                <img className="h-6" src={icons[extension] ?? fileIcon} alt=""/>
                <span>{_name}</span>
            </p>

            {showContext && <span className="contents only-focus">
				2<p className="context" onClick={() => renameFile(true)}>
					<img className="file icon" src={renameIcon} alt=""/>
					Rename
				</p>
				<p className="context" onClick={() => deleteFile(true)}>
					<img className="file icon" src={deleteIcon} alt=""/>
					Delete
				</p>
			</span>}

            {showRename && <p className="context">
                3<img className="file icon" src={fileIcon} alt=""/>
                <input placeholder="filename" onKeyUp={renameKeyUp} autoFocus={true} defaultValue={_name}/>
            </p>}
        </div>
    )
}
