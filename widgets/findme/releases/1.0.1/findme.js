(function() {
	let template = document.createElement("template");
	template.innerHTML = `
		<style>
		:host {
			border-radius: 25px;
			border-width: 4px;
			border-color: white;
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
			console.log(`${this._props["TextVal"]}`);
		}	
       
        set TextVal(){
	        return TextVal + " something more ";
	        console.log(["I was there : ",TextVal]);
	        
       }
       
        
       checkVAT(){
	       let request = new XMLHttpRequest();
	       request.open("GET", "http://apilayer.net/api/validate?access_key=6ede50e416101cbf766e3744ee6eda6d&vat_number=LU26375245");
	       request.send();
	       request.onload = () => {
		         console.log(request);
		         if (request.status === 200){
			             console.log(JSON.parse(request.response));
		             }
		         else{console.log("something went wrong with API")};
	          }
	       
       }
       
       
       
	
       }

	}
	customElements.define("basilece-findme", FindMe);

});
