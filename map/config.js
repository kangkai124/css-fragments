var uploadedDataURL = "data-gl/asset/data/flights.json";

app.title = '65k+ 飞机航线';

myChart.showLoading();

$.getJSON(uploadedDataURL, function(data) {

    myChart.hideLoading();

    function getAirportCoord(idx) {
        return [data.airports[idx][3], data.airports[idx][4]];
    }
    var routes = data.routes.map(function (airline) {
        return [
            getAirportCoord(airline[1]),
            getAirportCoord(airline[2])
        ];
    });
console.log(routes.splice(200,600))
var hah = [121.472644,31.231706]
var aa = routes.splice(200,100)
var bb = aa.map(ele => {
    ele[1] = hah
    return ele
})
    myChart.setOption({
        geo3D: {
            map: 'china',
            shading: 'realistic',
            realisticMaterial: {
                roughness: "data-gl/asset/wood/roughness.jpg",
                normalTexture: "data-gl/asset/wood/normal.jpg",
                detailTexture: "data-gl/asset/wood/diffuse.jpg",
                textureTiling: [2, 2]
            },
            postEffect: {
                enable: true,
                SSAO: {
                    enable: true,
                    radius: 3,
                    intensity: 1.4,
                    quality: 'high'
                }
            },
            light: {
                main: {
                    intensity: 2,
                    shadow: true,
                    shadowQuality: 'high',
                    alpha: 150,
                    beta: 0
                },
                ambient: {
                    intensity: 0
                },
                ambientCubemap: {
                    diffuseIntensity: 2,
                    specularIntensity: 2,
                    texture: 'data-gl/asset/canyon.hdr'
                }
            },
            viewControl: {
                alpha: 89,
                rotateMouseButton: 'right',
                panMouseButton: 'left',
                distance: 80
            },
            groundPlane: {
                show: true,
                color: '#333',
                realisticMaterial: {
                    roughness: "data-gl/asset/redbricks/roughness.jpg",
                    normalTexture: "data-gl/asset/redbricks/normal.jpg",
                    detailTexture: "data-gl/asset/redbricks/diffuse.jpg",
                    textureTiling: [8, 4]
                }
            },

            itemStyle: {
                areaColor: '#000'
            },

            regionHeight: 0.5
        },
        series: [{
            type: 'lines3D',

            coordinateSystem: 'geo3D',

            effect: {
                show: true,
                trailWidth: 1,
                trailOpacity: 0.5,
                trailLength: 0.2,
                constantSpeed: 5
            },

            blendMode: 'lighter',

            lineStyle: {
                width: 2,
                opacity: 0.05
            },

            data: bb
        },{
           type: 'map3D',
            map: 'china'
        }]
    });

    window.addEventListener('keydown', function () {
        myChart.dispatchAction({
            type: 'lines3DToggleEffect',
            seriesIndex: 0
        });
    });

    myChart.on('click', function (data) {
        console.log(data)
    })
});
