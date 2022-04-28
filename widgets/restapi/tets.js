onCustomWidgetAfterUpdate(changedProperties) {
    console.log(changedProperties);
    var that = this;

    if (this._firstLoadLib === 0) {
        this._firstLoadLib = 1;
        let pubnubjs = "http://localhost/SAC/sacnotificationlistitem/pubnub.4.29.9.js";
        async function LoadLibs() {
            try {
                await loadScript(pubnubjs, _shadowRoot);
            } catch (e) {
                alert(e);
            } finally {
                letsGo(that, changedProperties);
            }
        }
        LoadLibs();
    }
}