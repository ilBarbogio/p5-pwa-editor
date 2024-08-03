import { customEvents, paths } from "../constants.js"

export class ResultPanel extends HTMLElement{
	constructor(){
		super()

		const template=document.getElementById('rs-template')
    const templateContent=template.content

    this.attachShadow({ mode: 'open' }).appendChild(
      templateContent.cloneNode(true)
    )
		
		const style=document.createElement('style')
		style.textContent=`@import url("./styles/resultPanel.css")`
		this.shadowRoot.append(style)
	}

	connectedCallback(){
		this.iframe=this.shadowRoot.querySelector("iframe")
		this.emptyContent()

		window.addEventListener(customEvents.launchCode,(ev)=>{
			this.createContent(ev.detail)
		})

		window.addEventListener(customEvents.stopCode,(ev)=>{
			this.emptyContent()
		})
	}

	createContent(code){
		let injDoc=`
	    <html>
	    <head>
	      <script src=${paths.p5FromIframe}></script>
	    </head>
	    <body>
	      <script deferred>
	        ${code.join("\n")}
	      </script>
	    </body>
	    </html>
	  `
	  this.iframe.srcdoc=injDoc
	}

	emptyContent(){
		let injDoc=`
	    <html>
	    <head>
	      <script src="./node_modules/p5/lib/p5.min.js"></script>
	    </head>
	    <body>
				Waiting for code...
	    </body>
	    </html>
	  `
	  this.iframe.srcdoc=injDoc
	}
}