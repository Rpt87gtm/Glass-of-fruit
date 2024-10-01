import { GameObject } from "./gameObject.js";

export class DeadZone extends GameObject{
    constructor(Bodies, posX, posY, sizeX, sizeY,timeToDie){
        var collider = Bodies.rectangle(posX, posY, sizeX, sizeY, {isSensor:true,isStatic:true});
        var image = new createjs.Shape();
        image.graphics.beginFill("red").drawRect(-sizeX/2, -sizeY/2, sizeX, sizeY);
        image.alpha = 0.5;

        super(collider,image);
        this.timeToDie=timeToDie;
        this.circlesInZone = new Map();
        this.gameOverEvent = new createjs.Event("gameOver", true, false);
    }

    handleCollisionStart(circle) {
        this.circlesInZone.set(circle, 0);
    }

    handleCollisionEnd(circle) {
        this.circlesInZone.delete(circle);
    }

    update() {
        super.update();
        this.circlesInZone.forEach((time, circle) => {
            time += 1 / createjs.Ticker.framerate;
            this.circlesInZone.set(circle, time);

            if (time >= this.timeToDie) {
                this.dispatchEvent(this.gameOverEvent);
                this.circlesInZone.delete(circle);
            }
        });
    }
}