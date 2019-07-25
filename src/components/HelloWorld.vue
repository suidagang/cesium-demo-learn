<template>
	<div class="hello">
		<!-- <div id="cesiumContainer"></div> -->
		<router-link to="/Test">Go to Test</router-link>
		<router-link to="/Demo1">Go to Demo1</router-link>
		<router-link to="/Demo2">Go to Demo2</router-link>
		<router-link to="/Primitive">Go to primitive</router-link>
		<router-link to="/Primitive2">Go to primitive2</router-link>
		<router-link to="/IframeDemo">Go to iframeDemo</router-link>
		<button @click="go">dkjdj</button>
	</div>
</template>

<script>
	import cesium from "../../static/Cesium/Cesium";
	import "../../static/Cesium/Widgets/widgets.css";
	export default {
		name: 'HelloWorld',
		data() {
			return {
				viewer: null,
			}
		},
		mounted() {
			// var viewer = new Cesium.Viewer('cesiumContainer');
			// viewer.entities.add({
			// 	rectangle: {
			// 		coordinates: Cesium.Rectangle.fromDegrees(-100.0, 20.0, -90.0, 30.0),
			// 		material: new Cesium.StripeMaterialProperty({
			// 			evenColor: Cesium.Color.WHITE,
			// 			oddColor: Cesium.Color.BLUE,
			// 			repeat: 5
			// 		})
			// 	}
			// });
			// var viewer = new Cesium.Viewer('cesiumContainer11');
			// var scene = viewer.scene;
			// var canvas = viewer.canvas;
			// canvas.setAttribute('tabindex', '0'); // needed to put focus on the canvas
			// canvas.onclick = function() {
			// 	canvas.focus();
			// };
			// var ellipsoid = viewer.scene.globe.ellipsoid;
			// // disable the default event handlers
			// scene.screenSpaceCameraController.enableRotate = false;
			// scene.screenSpaceCameraController.enableTranslate = false;
			// scene.screenSpaceCameraController.enableZoom = false;
			// scene.screenSpaceCameraController.enableTilt = false;
			// scene.screenSpaceCameraController.enableLook = false;
			// var startMousePosition;
			// var mousePosition;
			// var flags = {
			// 	looking: false,
			// 	moveForward: false,
			// 	moveBackward: false,
			// 	moveUp: false,
			// 	moveDown: false,
			// 	moveLeft: false,
			// 	moveRight: false
			// };
			// var handler = new Cesium.ScreenSpaceEventHandler(canvas);
			// handler.setInputAction(function(movement) {
			// 	flags.looking = true;
			// 	mousePosition = startMousePosition = Cesium.Cartesian3.clone(movement.position);
			// }, Cesium.ScreenSpaceEventType.LEFT_DOWN);
			// handler.setInputAction(function(movement) {
			// 	mousePosition = movement.endPosition;
			// }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
			// handler.setInputAction(function(position) {
			// 	flags.looking = false;
			// }, Cesium.ScreenSpaceEventType.LEFT_UP);
			// function getFlagForKeyCode(keyCode) {
			// 	switch (keyCode) {
			// 		case 'W'.charCodeAt(0):
			// 			return 'moveForward';
			// 		case 'S'.charCodeAt(0):
			// 			return 'moveBackward';
			// 		case 'Q'.charCodeAt(0):
			// 			return 'moveUp';
			// 		case 'E'.charCodeAt(0):
			// 			return 'moveDown';
			// 		case 'D'.charCodeAt(0):
			// 			return 'moveRight';
			// 		case 'A'.charCodeAt(0):
			// 			return 'moveLeft';
			// 		default:
			// 			return undefined;
			// 	}
			// }
			// document.addEventListener('keydown', function(e) {
			// 	var flagName = getFlagForKeyCode(e.keyCode);
			// 	if (typeof flagName !== 'undefined') {
			// 		flags[flagName] = true;
			// 	}
			// }, false);
			// document.addEventListener('keyup', function(e) {
			// 	var flagName = getFlagForKeyCode(e.keyCode);
			// 	if (typeof flagName !== 'undefined') {
			// 		flags[flagName] = false;
			// 	}
			// }, false);
			// viewer.clock.onTick.addEventListener(function(clock) {
			// 	var camera = viewer.camera;
			// 	if (flags.looking) {
			// 		var width = canvas.clientWidth;
			// 		var height = canvas.clientHeight;
			// 		console.log(width, height, 'ssd');
			// 		console.log(mousePosition.x, startMousePosition.x)
			// 		// Coordinate (0.0, 0.0) will be where the mouse was clicked.
			// 		var x = (mousePosition.x - startMousePosition.x) / width;
			// 		var y = -(mousePosition.y - startMousePosition.y) / height;
			// 		var lookFactor = 0.05;
			// 		camera.lookRight(x * lookFactor);
			// 		camera.lookUp(y * lookFactor);
			// 	}
			// 	// Change movement speed based on the distance of the camera to the surface of the ellipsoid.
			// 	var cameraHeight = ellipsoid.cartesianToCartographic(camera.position).height;
			// 	var moveRate = cameraHeight / 100.0;
			// 	if (flags.moveForward) {
			// 		camera.moveForward(moveRate);
			// 	}
			// 	if (flags.moveBackward) {
			// 		camera.moveBackward(moveRate);
			// 	}
			// 	if (flags.moveUp) {
			// 		camera.moveUp(moveRate);
			// 	}
			// 	if (flags.moveDown) {
			// 		camera.moveDown(moveRate);
			// 	}
			// 	if (flags.moveLeft) {
			// 		camera.moveLeft(moveRate);
			// 	}
			// 	if (flags.moveRight) {
			// 		camera.moveRight(moveRate);
			// 	}
			// });
			// var viewer = new Cesium.Viewer('cesiumContainer', {
			// 		imageryProvider : new Cesium.ArcGisMapServerImageryProvider({
			// 		url : 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer'
			// 	}),
			// 	baseLayerPicker : false
			// });
			// var layers = viewer.scene.imageryLayers;
			// // var blackMarble = layers.addImageryProvider(new Cesium.createTileMapServiceImageryProvider({
			// // 	url : '../assets/logo.png',
			// // 	// maximumLevel : 8,
			// // 	// credit : 'Black Marble imagery courtesy NASA Earth Observatory',
			// // }));
			// // blackMarble.alpha = 0.5; // 0.0 is transparent. 1.0 is opaque.
			// // blackMarble.brightness = 2.0; // > 1.0 increases brightness. < 1.0 decreases.
			// layers.addImageryProvider(new Cesium.SingleTileImageryProvider({
			// 	url : '../assets/ajax-loader.gif',
			// 	rectangle : Cesium.Rectangle.fromDegrees(-75.0, 28.0, -67.0, 29.75)
			// }));
			// var viewer = new Cesium.Viewer('cesiumContainer', {
			// 	infoBox: false
			// });
			// var citizensBankPark = viewer.entities.add({
			// 	name: 'Citizens Bank Park',
			// 	position: Cesium.Cartesian3.fromDegrees(-75.166493, 39.906053 ,4),
			// 	point: {
			// 		pixelSize: 5,
			// 		color: Cesium.Color.RED,
			// 		outlineColor: Cesium.Color.WHITE,
			// 		outlineWidth: 2
			// 	},
			// 	label: {
			// 		text: 'Citizens Bank Park',
			// 		font: '14pt monospace',
			// 		style: Cesium.LabelStyle.FILL_AND_OUTLINE,
			// 		outlineWidth: 2,
			// 		verticalOrigin: Cesium.VerticalOrigin.TOP,
			// 		pixelOffset: new Cesium.Cartesian2(0, -28)
			// 	}
			// });
			// viewer.trackedEntity = citizensBankPark;
			// viewer.zoomTo(viewer.entities);
			// var sui = viewer.entities.add({
			// 	name: 'sui',
			// 	polygon: {
			// 		hierarchy: Cesium.Cartesian3.fromDegreesArray([-109, 45, -105, 45, -104, 44, -104, 43, -104, 41, -105, 40, -107, 41, -109, 40, -111, 40, -111, 42, -111, 44, -111, 45]),
			// 		height: 100000,
			// 		material: Cesium.Color.RED.withAlpha(0.5),
			// 		outline: true,
			// 		outlineColor: Cesium.Color.BLACK
			// 	}
			// });
			// var sui1 = viewer.entities.add({
			// 	name: 'sui1',
			// 	position: Cesium.Cartesian3.fromDegrees(-114.0, 42.0, 300000.0),
			// 	box: {
			// 		dimensions: new Cesium.Cartesian3(400000.0, 300000.0, 500000.0),
			// 		material: Cesium.Color.RED.withAlpha(0.5),
			// 		outline: true,
			// 		outlineColor: Cesium.Color.BLACK
			// 	}
			// });
			// var sui2 = viewer.entities.add({
			// 	name: "sui2",
			// 	position: Cesium.Cartesian3.fromDegrees(-99, 42.0),
			// 	ellipse: {
			// 		semiMinorAxis: 250000.0,
			// 		semiMajorAxis: 400000.0,
			// 		material: Cesium.Color.BLUE.withAlpha(0.5)
			// 	}
			// });
			// sui2.ellipse.fill = false;
			// sui2.ellipse.outline = true;
			// sui2.ellipse.outlineColor = Cesium.Color.RED;
			// sui2.ellipse.outlineWidth = 2000;
			// var sui3 = viewer.entities.add({
			// 	name:"sui3",
			// 	polyline:{
			// 		positions:Cesium.Cartesian3.fromDegreesArray([-120,42,-121,42]),
			// 		width : 5,
			// 		material : new Cesium.PolylineOutlineMaterialProperty({
			// 			color : Cesium.Color.ORANGE,
			// 			outline:true,
			// 			outlineWidth : 3,
			// 			glowPower:0.1,
			// 			outlineColor : Cesium.Color.BLACK
			// 		})
			// 	}
			// });
			// var heading = Cesium.Math.toRadians(0);
			// var pitch = Cesium.Math.toRadians(-45);
			// sui.position = Cesium.Cartesian3.fromDegrees(-107,42.68);
			// viewer.trackedEntity = sui;
			// // viewer.zoomTo(sui);
			// // viewer.zoomTo(sui,new Cesium.HeadingPitchRange(heading,pitch));
			// viewer.flyTo(sui).then((result) =>{
			// 	if(result){
			// 		viewer.selectedEntity = sui;
			// 	}
			// })
		},
		methods:{
			go(){
				this.$router.push("/iframeDemo")
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	@import url("../../static/Cesium/Widgets/widgets.css");
	#cesiumContainer {
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
</style>
