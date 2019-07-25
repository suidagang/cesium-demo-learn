<template>
	<div class="hello">
		<div id="cesiumContainer1"></div>
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
			var viewer = new Cesium.Viewer('cesiumContainer1');
			var scene = viewer.scene;
			var circleInstance = new Cesium.GeometryInstance({
				geometry: new Cesium.CircleGeometry({
					center: Cesium.Cartesian3.fromDegrees(-95.0, 43.0),
					radius: 250000.0,
					vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT
				}),
				attributes: {
					color: Cesium.ColorGeometryInstanceAttribute.fromColor(new Cesium.Color(1.0, 0.0, 0.0, 0.5))
				},
				id: 'circle'
			});
			var primitive = new Cesium.Primitive({
				geometryInstances: circleInstance,
				appearance: new Cesium.PerInstanceColorAppearance({
					translucent: false,
					closed: true
				})
			});
			scene.primitives.add(primitive);
			setInterval(function() {
				var attributes = primitive.getGeometryInstanceAttributes('circle');
				attributes.color = Cesium.ColorGeometryInstanceAttribute.toValue(Cesium.Color.fromRandom({
					alpha: 1.0
				}));
			}, 2000);
			viewer.extend(Cesium.viewerCesiumInspectorMixin)
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
