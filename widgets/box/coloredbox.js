{
 "id": "com.sap.sample.coloredbox",
 "version": "1.0.0",
 "name": "Colored Box",
 "description": "A colored box",
 "newInstancePrefix": "ColoredBox",
 "icon": "https://basilece.github.io/widgets/box/icon.png",
 "vendor": "SAP",
 "eula": "",
 "license": "",
 "webcomponents": [
 {
 "kind": "main",
   "tag": "com-sap-sample-coloredbox",
 "url": "https://basilece.github.io/widgets/box/coloredbox.js",
 "integrity": "",
 "ignoreIntegrity": true
 },
 {
 "kind": "styling",
 "tag": "com-sap-sample-coloredbox-styling",
 "url": "https://basilece.github.io/widgets/box/
coloredbox_styling.js",
 "integrity": "",
 "ignoreIntegrity": true
 },
 {
 "kind": "builder",
 "tag": "com-sap-sample-coloredbox-builder",
 "url": "https://basilece.github.io/widgets/box/
coloredbox_builder.js",
 "integrity": "",
 "ignoreIntegrity": true
 }
 ],
 "properties": {
 "color": {
 "type": "string",
 "description": "Background color",
 "default": "red"
 },
 "opacity": {
 "type": "number",
 "description": "Opacity",
 "default": 1
 },
 "width": {
 "type": "integer",
 "default": 100
 },
 "height": {
 "type": "integer",
 "default": 100
 }
 },
 "methods": {
 "setColor": {
 "description": "Sets the background color.",
 "parameters": [
 {
 "name": "newColor",
 "type": "string",
 "description": "The new background color"
 }
 ],
 "body": "this.color = newColor;"
 },
 "getColor": {
 "returnType": "string",
 "description": "Returns the background color.",
 "body": "return this.color;"
 }
 },
 "events": {
 "onClick": {
 "description": "Called when the user clicks the Colored Box."
 }
 }
}
