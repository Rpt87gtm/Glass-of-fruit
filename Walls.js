import { GameObject } from "./gameObject.js";

export class Wall extends GameObject{
    constructor(Bodies, posX, posY, sizeX, sizeY){
        var collider = Bodies.rectangle(posX, posY, sizeX, sizeY, {isStatic:true});
        var image = new createjs.Shape();
        image.graphics.beginFill("green").drawRect(-sizeX/2, -sizeY/2, sizeX, sizeY);

        super(collider,image);
        
    }
   
}