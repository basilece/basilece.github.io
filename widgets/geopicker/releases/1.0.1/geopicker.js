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

	class Geopicker extends HTMLElement {
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
                let googlemjs = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDPYtB1oVrAXkosfjU4qaUSU650_KXJWjQ&v=weekly";
                async function LoadLibs() {
                    try {
                        await loadScript( googlemjs , _shadowRoot);
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
  

		var latlng = new google.maps.LatLng(-34.397, 150.644);
		var mapOptions = {
			zoom: 17,
			center: latlng
		}

		let mapcanvas = that.shadowRoot.getElementById("mapcanvas");
		map = new google.maps.Map(mapcanvas, mapOptions);

	
	}

	function mapMarker(that){
		var geocoder;
			geocoder =  new google.maps.Geocoder();
			geocoder.geocode({ 'address': that._export_settings.TextVal }, function (results, status) {
				if (status == 'OK') {
					map.setCenter(results[0].geometry.location);
					deleteMarkers();
					var marker = new google.maps.Marker({
						map: map,
						position: results[0].geometry.location

					})


				} else {
					alert('Geocode was not successful for the following reason: ' + status);
				}
			});
	}

	// Removes the markers from the map, but keeps them in the array.
	function clearMarkers() {
		setMapOnAll(null);
	}

	// Deletes all markers in the array by removing references to them.
	function deleteMarkers() {
		clearMarkers();
		markers = [];
	  }

	// Sets the map on all markers in the array.
	function setMapOnAll(map) {
		for (var i = 0; i < markers.length; i++) {
		  markers[i].setMap(map);
		}
	  }

})();

