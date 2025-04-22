
class Animation {

    constructor(fileName, antal){
        this.sprite = [];
        this.s;
        this.index = 0;
        this.framesOld = frameCount;
        this.spriteSheet = fileName;
        let w = this.spriteSheet.width/antal;
        this.angle = false;
        let h = this.spriteSheet.height;
        for (let i = 0; i < antal; i++) {
            let x = i*w;
            let y = 0;
            this.sprite.push(this.spriteSheet.get(x, y, w, h));
        }


    }

    drawAnimation(positionX, positionY, speed,angle,r,mode,l) {
        this.angle = angle;
        if (frameCount - this.framesOld > speed) {
            this.framesOld = frameCount;
            if (this.index < this.sprite.length-1) {
                this.index += 1;
            } else {
                this.index=0;
            }
        }
        if (this.angle != null) {
            push();
            
            if (mode == "corner") {
                imageMode(CORNER);
            }

            angleMode(DEGREES);
            translate(positionX,positionY)
            if (mode == "centerCorner") {
                imageMode(CENTER);
                translate(0+(l/2)*cos(this.angle),0+(l/2)*sin(this.angle));
            }

            rotate(angle);
            angleMode(DEGREES);
            image(this.sprite[this.index], r,0);



            pop();
        } else {

            image(this.sprite[this.index], positionX,positionY);

        }

    }
}
