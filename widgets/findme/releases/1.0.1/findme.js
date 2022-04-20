(function() {
	let template = document.createElement("template");
	template.innerHTML = `
		<style>
		:host {
			border-radius: 1px;
			border-width: 1px;
			border-color: gray;
			border-style: solid;
			display: block;
		}
		</style>
	`;

	class Findme extends HTMLElement {
		constructor() {
			super();
			this.init();
			let shadowRoot = this.attachShadow({mode: "open"});
			shadowRoot.appendChild(template.content.cloneNode(true));
			this.addEventListener("click", event => {
				var event = new Event("onClick");
				this.dispatchEvent(event);
			});
			this._props = {};
			//			
		 
			
			//
		}
		
		init(skipChildrenCheck){
			if (skipChildrenCheck !== true && this.children.length === 2) return; //constructor called during drag+drop
            if (!this.querySelector("link")) {
                this.appendChild(tmpl.content.cloneNode(true));
            }
            
			  var ctor = sap.m.Input();
			  this.IT = new ctor().addStyleClass("w3-input");
		}
		
		//Start new lines of code
		
		
		//End of lines of code



	}

	customElements.define("basilece-findme", Findme);
})();
