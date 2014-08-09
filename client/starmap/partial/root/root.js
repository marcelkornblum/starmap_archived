angular.module('starmap').controller('RootCtrl',
    function($scope, $document, stars){
        var scene, camera, renderer, controls;

        stars.get()
            .then(function(s) {
                $scope.stars = s;
                init();
                initialiseLights();
                initialiseStars();
                render();

                // attachScrollEvents();
            });

        function init() {
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 0.1, 1000 );

            renderer = new THREE.WebGLRenderer();
            renderer.setSize( window.innerWidth, window.innerHeight );
            var container = document.body.appendChild( renderer.domElement );

            controls = new THREE.OrbitControls( camera );
            controls.damping = 0.2;
            controls.addEventListener( 'change', render );

            camera.position.z = cameraRadius;

            stats = new Stats();
            stats.domElement.style.position = 'absolute';
            stats.domElement.style.top = '0px';
            stats.domElement.style.zIndex = 100;
            container.appendChild( stats.domElement );


            animate();
        };

        function initialiseStars() {
            // var geometry = new THREE.PlaneGeometry (10, 10);
            // var material = new THREE.MeshNormalMaterial( {color: 0x333333, side: THREE.DoubleSide, opacity: 0.3, transparent: true} );
            // var plane = new THREE.Mesh( geometry, material );
            // plane.position.x = 0;
            // plane.position.y = 0;
            // plane.position.z = 0;
            // scene.add( plane );

            var geometry = new THREE.RingGeometry(5, 5.01, 32, 32);
            var material = new THREE.MeshBasicMaterial( {color: 0x333333, side: THREE.DoubleSide} );
            var outerSphere = new THREE.Mesh( geometry, material );
            scene.add(outerSphere);

            var geometry = new THREE.RingGeometry(4, 4.01, 32, 32);
            var material = new THREE.MeshBasicMaterial( {color: 0x333333, side: THREE.DoubleSide} );
            var outerSphere = new THREE.Mesh( geometry, material );
            scene.add(outerSphere);

            var geometry = new THREE.RingGeometry(3, 3.01, 32, 32);
            var material = new THREE.MeshBasicMaterial( {color: 0x333333, side: THREE.DoubleSide} );
            var outerSphere = new THREE.Mesh( geometry, material );
            scene.add(outerSphere);

            var geometry = new THREE.RingGeometry(2, 2.01, 32, 32);
            var material = new THREE.MeshBasicMaterial( {color: 0x333333, side: THREE.DoubleSide} );
            var outerSphere = new THREE.Mesh( geometry, material );
            scene.add(outerSphere);

            var geometry = new THREE.RingGeometry(1, 1.01, 32, 32);
            var material = new THREE.MeshBasicMaterial( {color: 0x333333, side: THREE.DoubleSide} );
            var outerSphere = new THREE.Mesh( geometry, material );
            scene.add(outerSphere);

            _.each($scope.stars, function(star) {
                // console.log('adding ', star.fields);
                var geometry = new THREE.SphereGeometry(star.fields.absmag/700, 3, 3);
                var material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
                var starMesh = new THREE.Mesh( geometry, material );
                // var starMesh = new THREE.Sprite();
                // starMesh.scale = star.fields.absmag/700;
                starMesh.position.x = star.fields.x;
                starMesh.position.y = star.fields.y;
                starMesh.position.z = star.fields.z;
                starMesh.id = star.fields.starid;
                scene.add( starMesh );
            });
        }




        function initialiseLights() {
            var light = new THREE.AmbientLight( 0x404040 ); // soft white light
            scene.add( light );

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
            stats.update();
        }


        function render() {
            // var frame = requestAnimationFrame(render);
            // console.log((frame % 60) * 6);
            // rotateCamera(frame);
            // camera.rotation.x += 0.1;
            renderer.render(scene, camera);
        }


    });