import { workerMessages, customEvents } from "./constants.js"
import { message } from "./utils.js"
import { currentState } from "./state.js"

const editor=document.querySelector("editor-panel")
const result=document.querySelector("result-panel")


window.addEventListener(customEvents.toggleFilePanel,()=>{
	document.body.classList.toggle("files-expanded")
})


//worker
currentState.fileWorker=new Worker("./scripts/workers/fs.js")


window.addEventListener(customEvents.projectsLoaded,(ev)=>{
	console.log(currentState.projects,ev.detail)
})

setTimeout(()=>{
	let ev=new CustomEvent(
		customEvents.structureLoaded,
		{detail:{
			type:"folder",name:"root",content:[
				{type:"folder",name:"fold1",content:[
					{type:"folder",name:"fold1-1",content:[
						{type:"file",name:"file3.js"},
						{type:"file",name:"file4.js"},
						{type:"file",name:"file5.js"},
					]},
					{type:"file",name:"file2.js"}	
				]},
				{type:"file",name:"file1.js"}
			]}
		}
	)
	window.dispatchEvent(ev)
},500)