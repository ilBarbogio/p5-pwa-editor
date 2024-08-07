import { customEvents } from "../constants.js"

export class MainToolbar extends HTMLElement{
	// static observedAttributes=["code"]

	constructor(){
		super()

		const template=document.getElementById('tb-template')
    const templateContent=template.content

    this.attachShadow({ mode: 'open' }).appendChild(
      templateContent.cloneNode(true)
    )
		
		const style=document.createElement('style')
		style.textContent=`@import url("./styles/mainToolbar.css")`
		this.shadowRoot.append(style)

	}

	connectedCallback(){
		this.column=this.shadowRoot.querySelector(".column")
		
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