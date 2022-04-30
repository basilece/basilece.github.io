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

            this._export_settings = {};
            this._export_settings.TextVal = "";
            this._export_settings.TextAdressLong = "";
            this._export_settings.TextAdressLat = "";
            this._export_settings.ExecuteValue = "";

            this.addEventListener("click", event => {
                console.log('click');

            });

			this._firstLoadLib = 0;
			this._firstConnection = 0;
		}  // End of Geopicker constructor

        onCustomWidgetAfterUpdate(changedProperties) {
            console.log(changedProperties);
            var that = this;

            if (that._firstLoadLib === 0) {
                that._firstLoadLib = 1;
                let googlemjs = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDPYtB1oVrAXkosfjU4qaUSU650_KXJWjQ&v=weekly";
                async function LoadLibs() {
                    try {
                        await loadScript( googlemjs , _shadowRoot);
                    } catch (e) {
                        alert(e);
                    } finally {
						loadthis(that, changedProperties, _shadowRoot);
                    }
                }
                LoadLibs();
            }
        }


	} //end of Geopicker Class



	customElements.define("basilece-geopicker", Geopicker);


	//Utilities
    function loadthis(that, changedProperties, shadowRoot ){
		//var that_ = that;

		var geocoder;
			geocoder = new google.maps.Geocoder();
		var address = "Chrisocheri 5, Marousi , 15126 , Athens";

		var Map;
		var latlng = new google.maps.LatLng(-34.397, 150.644);
		var mapOptions = {
			zoom: 17,
			center: latlng
		}

		let mapcanvas = document.createElement('div');
		mapcanvas.style.width = 600;
		mapcanvas.style.height = 300;
		mapcanvas.id = "divmap";
		shadowRoot.appendChild(mapcanvas);
		Map = new google.maps.Map(mapcanvas, mapOptions);
		
		geocoder.geocode({ 'address': address }, function (results, status) {
				if (status == 'OK') {
					map.setCenter(results[0].geometry.location);

					var marker = new google.maps.Marker({
						map: Map,
						position: results[0].geometry.location

					})

				} else {
					alert('Geocode was not successful for the following reason: ' + status);
				}
			});
		
	}




})();

