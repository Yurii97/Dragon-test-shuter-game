class LoadingBar {
  constructor(scene) {
    this.scene = scene;
    this.style = {
      boxColor: 0xd3d3d3,
      barColor: 0xfff8dc,
      x: config.width / 2 - 450,
      y: config.height / 2 + 250,
      width: 900,
      heidht: 25,
    };
    this.progressBox = this.scene.add.graphics();
    this.progressBar = this.scene.add.graphics();

    this.showProgressBox();
    this.setEvents();
  }
  setEvents() {
    this.scene.load.on("progress", this.showProgressBar, this);
    this.scene.load.on("fileprogress", this.onFileProgressBar, this);
    this.scene.load.on("complete", this.onLoadComplete, this);
  }
  showProgressBox() {
    this.progressBox
      .fillStyle(this.style.boxColor)
      .fillRect(
        this.style.x,
        this.style.y,
        this.style.width,
        this.style.heidht
      );
  }
  showProgressBar(value) {
    // console.log(value);
    this.progressBar
      .clear()
      .fillStyle(this.style.barColor)
      .fillRect(
        this.style.x,
        this.style.y,
        this.style.width * value,
        this.style.heidht
      );
  }
  onFileProgressBar(file) {
    // console.log(file);
  }
  onLoadComplete() {
    // console.log("onLoadComplete");
    this.progressBar.destroy();
    this.progressBox.destroy();
  }
}
