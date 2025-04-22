class GameStateManager {
  constructor() {
    this.skærme = {}; 
    this.aktuelleSkærm = null;
  }

  opretGameState(navn, state) {
    this.skærme[navn] = state; 
  }
  
  skiftGameState(skærmNavn){
    this.aktuelleSkærm = this.skærme[skærmNavn]
  };
  runState(){
    this.aktuelleSkærm.run();
  }
}