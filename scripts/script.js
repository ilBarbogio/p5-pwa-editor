import {EditorView, basicSetup} from "codemirror"
import {javascript} from "@codemirror/lang-javascript"

let editor = new EditorView({
  extensions: [basicSetup, javascript()],
  parent: document.getElementById("editor-wrapper")
})

document.getElementById("run-button").addEventListener("click",()=>{

  let injDoc=`
    <html>
    <head>
      <script src="./node_modules/p5/lib/p5.min.js"></script>
    </head>
    <body>
      <script deferred>
        ${editor.state.doc.text.join("\n")}
      </script>
    </body>
    </html>
  `

  document.getElementById("result-iframe").srcdoc=injDoc
})
