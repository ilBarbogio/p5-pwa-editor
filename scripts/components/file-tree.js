import { customEvents } from "../constants.js"

export class FileTree extends HTMLElement{
	// static observedAttributes=["code"]

	constructor(){
		super()

		const template=document.getElementById('tr-template')
    const templateContent=template.content

    this.attachShadow({ mode: 'open' }).appendChild(
      templateContent.cloneNode(true)
    )

		this.toolbar=this.shadowRoot.querySelector(".toolbar")
		this.container=this.shadowRoot.querySelector(".container")
		
		const style=document.createElement('style')
		style.textContent=`@import url("./styles/fileTree.css")`
		this.shadowRoot.append(style)

		window.addEventListener(customEvents.structureLoaded,(ev)=>{this.buildStructure(ev.detail)})
		this.container.addEventListener("click",(ev)=>{this.manageClicks(ev)})
	}

	buildStructure=(structure)=>{
		this.structure=structure

		this.tree=this.readFolder(structure)

		this.container.innerHTML=""
		this.container.append(this.tree)
	}

	readFolder=(folder)=>{
		let dir=document.createElement("div")

		if(folder.name!="root"){
			dir.className="folder"
			let label=document.createElement("div")
			label.className="label"
			label.setAttribute("data-name",folder.name)
			label.innerHTML=folder.name
			dir.append(label)
		}else{
			dir.className="root"}

		for(let el of folder.content){
			if(el.type=="file"){
				let f=document.createElement("div")
				f.className="file"
				f.setAttribute("data-name",el.name)
				f.innerHTML=el.name
				dir.append(f)
			}else if(el.type=="folder"){
				dir.append(this.readFolder(el))
			}
		}
		return dir
	}


	manageClicks=(ev)=>{
		if(ev.target.classList.contains("label")){
			ev.target.parentElement.classList.toggle("closed")
		}else if(ev.target.classList.contains("file")){
			console.log(ev.target.dataset.name)
		}
	}






	connectedCallback(){
		// this.toggle=this.shadowRoot.querySelector(".toggle")
		// this.toggle.addEventListener("click",()=>{
		// 	let event=new CustomEvent(customEvents.toggleFilePanel)
		// 	window.dispatchEvent(event)
		// })

		
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