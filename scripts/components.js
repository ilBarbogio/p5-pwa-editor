import { MainToolbar } from "./components/main-toolbar.js"
import { FilePanel } from "./components/file-panel.js"
import { EditorPanel } from "./components/editor-panel.js"
import { ResultPanel } from "./components/result-panel.js"
import { FileTree } from "./components/file-tree.js"

customElements.define("main-toolbar",MainToolbar)
customElements.define("file-panel",FilePanel)
customElements.define("file-tree",FileTree)
customElements.define("editor-panel",EditorPanel)
customElements.define("result-panel",ResultPanel)