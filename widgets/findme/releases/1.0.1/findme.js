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
			let shadowRoot = this.attachShadow({mode: "open"});
			shadowRoot.appendChild(template.content.cloneNode(true));
			this.addEventListener("click", event => {
				var event = new Event("onClick");
				this.dispatchEvent(event);
			});
			this._props = {};
			//			
	 
			  var ctor = sap.m.DatePicker;
			  this.IT = new ctor().addStyleClass("datePicker");
		      this.IT.placeAt(this);
			//
		}

		
		//Start new lines of code
		
		
		//End of lines of code



	}

	customElements.define("basilece-findme", Findme);
})();
