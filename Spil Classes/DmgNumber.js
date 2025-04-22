class DmgNumber {
    constructor(dmg,x,y){
        this.A = random(-0.01,0.01);
        this.B = random(-0.01,0.01);
        
        
        this.existed = 0;
        this.x = x;
        this.y = y;
        this.dmg = dmg;
        this.path = createVector(this.x-manager.aktuelleSkærm.playerCharacter.x,this.y-manager.aktuelleSkærm.playerCharacter.y);
        this.path.normalize();
    }

    run() {
        this.path.x += this.A;
        this.path.y += this.B;
        this.x += this.path.x;
        this.y += this.path.y;
        this.existed += 1;
        push();
        fill(178,34,34,255-this.existed*2);
        textSize((22+(this.dmg*0.10))/1+(0.02*manager.aktuelleSkærm.round))
        text(this.dmg, this.x, this.y);
        pop();
        if (this.existed >= 120) {
            manager.aktuelleSkærm.dmgNumbers.splice(0,1);

        }
    }
}