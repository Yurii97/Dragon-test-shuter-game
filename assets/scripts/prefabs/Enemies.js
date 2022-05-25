class Enemies extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super(scene.physics.world, scene);
    this.scene = scene;
    this.fires = new Fires(this.scene);
    this.countMax = 2;
    this.countCreated = 0;
    this.countKild = 0;

    this.timer = this.scene.time.addEvent({
      delay: 1000,
      loop: true,
      callback: this.tick,
      callbackScope: this,
    });
  }

  tick() {
    if (this.countCreated < this.countMax) {
      this.createEnemy();
    } else {
      this.timer.remove();
    }
  }
  onEnemyKilled() {
    ++this.countKild;
    if (this.countKild >= this.countMax) {
      this.scene.events.emit("enemines-killed");
    }
  }
  createEnemy() {
    let enemy = this.getFirstDead();

    if (!enemy) {
      console.log("create new enemy");
      enemy = Enemy.generate(this.scene, this.fires);
      enemy.on("killed", this.onEnemyKilled, this);
      this.add(enemy);
    } else {
      enemy.reset();
    }

    enemy.move();
    ++this.countCreated;
  }
}
