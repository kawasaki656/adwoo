class ContactInformation {
  private _pictureNumber: number;
  private _isRoad: boolean;

  constructor(pictureNumber: number, isRoad: boolean) {
    this._pictureNumber = pictureNumber;
    this._isRoad = isRoad;
  }

  get pictureNumber(): number {
    if(!this._isRoad) {
      return this._pictureNumber;
    }
  }

  set pictureNumber(value: number) {
    this._pictureNumber = value;
  }
}

export default ContactInformation;
