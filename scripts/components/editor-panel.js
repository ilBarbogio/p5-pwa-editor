import {EditorView, basicSetup} from "codemirror"
import {javascript} from "@codemirror/lang-javascript"
import { customEvents } from "../constants.js"

export class EditorPanel extends HTMLElement{
	static observedAttributes=["code"]

	constructor(){
		super()

		const template=document.getElementById('ep-template')
    const templateContent=template.content

    this.attachShadow({ mode: 'open' }).appendChild(
      templateContent.cloneNode(true)
    )
		
		const style=document.createElement('style')
		style.textContent=`@import url("./styles/editorPanel.css")`
		this.shadowRoot.append(style)

		this.code=this.getAttribute("code")??""
	}

	connectedCallback(){
		this.display=this.shadowRoot.querySelector(".display")
		this.setupButtons()

		this.editor=new EditorView({
		  extensions: [basicSetup, javascript()],
		  parent: this.display,
			doc:this.code
		})
	}

	attributeChangedCallback(name,oldValue,newValue){
		console.log(name,oldValue,newValue)
		switch(name){
			case "code":
				this.code=newValue
				if(this.editor) this.editor.state.update({changes: {from: 0, to: this.editor.state.doc.length, insert: this.code}})
				break
			default: break
		}
	}

	setupButtons(){
		this.launchBtn=this.shadowRoot.querySelector(".launch")
		this.stopBtn=this.shadowRoot.querySelector(".stop")
		
		this.launchBtn.addEventListener("click",()=>{
			if(this.editor && this.editor.state.doc.text){
				let event=new CustomEvent(customEvents.launchCode,{detail:this.editor.state.doc.text})
				window.dispatchEvent(event)
			}
		})

		this.stopBtn.addEventListener("click",()=>{
			let event=new CustomEvent(customEvents.stopCode)
			window.dispatchEvent(event)
		})
	}
}