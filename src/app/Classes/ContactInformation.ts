class ContactInformation {
  private _pictureNumber: String;
  private _isRoad: boolean;

  constructor(pictureNumber: String, isRoad: boolean) {
    this._pictureNumber = pictureNumber;
    this._isRoad = isRoad;
  }

  get pictureNumber(): String {
    return this._pictureNumber;
  }

  set pictureNumber(value: String) {
    this._pictureNumber = value;
  }
}

export default ContactInformation;
