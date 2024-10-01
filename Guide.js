export class Guide{
    constructor(posX, posY,stage){
        this.guideText = new createjs.Text("A - влево\nD - вправо\nSpace - сбросить круг\nR - рестарт", "32px Arial", "#000000");
        this.guideText.x = posX;
        this.guideText.y = posY;
        stage.addChild(this.guideText);
    }
}