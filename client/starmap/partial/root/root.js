angular.module('starmap').controller('RootCtrl',
    function($scope, stars){
        var scene, camera, renderer;

        stars.get()
            .then(function(s) {
                $scope.stars = s;
                init();
                // initialiseLights();
                initialiseStars();
                render();
            });

        var init = function init() {
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 0.1, 1000 );

            renderer = new THREE.WebGLRenderer();
            renderer.setSize( window.innerWidth, window.innerHeight );
            document.body.appendChild( renderer.domElement );

            camera.position.z = cameraRadius;
        };

        var initialiseLights = function initialiseLights() {
             // create a point light
            var pointLight = new THREE.PointLight(0xFFFFFF);
            // set its position
            pointLight.position.x = 10;
            pointLight.position.y = 50;
            pointLight.position.z = 130;
            // add to the scene
            scene.add(pointLight);

            // create a point light
            var pointLight2 = new THREE.PointLight(0xFFFFFF);
            // set its position
            pointLight2.position.x = -10;
            pointLight2.position.y = -50;
            pointLight2.position.z = -130;
            // add to the scene
            scene.add(pointLight2);
        };

        var initialiseStars = function initialiseStars() {
            _.each($scope.stars, function(star) {
                // console.log('adding ', star.fields);
                var geometry = new THREE.SphereGeometry(star.fields.absmag/700);
                var material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
                var starMesh = new THREE.Mesh( geometry, material );
                starMesh.position.x = star.fields.x;
                starMesh.position.y = star.fields.y;
                starMesh.position.z = star.fields.z;
                scene.add( starMesh );
            });
        }

        var cameraRadius = 10;
        var origin = new THREE.Vector3(0,0,0);


        var rotateCamera = function rotateCamera(frame) {
            // console.log('camera moving from ', camera.position.x, camera.position.y);
            var theta = frame % 360; // 1/60 of the whole circle; 60fps
            // console.log(cameraRadius, theta, Math.PI, cameraRadius * Math.cos(theta * Math.PI / 180), camera);
            camera.position.x = cameraRadius * Math.cos(theta * Math.PI / 180);
            camera.position.y = cameraRadius * Math.sin(theta * Math.PI / 180);
            // console.log('..camera moved to ', camera.position.x, camera.position.y);
            camera.lookAt(origin);
        };

        function render() {
            var frame = requestAnimationFrame(render);
            // console.log((frame % 60) * 6);
            rotateCamera(frame);
            // camera.rotation.x += 0.1;
            renderer.render(scene, camera);
        }


    });