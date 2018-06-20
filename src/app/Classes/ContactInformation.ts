class ContactInformation {
  private _pictureNumber: number;

  constructor(pictureNumber: number) {
    this._pictureNumber = pictureNumber;
  }

  get pictureNumber(): number {
    return this._pictureNumber;
  }

  set pictureNumber(value: number) {
    this._pictureNumber = value;
  }
}

export default ContactInformation;
