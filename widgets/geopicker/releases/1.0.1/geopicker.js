(function () {

	let _shadowRoot;
    let tmpl = document.createElement("template");
    tmpl.innerHTML = `
       <style>
      </style>
	  <div id="mapcanvas" style="width: 600px; height: 300px;"></div>`;

	var _script = document.createElement('script');
	_script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDPYtB1oVrAXkosfjU4qaUSU650_KXJWjQ&v=weekly';
	_script.type = 'text/javascript';
	_script.defer = 'true';
	document.head.appendChild(_script);

	//Initialize map 
	_script.onload = function () {
				
		var InitMap;
		var latlng = new google.maps.LatLng(-34.397, 150.644);
		var mapOptions = {
			zoom: 17,
			center: latlng
		}
		InitMap = new google.maps.Map(document.getElementById('mapcanvas'), mapOptions);

			
					
	
	
				} // end of map init


	class Geopicker extends HTMLElement {
		constructor() {
			super();
			
			_shadowRoot = this.attachShadow({ mode: "open"});
            _shadowRoot.appendChild(tmpl.content.cloneNode(true));



		}  // End of Geopicker constructor


	} //end of Geopicker Class






	customElements.define("basilece-geopicker", Geopicker);

})();

