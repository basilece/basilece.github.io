(function () {
    let _shadowRoot;
    let tmpl = document.createElement("template");
    tmpl.innerHTML = `
	<form id="form">
		<fieldset>
			<legend>Google Map Properties</legend>
				<table>
					<tr>
						<td>Width</td>
						<td>
						   <input id="map_width" type="text" size="40" maxlength="40">
						</td>
				    </tr> 
                    <tr>
                    <td>Height</td>
                    <td>
                       <input id="map_height" type="text" size="40" maxlength="40">
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
            _shadowRoot.getElementById("form").addEventListener("submit",
				this._submit.bind(this));
        }

		_submit(e) {
			e.preventDefault();
			this.dispatchEvent(new CustomEvent("propertiesChanged", {
				detail: {
					properties: {
						mapWidth : 600,
                        mapHeight : 400
					}
				}
			}));
		}

    }



    customElements.define('basilece-geopicker-aps', GeopickerAps);
})();