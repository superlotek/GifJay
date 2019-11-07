var analyser, canvas, ctx, random = Math.random, circles = [], imgs;

window.onload = function() {
    canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);
    ctx = canvas.getContext('2d');

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
    if (robomodeOn !== 1) {
        return;
    }

    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    animate();
    console.log('fps: ', fps);
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

		    gif.style.filter = "invert(" + getRandomColor(2) + ") hue-rotate(" + Math.ceil(freqByteData[100] * 3) + "deg) saturate(" + Math.ceil(freqByteData[100] / 8) + ")";
		    result = ['no-repeat', 'repeat'];

		    whichRepeat = getRandomColor(2);
		    // console.log(whichRepeat);
		    if (whichRepeat === 0) {
			    gif.style.backgroundRepeat = result[whichRepeat];
			    gif.style.backgroundSize = 'cover';
		    } else {
			    gif.style.backgroundRepeat = result[whichRepeat];
			    gif.style.backgroundSize = 'inherit';
		    }
            // Mousetrap.trigger('space');

    }
}



function setupWebAudio() {
    var audio = document.createElement('audio');
    audio.src = "sexjudas.mp3";
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

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (var i = 1; i < circles.length; i++) {
        circles[i].radius = freqByteData[i] / 2;
        circles[i].x = circles[i].x > canvas.width ? 0 : circles[i].x + freqByteData[i]/50;
        circles[i].draw();
    }
    
}

console.log('CANVAS BEAT TIME : ', beatTime);
// startAnimating(beatTime/1000);


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