console.log('Hello from sandbox-show.js')

const files = [
    { name: 'index.html', content: '<!DOCTYPE html>\n<html>\n<body>\n\t<h1>Hello, World!</h1>\n</body>\n</html>' },
    { name: 'styles.css', content: 'body {\n\tbackground-color: #f0f0f0;\n}' },
    { name: 'script.js', content: 'console.log("Hello, World!");' }
];

// Populate file tree
const fileTree = document.getElementById('fileTree');
files.forEach(file => {
    const li = document.createElement('li');
    li.textContent = file.name;
    li.className = 'cursor-pointer hover:text-blue-500';
    li.onclick = () => loadFile(file);
    fileTree.appendChild(li);
});

// Initialize Monaco Editor
require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.30.1/min/vs' }});
require(['vs/editor/editor.main'], function() {
    window.editor = monaco.editor.create(document.getElementById('editor'), {
        value: '// Select a file from the tree to start editing',
        language: 'javascript',
        theme: 'vs-dark'
    });
});

// Load file content into editor
function loadFile(file) {
    const fileExtension = file.name.split('.').pop();
    const language = fileExtension === 'html' ? 'html' :
        fileExtension === 'css' ? 'css' : 'javascript';

    window.editor.setValue(file.content);
    monaco.editor.setModelLanguage(window.editor.getModel(), language);
}
