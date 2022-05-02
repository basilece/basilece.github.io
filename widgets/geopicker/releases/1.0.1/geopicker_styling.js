(function () {
    let _shadowRoot;
    let tmpl = document.createElement("template");
    tmpl.innerHTML = `
	<form id="form">
		<fieldset>
			<legend>Colored Box Properties</legend>
				<table>
					<tr>
						<td>Color</td>
						<td>
						   <input id="styling_color" type="text" size="40" maxlength="40">
						</td>
				    </tr> 
				</table>
			<input type="submit" style="display:none;">
		</fieldset>
	</form>
	`;

    class GeopickerAps extends HTMLElement {
        constructor() {
            super();
            _shadowRoot = this.attachShadow({ mode: "open"});
            _shadowRoot.appendChild(tmpl.content.cloneNode(true));
            this._shadowRoot.getElementById("form").addEventListener("submit",
				this._submit.bind(this));
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