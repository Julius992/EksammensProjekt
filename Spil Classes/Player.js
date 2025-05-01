
class Player {
    constructor() {
        this.life = 100;
        this.maxlife = 100;
        this.armor = 0;
        this.dmg = 100;
        this.haste = 0;
        this.x = 100;
        this.y = 100;
        this.speed = 100;
        this.atkspd = 0;
        this.velocityX = 0;
        this.velocityY = 0;
        this.animH = new Animation(player_billed,7);
        this.animV = new Animation(playerV_billed,7);
        this.plays = this.animH;
        this.qUsedOnce = false;
        this.eUsedOnce = false;
        this.upgradeArray = ["Haste","Speed","Damage","Q1","Armor","Life","Regen","Attack Speed","E1"];
        this.choices = [];
        this.Q1Unlocked = false;
        this.E1Unlocked = false;
        this.regen = 100;
        this.path = createVector(0,0);
        this.atk = new BaseAttack(this.x,this.y);
        this.atk.framesExisted = 11;

        
    }
    styrPlayer() {

        this.path.x = 0;
        this.path.y = 0;
        if (keyIsDown(81)) {
            if (this.Q1Unlocked == true) {
                if (this.Q.cooldown < 0) {
                    this.qAbility();
                    
                }
                
            }
        }
        if (keyIsDown(69)) {
            if (this.E1Unlocked == true) {
                if (this.E.cooldown < 0) {
                    this.eAbility();
                    
                }
                
            }
        }
        if (mouseIsPressed) {
            this.baseAttack();
        }
        if (keyIsDown(87)) {
            
            this.path.y -= 1;
        }
        if (keyIsDown(83)) {
            this.path.y += 1;
        }

        if (keyIsDown(65)) {
            this.path.x -= 1;
        }
        if (keyIsDown(68)) {
            this.path.x += 1;
        }
        //Løsning til at finde ud af om 2 knapper trykkes så karakteren skal gå skråt.
        if((this.path.x)*(this.path.x)+(this.path.y)*(this.path.y)==2) {

            this.x += 0.7071*this.path.x*this.speed/100;
            this.y += 0.7071*this.path.y*this.speed/100;
        } else {
            this.x += this.path.x*this.speed/100;
            this.y += this.path.y*this.speed/100;
        }

        //højre venstre orientering.
        if (this.path.x > 0) {
            this.plays = this.animH;
        } else if (this.path.x < 0) {
            this.plays = this.animV;
        }        

    }
    qAbility() {
        let path = createVector(mouseX - this.x, mouseY - this.y);
        let slashX = this.x;
        let slashY = this.y;

        this.qUsedOnce = true;
        this.Q = new Q1Ability(path,slashX,slashY);

    }
    eAbility() {
        this.eUsedOnce = true;
        this.E = new E1Ability();

    }
    choiceRecreate(selected){
        for (let i=0;i<3;i+=1) {
            if (this.choices[i] == "Q1"){
                if (selected != this.choices[i]){
                    this.upgradeArray.push(this.choices[i]);
                }
            } else if (this.choices[i] == "E1"){
                if (selected != this.choices[i]){
                    this.upgradeArray.push(this.choices[i]);
                }                
            } else {
                this.upgradeArray.push(this.choices[i]);
            }

            
        }   
        
    }
    upgrade(n){
        if (this.choices[n] == "Speed") {
            this.speed += 25;
            this.choiceRecreate(this.choices[n]);
        } else if (this.choices[n] == "Haste") {
            this.haste += 15;
            this.choiceRecreate(this.choices[n]);
        } else if (this.choices[n] == "Damage") {
            this.dmg += 10;
            this.choiceRecreate(this.choices[n]);
        } else if (this.choices[n] == "Armor") {
            this.armor += 20;
            this.choiceRecreate(this.choices[n]);
        } else if (this.choices[n] == "Life") {
            this.maxlife += 25;
            this.life += 25;
            this.choiceRecreate(this.choices[n]);
        } else if (this.choices[n] == "Q1") {
            this.qAbility();
            this.Q.cooldown = 0;
            this.Q1Unlocked = true;
            this.Q.exist = false;
            this.choiceRecreate(this.choices[n]);
        } else if (this.choices[n] == "Regen") {
            this.regen += 30;
            this.choiceRecreate(this.choices[n]);
        } else if (this.choices[n] == "Attack Speed") {
            this.atkspd += 20;
            this.choiceRecreate(this.choices[n]);
        } else if (this.choices[n] == "E1") {
            this.eAbility();
            this.E.cooldown = 0;
            this.E1Unlocked = true;
            this.E.exist = false;
            this.choiceRecreate(this.choices[n]);
        }
        manager.aktuelleSkærm.roundNew();

    }

