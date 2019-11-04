var analyser, canvas, ctx, random = Math.random, circles = [], imgs;

window.onload = function() {
    canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);
    ctx = canvas.getContext('2d');
        // imgs = new Image();
        // imgs.src = "robotdance_t.gif"
        // imgs.onload = () => {
        //     ctx.drawImage(imgs, canvas.width / 2, canvas.height / 2);

        // }
// ctx.globalCompositeOperation='destination-over';
    // base_image = new Image();
    // base_image.src = 'robotdance_t.gif';
    // base_image.onload = function() {
    //     ctx.drawImage(base_image, canvas.width/2, canvas.height/2);
    // }

    setupWebAudio();

    for (var i = 0; i < 50; i++) {
        circles[i] = new Circle();
        circles[i].draw();
    }
    draw();

};


var stop = false;
var frameCount = 0;
var results = document.getElementById('results');
var fps, fpsInterval, startTime, now, then, elapsed;

function startAnimating(fps) {
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    animate();
}

function animate() {

    // request another frame
    requestAnimationFrame(animate);
    // calc elapsed time since last loop
    now = Date.now();
    elapsed = now - then;
    // if enough time has elapsed, draw the next frame
    if (elapsed > fpsInterval) {
        // Get ready for next frame by setting then=now, but also adjust for your
        // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
        then = now - (elapsed % fpsInterval);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    	vlerp = getRandomColor(canvas.height);
        // ctx.drawImage(base_image, getRandomColor(canvas.width), getRandomColor(canvas.height), vlerp, vlerp * base_image.height / base_image.width);
            var freqByteData = new Uint8Array(analyser.frequencyBinCount);
            analyser.getByteFrequencyData(freqByteData);

		    var gif = document.getElementById("gif");

		    gif.style.filter = "invert(" + getRandomColor(2) + ") hue-rotate(" + Math.ceil(freqByteData[100] * 3) + "deg)";
		    result = ['no-repeat', 'repeat'];

		    whichRepeat = getRandomColor(2);
		    console.log(whichRepeat);
		    if (whichRepeat === 0) {
			    gif.style.backgroundRepeat = result[whichRepeat];
			    gif.style.backgroundSize = 'cover';
		    } else {
			    gif.style.backgroundRepeat = result[whichRepeat];
			    gif.style.backgroundSize = 'inherit';
		    }
            Mousetrap.trigger('space');

    }
}



function setupWebAudio() {
    var audio = document.createElement('audio');
    audio.src = "01 Sensee Party.mp3";
    // audio.controls = 'false';
    // document.body.appendChild(audio);
    // audio.style.width = window.innerWidth + 'px';
    
    var audioContext = new AudioContext();
    analyser = audioContext.createAnalyser();
    var source = audioContext.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(audioContext.destination);
    audio.play();
}

function draw() {

    requestAnimationFrame(draw);
    var freqByteData = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(freqByteData);
    // var gif = document.getElementById("gif");
    // // gif.style.backgroundRepeat = "repeat";
    // gif.style.filter = "hue-rotate(" + Math.ceil(freqByteData[100] * 2) + "deg) saturate(" + Math.ceil(freqByteData[100]/2) + ")";
    gleep = getRandomColor(500);
    // console.log(Math.ceil(freqByteData[100]/4));

    // if (freqByteData[100] > 100) {
    //     ctx.drawImage(imgs, getRandomColor(canvas.width), getRandomColor(canvas.height), gleep, gleep * imgs.height / imgs.width );
    //     ctx.rotate(getRandomColor(360));

    // }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // for (var i = 1; i < imgs.length; i++) {
        // imgs[i].src = "robotdance_t.gif"
        // imgs[i].onload = () => {
        //     ctx.drawImage(imgs[i], i * 5, i * 5)
        // }
    // }

    for (var i = 1; i < circles.length; i++) {
        circles[i].radius = freqByteData[i] / 2;
        circles[i].y = circles[i].y > canvas.height ? 0 : circles[i].y + freqByteData[i]/50;
        circles[i].draw();
    }
    
    // for (var i = 1; i < freqByteData.length; i += 5){
    //     ctx.fillStyle = 'rgb(' + getRandomColor(255) + ',' + getRandomColor(255) + ',' + getRandomColor(255) + ')';
    //     ctx.fillRect(i + 300, canvas.height - freqByteData[i] * 1.5, 5, canvas.height);
    //     ctx.strokeRect(i + 300, canvas.height - freqByteData[i] * 1.5, 5, canvas.height);
    // }

    // ctx.drawImage(base_image, getRandomColor(canvas.width), getRandomColor(canvas.height));


}

startAnimating(1);


function getRandomColor(numbah){
    return random() * numbah >> 0;
}

function Circle() {
    this.x = random() * canvas.width;
    this.y = random() * canvas.height;
    this.radius = random() * 100 + 50;
    this.color = 'rgb(' + getRandomColor(255) + ',' + getRandomColor(255) + ',' + getRandomColor(255) + ')';    
}

Circle.prototype.draw = function() {
    var that = this;
    ctx.save();
    ctx.beginPath();
    ctx.globalAlpha = random() / 2 + 0.2;
    ctx.arc(that.x, that.y, that.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
}