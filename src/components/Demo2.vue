<template>
    <div class="hello">
        <div id="cesiumContainer" class="fullSize"></div>
        <div id="creditContainer" style="display: none;"></div>
        <div id="menu">
            <p>
                <button onclick="setvisible('position')">定位</button>
            </p>
            <p>
                <button onclick="setvisible('add')">添加</button>
            </p>
            <p>
                <button onclick="setvisible('update')">刷新</button>
            </p>
            <p>
                <button onclick="setvisible('clear')">删除</button>
            </p>
        </div>
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
        methods() {},
        mounted() {
            var ImageryProviderWebExtendTool = (
                function() {
                    function _() {}
                    _.createGoogleMapsByUrl = function(Cesium, options) {
                        options = Cesium.defaultValue(options, {});
                        var templateUrl = Cesium.defaultValue(options.url, 'http://mt1.google.cn/vt/lyrs=s&hl=zh-CN&x={x}&y={y}&z={z}');
                        var trailingSlashRegex = /\/$/;
                        var defaultCredit = new Cesium.Credit('Google Maps');
                        var tilingScheme = new Cesium.WebMercatorTilingScheme({
                            ellipsoid: options.ellipsoid
                        });
                        var tileWidth = 256;
                        var tileHeight = 256;
                        var minimumLevel = Cesium.defaultValue(options.minimumLevel, 0);
                        var maximumLevel = Cesium.defaultValue(options.minimumLevel, 17);
                        var rectangle = Cesium.defaultValue(options.rectangle, tilingScheme.rectangle);
                        // Check the number of tiles at the minimum level.  If it's more than four,
                        // throw an exception, because starting at the higher minimum
                        // level will cause too many tiles to be downloaded and rendered.
                        var swTile = tilingScheme.positionToTileXY(Cesium.Rectangle.southwest(rectangle), minimumLevel);
                        var neTile = tilingScheme.positionToTileXY(Cesium.Rectangle.northeast(rectangle), minimumLevel);
                        var tileCount = (Math.abs(neTile.x - swTile.x) + 1) * (Math.abs(neTile.y - swTile.y) + 1);
                        //>>includeStart('debug', pragmas.debug);
                        if (tileCount > 4) {
                            throw new Cesium.DeveloperError('The rectangle and minimumLevel indicate that there are ' + tileCount + ' tiles at the minimum level. Imagery providers with more than four tiles at the minimum level are not supported.');
                        }
                        //>>includeEnd('debug');
                        var credit = Cesium.defaultValue(options.credit, defaultCredit);
                        if (typeof credit === 'string') {
                            credit = new Cesium.Credit(credit);
                        }
                        return new Cesium.UrlTemplateImageryProvider({
                            url: templateUrl,
                            proxy: options.proxy,
                            credit: credit,
                            tilingScheme: tilingScheme,
                            tileWidth: tileWidth,
                            tileHeight: tileHeight,
                            minimumLevel: minimumLevel,
                            maximumLevel: maximumLevel,
                            rectangle: rectangle
                        });
                    }
                    return _;
                }
            )();
            var PrimitivePoints = (
                function() {
                    console.log(typeof _,'fdfj')
                    var vertexShader;
                    var fragmentShader;
                    var geometry;
                    var appearance;
                    var viewer;
                    function _(options) {
                        viewer = options.viewer;
                        vertexShader = getVS();
                        fragmentShader = getFS();
                        if (options.Cartesians && options.Cartesians.length >= 2) {
                            var postionsTemp = [];
                            var colorsTemp = [];
                            var indicesTesm = [];
                            if (options.Colors && options.Colors.length === options.Cartesians.length * 4) {
                                for (var i = 0; i < options.Cartesians.length; i++) {
                                    postionsTemp.push(options.Cartesians[i].x);
                                    postionsTemp.push(options.Cartesians[i].y);
                                    postionsTemp.push(options.Cartesians[i].z);
                                }
                                colorsTemp = options.Colors;
                            } else {
                                for (var i = 0; i < options.Cartesians.length; i++) {
                                    postionsTemp.push(options.Cartesians[i].x);
                                    postionsTemp.push(options.Cartesians[i].y);
                                    postionsTemp.push(options.Cartesians[i].z);
                                    //
                                    colorsTemp.push(0.0);
                                    colorsTemp.push(0.0);
                                    colorsTemp.push(1.0);
                                    colorsTemp.push(1.0);
                                }
                            }
                            for (var i = 0; i < options.Cartesians.length; i++) {
                                indicesTesm.push(i);
                            }
                            this.positionArr = new Float64Array(postionsTemp);
                            this.colorArr = new Float32Array(colorsTemp);
                            this.indiceArr = new Uint16Array(indicesTesm);
                        } else {
                            var p1 = Cesium.Cartesian3.fromDegrees(0, 0, -10);
                            var p2 = Cesium.Cartesian3.fromDegrees(0, 0.001, -10);
                            this.positionArr = new Float64Array([
                                p1.x, p1.y, p1.z,
                                p2.x, p2.y, p2.z
                            ]);
                            this.colorArr = new Float32Array([
                                0.0, 0.0, 1.0, 1.0,
                                0.0, 0.0, 1.0, 1.0
                            ]);
                            this.indiceArr = new Uint16Array([0, 1]);
                        }
                        geometry = CreateGeometry(this.positionArr, this.colorArr, this.indiceArr);
                        appearance = CreateAppearence(fragmentShader, vertexShader);
                        this.primitive = viewer.scene.primitives.add(new Cesium.Primitive({
                            geometryInstances: new Cesium.GeometryInstance({
                                geometry: geometry
                            }),
                            appearance: appearance,
                            asynchronous: false
                        }));
                    }
                    function CreateGeometry(positions, colors, indices) {
                        return new Cesium.Geometry({
                            attributes: {
                                position: new Cesium.GeometryAttribute({
                                    componentDatatype: Cesium.ComponentDatatype.DOUBLE,
                                    componentsPerAttribute: 3,
                                    values: positions
                                }),
                                color: new Cesium.GeometryAttribute({
                                    componentDatatype: Cesium.ComponentDatatype.FLOAT,
                                    componentsPerAttribute: 4,
                                    values: colors
                                })
                            },
                            indices: indices,
                            primitiveType: Cesium.PrimitiveType.POINTS,
                            boundingSphere: Cesium.BoundingSphere.fromVertices(positions)
                        });
                    }
                    function CreateAppearence(fs, vs) {
                        return new Cesium.Appearance({
                            renderState: {
                                blending: Cesium.BlendingState.PRE_MULTIPLIED_ALPHA_BLEND,
                                depthTest: {
                                    enabled: true
                                },
                                depthMask: true
                            },
                            fragmentShaderSource: fs,
                            vertexShaderSource: vs
                        });
                    }
                    function getVS() {
                        return "attribute vec3 position3DHigh;\
                        attribute vec3 position3DLow;\
                        attribute vec4 color;\
                        varying vec4 v_color;\
                        attribute float batchId;\
                        void main()\
                        {\
                            vec4 p = czm_computePosition();\
                            v_color =color;\
                            p = czm_modelViewProjectionRelativeToEye * p;\
                            gl_Position = p;\
                            gl_PointSize=8.0;\
                        }\
                        ";
                    }
                    function getFS() {
                        return "varying vec4 v_color;\
                        void main()\
                        {\
                             float d = distance(gl_PointCoord, vec2(0.5,0.5));\
                             if(d < 0.5){\
                                gl_FragColor = v_color;\
                             }else{\
                                discard;\
                             }\
                        }\
                        ";
                    }
                    _.prototype.remove = function() {
                        if (this.primitive != null) {
                            viewer.scene.primitives.remove(this.primitive);
                            this.primitive = null;
                        }
                    }
                    _.prototype.updateCartesianPosition = function(cartesians) {
                        if (this.primitive != null) {
                            viewer.scene.primitives.remove(this.primitive);
                            if (cartesians && cartesians.length < 2) {
                                return;
                            }
                            var postionsTemp = [];
                            var colorsTemp = [];
                            var indicesTesm = [];
                            for (var i = 0; i < cartesians.length; i++) {
                                postionsTemp.push(cartesians[i].x);
                                postionsTemp.push(cartesians[i].y);
                                postionsTemp.push(cartesians[i].z);
                                colorsTemp.push(0.0);
                                colorsTemp.push(0.0);
                                colorsTemp.push(1.0);
                                colorsTemp.push(1.0);
                            }
                            for (var i = 0; i < cartesians.length; i++) {
                                indicesTesm.push(i);
                            }
                            this.positionArr = new Float64Array(postionsTemp);
                            this.colorArr = new Float32Array(colorsTemp);
                            this.indiceArr = new Uint16Array(indicesTesm);
                            geometry = CreateGeometry(this.positionArr, this.colorArr, this.indiceArr);
                            appearance = CreateAppearence(fragmentShader, vertexShader);
                            this.primitive = viewer.scene.primitives.add(new Cesium.Primitive({
                                geometryInstances: new Cesium.GeometryInstance({
                                    geometry: geometry
                                }),
                                appearance: appearance,
                                asynchronous: false
                            }));
                        } else {
                            return;
                        }
                    }
                    _.prototype.updateCartesianPositionColor = function(cartesians, colors) {
                        console.log("color")
                        if (colors.length === cartesians.length * 4) {} else {
                            return;
                        }
                        if (this.primitive != null) {
                            viewer.scene.primitives.remove(this.primitive);
                            if (cartesians && cartesians.length < 2) {
                                return;
                            }
                            var postionsTemp = [];
                            var indicesTesm = [];
                            for (var i = 0; i < cartesians.length; i++) {
                                postionsTemp.push(cartesians[i].x);
                                postionsTemp.push(cartesians[i].y);
                                postionsTemp.push(cartesians[i].z);
                            }
                            for (var i = 0; i < cartesians.length; i++) {
                                indicesTesm.push(i);
                            }
                            this.positionArr = new Float64Array(postionsTemp);
                            this.colorArr = new Float32Array(colors);
                            this.indiceArr = new Uint16Array(indicesTesm);
                            geometry = CreateGeometry(this.positionArr, this.colorArr, this.indiceArr);
                            appearance = CreateAppearence(fragmentShader, vertexShader);
                            this.primitive = viewer.scene.primitives.add(new Cesium.Primitive({
                                geometryInstances: new Cesium.GeometryInstance({
                                    geometry: geometry
                                }),
                                appearance: appearance,
                                asynchronous: false
                            }));
                        } else {
                            return;
                        }
                    }
                    return _;
                })();
            var GoogleMap = ImageryProviderWebExtendTool.createGoogleMapsByUrl(Cesium, {
                url: "http://mt1.google.cn/vt/lyrs=s&hl=zh-CN&x={x}&y={y}&z={z}"
            });
            var viewer = new Cesium.Viewer('cesiumContainer', {
                imageryProvider: GoogleMap,
                contextOptions: {
                    webgl: {
                        alpha: true
                    }
                },
                creditContainer: "creditContainer",
                selectionIndicator: false,
                animation: false,
                baseLayerPicker: false,
                geocoder: false,
                timeline: false,
                sceneModePicker: true,
                navigationHelpButton: false,
                infoBox: false,
                fullscreenButton: true
            });
            var lat = 42.006;
            var lon = 128.055;
            //取消双击事件
            viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
            //设置homebutton的位置
            Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(lon - 1, lat - 1, lon + 1, lat + 1); //Rectangle(west, south, east, north)
            //设置初始位置
            viewer.camera.setView({
                destination: Cesium.Cartesian3.fromDegrees(lon, lat, 300000)
            });
            window.onload = function() {
                var primitivePoints;
                window.setvisible = function(value) {
                    console.log("jfjfjfj")
                    switch (value) {
                        case 'position':
                            viewer.camera.setView({
                                destination: Cesium.Cartesian3.fromDegrees(lon, lat, 30000)
                            });
                            break;
                        case 'add':
                            var cartesiansPoints = [];
                            var colors = [];
                            for (var i = 0; i < 100; i++) {
                                var cartesianTemp = Cesium.Cartesian3.fromDegrees(lon + i * 0.01, lat + i * 0.01, i * 100);
                                cartesiansPoints.push(cartesianTemp);
                                //绘制点
                                if (i % 5 == 0) {
                                    colors.push(0);
                                    colors.push(0);
                                    colors.push(1);
                                    colors.push(1);
                                } else {
                                    colors.push(1);
                                    colors.push(0);
                                    colors.push(0);
                                    colors.push(1);
                                }
                            }
                            primitivePoints = new PrimitivePoints({
                                'viewer': viewer,
                                'Cartesians': cartesiansPoints,
                                'Colors': colors
                            });
                            break;
                        case 'update':
                            var cartesiansPoints = [];
                            var colors = [];
                            for (var i = 0; i < 100; i++) {
                                var cartesianTemp = Cesium.Cartesian3.fromDegrees(lon, lat, i * 1000);
                                cartesiansPoints.push(cartesianTemp);
                                //绘制点
                                if (i % 5 == 0) {
                                    colors.push(1);
                                    colors.push(0);
                                    colors.push(0);
                                    colors.push(1);
                                } else {
                                    colors.push(0);
                                    colors.push(0);
                                    colors.push(1);
                                    colors.push(1);
                                }
                            }
                            if (primitivePoints) {
                                primitivePoints.updateCartesianPositionColor(cartesiansPoints, colors);
                            } else {
                                primitivePoints = new PrimitivePoints({
                                    'viewer': viewer,
                                    'Cartesians': cartesiansPoints,
                                    'Colors': colors
                                });
                            }
                            break;
                        case 'clear':
                            if (primitivePoints) {
                                primitivePoints.remove();
                            }
                            break;
                    }
                }
            }
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
    #menu {
        position: absolute;
        top: 80px;
        left: 10px;
        z-index: 999;
    }
</style>
