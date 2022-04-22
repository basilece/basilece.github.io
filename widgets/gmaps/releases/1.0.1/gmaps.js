(function() {
	let template = document.createElement("template");
    template.innerHTML = 
	`<script
	      src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDPYtB1oVrAXkosfjU4qaUSU650_KXJWjQ&callback=initMap&v=weekly"defer>
	</script>
	
	<link rel="stylesheet" type="text/css" href="https://basilece.github.io/widgets/gmaps/releases/1.0.1/theme.css"/>
	<body>
	   <div id="IT"> </div>
	   <div id="BT"> </div>
	   <div id="map" style="width: 320px; height: 480px;"></div>
	</body>`;

	
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
			    
		        //Create the Input (for Address)  
		          var ctor = sap.m.Input;
		          this.IT = new ctor({
					    width : "500px" ,
		                change: function () {
		                  }.bind(this) 
						 })
		                  
               	    this.IT.placeAt(this);
				    
				//Create the User Button for Search

                  var ctor = sap.m.Button;
                		          this.BT = new ctor({
						width : "100px",
						text  : "Search",
						type : sap.m.ButtonType.Emphasized,
		                press: function () {
		                    this.firePress();
		                    this.dispatchEvent(new Event("onPress"));
		                  }.bind(this)  }
						 
						  )
		             
               	    this.BT.placeAt(this);
					   
               	// Create the MAP 
				   
				   var geocoder;
				   var map;
				   function initialize() {
					 geocoder = new google.maps.Geocoder();
					 var latlng = new google.maps.LatLng(-34.397, 150.644);
					 var mapOptions = {
					   zoom: 8,
					   center: latlng
					 }
					 map = new google.maps.Map(document.getElementById('map'), mapOptions);
				   }
               	    
               	    
               	    
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
							
							var properties = { TextVal: jsonResponse.results[0].formatted_address,
							                   TextAdressLat: jsonResponse.results[0].geometry.location.lng,
										       TextAdressLong: jsonResponse.results[0].geometry.location.lat
											}; 

											this.dispatchEvent(new CustomEvent("propertiesChanged", {
												detail: {
													properties: properties
												}
										   }))

							this.dispatchEvent(new Event("onChange"));

							console.log(jsonResponse);
                            


			   			}
					}
            
            
	



	}

	customElements.define("basilece-gmaps", Gmaps);
})();