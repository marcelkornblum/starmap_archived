angular.module('starmap').controller('RootCtrl',
    function($scope, $document, stars){
        var scene, camera, renderer, controls;

        stars.get()
            .then(function(s) {
                $scope.stars = s;
                init();
                // initialiseLights();
                initialiseStars();
                controls.addEventListener('change', render);
                animate();
                render();

                // attachScrollEvents();
            });

        function init() {
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 0.1, 1000 );

            renderer = new THREE.WebGLRenderer();
            renderer.setSize( window.innerWidth, window.innerHeight );
            document.body.appendChild( renderer.domElement );



            controls = new THREE.OrbitControls( camera );
            controls.damping = 0.2;
            controls.addEventListener( 'change', render );

            camera.position.z = cameraRadius;


        };

        function initialiseLights() {
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

        function initialiseStars() {
            _.each($scope.stars, function(star) {
                // console.log('adding ', star.fields);
                var geometry = new THREE.SphereGeometry(star.fields.absmag/700);
                var material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
                var starMesh = new THREE.Mesh( geometry, material );
                starMesh.position.x = star.fields.x;
                starMesh.position.y = star.fields.y;
                starMesh.position.z = star.fields.z;
                starMesh.id = star.fields.starid;
                scene.add( starMesh );
            });
        }

        // function initialiseStars() {
        //     var geometry = new THREE.Geometry();
        //     _.each($scope.stars, function(star) {
        //         var starVector = new THREE.Vector3(star.fields.x, star.fields.y, star.fields.z);
        //         geometry.vertices.push(starVector);
        //     });
        //     // console.log('adding ', star.fields);
        //     var material = new THREE.PointCloudMaterial( { color: 0xffffff } );
        //     var starPoints = new THREE.PointCloud( geometry, material );
        //     // starMesh.position.x = star.fields.x;
        //     // starMesh.position.y = star.fields.y;
        //     // starMesh.position.z = star.fields.z;
        //     // starMesh.id = star.fields.starid;
        //     scene.add( starPoints );
        // }

        var cameraRadius = 10;
        var origin = new THREE.Vector3(0,0,0);
        // var lut = new THREE.Lut( "cooltowarm", 1000 );

        function zoom(direction, amount) {
            if  (direction === 'UP') {
                camera.position.z -= amount;
            }
            else {
                camera.position.z += amount;
            }
        };


        function rotateCamera(frame) {
            // console.log('camera moving from ', camera.position.x, camera.position.y);
            var theta = frame % 360; // 1/60 of the whole circle; 60fps
            // console.log(cameraRadius, theta, Math.PI, cameraRadius * Math.cos(theta * Math.PI / 180), camera);
            camera.position.x = cameraRadius * Math.cos(theta * Math.PI / 180);
            camera.position.y = cameraRadius * Math.sin(theta * Math.PI / 180);
            // console.log('..camera moved to ', camera.position.x, camera.position.y);
            camera.lookAt(origin);
        };



        function animate() {
            requestAnimationFrame(animate);
            controls.update();
        }


        function render() {
            // var frame = requestAnimationFrame(render);
            // console.log((frame % 60) * 6);
            // rotateCamera(frame);
            // camera.rotation.x += 0.1;
            renderer.render(scene, camera);
            // stat.update();
        }





        // function MouseWheelHandler(e) {

        //     // cross-browser wheel delta
        //     var e = window.event || e; // old IE support
        //     var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));

        //     direction = delta === -1 ? 'DOWN' : 'UP';
        //     zoom(direction, 0.3);

        //     e.preventDefault();
        //     return false;
        // }

        // function attachScrollEvents() {
        //     var canvas = document.getElementsByTagName("canvas")[0];
        //     if (canvas.addEventListener) {
        //         // IE9, Chrome, Safari, Opera
        //         canvas.addEventListener("mousewheel", MouseWheelHandler, false);
        //         // Firefox
        //         canvas.addEventListener("DOMMouseScroll", MouseWheelHandler, false);
        //     }

        // }


    });