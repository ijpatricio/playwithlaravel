// FileTree.js
import React from 'react';
import { FolderIcon, FileIcon } from 'lucide-react';

export function FileTree({ structure, onFileSelect, path = '' }) {
  return (
    <ul className="text-sm">
      {Object.entries(structure).map(([key, value]) => {
        const newPath = path ? `${path}/${key}` : key;
        const isFolder = typeof value === 'object';

        return (
          <li key={newPath}>
            <div
              className="flex items-center cursor-pointer py-1 hover:bg-gray-100"
              onClick={() => !isFolder && onFileSelect(newPath, value)}
            >
              {isFolder ? <FolderIcon className="w-4 h-4 mr-1" /> : <FileIcon className="w-4 h-4 mr-1" />}
              {key}
            </div>
            {isFolder && (
              <ul className="pl-4">
                <FileTree structure={value} onFileSelect={onFileSelect} path={newPath} />
              </ul>
            )}
          </li>
        );
      })}
    </ul>
  );
}
