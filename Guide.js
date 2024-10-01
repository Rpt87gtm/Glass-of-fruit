export class Guide{
    constructor(posX, posY,stage){
        this.guideText = new createjs.Text("A - влево\nD - вправо\nSpace - сбросить круг\nR - рестарт\n\nНельзя, чтобы круги попали\nв красную зону", "32px Arial", "#000000");
        this.guideText.x = posX;
        this.guideText.y = posY;
        stage.addChild(this.guideText);
    }
}