// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// *** HUD ***
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

Mousetrap.bind('`', function() {
  myWindow = window.open("hud.html","hudder","width=600,height=600");
});

// $('#hudOpen').click(function() {
//   myWindow = window.open("hud.html","hudder","width=600,height=600");
// });


const Hud = {

  openHud() {
    $('#hudOpen').click(function() {
      myWindow = window.open("hud.html","hudder","width=600,height=600");
    });
  },

  closeHud() {
    $('#hudClose').click(function() {
      myWindow.close();
    });
  },

  changeHud() {
    $('#color').click(function() {
      myWindow.$('body').css('background', 'green');
    });
  }

};
