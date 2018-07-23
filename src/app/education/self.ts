import { Sprite, Texture } from 'pixi.js';

export class Self extends Sprite{
  public texture: Texture;

  constructor() {
    super();

    this.texture = new Texture.fromImage('../../assets/tips/self.png');
  }

}
