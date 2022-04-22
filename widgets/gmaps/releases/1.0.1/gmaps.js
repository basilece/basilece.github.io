(function() {
	let template = document.createElement("template");
    template.innerHTML = `<link rel="stylesheet" type="text/css" href="https://basilece.github.io/widgets/gmaps/releases/1.0.1/theme.css"/>`;
	
	class Gmaps extends HTMLElement {
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
		                  }.bind(this)  })
		                  
               	    this.IT.placeAt(this);
				    <div class="IT"></div>
				

                  var ctor = sap.m.Button;
                		          this.BT = new ctor({
		                press: function () {
		                    this.firePress();
		                    this.dispatchEvent(new Event("onPress"));
		                  }.bind(this)  })
		             
               	    this.BT.placeAt(this);
               	    
               	    
               	    
               	    
            }
            
       		 firePress() {
	            var properties = { TextVal: this.IT.getValue() };            
	            this.dispatchEvent(new CustomEvent("propertiesChanged", {
	                detail: {
	                    properties: properties
	                }
	           }));
	           
	           this.getGeocoding(properties.TextVal);
	        }    
	        
	        
           
            set TextVal(value){
	             this.IT.setValue(value);
            }


			getGeocoding(addressText){
				let request = new XMLHttpRequest();
				       request.open("GET", "https://maps.googleapis.com/maps/api/geocode/json?address=" + addressText + "&key=AIzaSyDPYtB1oVrAXkosfjU4qaUSU650_KXJWjQ");
				       request.send();
				       request.onload = () => {
					         console.log(request);
					         if (request.status === 200){
        
					             }
					         else{console.log("something went wrong with API")};
					         
				          }	
						  if (request.status === 200){
						    var data = request.responseText;
							var jsonResponse = JSON.parse(data);
							
							
							console.log(jsonResponse);
                            


			   			}
					}
            
            
	



	}

	customElements.define("basilece-gmaps", Gmaps);
})();