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

		init(skipChildrenCheck) {
				if (skipChildrenCheck !== true && this.children.length === 2) return; //constructor called during drag+drop
				if (!this.querySelector("link")) {
						this.appendChild(tmpl.content.cloneNode(true));
				}
          var simple_text = new string;

		}
  set TextVal(value) {
		return "this is the text value";
	}



	}

	customElements.define("basilece-findme", FindMe);
})();
