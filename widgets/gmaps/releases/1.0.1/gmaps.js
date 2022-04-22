(function() {

	let template = document.createElement("template");

    template.innerHTML =`
	      <link rel="stylesheet" type="text/css" href="https://widgets.nkappler.de/datepicker/releases/2.4.0/light.css"/>
	      <script src="https://polyfill.io/v3/polyfill.min.js?features=default"></script>
	      <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg&callback=initMap&v=weekly"></script>
		  <div id="map">style="width: 320px; height: 480px;"></div>
	 `;

	
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
             
			    
		        //Creat e the Input (for Address)  
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
				 

            }

		
             generateMap(){
				var geocoder;
				var map;
				 var state = document.readyState;
				 geocoder = new google.maps.Geocoder();
				  var latlng = new google.maps.LatLng(-122.084, 37.422);
				  var mapOptions = {
					zoom: 8,
					center: latlng
				  }
				  var mymap = document.getElementById('map');
				  map = new google.maps.Map(document.getElementById('map'), mapOptions);
			 }  

					 
			
            
       		 firePress() {
			    this.generateMap();
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