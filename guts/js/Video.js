// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// *** VIDEO ***
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

// const videoArray = ['chairdance2.mp4', 'chairdance3.mp4', 'checkeredDance.mp4', 'drivetest1.mp4', 'drivetest2.mp4', 'treewalk.mp4', 'checkeredDance_fx2.mov', 'checkeredDance_fx3.mov', 'checkeredDance_fx4.mov', 'checkeredDance_fx5.mov', 'checkeredDance_fx6.mov', 'checkeredDance_fx7.mov', 'checkeredDance_fx8.mov', 'checkeredDance_fx9.mov', 'rootboy1.mp4','rootboy3.mp4','rootboy3.mp4','rootboy4.mp4','rootboy5.mp4','mood1.mp4','mood2.mp4','mood3.mp4','pigeonComputers1.mp4','pigeonComputers2.mp4','pigeonComputers3.mp4','pigeonComputers4.mp4','pigeonComputers5.mp4'];
// const videoBinLocation = "Bins/_Video/";

const Video = {

  switchVideo() {
    console.log('SWITCH VIDEO: ON');
    let videoDuration = videoExternal.duration;
    // window.opener.videoInternal[0].currentTime = Math.ceil(Math.random() * (videoDuration - beatTime/1000));
    // window.opener.videoInternal[1].currentTime = Math.ceil(Math.random() * (videoDuration - beatTime/1000));
    window.opener.$('.stage-video').currentTime = Math.ceil(Math.random() * (videoDuration - beatTime/1000));
    videoExternal.currentTime = Math.ceil(Math.random() * (videoDuration - beatTime/1000));

  },

  randomVideo() {
    console.log('RANDOM VIDEO FUNCTION');
    randomVideo = playlist.video.clips[Math.floor(Math.random() * playlist.video.clips.length)].name;
    // console.log('randomVideo', randomVideo);
    randomizedVideoSrc = videoBinLocation + randomVideo;
    // window.opener.video.src = randomizedVideoSrc;
    // window.opener.video[1].src = randomizedVideoSrc;
    videoExternal.src = randomizedVideoSrc;
    window.opener.changeRando();
  },

  rewindVideo() {
       intervalRewind = setInterval(function(){
       video.playbackRate = 1.0;
       if(video.currentTime == 0){
           clearInterval(intervalRewind);
           video.pause();
       }
       else{
           video.currentTime += -.1;
       }
    },30);

  }


};
