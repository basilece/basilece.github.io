(function () {

	let _shadowRoot;

    let tmpl = document.createElement("template");
    tmpl.innerHTML = `
       <style>
      </style>
    `;

	class Geopicker extends HTMLElement {
		constructor() {
			super();
			
			_shadowRoot = this.attachShadow({ mode: "open"});
            _shadowRoot.appendChild(tmpl.content.cloneNode(true));

			this._props = {};

		}  // End of Geopicker constructor


	} //end of Geopicker Class






	customElements.define("basilece-geopicker", Geopicker);

})();

