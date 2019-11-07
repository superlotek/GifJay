(function() {

  let scene, renderer, camera, model, neck, waist, leftarm, rightarm, leftleg, rightleg, possibleAnims, mixer, idle, clock = new THREE.Clock(), currentlyAnimating = false, raycaster = new THREE.Raycaster(), loaderAnim = document.getElementById('js-loader');

  init();
  update();

  function init() {

    const MODEL_PATH = '../guts/models/nito_1.glb';
    const canvas = document.querySelector("#c");
    const backgroundColor = 0x0000ff;
    scene = new THREE.Scene();

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

    folderLocation = '../guts/models/';
    arr = [
    'checkered.jpg',
    'bark.jpg',
    'chex.jpg',
    'veggies.jpg',
    'click_suit01hresMesh.png',
    'rainbow1.jpg',
    'rainbow2.jpg',
    'catfur.jpg',
    'checkers_t.png',
    'maccheese.jpg'
    ];


    let stacy_txt = new THREE.TextureLoader().load(folderLocation + arr[Math.floor(Math.random() * arr.length)]);
    stacy_txt.flipY = false;
    stacy_mtl = new THREE.MeshPhongMaterial({
      map: stacy_txt,
      color: 0xffffff,
      skinning: true
    })

    var loader = new THREE.GLTFLoader();
    loader.load(
      MODEL_PATH,
      function(gltf) {
        model = gltf.scene;
        let fileAnimations = gltf.animations;
        // console.log(fileAnimations);
        model.traverse(o => {
          if (o.isMesh) {
            o.castShadow = true;
            o.receiveShadow = true;
            o.material = stacy_mtl;
            // console.log(o);
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
        model.scale.set(2,2,2);
        model.position.y = -16;
        scene.add(model);

        mixer = new THREE.AnimationMixer(model);
        let clips = fileAnimations.filter(val => val.name !== 'idle');
        // console.log(clips);

        possibleAnims = clips.map(val => {
          let clip = THREE.AnimationClip.findByName(clips, val.name);
          clip.tracks.splice(3,3);
          clip.tracks.splice(9,3);
          clip.tracks.splice(15,3);
          clip.tracks.splice(69,3);
          clip = mixer.clipAction(clip);

          return clip;
        });

        let idleAnim = THREE.AnimationClip.findByName(fileAnimations, 'idle');
        // console.log(idleAnim)
        idleAnim.tracks.splice(3,3);
        idleAnim.tracks.splice(9,3);
        idleAnim.tracks.splice(15,3);
        idleAnim.tracks.splice(69,3);

        idle = mixer.clipAction(idleAnim);
        idle.play();
      },
      undefined,
      function(error) {
        console.error(error);
      }  
    );


    let hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 1);

    hemiLight.position.set(0, 50, 0);
    scene.add(hemiLight);

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
    raycaster.setFromCamera(mouse, camera);

    var intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects[0]) {
      var object = intersects[0].object;
      let objectName = object.name;
          console.log(objectName);

      if (objectName.includes('click')) {

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
    }
  });


      // var material = new THREE.MeshBasicMaterial();
      var loader = new THREE.TextureLoader();

  var canvas = document.getElementsByTagName("canvas")[0];

  canvas.addEventListener("click", function() {
    console.log('clicking');


         loader.load(folderLocation + arr[Math.floor(Math.random() * arr.length)], function(tex) {
                var stacy_mat = new THREE.MeshBasicMaterial();
                stacy_mtl.map = tex;
        }); 

  });

 




  function getMousePos(e) {
    return { x: e.clientX, y: e.clientY };
    // console.log(e.clientX, e.clientY)
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
    
    if (x <= w.x / 2) {
      xdiff = w.x / 2 - x;  
      xPercentage = (xdiff / (w.x / 2)) * 100;
      dx = ((degreeLimit * xPercentage) / 100) * -1; }
    if (x >= w.x / 2) {
      xdiff = x - w.x / 2;
      xPercentage = (xdiff / (w.x / 2)) * 100;
      dx = (degreeLimit * xPercentage) / 100;
    }
    if (y <= w.y / 2) {
      ydiff = w.y / 2 - y;
      yPercentage = (ydiff / (w.y / 2)) * 100;
      dy = (((degreeLimit * 0.5) * yPercentage) / 100) * -1;
      }
    
    if (y >= w.y / 2) {
      ydiff = y - w.y / 2;
      yPercentage = (ydiff / (w.y / 2)) * 100;
      dy = (degreeLimit * yPercentage) / 100;
    }
    return { x: dx, y: dy };
  }




})();