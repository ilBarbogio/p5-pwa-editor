import { EditorView, basicSetup} from "codemirror"
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
		
		this.keys={
			ctrl:false
		}

		
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
			this.sendCode()
		})

		this.stopBtn.addEventListener("click",()=>{
			let event=new CustomEvent(customEvents.stopCode)
			window.dispatchEvent(event)
		})
		
		window.addEventListener("keydown",this.listenKeyDown)
		window.addEventListener("keyup",this.listenKeyUp)

		window.addEventListener(customEvents.saveCode,this.saveCode)
		window.addEventListener(customEvents.loadCode,this.loadCode)
	}

	sendCode(){
		if(this.editor && this.editor.state.doc.toString()){
			let event=new CustomEvent(customEvents.launchCode,{detail:this.editor.state.doc.text})
			window.dispatchEvent(event)
		}
	}

	listenKeyDown=(ev)=>{
		if(ev.code=="ControlRight") this.keys.ctrl=true
		else{
			if(ev.code=="Enter" && this.keys.ctrl){
				ev.preventDefault()
			}
		}
	}
	listenKeyUp=(ev)=>{
		if(ev.code=="ControlRight") this.keys.ctrl=false
		else{
			if(ev.code=="Enter" && this.keys.ctrl){
				ev.preventDefault()
				this.sendCode()
			}
		}
	}


	saveCode=()=>{
		if(this.editor) localStorage.setItem("code",this.editor.state.doc.toString())
	}
	loadCode=()=>{
		if(this.editor){
			let code=localStorage.getItem("code")
			console.log(code)
			if(code){
				this.code=code
				this.editor.dispatch({changes: {
					from: 0,
					to: this.editor.state.doc.length,
					insert: this.code
				}})
			}
		}
	}
}