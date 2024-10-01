import { GameObject } from "./gameObject.js";

export class Circle extends GameObject{
    constructor(circleConfigs,Bodies, size, posX, posY){
        var collider = Bodies.circle(posX, posY, circleConfigs[size % circleConfigs.length].radius, { restitution: 0.5 });
        var image = new createjs.Shape();
        image.graphics.beginFill(circleConfigs[size % circleConfigs.length].color).drawCircle(0, 0, circleConfigs[size % circleConfigs.length].radius);

        super(collider,image);
        this.size = size % circleConfigs.length;
        this.collider.circle = this;
        this.timeInDangerZone = 0;
        
    }

    
}