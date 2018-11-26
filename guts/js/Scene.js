// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// *** EFFECTS ***
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

const Scene = {

  saveCurrentScene() {
    currentScene.stage[0].bank = bankSelectorS1;
    currentScene.stage[1].bank = bankSelectorS2;
    currentScene.stage[0].location = gifSelectorS1.location;
    currentScene.stage[1].location = gifSelectorS2.location;
    currentScene.stage[0].name = gifSelectorS1.gif;
    currentScene.stage[1].name = gifSelectorS2.gif;
    currentScene.stage[0].blendMode = $(s1).css('mix-blend-mode');
    currentScene.stage[1].blendMode = $(s2).css('mix-blend-mode');
    currentScene.stage[0].filter = $(s1).css('filter');
    currentScene.stage[1].filter = $(s2).css('filter');
    currentScene.stage[0].repeat = $(s1).css('background-repeat');
    currentScene.stage[1].repeat = $(s2).css('background-repeat');
    currentScene.stage[0].bgSize = $(s1).css('background-size');
    currentScene.stage[1].bgSize = $(s2).css('background-size');
    return currentScene;
  }

};
