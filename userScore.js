
export class UserScore{
    constructor(startScore, topScore, posX, posY, circleConfigs,stage){
        this.score = startScore;
        this.topScore = topScore;
        this.scoreView = new createjs.Text("Счет: " + this.score, "32px Arial", "#000000");
        this.topScoreView = new createjs.Text("Лучший Счет: " + this.topScore, "32px Arial", "#ff0000");

        this.scoreView.x = posX;
        this.scoreView.y = posY;
        this.topScoreView.x = posX;
        this.topScoreView.y = posY+30;

        this.circleConfigs = circleConfigs;

        stage.addChild(this.scoreView);
        stage.addChild(this.topScoreView);
    }

    addScore(circleSize){
        this.score += this.circleConfigs[circleSize % this.circleConfigs.length].score;
        if(this.score > this.topScore){
            this.topScore = this.score;
        }

        this.updateView();
        
    }
    resetScore(){
        this.score = 0;
        this.updateView();
    }
    updateView(){
        this.scoreView.text = "Счет: " + this.score;

        if(this.score === this.topScore){
            this.topScoreView.text = "Лучший Счет: " + this.topScore+"!!!";
            this.topScoreView.color = "#228B22";
        }else{
            this.topScoreView.text = "Лучший Счет: " + this.topScore;
        }
    }
}