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
		          this.DP = new ctor({
		                change: function () {
		                    this.fireSubmit();
		                    this.dispatchEvent(new Event("onSubmit"));
		                  }.bind(this)  })
		                  
               	    this.DP.placeAt(this);
            }
            
       		 fireSubmit() {
	            var properties = { TextVal: this.DP.getValue() };            
	            this.dispatchEvent(new CustomEvent("propertiesChanged", {
	                detail: {
	                    properties: properties
	                }
	           }));
	           
	           this.checkVAT(this.DP.getValue());
	        }    
           
            set TextVal(value){
	             this.DP.setValue(value);
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
		
		//Start new lines of code
//		 init() {
//            if (this.children.length === 2) return; //constructor called during drag+drop
//            if (!this.querySelector("link")) {
//                this.appendChild(template.content.cloneNode(true));
//            }
//            var ctor = sap.m.DatePicker;
//            if (this._enablerange) { ctor = sap.m.DateRangeSelection; }
//            this.DP = new ctor({
//                change: function () {
//                    this.fireChanged();
//                    this.dispatchEvent(new Event("onChange"));
//                }.bind(this)
//            }).addStyleClass("datePicker");
//            this.DP.placeAt(this);
//        }
//
//		 fireChanged() {
//            var properties = { dateVal: this.DP.getDateValue() };
//            if (this._enablerange) { properties.secondDateVal = this.DP.getSecondDateValue(); }
//            this.dispatchEvent(new CustomEvent("propertiesChanged", {
//                detail: {
//                    properties: properties
//                }
//            }));
//        }
//
//        set dateVal(value) {
//            if (value == undefined || !this.DP) return;
//            if (typeof (value) === "string") value = new Date(value);
//            this.DP.setDateValue(value);
//        }
        
		//End of lines of code



	}

	customElements.define("basilece-findme", Findme);
})();