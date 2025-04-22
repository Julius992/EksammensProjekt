class Q1Ability {
    constructor (path,x,y) {
        this.x = x;
        this.y = y;
        this.path = path;
        this.exist = true;
        this.cooldownMax = 4;
        this.cooldown = this.cooldownMax;
        this.savedTime = millis();
        this.length = 50;
        this.width = 50;
        //Cooldown reduction skal ændre på ticksne i cooldownMax.
        this.angle = atan2(mouseY - manager.aktuelleSkærm.playerCharacter.y, mouseX - manager.aktuelleSkærm.playerCharacter.x);
    }
    run(){
        
        if (this.exist == true) {
            for (let i = 0; i < manager.aktuelleSkærm.enemies.length; i += 1) {
                angleMode(DEGREES);

                this.vp1 = createVector(-sin(this.angle)*this.width,cos(this.angle)*this.width);

                this.p2 = createVector(this.x,this.y);

                this.p1 = createVector(this.p2.x+this.vp1.x,this.p2.y+this.vp1.y);     


                this.vp2 = createVector(-this.vp1.y,this.vp1.x);
                
                this.p3 = createVector(this.p2.x-this.vp2.x,this.p2.y-this.vp2.y);    
                
                this.p4 = createVector(this.p3.x+this.vp1.x,this.p3.y+this.vp1.y);     


                if (manager.aktuelleSkærm.enemies[i].checkAdvancedCollision(this.p1,this.p2,this.p3,this.p4) == true ) {
    
                   
                    if (this.exist == true){
                        manager.aktuelleSkærm.enemies[i].hit(100,0);
                    } 
                        
                    this.exist = false;
                }
            }
            this.length =  sqrt(this.path.x*this.path.x+this.path.y*this.path.y);
            this.x += this.path.x/this.length*10;
            this.y += this.path.y/this.length*10;
            
            push();
            translate(this.x,this.y);
            rotate(this.angle);
            imageMode(CORNER);
            image(qSlash_billed,0,0);
            pop();


        }
        

        if (manager.aktuelleSkærm.playerCharacter.Q1Unlocked == true) {
            if (millis()-this.savedTime > 100) {
                this.cooldown -= 0.1*(100+manager.aktuelleSkærm.playerCharacter.atkspd)/100; 
                this.savedTime = millis();
            }
                           
        }        
    } 
}