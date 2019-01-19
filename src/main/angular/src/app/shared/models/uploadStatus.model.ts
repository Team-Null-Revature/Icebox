export class UploadStatus {
  private file: File;
  private speed: Number;
  private folderId: Number;
  private percentComplete: Number;

  constructor(file: File, folderId: Number, speed: Number, percentComplete: Number) {
    this.file = file;
    this.speed = speed;
    this.folderId = folderId;
    this.percentComplete = percentComplete;
  }

  setSpeed(speed: Number) {
    this.speed = speed;
  }

  setPercentComplete(percentComplete: Number) {
    this.percentComplete = percentComplete;
  }

  getFile(): File {
    return this.file;
  }

  getSpeed(): Number {
    return this.speed;
  }

  getFolderId(): Number {
    return this.folderId;
  }

  getPercentComplete(): Number {
    return this.percentComplete;
  }
}
