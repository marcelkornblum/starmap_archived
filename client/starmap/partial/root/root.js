angular.module('starmap').controller('RootCtrl',
    function($scope, $document, stars){
        var scene, camera, projector, renderer, controls, container, starObjects;

        function init() {
            scene = new THREE.Scene();

            container = document.getElementById('threeCanvas');
            // console.log(container);
            renderer = new THREE.WebGLRenderer({ canvas: container });
            renderer.setSize( window.innerWidth, window.innerHeight );
            // container = document.body.appendChild( renderer.domElement );

            initialiseCamera(35, 0.1, 1000);
            initialiseControls();
            initialiseGrid(origin);
            initialiseLights();

            stats = new Stats();
            stats.domElement.style.position = 'absolute';
            stats.domElement.style.top = '0px';
            stats.domElement.style.zIndex = 100;
            container.appendChild( stats.domElement );

            projector = new THREE.Projector();

            window.addEventListener( 'resize', onWindowResize, false );

            animate();
        };

        function initialiseCamera(fov, inner, outer) {
            camera = new THREE.PerspectiveCamera( fov, window.innerWidth / window.innerHeight, inner, outer );

            camera.position.z = camera.position.y = cameraRadius;
            camera.up = new THREE.Vector3(0, 0, 1);
            // console.log(camera.rotation.set(0.5, 0.5, 0.5));
            // console.log(camera.rotation);
        }

        function initialiseControls() {
            controls = new THREE.OrbitControls( camera, container );
            controls.damping = 0.2;
            controls.addEventListener( 'change', render );
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

        function initialiseGrid(target) {
            // var geometry = new THREE.PlaneGeometry (10, 10);
            // var material = new THREE.MeshNormalMaterial( {color: 0x333333, side: THREE.DoubleSide, opacity: 0.3, transparent: true} );
            // var plane = new THREE.Mesh( geometry, material );
            // plane.position.x = 0;
            // plane.position.y = 0;
            // plane.position.z = 0;
            // scene.add( plane );

            var geometry = new THREE.RingGeometry(5, 5.01, 32, 32);
            var material = new THREE.MeshBasicMaterial( {color: 0x333333, side: THREE.DoubleSide} );
            var innerCircle = new THREE.Mesh( geometry, material );
            innerCircle.target = target;
            scene.add(innerCircle);

            var geometry = new THREE.RingGeometry(4, 4.01, 32, 32);
            var material = new THREE.MeshBasicMaterial( {color: 0x333333, side: THREE.DoubleSide} );
            var secondCircle = new THREE.Mesh( geometry, material );
            secondCircle.target = target;
            scene.add(secondCircle);

            var geometry = new THREE.RingGeometry(3, 3.01, 32, 32);
            var material = new THREE.MeshBasicMaterial( {color: 0x333333, side: THREE.DoubleSide} );
            var thirdCircle = new THREE.Mesh( geometry, material );
            thirdCircle.target = target;
            scene.add(thirdCircle);

            var geometry = new THREE.RingGeometry(2, 2.01, 32, 32);
            var material = new THREE.MeshBasicMaterial( {color: 0x333333, side: THREE.DoubleSide} );
            var fourthCircle = new THREE.Mesh( geometry, material );
            fourthCircle.target = target;
            scene.add(fourthCircle);

            var geometry = new THREE.RingGeometry(1, 1.01, 32, 32);
            var material = new THREE.MeshBasicMaterial( {color: 0x333333, side: THREE.DoubleSide} );
            var outerCircle = new THREE.Mesh( geometry, material );
            outerCircle.target = target;
            scene.add(outerCircle);
        }

        function initialiseStars() {
            starObjects = [];
            _.each($scope.stars, function(star, key) {
                // console.log('adding ', star.fields);
                var geometry = new THREE.SphereGeometry(star.fields.absmag/1000);
                var material = new THREE.MeshBasicMaterial( { color: colorIndexToHex(star.fields.colorindex) } );
                var starVisual = new THREE.Mesh( geometry, material );

                var geometry = new THREE.SphereGeometry(0.1, 3, 3);
                var material = new THREE.MeshBasicMaterial( { transparent: true, opacity: 0 } );
                var starClick = new THREE.Mesh( geometry, material );
                starClick.add(starVisual);

                // var starMesh = new THREE.Sprite();
                // starMesh.scale = star.fields.absmag/700;
                starClick.position.x = star.fields.x;
                starClick.position.y = star.fields.y;
                starClick.position.z = star.fields.z;
                starClick.id = star.fields.starid;
                starClick.name = key;
                scene.add( starClick );
                starObjects.push(starClick);
            });
        }

        function colorIndexToHex(index) {
            var cS = ['0xadd8e6', '0xb7dde8', '0xc1e1e8', '0xcbe4e6', '0xd4e7e2', '0xdceadd', '0xe3ebd6', '0xeaeccd', '0xf0ecc4', '0xf6ebb9', '0xfae9ad', '0xffe6a1', '0xffe294', '0xffdd86', '0xffd778', '0xffcf6a', '0xffc65b', '0xffbc4c', '0xffaf3e', '0xffa130', '0xff9121', '0xff7d13', '0xff6605', '0xff4700', '0xff0000'];
            // from https://vis4.net/labs/multihue/0xcolors=lightblue, white, yellow, red|steps=25|bez=1|coL=0
            // index === 0 is -0.5, index = 5 is 0.0, index = 24 = 1.9
            if (!angular.isDefined(index) || index === null || index === '') {
                return 0xffffff;
            }
            var bmv = parseFloat(index);
            var idx = Math.round((bmv + 0.5) * 10);
            if (idx < 0) {
                idx = 0;
            }
            if (idx >= cS.length) {
                idx = cS.length - 1;
            }
            return parseInt(cS[idx] , 16);
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

        function onWindowResize() {

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize( window.innerWidth, window.innerHeight );

        }


        $scope.onClicked = function ( event ) {
            console.log('clicked');
            event.preventDefault();

            var vector = new THREE.Vector3( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1, 0.5 );
            projector.unprojectVector( vector, camera );

            var raycaster = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );

            var intersects = raycaster.intersectObjects( starObjects );

            if ( intersects.length > 0 ) {

                // intersects[ 0 ].object.material.color.setHex( Math.random() * 0xffffff );
                console.log('caught an intersection', intersects[0].object.name,$scope.stars[intersects[0].object.name]);
                $scope.selectedStar = $scope.stars[intersects[0].object.name];

                // var particle = new THREE.Sprite( particleMaterial );
                // particle.position.copy( intersects[ 0 ].point );
                // particle.scale.x = particle.scale.y = 16;
                // scene.add( particle );

            }

            /*
            // Parse all the faces
            for ( var i in intersects ) {

                intersects[ i ].face.material[ 0 ].color.setHex( Math.random() * 0xffffff | 0x80000000 );

            }
            */
        }





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





        var cameraRadius = 8;
        var origin = new THREE.Vector3(5,0,0);

        init();

        stars.get()
            .then(function(s) {
                $scope.stars = s;
                initialiseStars();
                render();
                $scope.selectedStar = $scope.stars[0];
            });


    });