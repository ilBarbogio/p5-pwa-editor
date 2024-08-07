import { customEvents } from "../constants.js"

export class FilePanel extends HTMLElement{
	// static observedAttributes=["code"]

	constructor(){
		super()

		const template=document.getElementById('fs-template')
    const templateContent=template.content

    this.attachShadow({ mode: 'open' }).appendChild(
      templateContent.cloneNode(true)
    )
		
		const style=document.createElement('style')
		style.textContent=`@import url("./styles/filePanel.css")`
		this.shadowRoot.append(style)

	}

	connectedCallback(){
		this.toggle=this.shadowRoot.querySelector(".toggle")
		this.toggle.addEventListener("click",()=>{
			let event=new CustomEvent(customEvents.toggleFilePanel)
			window.dispatchEvent(event)
		})

		this.save=this.shadowRoot.querySelector(".save")
		this.save.addEventListener("click",()=>{
			let event=new CustomEvent(customEvents.saveCode)
			window.dispatchEvent(event)
		})

		this.load=this.shadowRoot.querySelector(".load")
		this.load.addEventListener("click",()=>{
			let event=new CustomEvent(customEvents.loadCode)
			window.dispatchEvent(event)
		})
		
	}

	// attributeChangedCallback(name,oldValue,newValue){
	// 	console.log(name,oldValue,newValue)
	// 	switch(name){
	// 		case "code":
	// 			this.code=newValue
	// 			if(this.editor) this.editor.state.update({changes: {from: 0, to: this.editor.state.doc.length, insert: this.code}})
	// 			break
	// 		default: break
	// 	}
	// }

}