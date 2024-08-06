import { codeSnippets, customEvents } from "./constants.js"

const editor=document.querySelector("editor-panel")
const result=document.querySelector("result-panel")


window.addEventListener(customEvents.toggleFilePanel,()=>{
	document.body.classList.toggle("files-expanded")
})