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
		
		 init() {
            if (this.children.length === 2) return; //constructor called during drag+drop
            if (!this.querySelector("link")) {
                this.appendChild(template.content.cloneNode(true));
               }
		          var ctor = sap.m.Input;
		          this.IT = new ctor({
		                change: function () {
		                    //this.firePress();
		                    //this.dispatchEvent(new Event("onSubmit"));
		                  }.bind(this)  })
		              
               	    this.IT.placeAt(this);

                  var ctor = sap.m.Button;
                		          this.BT = new ctor({
		                press: function () {
		                    this.firePress();
		                    this.dispatchEvent(new Event("onPress"));
		                  }.bind(this)  })
		            this.BT["text"] = "Validate";      
               	    this.BT.placeAt(this);
            }
            
       		 firePress() {
	            var properties = { TextVal: this.IT.getValue() };            
	            this.dispatchEvent(new CustomEvent("propertiesChanged", {
	                detail: {
	                    properties: properties
	                }
	           }));
	           
	           this.checkVAT(properties.TextVal);
	        }    
	        
	        
           
            set TextVal(value){
	             this.IT.setValue(value);
            }
            
            
               checkVAT(VAT){
				       let request = new XMLHttpRequest();
				       request.open("GET", "https://apilayer.net/api/validate?access_key=379d15d2ece6c0c42bb57a1ce55423eb&vat_number=" + VAT);
				       request.send();
				       request.onload = () => {
					         console.log(request);
					         if (request.status === 200){
						             console.log(JSON.parse(request.response));
						             
					             }
					         else{console.log("something went wrong with API")};
					         
				          }
				          return request.status.toString;
             }
		



	}

	customElements.define("basilece-findme", Findme);
})();