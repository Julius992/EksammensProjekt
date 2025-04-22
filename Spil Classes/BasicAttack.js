class BaseAttack {
    constructor (x,y) {
        this.x = x;
        this.y = y;
        this.cooldownMax = 1;
        this.cooldown = this.cooldownMax;
        this.savedTime = millis();
        this.animation = new Animation(basic_billed,5);
        this.hits = [];
        this.baseDmg = 20;
        this.framesExisted = 0;
        

    }   

    run(){
        this.x = manager.aktuelleSkærm.playerCharacter.x;
        this.y = manager.aktuelleSkærm.playerCharacter.y;

        this.angle = atan2(mouseY - this.y, mouseX - this.x);

        if (this.framesExisted < 10) {
            
            this.framesExisted += 1;
            
            this.animation.drawAnimation(this.x,this.y,2,this.angle,50);



            for (let i = 0; i < manager.aktuelleSkærm.enemies.length; i += 1) {
                if (manager.aktuelleSkærm.enemies[i].checkAdvancedCollision(createVector(this.x+cos(this.angle)*50-40,this.y+sin(this.angle)*50-40+85),createVector(this.x+cos(this.angle)*50-40,this.y+sin(this.angle)*50-40),createVector(this.x+cos(this.angle)*50-40+73,this.y+sin(this.angle)*50-40),createVector(this.x+cos(this.angle)*50-40+73,this.y+sin(this.angle)*50-40+85)) == true) {

                    if (this.hits.includes(manager.aktuelleSkærm.enemies[i]) != true) {
                        
                        manager.aktuelleSkærm.enemies[i].hit(this.baseDmg,1);
                        this.hits.push(manager.aktuelleSkærm.enemies[i]);
                        
                    }

                    
                }
            }


        }
        if (millis()-this.savedTime > 50) {
            this.cooldown -= 0.05*(100+manager.aktuelleSkærm.playerCharacter.atkspd)/100; 
            
            this.savedTime = millis();
        }
    }
}