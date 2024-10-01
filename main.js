import { Circle } from './Circle.js';
import { Wall } from './Walls.js';
import { UserScore } from './userScore.js';
import { DeadZone } from './deadZone.js';
import { SpawnerController,SpawnerView } from './Spawner.js';
import { Guide } from './Guide.js';


const circleConfigs = [
    { color: 'red', radius: 10, score: 10 },
    { color: 'blue', radius: 20, score: 20 },
    { color: 'yellow', radius: 30, score: 30 },
    { color: 'green', radius: 40, score: 40 },
    { color: 'purple', radius: 50, score: 50 },
    { color: 'orange', radius: 60, score: 60 },
    { color: 'cyan', radius: 70, score: 70 },
    { color: 'magenta', radius: 80, score: 80 },
    { color: 'lime', radius: 90, score: 90 },
    { color: 'pink', radius: 100, score: 100 },
    { color: 'teal', radius: 110, score: 110 },
    { color: 'gold', radius: 120, score: 120 }
];


var stage = new createjs.Stage("canvas");

var objectsToUpdate = []

var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Events = Matter.Events,
    Runner = Matter.Runner,
    Composite = Matter.Composite;

var engine = Engine.create();
var world = engine.world;



var floor = new Wall(Bodies,325,700,650,100);
floor.addToWorldAndStage(World,world,stage);
objectsToUpdate.push(floor);

var wall_1 = new Wall(Bodies,50,400,100,600);
wall_1.addToWorldAndStage(World,world,stage);
objectsToUpdate.push(wall_1);

var wall_2 = new Wall(Bodies,600,400,100,600);
wall_2.addToWorldAndStage(World,world,stage);
objectsToUpdate.push(wall_2);



World.add(world, [floor]);
Runner.run(engine);





var deadZone = new DeadZone(Bodies, 300, 70, 700, 300, 1);
deadZone.addToWorldAndStage(World, world, stage);
objectsToUpdate.push(deadZone);

var userScore = new UserScore(0,5000,700,100,circleConfigs,stage);
var guide = new Guide(700,400,stage);

var loseText = new createjs.Text("Вы проиграли >:\\\nНажмите \"R\" чтобы\nначать сначала", "50px Arial", "#ff0000");
loseText.x = 900;
loseText.y = 200;
loseText.textAlign = "center";
loseText.visible = false;
stage.addChild(loseText);


var spawnerView = new SpawnerView(100, 150, 50, 50);
spawnerView.addToStage(stage);

var spawnerController = new SpawnerController(circleConfigs, Bodies, spawnerView, 100, 500,stage);

document.addEventListener("keydown", function (event) {
    if (event.code === "KeyA") {
        spawnerController.moveLeft();
    } else if (event.code === "KeyD") {
        spawnerController.moveRight();
    } else if (event.code === "Space") {
        if(spawnerController.canSpawn){
            var newCircle = spawnerController.spawnCircle(World, world, stage);
            objectsToUpdate.push(newCircle);
        }
    } else if (event.code === "KeyR"){
        spawnerController.canSpawn = true;
        restartGame();
    }
});

Events.on(engine, 'collisionStart', function (event) {
    var pairs = event.pairs;
    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i];
        var bodyA = pair.bodyA;
        var bodyB = pair.bodyB;

        if (bodyA === deadZone.collider || bodyB === deadZone.collider) {
            var circle = bodyA.circle || bodyB.circle;
            if (circle) {
                deadZone.handleCollisionStart(circle);
            }
        }
    }
});

Events.on(engine, 'collisionEnd', function (event) {
    var pairs = event.pairs;
    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i];
        var bodyA = pair.bodyA;
        var bodyB = pair.bodyB;

        if (bodyA === deadZone.collider || bodyB === deadZone.collider) {
            var circle = bodyA.circle || bodyB.circle;
            if (circle) {
                deadZone.handleCollisionEnd(circle);
            }
        }
    }
});

deadZone.addEventListener("gameOver", function () {
    spawnerController.canSpawn = false;
    console.log("Вы проиграли!");
    loseText.visible = true;
});


Events.on(engine, 'collisionStart', function (event) {
    var pairs = event.pairs;
    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i];
        var bodyA = pair.bodyA;
        var bodyB = pair.bodyB;
        
        if (bodyA.circle && bodyB.circle) {
            
            
            if(bodyA.circle.size == bodyB.circle.size){
                
                if(bodyA.created){
                    break;
                }
                if(bodyB.created){
                    break;
                }
                bodyA.created = true;
                bodyB.created = true;

                userScore.addScore(bodyA.circle.size);

                var circle = new Circle(circleConfigs,Bodies,bodyA.circle.size+1,(bodyA.position.x+bodyB.position.x)/2,(bodyA.position.y+bodyB.position.y)/2);
                
                circle.addToWorldAndStage(World,world,stage);
                objectsToUpdate.push(circle);

                removeObject(world, stage, bodyA.circle);
                removeObject(world, stage, bodyB.circle);

                objectsToUpdate = objectsToUpdate.filter(obj => obj !== bodyA.circle && obj !== bodyB.circle);

            }
            
        }
    }
});

function restartGame(){
    userScore.resetScore();

    objectsToUpdate.forEach(obj => {
        if (obj instanceof Circle) {
            removeObject(world, stage, obj);
        }
    });

    objectsToUpdate = objectsToUpdate.filter(obj => !(obj instanceof Circle));
    loseText.visible = false;
}

function removeObject(world, stage, obj) {
    if (Composite.allBodies(world).includes(obj.collider)) {
        Matter.World.remove(world, obj.collider);
        stage.removeChild(obj.image);
    }
}

createjs.Ticker.framerate=360;
createjs.Ticker.addEventListener("tick", function () {
   
    for(var i=0; i < objectsToUpdate.length;i++){
        objectsToUpdate[i].update();
    } 

    stage.update();
});