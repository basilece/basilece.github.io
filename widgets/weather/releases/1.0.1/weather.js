(function () {

	let _shadowRoot;
    let tmpl = document.createElement("template");
    tmpl.innerHTML = ``;

	const API_KEY = '95770b31c49f88ab62aadfc91677aab2';


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

	class Weather extends HTMLElement {
		constructor() {
			super();
			
			_shadowRoot = this.attachShadow({ mode: "open"});
            _shadowRoot.appendChild(tmpl.content.cloneNode(true));

			var map;

            this._export_settings = {};
            this._export_settings.weatherDesc = "";
            this._export_settings.weatherTemp = "";
            this._export_settings.weatherCountry = "";
			this._export_settings.weatherCity = "";
			this._export_settings.weatherLong = "";
			this._export_settings.weatherLat = "";


            this.addEventListener("click", event => {
                console.log('click');

            });

			this._firstLoadLib = 0;
			this._firstConnection = 0;
			
		}  // End of Geopicker constructor

        onCustomWidgetAfterUpdate(changedProperties) {
            console.log(changedProperties);
            var that = this;
            

            //const weatherlatlonURL = `https://api.openweathermap.org/data/2.5/weather?lat=${that._export_settings.weatherLat}&lon=${that._export_settings.weatherLong}&units=metric&appid=${API_KEY}`;
			const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${that._export_settings.weatherCountry},${that._export_settings.weatherCity}&units=metric&appid=${API_KEY}`
            let request = new XMLHttpRequest;

			request.open("GET", weatherURL);
			request.send();

			request.onload = () =>  {
				console.log(request);
				if (request.status === 200){
                    console.log(JSON.parse(request.response));

                    var data = JSON.parse(request.responseText);
                    that._export_settings.weatherTemp = data.main.temp;
        
                    that.dispatchEvent(new CustomEvent("propertiesChanged", {
                        detail: {
                            properties: {
                                weatherTemp : that._export_settings.weatherTemp
                              
                            }
                        }
                    }));

				} else {
					console.log(`error ${request.status} ${request.statusText}`);
				}

			}

            request.onload();




        }

		//GETTERS AND SETTERS
		get weatherDesc() {
            return this._export_settings.weatherDesc;
        }


		get weatherLat() {
            return this._export_settings.weatherLat;
        }

		get weatherLong() {
            return this._export_settings.weatherLong;
        }

		set weatherLong(value){
			this._export_settings.weatherLong = value;
		}

		get weatherLat() {
            return this._export_settings.weatherLat;
        }

		set weatherLat(value){
			this._export_settings.weatherLat = value;
		}

		get weatherCity() {
            return this._export_settings.weatherCity;
        }

        set weatherCity(value){
			this._export_settings.weatherCity = value;
		}


		get weatherCountry() {
            return this._export_settings.weatherCountry;
        }

        set weatherCountry(value){
			this._export_settings.weatherCountry = value;
		}

		get weatherTemp() {
            return this._export_settings.weatherTemp;
        }



	} 

	customElements.define("basilece-weather", Weather);



})();

