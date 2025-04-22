class Enemy {
    constructor () {
        this.x = random(0,width);
        this.y = random(0,height);
        this.anima = new Animation(goblin_billed,5);
        this.life = 30+(30*(manager.aktuelleSkærm.round/10));
        this.dmg = 10+(10*(manager.aktuelleSkærm.round/15));
    }
    run() {
        this.path = createVector(manager.aktuelleSkærm.playerCharacter.x-this.x,manager.aktuelleSkærm.playerCharacter.y-this.y)
        this.length = sqrt(this.path.x*this.path.x+this.path.y*this.path.y)
        this.x += this.path.x/this.length;
        this.y += this.path.y/this.length;
        this.anima.drawAnimation(this.x,this.y,7);
        this.checkCollisionPlayer();
        //rect(this.x-22,this.y-32,1,1)

        if (this.life <= 0) {
            this.delete();
        }

    }
    hit(amount,onhit){
        let finaldmg;
        finaldmg = amount*(manager.aktuelleSkærm.playerCharacter.dmg/100);
        this.life -= finaldmg;
        
        manager.aktuelleSkærm.dmgNumbers.push(new DmgNumber(round(finaldmg,2),this.x,this.y));
    }
    delete(){
        
        manager.aktuelleSkærm.enemies.splice(manager.aktuelleSkærm.enemies.indexOf(this),1);

    }
    checkCollisionPlayer() {
        if (this.x > manager.aktuelleSkærm.playerCharacter.x-44 && this.x < manager.aktuelleSkærm.playerCharacter.x+44 && this.y > manager.aktuelleSkærm.playerCharacter.y-64 && this.y < manager.aktuelleSkærm.playerCharacter.y+64) {
            this.delete();
            manager.aktuelleSkærm.playerCharacter.life -= this.dmg/(1+manager.aktuelleSkærm.playerCharacter.armor/100);

        }
    }
    checkCollision(x,y,w,h) {
        if (this.x > x-22-(w/2) && this.x < x+22+(w/2) && this.y > y-32-(h/2)&& this.y < y+32+(h/2)){
            return true;
        }
    }

    checkAdvancedCollision(p1,p2,p3,p4) {
        //Setup
        let p5 = createVector(this.x-22, this.y+32);
        let p6 = createVector(this.x-22, this.y-32);
        let p7 = createVector(this.x+22, this.y-32);
        let p8 = createVector(this.x+22, this.y+32);
        
        let v1;
        let v2;
        let v3;
        let v4;
        let v1Normal;
        let v2Normal;
        let v3Normal;
        let v4Normal;
        let v1p1Dot;
        let v1p2Dot;
        let v1p3Dot;
        let v1p4Dot;
        let v2p1Dot;
        let v2p2Dot;
        let v2p3Dot;
        let v2p4Dot;
        let v3p1Dot;
        let v3p2Dot;
        let v3p3Dot;
        let v3p4Dot;
        let v4p1Dot;
        let v4p2Dot;
        let v4p3Dot;
        let v4p4Dot;        


        let v1p5Dot;
        let v1p6Dot;
        let v1p7Dot;
        let v1p8Dot;
        let v2p5Dot;
        let v2p6Dot;
        let v2p7Dot;
        let v2p8Dot;
        let v3p5Dot;
        let v3p6Dot;
        let v3p7Dot;
        let v3p8Dot;
        let v4p5Dot;
        let v4p6Dot;
        let v4p7Dot;
        let v4p8Dot;

        //Vektor udregning


        v1 = createVector(p2.x-p1.x,p2.y-p1.y);
        v2 = createVector(p3.x-p2.x,p3.y-p2.y);
        v3 = createVector(p4.x-p3.x,p4.y-p3.y);
        v4 = createVector(p1.x-p4.x,p1.y-p4.y);


        //Normal vektor
        v1Normal = createVector(v1.y*-1,v1.x);   
        v2Normal = createVector(v2.y*-1,v2.x);   
        v3Normal = createVector(v3.y*-1,v3.x);   
        v4Normal = createVector(v4.y*-1,v4.x);   
        v1Normal.normalize();
        v2Normal.normalize();
        v3Normal.normalize();
        v4Normal.normalize();



        //Prik produkt 1
        v1p1Dot = p1.x*v1Normal.x+p1.y*v1Normal.y;
        v1p2Dot = p2.x*v1Normal.x+p2.y*v1Normal.y;
        v1p3Dot = p3.x*v1Normal.x+p3.y*v1Normal.y;
        v1p4Dot = p4.x*v1Normal.x+p4.y*v1Normal.y;        

        v2p2Dot = p2.x*v2Normal.x+p2.y*v2Normal.y;
        v2p3Dot = p3.x*v2Normal.x+p3.y*v2Normal.y;
        v2p4Dot = p4.x*v2Normal.x+p4.y*v2Normal.y;
        v2p1Dot = p1.x*v2Normal.x+p1.y*v2Normal.y;

        v3p3Dot = p3.x*v3Normal.x+p3.y*v3Normal.y;
        v3p4Dot = p4.x*v3Normal.x+p4.y*v3Normal.y;
        v3p2Dot = p2.x*v3Normal.x+p2.y*v3Normal.y;
        v3p1Dot = p1.x*v3Normal.x+p1.y*v3Normal.y;
        
        v4p4Dot = p4.x*v4Normal.x+p4.y*v4Normal.y;
        v4p1Dot = p1.x*v4Normal.x+p1.y*v4Normal.y;        
        v4p3Dot = p3.x*v4Normal.x+p3.y*v4Normal.y;
        v4p2Dot = p2.x*v4Normal.x+p2.y*v4Normal.y;  
        

        //Prik produkt 2
        v1p5Dot = p5.x*v1Normal.x+p5.y*v1Normal.y;
        v1p6Dot = p6.x*v1Normal.x+p6.y*v1Normal.y;
        v1p7Dot = p7.x*v1Normal.x+p7.y*v1Normal.y;
        v1p8Dot = p8.x*v1Normal.x+p8.y*v1Normal.y;        

        v2p5Dot = p5.x*v2Normal.x+p5.y*v2Normal.y;
        v2p6Dot = p6.x*v2Normal.x+p6.y*v2Normal.y;
        v2p7Dot = p7.x*v2Normal.x+p7.y*v2Normal.y;
        v2p8Dot = p8.x*v2Normal.x+p8.y*v2Normal.y;

        v3p5Dot = p5.x*v3Normal.x+p5.y*v3Normal.y;
        v3p6Dot = p6.x*v3Normal.x+p6.y*v3Normal.y;
        v3p7Dot = p7.x*v3Normal.x+p7.y*v3Normal.y;
        v3p8Dot = p8.x*v3Normal.x+p8.y*v3Normal.y;
        
        v4p5Dot = p5.x*v4Normal.x+p5.y*v4Normal.y;
        v4p6Dot = p6.x*v4Normal.x+p6.y*v4Normal.y;        
        v4p7Dot = p7.x*v4Normal.x+p7.y*v4Normal.y;
        v4p8Dot = p8.x*v4Normal.x+p8.y*v4Normal.y;  
        

        //side 1
        let v1p1234Max = Math.max(v1p1Dot,v1p2Dot,v1p3Dot,v1p4Dot);
        let v1p1234Min = Math.min(v1p1Dot,v1p2Dot,v1p3Dot,v1p4Dot);

        let v1p5678Max = Math.max(v1p5Dot,v1p6Dot,v1p7Dot,v1p8Dot);
        let v1p5678Min = Math.min(v1p5Dot,v1p6Dot,v1p7Dot,v1p8Dot);
        //side 2
        let v2p1234Max = Math.max(v2p1Dot,v2p2Dot,v2p3Dot,v2p4Dot);
        let v2p1234Min = Math.min(v2p1Dot,v2p2Dot,v2p3Dot,v2p4Dot);

        let v2p5678Max = Math.max(v2p5Dot,v2p6Dot,v2p7Dot,v2p8Dot);
        let v2p5678Min = Math.min(v2p5Dot,v2p6Dot,v2p7Dot,v2p8Dot);

        //side 3
        let v3p1234Max = Math.max(v3p1Dot,v3p2Dot,v3p3Dot,v3p4Dot);
        let v3p1234Min = Math.min(v3p1Dot,v3p2Dot,v3p3Dot,v3p4Dot);

        let v3p5678Max = Math.max(v3p5Dot,v3p6Dot,v3p7Dot,v3p8Dot);
        let v3p5678Min = Math.min(v3p5Dot,v3p6Dot,v3p7Dot,v3p8Dot);
        //side 4
        let v4p1234Max = Math.max(v4p1Dot,v4p2Dot,v4p3Dot,v4p4Dot);
        let v4p1234Min = Math.min(v4p1Dot,v4p2Dot,v4p3Dot,v4p4Dot);

        let v4p5678Max = Math.max(v4p5Dot,v4p6Dot,v4p7Dot,v4p8Dot);
        let v4p5678Min = Math.min(v4p5Dot,v4p6Dot,v4p7Dot,v4p8Dot);      
        if (v1p1234Max < v1p5678Min || v1p5678Max < v1p1234Min )  {
            return false;
        }
        if (v2p1234Max < v2p5678Min || v2p5678Max < v2p1234Min )  {
            return false;
        }
        if (v3p1234Max < v3p5678Min || v3p5678Max < v3p1234Min )  {
            return false;
        }
        if (v4p1234Max < v4p5678Min || v4p5678Max < v4p1234Min )  {
            return false;
        }
        return true;
    }
}
