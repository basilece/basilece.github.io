(function() {

		let template = document.createElement("template");
		template.innerHTML =`<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDPYtB1oVrAXkosfjU4qaUSU650_KXJWjQ&callback=initMap&v=weekly" defer></script>
		  <link rel="stylesheet" type="text/css" href="https://basilece.github.io/widgets/gmaps/releases/1.0.2/theme.css"/>
		  <div id="divmap" style="width: 600px; height: 300px;"></div>`;
	    var wrap = document.createElement('div');
		var scr = document.createElement('script');
		scr.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDPYtB1oVrAXkosfjU4qaUSU650_KXJWjQ&callback=initMap&v=weekly';
		scr.type = 'text/javascript';
		wrap.appendChild(scr);
        document.body.appendChild(wrap);
		template.width = 600;
		template.height = 300;
	
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
	
	
				}
	

				 generateMap(callback){
					var map;
					var geocoder;
					var address = this.IT.getValue();
					 geocoder = new google.maps.Geocoder();
					  var latlng = new google.maps.LatLng(-34.397, 150.644);
					  var mapOptions = {
						zoom: 17,
						center: latlng
					  }
					  var mymap = document.getElementById('divmap'); 
					  map = new google.maps.Map(document.getElementById('divmap'), mapOptions);
					  this.append(divmap);
					  geocoder.geocode( { 'address': address}, function(results, status) {
						if (status == 'OK') {
						  map.setCenter(results[0].geometry.location);						  

						  var marker =  new google.maps.Marker({
							  map: map,
							  position: results[0].geometry.location
							  
						  })
                          
						  callback(results[0].geometry.location);
						 
						} else {
						  alert('Geocode was not successful for the following reason: ' + status);
						}
					  });

					  this.dispatchEvent(new Event("onChange"));
					  
					 
					 
				 }  
	 
				
				
					firePress() {
					var address = this.IT.getValue();
					 this.generateMap(function(longlat){
                         //alert(longlat);
						 var lonlat = longlat;
						 var properties = {  TextAdressLat:  longlat,
						                     TextAdressLong: longlat
		                       };
						Gmaps.dispatchEvent(new CustomEvent("propertiesChanged", {
								detail: {
									properties: properties
								}
						   }));
					 });




				}    
				
				
			   
				set TextVal(value){
					 this.IT.setValue(value);
				}
	
		}
	
		customElements.define("basilece-gmaps", Gmaps);
	})();