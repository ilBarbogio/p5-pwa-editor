export const paths={
	p5FromIframe:"./node_modules/p5/lib/p5.min.js"
}

export const customEvents={
	projectsLoaded:"projectsLoaded",
	structureLoaded:"structureLoaded",
	launchCode:"launch-code",
	stopCode:"stop-code",
	toggleFilePanel:"toggle-files",
	saveCode:"save-code",
	loadCode:"load-code",
}

export const workerMessages={
	setup:"fs-setup",
	createProject:"fs-create-project",
	openProject:"fs-open-project",
	
	getDirContents:"fs-get-dir-contents",
	createDirectory:"create-directory",
	createFile:"create-file",
	saveCode:"save-code",
	loadCode:"load-code",
}

export const codeSnippets={
	startingP5:`function setup(){
		createCanvas(200,200)
		background(120)
	}
		
	function draw(){
		
	}`
}

export const starterProject=[
	{
		name:"sketch.js",
		kind:"file",
		content:codeSnippets.startingP5
	}
]