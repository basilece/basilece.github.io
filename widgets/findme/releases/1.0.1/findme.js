(function() {
	let template = document.createElement("template");
    template.innerHTML = `<link rel="stylesheet" type="text/css" href="https://basilece.github.io/widgets/findme/releases/1.0.1/theme.css"/>`;
	class Findme extends HTMLElement {
		constructor() {
			super();
			this.init();
			this._props = {};
			//			

			//
		}

		
		//Start new lines of code
		 init() {
            if (this.children.length === 2) return; //constructor called during drag+drop
            if (!this.querySelector("link")) {
                this.appendChild(template.content.cloneNode(true));
            }
               var ctor = sap.m.Input();
               this.IT = new ctor().addStyleClass("w3-input");
        }



        set TextVal(value) {
            if (value == undefined || !this.IT) return;
            if (typeof (value) === "string") value = new String(value);
            this.IT.setValue(value);
        }
        

		//End of lines of code



	}

	customElements.define("basilece-findme", Findme);
})();
