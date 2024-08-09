let opfsRoot

onmessage=(msg)=>{
  switch(msg.data.name){
    case "fs-setup":
      setup()
      break
    case "fs-create-project":
      createProject(msg.data.name,msg.data.content)
      break

    case "fs-open-project":
      openProject(msg.data.content)
      break
    case "fs-get-dir-contents":
      getContents()
      break
    // case workerMessages.createDirectory:
    //   break
    default: break
  }
}


async function setup(){
  opfsRoot=await navigator.storage.getDirectory()
  let projects=[]
  for await(let f of opfsRoot.values()){
    projects.push(f)
  }
  postMessage({name:"fs-setup",content:projects})
}


const createProject=async (name,content)=>{
  let dir=await opfsRoot.getDirectoryHandle(name,{create:true})

  postMessage({name:"fs-create-project",content:true})
}




const connectMain=async ()=>{
  fsRootDir=await navigator.storage.getDirectory()
  if(fsRootDir) return {result:true}
  else return {result:false}
}
// const connectRecordFile=async ()=>{
//   fsRecordFile=await fsRootDir.getFileHandle(recordFilename(state.user,state.year),{create:true})
//   if(fsRecordFile) return {result:true}
//   else return {result:false}
// }

const createRecordFile=async(user,year,data,options={legacyFile:false,openAfter:false})=>{
  try{
    if(!fsRootDir) fsRootDir=await navigator.storage.getDirectory()
    const filename=recordFilename(user,year)
    const opfsFile=await fsRootDir.getFileHandle(filename,{create:true})
    let dataString="{\n"
    //header
    dataString+=`\t"version":${options.version??1},\n`
    dataString+=`\t"user":"${user}",\n`
    dataString+=`\t"year":${year},\n`
    //goals
    dataString+=`\t"goals":[\n`
    if(!options?.legacyFile){
      //BUILD GOALS
    }
    dataString+=`\t],\n`
    //records
    dataString+=`\t"records":[\n`
    let maxId=0
    for(let [i,d] of data.records.entries()){
      if(d.id>maxId) maxId=d.id
      dataString+=`\t\t${JSON.stringify(formatRecordEntry(d))}${i<data.records.length-1?",":""}\n`
    }
    dataString+=`\t]\n`
    // state.maxId=maxId
    
    dataString+=`}`
    
    const writeStream=await opfsFile.createWritable()
    await writeStream.write(dataString)
    await writeStream.close()
    if(options.openAfter) await readRecordFile(filename)
    return {result:true}
  }catch(err){
    return {result:false,message:err}
  }
}

const readRecordFile=async(filename=state.filename)=>{
  try{
    if(!fsRootDir) fsRootDir=await navigator.storage.getDirectory()
    if(!fsCurrentFile) fsCurrentFile=await fsRootDir.getFileHandle(filename)
    let blob=await fsCurrentFile.getFile()
    let data=await blob.text()
    data=JSON.parse(data)

    let split=filename.split(".")
    let [user,year]=split[0].split("__")
    state.user=user
    state.year=year
    state.currentFile=filename
    localStorage.setItem(LS_KEY_CURRENT_FILE,filename)

    let maxId=0
    for(let d of data.records) if(d.id>maxId) maxId=d.id
    state.maxId=maxId

    state.records=data.records
    return {result:true}
  }catch(err){
    return {result:false,message:err}
  }
}

const writeRecordFile=async(filename=state.currentFile)=>{
  try{
    if(!fsRootDir) fsRootDir=await navigator.storage.getDirectory()
    if(!fsCurrentFile) fsCurrentFile=await fsRootDir.getFileHandle(filename)
    // let dataString=""
    // for(let d of state.data){
    //   dataString+=JSON.stringify(d)+"\n"
    // }
    console.log(fsCurrentFile)
    console.log(state)
    const dataString=stringifyState()
    console.log(dataString)
    const writeStream=await fsCurrentFile.createWritable()
    await writeStream.write(dataString)
    await writeStream.close()
    return {result:true}
  }catch(err){
    return {result:false,message:err}
  }
}

const removeRecordFile=async(filename)=>{
  try{
    if(!filename) throw(new Error("Filename is required"))
    if(!fsRootDir) fsRootDir=await navigator.storage.getDirectory()
    let file=await fsRootDir.getFileHandle(filename)
    await file.remove()
    // localStorage.removeItem(LS_KEY_CURRENT_FILE)
    // fsCurrentFile=undefined
    // resetState()
    return {result:true}
  }catch(err){
    return {result:false,message:err}
  }
}