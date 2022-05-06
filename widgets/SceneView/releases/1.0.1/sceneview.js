(function () {

	let _shadowRoot;
    let tmpl = document.createElement("template");
    tmpl.innerHTML = `
       <style>
      </style>
	  <div id="mapcanvas" style="width: 600px; height: 300px;"></div>`;


    function loadScript(src, shadowRoot) {
        return new Promise(function(resolve, reject) {
            let script = document.createElement('script');
            script.src = src;
            script.onload = () => {
                console.log("Load: " + src);
                resolve(script);
            }
            script.onerror = () => reject(new Error(`Script load error for ${src}`));
            shadowRoot.appendChild(script)
        });
    }

	class SceneView extends HTMLElement {
		constructor() {
			super();
			
			_shadowRoot = this.attachShadow({ mode: "open"});
            _shadowRoot.appendChild(tmpl.content.cloneNode(true));

			var map;

            this._export_settings = {};
            this._export_settings.TextVal = "";
            this._export_settings.TextAdressLong = "";
            this._export_settings.TextAdressLat = "";
            this._export_settings.ExecuteValue = false;
			this._export_settings.Street = "";
			this._export_settings.StreetNo = "";
			this._export_settings.PostalCode = "";
			this._export_settings.Country = "";
			this._export_settings.City = "";
			this._export_settings.mapWidth = 600;
			this._export_settings.mapHeight = 400;

            this.addEventListener("click", event => {
                console.log('click');

            });

			this._firstLoadLib = 0;
			this._firstConnection = 0;
			
		}  // End of Geopicker constructor

        onCustomWidgetAfterUpdate(changedProperties) {
            console.log(changedProperties);
            var that = this;

            if ( that._firstLoadLib === 0) {
				 that._firstLoadLib = 1;

				 let arcgisjs = `https://js.arcgis.com/4.23/`;
				 async function LoadLibs() {
					 try {
						 await loadScript( arcgisjs , _shadowRoot);
					 } catch (e) {
						 alert(e);
					 } finally {
						 loadthis( that, changedProperties);
						 console.log(["that: ",that]);
					 }
				 }
				 LoadLibs(); 

				console.log(["this: ",this]); 
            }


			if (that._export_settings.ExecuteValue  === true) {
                that._export_settings.ExecuteValue = false; 

				that.dispatchEvent(new CustomEvent("propertiesChanged", {
					detail: {
						properties: {
							ExecuteValue : that._export_settings.ExecuteValue
						}
					}
				}));
				mapMarker(that);
				
			}

			//Map Size
			let mapCanvas = that.shadowRoot.getElementById("mapcanvas");
			mapCanvas.width = that._export_settings.mapWidth;
			mapCanvas.height = that._export_settings.mapHeight;
        }

		//GETTERS AND SETTERS
		get TextVal() {
            return this._export_settings.TextVal;
        }
		set TextVal(value) {
            this._export_settings.TextVal = value;
        }

		get TextAdressLat() {
            return this._export_settings.TextAdressLat;
        }

		get TextAdressLong() {
            return this._export_settings.TextAdressLong;
        }

		set ExecuteValue(value){
			this._export_settings.ExecuteValue = value;
		}

		get Street() {
            return this._export_settings.Street;
        }

		get StreetNo() {
            return this._export_settings.StreetNo;
        }

		get PostalCode() {
            return this._export_settings.PostalCode;
        }

		get Country() {
            return this._export_settings.Country;
        }

		get City() {
            return this._export_settings.City;
        }

		get mapWidth() {
            return this._export_settings.mapWidth;
        }
		set mapWidth(value) {
            this._export_settings.mapWidth = value;
        }

		get mapHeight() {
            return this._export_settings.mapHeight;
        }
		set mapHeight(value) {
            this._export_settings.mapHeight = value;
        }



        static get observedAttributes() {
            return [
                "TextVal",
                "TextAdressLat",
                "TextAdressLong"

            ];
        }

	} //end of Geopicker Class



	customElements.define("basilece-geopicker", Geopicker);


	//Utilities
    function loadthis( that, changedProperties){
  

		require(["esri/config","esri/Map", "esri/views/MapView"], function (esriConfig,Map, MapView) {

			esriConfig.apiKey = "AAPKa1a6981de3f5428caa4a30d6a896d398_0KdplPfGlzZeiNoUl7z5_6kPnpU1L3z7yaGw2w5Kq4gU4rRpJRWJMqDw7LY0Q9C";
	
			const map = new Map({
			  basemap: "arcgis-topographic" // Basemap layer service
			});
	
		  });

		  const view = new MapView({
			map: map,
			center: [-118.805, 34.027], // Longitude, latitude
			zoom: 13, // Zoom level
			container: "mapcanvas" // Div element
		  })

	
	}

	let markers = [];
	function mapMarker(that){
		deleteMarkers();
		var geocoder;
			geocoder =  new google.maps.Geocoder();
			geocoder.geocode({ 'address': that._export_settings.TextVal }, function (results, status) {
				if (status == 'OK') {
					map.setCenter(results[0].geometry.location);

					

					var  marker = new google.maps.Marker({
						 map: map,
						 position: results[0].geometry.location,
						 draggable:true,
						 animation: google.maps.Animation.DROP
					})

					returnProperties(that,results[0]);

					markers.push(marker);
					
					google.maps.event.addListener(marker, 'dragend', function() 
					{
						geocodePosition(marker.getPosition(), that);
					});


				} else {
					alert('Geocode was not successful for the following reason: ' + status);
				}
			});

	} 

    
	// Sets the map on all markers in the array.
	function setMapOnAll(map) {
		for (let i = 0; i < markers.length; i++) {
		markers[i].setMap(map);
		}
	}
	
	// Removes the markers from the map, but keeps them in the array.
	function hideMarkers() {
		setMapOnAll(null);
	}
	
	// Shows any markers currently in the array.
	function showMarkers() {
		setMapOnAll(map);
	}
	
	// Deletes all markers in the array by removing references to them.
	function deleteMarkers() {
		hideMarkers();
		markers = [];
	}

	function geocodePosition(pos,that) 
	{
	   geocoder = new google.maps.Geocoder();
	   geocoder.geocode
		({
			latLng: pos
		}, 
			function(results, status) 
			{
				if (status == google.maps.GeocoderStatus.OK) 
				{

					returnProperties(that,results[0]);
				} 
				else 
				{
					alert('Geocode was not successful for the following reason: ' + status);
				}
			}
		);
	}


	function returnProperties(that, results){
		console.log(["return result[0]: ", results]);
		that._export_settings.TextVal = results.formatted_address;
		that._export_settings.TextAdressLong = results.geometry.location.lng();
		that._export_settings.TextAdressLat = results.geometry.location.lat();
        

		for (var i = 0; i < results.address_components.length; i++) {
			for (var j = 0; j < results.address_components[i].types.length; j++) {
			  if (results.address_components[i].types[j] == "street_number") {
				that._export_settings.StreetNo = results.address_components[i].long_name;
			  }
			  if (results.address_components[i].types[j] == "route") {
				that._export_settings.Street = results.address_components[i].long_name;
			  }
			  if (results.address_components[i].types[j] == "postal_code") {
				that._export_settings.PostalCode = results.address_components[i].long_name;
			  }
			  if (results.address_components[i].types[j] == "locality") {
				that._export_settings.City = results.address_components[i].long_name;
			  }
			  if (results.address_components[i].types[j] == "country") {
				that._export_settings.Country = results.address_components[i].long_name;
			  }
			}
		  }

		that.dispatchEvent(new CustomEvent("propertiesChanged", {
			detail: {
				properties: {
					TextVal 		: that._export_settings.TextVal,
					TextAdressLong 	: that._export_settings.TextAdressLong,
					TextAdressLat 	: that._export_settings.TextAdressLat,
					Street 			: that._export_settings.Street,
					StreetNo		: that._export_settings.StreetNo,
					PostalCode		: that._export_settings.PostalCode,
					Country 		: that._export_settings.Country,	
					City 			: that._export_settings.City 
				}
			}
		}));
		that.dispatchEvent(new Event("onChange"));

	}


})();

