(function() {
	let template = document.createElement("template");
	template.innerHTML = `
		<style>
		:host {
			border-radius: 1px;
			border-width: 1px;
			border-color: gray;
			border-style: solid;
			display: block;
		}
		</style>
	`;

	class Findme extends HTMLElement {
		constructor() {
			super();
			this.init();
			let shadowRoot = this.attachShadow({mode: "open"});
			shadowRoot.appendChild(template.content.cloneNode(true));
			this.addEventListener("click", event => {
				var event = new Event("onClick");
				this.dispatchEvent(event);
			});
			this._props = {};
			//			

			//
		}

		
		//Start new lines of code
		 init() {
            if (this.children.length === 2) return; //constructor called during drag+drop
            if (!this.querySelector("link")) {
                this.appendChild(template.content.cloneNode(true));
            }
            var ctor = sap.m.DatePicker;
            if (this._enablerange) { ctor = sap.m.DateRangeSelection; }
            this.DP = new ctor({
                change: function () {
                    this.fireChanged();
                    this.dispatchEvent(new Event("onChange"));
                }.bind(this)
            }).addStyleClass("datePicker");
            this.DP.placeAt(this);
        }

		 fireChanged() {
            var properties = { dateVal: this.DP.getDateValue() };
            if (this._enablerange) { properties.secondDateVal = this.DP.getSecondDateValue(); }
            this.dispatchEvent(new CustomEvent("propertiesChanged", {
                detail: {
                    properties: properties
                }
            }));
        }

        set dateVal(value) {
            if (value == undefined || !this.DP) return;
            if (typeof (value) === "string") value = new Date(value);
            this.DP.setDateValue(value);
        }
        
        set secondDateVal(value) {
            if (value == undefined || !this.DP || !this._enablerange) return;
            if (typeof (value) === "string") value = new Date(value);
            this.DP.setSecondDateValue(value);
        }

        set format(value) {
            if (!this.DP) return;
            this._format = value;
            this.DP.setDisplayFormat(value);
        }

        set minDateVal(date) {
            if (!this.DP) return;
            this._minDate = date;
            this.updateMinDate();
        }

        set maxDateVal(date) {
            if (!this.DP) return;
            this._maxDate = date;
            this.updateMaxDate();
        }

        updateMaxDate() {
            if (!!this._maxDate) {
                if (this.DP.getDateValue() > this._maxDate) {
                    this.DP.setDateValue(this._maxDate);
                }
                if (this._enablerange && this.DP.getSecondDateValue() > this._maxDate) {
                    this.DP.setSecondDateValue(this._maxDate);
                }
            }
            this.DP.setMaxDate(this._maxDate);
        }

        updateMinDate() {
            if (!!this._maxDate) {
                if (this.DP.getDateValue() < this._minDate) {
                    this.DP.setDateValue(this._minDate);
                }
                if (this._enablerange && this.DP.getSecondDateValue() < this._minDate) {
                    this.DP.setSecondDateValue(this._minDate);
                }
            }
            this.DP.setMinDate(this._minDate);
        }
		//End of lines of code



	}

	customElements.define("basilece-findme", Findme);
})();
