(function() {

		let template = document.createElement("template");
		template.innerHTML =`
		  <link rel="stylesheet" type="text/css" href="https://basilece.github.io/widgets/gmaps/releases/1.0.2/theme.css"/>
		  <div id="divmap" style="width: 600px; height: 300px;"></div>
		  `;
	    var wrap = document.createElement('div');
		var scr = document.createElement('script');
		scr.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDPYtB1oVrAXkosfjU4qaUSU650_KXJWjQ&v=weekly';
		scr.type = 'text/javascript';
		wrap.appendChild(scr);
        document.body.appendChild(wrap);
		template.width = 600;
		template.height = 300;
        var properties = {  TextVal: "",
			                TextAdressLat:  "",
							TextAdressLong: ""
                    };
		class Gmaps extends HTMLElement {
			constructor() {
				super();
				this.init();
				//this.InitMap();
				this.addEventListener("DOMContentLoaded", InitMapF);
				this._props = {};
				
			}
	         

			 init() {
				if (this.children.length >= 3) return; //constructor called during drag+drop
				if (!this.querySelector("link")) {
					this.appendChild(template.content.cloneNode(true));
					var text = this.innerHTML;
					//console.log(["this is the document body", document.body.innerHTML]);

					
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




				   InitMap(){
						//Generate Init MAP
						var InitMap;
						var latlng = new google.maps.LatLng(-34.397, 150.644);
						var mapOptions = {
							 zoom: 17,
							 center: latlng
								}
					
						InitMap = new google.maps.Map(document.getElementById('divmap'), mapOptions);
						this.append(divmap);
				}

	

				 generateMap(address, callback){
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
					  geocoder.geocode( { 'address': address}, function(results, status) {
						if (status == 'OK') {
						  map.setCenter(results[0].geometry.location);						  

						  var marker =  new google.maps.Marker({
							  map: map,
							  position: results[0].geometry.location
							  
						  })
                          
						  var formatted_address = results[0].formatted_address;
						  var lat = results[0].geometry.location.lat();
                          var lng = results[0].geometry.location.lng();
                        callback({ Status: "OK", Latitude: lat, Longitude: lng ,formatted_address:formatted_address });
						 
						} else {
						  alert('Geocode was not successful for the following reason: ' + status);
						}
					  });

					  
		 
				 }  
	 
				
				
					firePress() {
					var address = this.IT.getValue();
					 this.generateMap(address,function(data){
                    
						 console.log(data);
						  return  properties = {  TextVal : data.formatted_address,
							                      TextAdressLat:  data.Latitude,
						                          TextAdressLong: data.Longitude
		                       };

					 });
                      
					 this.dispatchEvent(new CustomEvent("propertiesChanged", {
						detail: {
							properties: properties
						}
					}));


				   this.dispatchEvent(new Event("onChange"));


				}    
				
				
			   
				set TextVal(value){
					 this.IT.setValue(value);
				}
	
		}

		function InitMapF(){
				//Generate Init MAP
				var InitMap;
				var latlng = new google.maps.LatLng(-34.397, 150.644);
				var mapOptions = {
						 zoom: 17,
						center: latlng
						}
								
				InitMap = new google.maps.Map(document.getElementById('divmap'), mapOptions);
				Gmaps.append(divmap);
		}
		
		customElements.define("basilece-gmaps", Gmaps);
		
	})();

	