(function () {

	let _shadowRoot;
    let tmpl = document.createElement("template");
    tmpl.innerHTML = `
       <style>
      </style>
	  <div id="mapcanvas" style="width: 600px; height: 300px;"></div>`;

	class Geopicker extends HTMLElement {
		constructor() {
			super();
			
			_shadowRoot = this.attachShadow({ mode: "open"});
            _shadowRoot.appendChild(tmpl.content.cloneNode(true));

			this._firstLoadLib = 0;
			this._firstConnection = 0;
		}  // End of Geopicker constructor

        onCustomWidgetAfterUpdate(changedProperties) {
            console.log(changedProperties);
            var that = this;

            if (this._firstLoadLib === 0) {
                this._firstLoadLib = 1;
                let googlemjs = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDPYtB1oVrAXkosfjU4qaUSU650_KXJWjQ&v=weekly";
                async function LoadLibs() {
                    try {
                        await loadScript( googlemjs , _shadowRoot);
                    } catch (e) {
                        alert(e);
                    } finally {
						loadthis(that, changedProperties);
                    }
                }
                LoadLibs();
            }
        }


	} //end of Geopicker Class



	customElements.define("basilece-geopicker", Geopicker);


	//Unilities
    function loadthis(that, changedProperties){
		var that_ = that;
		var Map;
		var latlng = new google.maps.LatLng(-34.397, 150.644);
		var mapOptions = {
			zoom: 17,
			center: latlng
		}

		let div0 = document.createElement('div');
		div0.id = 'divmap';
		Map = new google.maps.Map(document.getElementById('divmap'), mapOptions);
		that_.appendChild(div0);
		
	}


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

})();

