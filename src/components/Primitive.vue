<template>
	<div class="hello">
		<div id="cesiumContainerPrimitive"></div>
	</div>
</template>

<script>
	import cesium from "../../static/Cesium/Cesium";
	export default {
		name: 'HelloWorld',
		data() {
			return {
				viewer: null,
			}
		},
		mounted() {
			// var viewer = new Cesium.Viewer("cesiumContainerPrimitive");
			// var scene = viewer.scene;
			var viewer = new Cesium.Viewer('cesiumContainerPrimitive');
			var scene = viewer.scene;
			//new Cesium.Cartesian3的参数为xyz
			var dimensions = new Cesium.Cartesian3(400000.0, 300000.0, 1.0);
			var positionOnEllipsoid = Cesium.Cartesian3.fromDegrees(116.3912, 39.920);
			var translateMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(positionOnEllipsoid);
			var scaleMatrix = Cesium.Matrix4.fromScale(dimensions);
			var planeModelMatrix = new Cesium.Matrix4();
			Cesium.Matrix4.multiply(translateMatrix, scaleMatrix, planeModelMatrix);
			// 创建平面
			var planeGeometry = new Cesium.PlaneGeometry({
				vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,
			});
			// 创建平面外轮廓
			var planeOutlineGeometry = new Cesium.PlaneOutlineGeometry({});
			var planeGeometryInstance = new Cesium.GeometryInstance({
				geometry: planeGeometry,
				modelMatrix: planeModelMatrix,
				attributes: {
					color: Cesium.ColorGeometryInstanceAttribute.fromColor(new Cesium.Color(1.0, 0.0, 0.0, 1))
				}
			});
			scene.primitives.add(new Cesium.Primitive({
				geometryInstances: planeGeometryInstance,
				appearance: new Cesium.PerInstanceColorAppearance({
					closed: true
				})
			}));
			var planeOutlineGeometryInstance = new Cesium.GeometryInstance({
				geometry: planeOutlineGeometry,
				modelMatrix: planeModelMatrix,
				attributes: {
					color: Cesium.ColorGeometryInstanceAttribute.fromColor(new Cesium.Color(0, 1.0, 0, 1.0))
				}
			});
			scene.primitives.add(new Cesium.Primitive({
				geometryInstances: planeOutlineGeometryInstance,
				appearance: new Cesium.PerInstanceColorAppearance({
					flat: true,
					renderState: {
						lineWidth: Math.min(2.0, scene.maximumAliasedLineWidth)
					}
				})
			}));
			viewer.camera.flyToBoundingSphere(new Cesium.BoundingSphere(positionOnEllipsoid, 300000));
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
	@import url("../../static/Cesium/Widgets/widgets.css");
	#cesiumContainer {
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
</style>
