import { customEvents, workerMessages } from "./constants.js"
import { message } from "./utils.js"

export class State{
  set fileWorker(v){
    this._fileWorker=v
    this._fileWorker.onmessage=(msg)=>{
      console.log(msg)
      this.onFsMessage(msg.data.name,msg.data.content)
    }
    this._fileWorker.postMessage(message(workerMessages.setup))
  }
  get fileWorker(){return this._fileWorker}

  projects=[]

  set folderStructure(v){this._folderStructure=v}
  get folderStructure(){return this._folderStructure}

  constructor(){}

  onFsMessage=(name,content)=>{
    switch(name){
      case workerMessages.setup:
        this.projects=content.filter(el=>el.kind=="directory").map(el=>el.name)
        let event=new CustomEvent(customEvents.projectsLoaded,{detail:this.projects})
        window.dispatchEvent(event)
        break
      default: break
    }
  }
}

export let currentState=new State()