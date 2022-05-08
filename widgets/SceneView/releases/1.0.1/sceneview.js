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



	customElements.define("basilece-sceneview", SceneView);


	//Utilities
    function loadthis( that, changedProperties){
  
        
		
        

		  let mapcanvas = that.shadowRoot.getElementById("mapcanvas");
		  const view = new MapView({
			map: Map,
			center: [-118.805, 34.027], // Longitude, latitude
			zoom: 13, // Zoom level
			container: mapcanvas // Div element
		  })

	
	}

	

})();

