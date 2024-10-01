export class GameObject extends createjs.EventDispatcher{
    constructor(collider,image){
        super();
        this.collider = collider;
        this.image = image;
    }

    addToWorldAndStage(World,world,stage){
        this.addToWorld(World,world);
        this.addToStage(stage);
    }
    addToWorld(World,world){
        World.add(world, [this.collider]);
        this.World = World;
        this.world = world;
    }
    addToStage(stage){
        stage.addChild(this.image);
        this.stage = stage;
    }
    
    update(){
        this.image.x = this.collider.position.x;
        this.image.y = this.collider.position.y;
        this.image.rotation = this.collider.angle * (180 / Math.PI);
    }
}