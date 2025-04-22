
class SlutSkærm {

    constructor() {
      this.R =10;
      this.G =10;
      this.B = 10;
    }
    run () {
      background(this.R,this.G,this.B)
      textSize(50);
      text("GAME OVER", width/2, height/2);
      textSize(30);
      text("Press to restart", width/2, height/2+40);


    }
    musKlikket() {
      console.log("virker");


      manager.opretGameState("spil2", new SpilSkærm());

      manager.skiftGameState("spil2");

      manager.aktuelleSkærm.spawnEnemies(5);  
    }
  }