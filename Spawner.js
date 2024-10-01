import { Circle } from './Circle.js';

export class SpawnerController {
    constructor(circleConfigs, Bodies, view, minX, maxX, stage) {
        this.circleConfigs = circleConfigs;
        this.Bodies = Bodies;
        this.view = view;
        this.minX = minX;
        this.maxX = maxX;
        this.stage = stage;
        this.currentX = view.posX;

        // Заранее генерируем следующий круг
        this.nextCircleSize = Math.floor(Math.random() * 4);
        this.nextCircleShape = this.createNextCircleShape(this.nextCircleSize);

        // Добавляем графику следующего круга на сцену
        this.nextCircleShape.x = this.view.posX + this.view.width / 2;
        this.nextCircleShape.y = this.view.posY - 50; // Позиционируем над Spawner
        this.stage.addChild(this.nextCircleShape);
    }

    createNextCircleShape(sizeIndex) {
        const config = this.circleConfigs[sizeIndex];
        const shape = new createjs.Shape();
        shape.graphics.beginFill(config.color).drawCircle(0, 0, config.radius);
        return shape;
    }

    moveLeft() {
        if (this.currentX > this.minX) {
            this.currentX -= 10;
            this.view.updatePosition(this.currentX);
            this.updateNextCirclePosition();
        }
    }

    moveRight() {
        if (this.currentX < this.maxX) {
            this.currentX += 10;
            this.view.updatePosition(this.currentX);
            this.updateNextCirclePosition();
        }
    }

    spawnCircle(World, world, stage) {
        // Создаем круг с заранее сгенерированным размером
        var circle = new Circle(this.circleConfigs, this.Bodies, this.nextCircleSize, this.currentX + this.view.width / 2, this.view.posY);
        circle.addToWorldAndStage(World, world, stage);

        // Генерируем новый круг для отображения
        this.nextCircleSize = Math.floor(Math.random() * 4);
        this.updateNextCircleShape();

        return circle;
    }

    updateNextCircleShape() {
        // Удаляем старую графику с сцены
        this.stage.removeChild(this.nextCircleShape);

        // Создаем новую графику следующего круга
        this.nextCircleShape = this.createNextCircleShape(this.nextCircleSize);

        // Позиционируем ее над Spawner
        this.nextCircleShape.x = this.currentX + this.view.width / 2;
        this.nextCircleShape.y = this.view.posY - 50;

        // Добавляем на сцену
        this.stage.addChild(this.nextCircleShape);
    }

    updateNextCirclePosition() {
        // Обновляем позицию следующего круга, чтобы он двигался вместе с Spawner
        this.nextCircleShape.x = this.currentX + this.view.width / 2;
    }
}

export class SpawnerView {
    constructor(posX, posY, width, height) {
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;

        // Рисуем треугольник, обозначающий спавнер
        this.image = new createjs.Shape();
        this.image.graphics.beginFill("blue").moveTo(0, 0).lineTo(width, 0).lineTo(width / 2, height).lineTo(0, 0);
        this.image.x = posX;
        this.image.y = posY;
    }

    updatePosition(newX) {
        this.image.x = newX;
    }

    addToStage(stage) {
        stage.addChild(this.image);
    }
}
