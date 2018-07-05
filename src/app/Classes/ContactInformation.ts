class ContactInformation {
  private _pictureNumber: String;

  constructor(pictureNumber: String) {
    this._pictureNumber = pictureNumber;
  }

  get pictureNumber(): String {
    return this._pictureNumber;
  }

  set pictureNumber(value: String) {
    this._pictureNumber = value;
  }
}

export default ContactInformation;
