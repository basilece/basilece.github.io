(function() {
	let template = document.createElement("template");
	template.innerHTML = `
		<style>
		:host {
			border-radius: 25px;
			border-width: 4px;
			border-color: black;
			border-style: solid;
			display: block;
		}
		</style>
	`;

	class FindMe extends HTMLElement {
		constructor() {
			super();
			let shadowRoot = this.attachShadow({mode: "open"});
			shadowRoot.appendChild(template.content.cloneNode(true));
			this.addEventListener("click", event => {
				var event = new Event("onClick");
				this.dispatchEvent(event);
			});
			this._props = {};
		}
		 
		onCustomWidgetBeforeUpdate(changedProperties) {
			this._props = { ...this._props, ...changedProperties };
		}	
       
        set TextVal(){
	        return TextVal + " something more ";
       }

	}
	customElements.define("basilece-findme", FindMe);

});