    musKlikket(){
        
        if (manager.aktuelleSkærm.roundTimer < 0) {
            if (mouseX > 120 && mouseX < 70+(width-200)/3 && mouseY > 250 && mouseY < 650) {
                this.upgrade(0);

            }

            if (mouseX > (width-200)/3*1+120 && mouseX < (width-200)/3*1+520 && mouseY > 250 && mouseY < 650) {
                this.upgrade(1);
                
            }
            if (mouseX > (width-200)/3*2+120 && mouseX < (width-200)/3*2+520 && mouseY > 250 && mouseY < 650) {
                this.upgrade(2);
                
            }
        }  
    }
    baseAttack() {
        
        if (this.atk.cooldown <= 0) {
            this.atk = new BaseAttack(this.x,this.y);
        }
    }
    worldBorder() {
        if (this.x > width) {
            this.x = width;
        }
        if (this.x < 0) {
            this.x = 0;
        }
        if (this.y > height) {
            this.y = height;
        }
        if (this.y < 0) {
            this.y = 0;
        }
    }
    run (){

        imageMode(CENTER);
        //Basic attack
        this.worldBorder();
        this.atk.run();

        //Controls and movement
        this.styrPlayer();
        this.x += this.velocityX;
        this.y += this.velocityY;
        this.plays.x = this.x;
        this.plays.y = this.y;

        this.qDuration += 1;
    
        //Character 
        this.plays.drawAnimation(this.x,this.y,5);
        this.drawHealth();  
        this.drawAbilityBar(); 
        if (this.qUsedOnce ==true) {
            this.Q.run();
        }
        if (this.eUsedOnce ==true) {
            this.E.run();
        }
        //Har ikke lavet det til en funktion da jeg ikke skal bruge det andre steder.
        if (manager.aktuelleSkærm.roundTimer == 0) {
            manager.aktuelleSkærm.enemies = [];
            manager.aktuelleSkærm.roundTimer -= 1;
            this.choices = [];
            for (let n=0;n<3;n+=1) {
                let randomNum = Math.floor(Math.random()*(this.upgradeArray.length));
                this.choices.push(this.upgradeArray[randomNum]);
                this.upgradeArray.splice(randomNum,1);
            }
     
        }
        //valgte at putte boksen for choices ind i Player, fordi det ændre på Player stats.
        if (manager.aktuelleSkærm.roundTimer < 0) {
            fill(0)
            rect(100,50,width-200,height);
            manager.aktuelleSkærm.dmgNumbers = [];
            
            
            for (let n=0;n<3; n+=1){
                fill(255);
                textSize(50);
                let choiceString = this.choices[n];
                if (choiceString == "Q1"){
                    choiceString = "Bloody Slash";
                }
                if (choiceString == "E1"){
                    choiceString = "Thunder Beam";
                }
                text(choiceString,325+n/3*(width-200),200);
                this.drawingChoice(choiceString,n);
                
            }

        }
        
    }
    drawingChoice(Selected,n){
        push();
        fill(155);
        textSize(20);
        if (Selected == "Bloody Slash") {
            fill(0,0,255)
            rect(120 + (445*n), 250,400,400)
            
            fill(155);
            image(qSlash_ikonL, 100+(width-200)/3*(n+0.5), 450);

            text("Deal 500% dmg to a single enemy.",100+(width-200)/3*(n+0.5),690)
            text("Applies on-hit and scales with attack speed.",100+(width-200)/3*(n+0.5),720)      
            text("Select as Q ability.",100+(width-200)/3*(n+0.5),750)        
        } else if (Selected == "Speed") {
            image(boots_billed, 100+(width-200)/3*(n+0.5), 450);
            text("Gain 25% bonus movement speed.",100+(width-200)/3*(n+0.5),690)            
        } else if (Selected == "Thunder Beam") {
            image(thunderbeam_ikon1, 100+(width-200)/3*(n+0.5), 450);
            text("Deal 600% base dmg to a line of enemies",100+(width-200)/3*(n+0.5),690)  
            text("Select as E ability.",100+(width-200)/3*(n+0.5),720)  
        } else if (Selected == "Regen") {
            image(Regen_ikon, 100+(width-200)/3*(n+0.5), 450);
            text("Gain 30% more passive health regeneration",100+(width-200)/3*(n+0.5),690)  
        } else if (Selected == "Life") {
            image(Life_ikon, 100+(width-200)/3*(n+0.5), 450);
            text("Gain 30% bonus hit points",100+(width-200)/3*(n+0.5),690)  
        } else if (Selected == "Armor") {
            image(Armor_ikon, 100+(width-200)/3*(n+0.5), 450);
            text("Gain 20 armor",100+(width-200)/3*(n+0.5),690)  
        } else if (Selected == "Damage") {
            image(Dmg_ikon, 100+(width-200)/3*(n+0.5), 450);
            text("Gain 10% bonus damage",100+(width-200)/3*(n+0.5),690)  
        } else if (Selected == "Attack Speed") {
            image(AtkSpd_ikon, 100+(width-200)/3*(n+0.5), 450);
            text("Gain 20% bonus attack speed",100+(width-200)/3*(n+0.5),690)  
        } else if (Selected == "Haste") {
            image(Haste_ikon, 100+(width-200)/3*(n+0.5), 450);
            text("Gain 15 haste",100+(width-200)/3*(n+0.5),690)  
        }

        pop();
    }


    drawAbilityBar() {
        fill(200);
        rect(width/2-145,height-35,40,40);




        fill(200);
        rect(width/2-95,height-35,40,40);
        rect(width/2-45,height-35,40,40);
        rect(width/2+5,height-35,40,40);
        rect(width/2+55,height-35,40,40);
        rect(width/2+105,height-35,40,40);

        if (this.Q1Unlocked == true) {
            fill(0);

            if (this.Q.cooldown > 0) {

                arc(width/2-125,height-15, 40, 40, 0, 360*(this.Q.cooldown/this.Q.cooldownMax));

            }
            image(qSlash_icon,width/2-127,height-18);
                
        }
        if (this.E1Unlocked == true) {
            fill(0);

            if (this.E.cooldown > 0) {

                arc(width/2-25,height-15, 40, 40, 0, 360*(this.E.cooldown/this.E.cooldownMax));

            }
            image(E1Ikon,width/2-27,height-18);
                
        }


    }
    drawHealth(){
        fill(220);
        rect(width/2-150, height-60, 300, 20);
        fill(50,205,50);
        rect(width/2-150, height-60, 300*this.life/this.maxlife, 20);        
    }
}
