(function() {

		let template = document.createElement("template");
		template.innerHTML =`<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDPYtB1oVrAXkosfjU4qaUSU650_KXJWjQ&callback=initMap&v=weekly" defer></script>
		  <link rel="stylesheet" type="text/css" href="https://basilece.github.io/widgets/gmaps/releases/1.0.2/theme.css"/>
		  <div id="divmap" style="width: 700px; height: 380px;"></div>`;
	    var wrap = document.createElement('div');
		var scr = document.createElement('script');
		scr.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDPYtB1oVrAXkosfjU4qaUSU650_KXJWjQ&callback=initMap&v=weekly';
		scr.type = 'text/javascript';
		wrap.appendChild(scr);
        document.body.appendChild(wrap);
	
		class Gmaps extends HTMLElement {
			constructor() {
				super();
				this.init();
				this._props = {};
				
			}
	
			 init() {
				if (this.children.length >= 3) return; //constructor called during drag+drop
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
	
	
				}
	

				 generateMap(address){
					var map;
					var geocoder;
					
					 geocoder = new google.maps.Geocoder();
					  var latlng = new google.maps.LatLng(-34.397, 150.644);
					  var mapOptions = {
						zoom: 17,
						center: latlng
					  }
					  var mymap = document.getElementById('divmap'); 
					  map = new google.maps.Map(document.getElementById('divmap'), mapOptions);
					  this.append(divmap);
					  var ecoords = new geocoder.geocode( { 'address': address}, function(results, status) {
						if (status == 'OK') {
						  map.setCenter(results[0].geometry.location);						  
						  var coords = [];
						  coords[0] = results[0].geometry.location.lat();
                          coords[1] = results[0].geometry.location.lng();
						  var marker =  new google.maps.Marker({
							  map: map,
							  position: results[0].geometry.location
							  
						  })

                          return coords;
						 
						} else {
						  alert('Geocode was not successful for the following reason: ' + status);
						}
					  });
	
					
					  this.dispatchEvent(new Event("onChange"));
					  return myCoords;
				 }  
	 
				
				
					firePress() {
					var address = this.IT.getValue();
					var coords = this.generateMap(address);
	                console.log(["This is the lat : ", this.generateMap.coords[0]]) ;
					console.log(["This is the long : ", this.generateMap.coords[1]]) ;
					var properties = {   TextVal: results[0].formatted_address,
						TextAdressLat:  this.generateMap.coords[0],
						TextAdressLong: this.generateMap.coords[1]
                        };
					this.dispatchEvent(new CustomEvent("propertiesChanged", {
						detail: {
							properties: properties
						}
				   }));
					//var properties = { TextVal: this.IT.getValue() };            
					
				   
				   //this.getGeocoding(properties.TextVal);
				}    
				
				
			   
				set TextVal(value){
					 this.IT.setValue(value);
				}
	
		}
	
		customElements.define("basilece-gmaps", Gmaps);
	})();