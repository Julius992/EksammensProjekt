class E1Ability {
    constructor () {

        this.exist = true;
        this.cooldownMax = 10;
        this.cooldown = this.cooldownMax;
        this.savedTime = millis();
        this.hits = [];
        this.currentPath = createVector(mouseX,mouseY);
        
        this.angle = atan2(mouseY - manager.aktuelleSkærm.playerCharacter.y, mouseX - manager.aktuelleSkærm.playerCharacter.x);
        this.animation = new Animation(E1_billed,10);
        //Cooldown reduction skal ændre på ticksne i cooldownMax.
        this.framesExisted = 0;
        this.length = 500;
        this.width = 75;
        this.framesDmg = -5;
    }
    run(){
        
        if (this.exist == true) {
            
            this.angle = atan2(mouseY - manager.aktuelleSkærm.playerCharacter.y, mouseX - manager.aktuelleSkærm.playerCharacter.x);
            this.animation.drawAnimation(manager.aktuelleSkærm.playerCharacter.x,manager.aktuelleSkærm.playerCharacter.y,4,this.angle,0,"centerCorner",500);
            this.framesExisted += 1;
            this.framesDmg += 1;

            if (this.framesDmg >= 5){
                angleMode(DEGREES);
                this.framesDmg = 0;
                let playery = manager.aktuelleSkærm.playerCharacter.y;
                let playerx = manager.aktuelleSkærm.playerCharacter.x;
                this.framesDmg = 0;

                this.vp2 = createVector(sin(this.angle)*this.width/2,-cos(this.angle)*this.width/2);
                this.vp1 = createVector(-sin(this.angle)*this.width/2,cos(this.angle)*this.width/2);
                this.p1 = createVector(playerx+this.vp1.x,playery+this.vp1.y);
                this.p2 = createVector(playerx+this.vp2.x,playery+this.vp2.y);

                this.vp3 = createVector(this.length*cos(this.angle),this.length*sin(this.angle));

                this.vp4 = this.vp3;
                

                this.p3 = createVector(this.p2.x+this.vp3.x,this.p2.y+this.vp3.y);
                this.p4 = createVector(this.p3.x+this.vp1.x*2,this.p3.y+this.vp1.y*2);




                


                for (let i = 0; i < manager.aktuelleSkærm.enemies.length; i += 1) {
                    if (manager.aktuelleSkærm.enemies[i].checkAdvancedCollision(this.p1,this.p2,this.p3,this.p4) == true){

                        manager.aktuelleSkærm.enemies[i].hit(15,0);
                    }

                    



                }                
             
            }

            
            if (this.framesExisted >= 45) {
                this.exist = false;
            }
        }
        
        if (manager.aktuelleSkærm.playerCharacter.E1Unlocked == true) {
            if (millis()-this.savedTime > 100) {
                this.cooldown -= 0.1*(100+manager.aktuelleSkærm.playerCharacter.haste)/100; 
                this.savedTime = millis();
            }
                           
        }        
    } 
}