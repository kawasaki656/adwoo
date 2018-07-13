class ContactInformation {
  private _pictureNumber: string;

  constructor(pictureNumber: string) {
    this._pictureNumber = pictureNumber;
  }

  get pictureNumber(): string {
    return this._pictureNumber;
  }

  set pictureNumber(value: string) {
    this._pictureNumber = value;
  }
}

export default ContactInformation;
