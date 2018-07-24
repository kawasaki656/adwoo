import { Sprite, loader } from 'pixi.js';
import ContactInformation from './ContactInformation';

class MapElement extends Sprite {
  public interactive: boolean;
  public on: any;
  public x: number;
  public y: number;

  constructor(contactInformation: ContactInformation) {
    const picturePath = '../assets/City_Objects/Block_' + contactInformation.pictureNumber + '.png';
    super(loader.resources[picturePath].texture);

    this.interactive = true;

    this.on('click', () => {
    })
  }

  public onClick(event): void {
    this.on('click', event);
  }


}

export default MapElement;
