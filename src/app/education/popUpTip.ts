import * as PIXI from 'pixi.js';
// import { Container } from  'pixi.js';

export class PopUpTip {
  container: PIXI.Container;
  background: PIXI.Graphics;
  circle: PIXI.Graphics;
  innerCircle: PIXI.Graphics;
  clickableArea: PIXI.Sprite;


  constructor() {
    this.container = new PIXI.Container();

    this.background = new PIXI.Graphics();
    this.background.beginFill(0xffffff);
    this.background.drawRoundedRect(0, 0, 230, 55, 7);

    this.circle = new PIXI.Graphics();
    this.circle.lineStyle(5, 0xfd4e75, 1);
    this.circle.beginFill(0xffffff);
    this.circle.drawCircle(260, 27, 17);

    this.innerCircle = new PIXI.Graphics();
    this.innerCircle.beginFill(0xfd4e75);
    this.innerCircle.drawCircle(260, 27, 7);

    this.clickableArea = new PIXI.Sprite.fromImage('../../assets/tips/pop_up_tip.png');
    this.clickableArea.x = 178;
    this.clickableArea.y = 0;

    this.container.addChild(this.background);
    this.container.addChild(this.clickableArea);
    this.container.addChild(this.circle);
    this.container.addChild(this.innerCircle);

    this.container.setTransform(0, 0, 3, 3);
  }

  on(eventName, eventHandler) {
    if (this.clickableArea.interactive) {
      this.clickableArea.interactive = true;
    }

    this.clickableArea.on(eventName, eventHandler);
  }

  moveTo(x, y) {
    this.container.moveTo(x - 260, y - 27)
  }

  revers() {
  }
}
