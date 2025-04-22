
//Denne class holder styr på hele spillet sammen med andre classes.
//Timeren laves her samt round end, men meget af det er også i Player classen.
let savedTime = 0; //Ingen grund til at den er global, men ingen grund til at ændre det.

class SpilSkærm {

    constructor() {
        imageMode(CENTER);
        this.playerCharacter = new Player();
        this.roundTimer = 30;
        this.round = 1;
        this.enemies = [];
        this.dmgNumbers = [];
        this.enemySpawnRate = 5;
        this.enemySpawn = this.enemySpawnRate;
        //this.E1Sprite = new Animation(E1_billed,10);

    }
    run() {

        background(220);
        image(background_billed,0,0)
        image(background_billed,1000,0)
        image(background_billed,0,999)
        image(background_billed,1000,999)
        image(background_billed,2000,0)
        image(background_billed,2000,999)
        //this.E1Sprite.drawAnimation(1000,500,7,20,0);
        this.playerCharacter.run();
        let passedTime = millis() - savedTime;

        if (passedTime > 1000){
            this.roundTimer += -1;
            
            this.enemySpawn -= 1+(this.round*0.1);

            if (this.enemySpawn <= 0 && this.roundTimer > 0) {
                this.enemySpawn = this.enemySpawnRate;
                this.spawnEnemies(1);
            }


            savedTime = millis();
            //Health Regen laves her fordi fps ikke må påvirke det.
            
            this.playerCharacter.life += (0.2+this.playerCharacter.maxlife/500)*this.playerCharacter.regen/100;
            if (this.playerCharacter.life > this.playerCharacter.maxlife) {
                this.playerCharacter.life = this.playerCharacter.maxlife;
            }
        }
        for (let i = 0; i < this.dmgNumbers.length; i += 1) {
            this.dmgNumbers[i].run();
        }
        textAlign(CENTER);
        if (this.roundTimer > 0){
            text(this.roundTimer, width/2, 40)
        }
        fill(255,153,153);
        textSize(30);

        text("Round:" + this.round, 100, 40)
        for (let i = 0; i < this.enemies.length; i += 1) {
            this.enemies[i].run();
        }
        if (manager.aktuelleSkærm.playerCharacter.life <= 0) {
            manager.skiftGameState("slut");
        }

    }

    musKlikket(){
        this.playerCharacter.musKlikket();
    }
    spawnEnemies(antal) {

        for (let i = 0; i < antal; i += 1) {
            this.enemies.push(new Enemy());
        }
    }

    roundNew() {
        this.round += 1;
        this.roundTimer = 30;
        this.spawnEnemies(this.round + 4);
        if (this.playerCharacter.Q1Unlocked == true) {
            this.playerCharacter.Q.cooldown = 0;
        }
        if (this.playerCharacter.E1Unlocked == true) {
            this.playerCharacter.E.cooldown = 0;
        }
                        
        
        
    }

}
