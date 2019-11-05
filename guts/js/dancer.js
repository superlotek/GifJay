(function() {

  let scene, renderer, camera, model, neck, waist, leftarm, rightarm, leftleg, rightleg, possibleAnims, mixer, idle, clock = new THREE.Clock(), currentlyAnimating = false, raycaster = new THREE.Raycaster(), loaderAnim = document.getElementById('js-loader');

  init();
  update();

  function init() {

    const MODEL_PATH = '../guts/models/asianDancer.glb';
    const canvas = document.querySelector("#c");
    // const canvas = document.getElementById("c");
    const backgroundColor = 0x0000ff;
    scene = new THREE.Scene();
    // scene.background = new THREE.Color(backgroundColor);
    // scene.fog = new THREE.Fog(backgroundColor, 60, 100);

    renderer = new THREE.WebGLRenderer({canvas, antialias: true, alpha: true});
    // renderer.shadowMap.enabled = true;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor( 0x000000, 0 );

    const glerp = document.getElementById("canvas-container");
    glerp.appendChild(renderer.domElement);

    // document.body.appendChild(renderer.domElement);

    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;
    camera.position.x = 0;
    camera.position.y = -3;


    let stacy_txt = new THREE.TextureLoader().load('../guts/models/newskin2.jpg');
    stacy_txt.flipY = false;
    const stacy_mtl = new THREE.MeshPhongMaterial({
      // map: stacy_txt,
      color: 0xffffff,
      skinning: true
    })

    var loader = new THREE.GLTFLoader();
    loader.load(
      MODEL_PATH,
      function(gltf) {
        model = gltf.scene;
        let fileAnimations = gltf.animations;
        model.traverse(o => {
          if (o.isMesh) {
            o.castShadow = true;
            o.receiveShadow = true;
            o.material = stacy_mtl;
          }
          if (o.isBone && o.name === 'mixamorigNeck') {
            neck = o;
          }
          if (o.isBone && o.name === 'mixamorigSpine') {
            waist = o;
          }
          if (o.isBone && o.name === 'mixamorigLeftArm') {
            leftarm = o;
          }
          if (o.isBone && o.name === 'mixamorigRightArm') {
            rightarm = o;
          }
          if (o.isBone && o.name === 'mixamorigLeftUpLeg') {
            leftleg = o;
          }
          if (o.isBone && o.name === 'mixamorigRightUpLeg') {
            rightleg = o;
          }



        });
        model.scale.set(10,10,10);
        model.position.y = -12;
        scene.add(model);
        // loaderAnim.remove();

        mixer = new THREE.AnimationMixer(model);
        let clips = fileAnimations.filter(val => val.name !== 'uprock1');
        console.log(clips);

        possibleAnims = clips.map(val => {
          let clip = THREE.AnimationClip.findByName(clips, val.name);
          clip.tracks.splice(3,3);
          clip.tracks.splice(9,3);
          clip.tracks.splice(15,3);
          clip.tracks.splice(69,3);
          // clip.tracks.splice(120,3);
          // clip.tracks.splice(129,3);
          clip = mixer.clipAction(clip);

          return clip;
        });

        let idleAnim = THREE.AnimationClip.findByName(fileAnimations, 'uprock1');
        // console.log(idleAnim)
        idleAnim.tracks.splice(3,3);
        idleAnim.tracks.splice(9,3);
        idleAnim.tracks.splice(15,3);
        idleAnim.tracks.splice(69,3);
        // idleAnim.tracks.splice(120,3);
        // idleAnim.tracks.splice(129,3);

        idle = mixer.clipAction(idleAnim);
        idle.play();
      },
      undefined,
      function(error) {
        console.error(error);
      }  
    );

    // let geometry = new THREE.SphereGeometry(8, 32, 32);
    // let material = new THREE.MeshBasicMaterial({ color: 0x9bffaf});
    // let sphere = new THREE.Mesh(geometry, material);
    // sphere.position.z = -15;
    // sphere.position.y = -2.5;
    // sphere.position.x = -0.25;
    // scene.add(sphere);


    // let hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.61);
    let hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 1);

    hemiLight.position.set(0, 50, 0);
    scene.add(hemiLight);

    // let d = 8.25;
    // let dirLight = new THREE.DirectionalLight(0xffffff, .54);
    // dirLight.position.set(-8, 12, 8);
    // dirLight.castShadow = true;
    // dirLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
    // dirLight.shadow.camera.near = 0.1;
    // dirLight.shadow.camera.far = 1500;
    // dirLight.shadow.camera.left = d * -1;
    // dirLight.shadow.camera.right = d;
    // dirLight.shadow.camera.top = d;
    // dirLight.shadow.camera.bottom = d * -1;
    // scene.add(dirLight);

    // let floorGeometry = new THREE.PlaneGeometry(5000, 5000, 1, 1);
    // let floorMaterial = new THREE.MeshPhongMaterial({ color: 0xffff00, shininess: 0 })
    // let floor = new THREE.Mesh(floorGeometry, floorMaterial);
    // floor.rotation.x = -0.5 * Math.PI;
    // floor.receiveShadow = true;
    // floor.position.y = -11;
    // scene.add(floor)
  };

  function update() {
    if (mixer) {
      mixer.update(clock.getDelta());
    }

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    renderer.render(scene, camera);
    requestAnimationFrame(update);

      // model.rotation.x += .05;
      // model.rotation.y += .01;

  }

  function resizeRendererToDisplaySize() {
    const canvas = renderer.domElement;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let canvasPixelWidth = canvas.width / window.devicePixelRatio;
    let canvasPixelHeight = canvas.height * window.devicePixelRatio;

    const needResize = canvasPixelWidth !== width || canvasPixelHeight !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  window.addEventListener('click', e => raycast(e));
  window.addEventListener('touchend', e => raycast(e, true));

  function raycast(e, touch = false) {
    var mouse = {};
    if (touch) {
      mouse.x = 2 * (e.changedTouches[0].clientX / window.innerWidth) - 1;
      mouse.y = 1 - 2 * (e.changedTouches[0].clientY / window.innerHeight);
    } else {
      mouse.x = 2 * (e.clientX / window.innerWidth) - 1;
      mouse.y = 1 - 2 * (e.clientY / window.innerHeight);
    }
    // update the picking ray with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);

    // calculate objects intersecting the picking ray
    var intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects[0]) {
      var object = intersects[0].object;

      if (object.name === 'asian') {

        if (!currentlyAnimating) {
          currentlyAnimating = true;
          playOnClick();
        }
      }
    }
  }

  function playModifierAnimation(from, fSpeed, to, tSpeed) {
    to.setLoop(THREE.LoopOnce);
    to.reset();
    to.play();
    from.crossFadeTo(to, fSpeed, true);
    setTimeout(function() {
      from.enabled = true;
      to.crossFadeTo(from, tSpeed, true);
      currentlyAnimating = false;

    }, to._clip.duration * 1000 - ((tSpeed + fSpeed) * 1000));
  }

  function playOnClick() {
    let anim = Math.floor(Math.random() * possibleAnims.length) + 0;
    playModifierAnimation(idle, 0, possibleAnims[anim], 0);
  }

  document.addEventListener('mousemove', function(e) {
    var mousecoords = getMousePos(e);
    if (neck && waist) {
      moveJoint(mousecoords, neck, 360);
      moveJoint(mousecoords, waist, 360);
      moveJoint(mousecoords, leftarm, 300);
      moveJoint(mousecoords, rightarm, 360);
      // moveJoint(mousecoords, leftleg, 300);
      // moveJoint(mousecoords, rightleg, 300);
    }
  });

  function getMousePos(e) {
    return { x: e.clientX, y: e.clientY };
    console.log(e.clientX, e.clientY)
  }

  function moveJoint(mouse, joint, degreeLimit) {
    let degrees = getMouseDegrees(mouse.x, mouse.y, degreeLimit);
    joint.rotation.y = THREE.Math.degToRad(degrees.x);
    joint.rotation.x = THREE.Math.degToRad(degrees.y);
  }

  function getMouseDegrees(x, y, degreeLimit) {
    let dx = 0,
    dy = 0,
    xdiff,
    xPercentage,
    ydiff,
    yPercentage;

    let w = { x: window.innerWidth, y: window.innerHeight };
    // Left (Rotates neck left between 0 and -degreeLimit)
    
     // 1. If cursor is in the left half of screen
    if (x <= w.x / 2) {
      // 2. Get the difference between middle of screen and cursor position
      xdiff = w.x / 2 - x;  
      // 3. Find the percentage of that difference (percentage toward edge of screen)
      xPercentage = (xdiff / (w.x / 2)) * 100;
      // 4. Convert that to a percentage of the maximum rotation we allow for the neck
      dx = ((degreeLimit * xPercentage) / 100) * -1; }
  // Right (Rotates neck right between 0 and degreeLimit)
    if (x >= w.x / 2) {
      xdiff = x - w.x / 2;
      xPercentage = (xdiff / (w.x / 2)) * 100;
      dx = (degreeLimit * xPercentage) / 100;
    }
    // Up (Rotates neck up between 0 and -degreeLimit)
    if (y <= w.y / 2) {
      ydiff = w.y / 2 - y;
      yPercentage = (ydiff / (w.y / 2)) * 100;
      // Note that I cut degreeLimit in half when she looks up
      dy = (((degreeLimit * 0.5) * yPercentage) / 100) * -1;
      }
    
    // Down (Rotates neck down between 0 and degreeLimit)
    if (y >= w.y / 2) {
      ydiff = y - w.y / 2;
      yPercentage = (ydiff / (w.y / 2)) * 100;
      dy = (degreeLimit * yPercentage) / 100;
    }
    return { x: dx, y: dy };
  }




})();