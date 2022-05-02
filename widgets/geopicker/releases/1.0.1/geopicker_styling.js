(function () {
    let _shadowRoot;
    let tmpl = document.createElement("template");
    tmpl.innerHTML = ``;

    class GeopickerAps extends HTMLElement {
        constructor() {
            super();
            _shadowRoot = this.attachShadow({ mode: "open"});
            _shadowRoot.appendChild(tmpl.content.cloneNode(true));
            this._shadowRoot.getElementById("mapcanvas").addEventListener("submit", this._submit.bind(this));
        }

        _submit(e) {
			e.preventDefault();
			this.dispatchEvent(new CustomEvent("propertiesChanged", {
					detail: {
						properties: {
							
						}
					}
			}));
		}

    }



    customElements.define('basilece-geopicker-aps', GeopickerAps);
})();