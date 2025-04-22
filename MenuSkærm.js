class MenuSkærm{
  
  constructor(){

  }
  drawButton() {
    rect(width/2-200/2, height/4, 200, 50);
    textAlign(CENTER);
    fill(0,0,0);      
    text("START GAME", width/2, height/4+35);      
  }
  overStart() {
    if (height/4-5 < mouseY && mouseY < height/4+40 && mouseX > width/2-100 && mouseX < width/2+100) {
      return true;

    } else {
      return false;
    }
  }

  run(){
    background(220);
    fill(200, 100, 100);
    textSize(24);
    textAlign(CENTER);
    text("GRAND FIGHTER", width/2, height/8);
    this.drawButton();

  }
  musKlikket(){
    if (this.overStart()){
      manager.skiftGameState("spil");

      manager.aktuelleSkærm.spawnEnemies(5);
    }
  }
}