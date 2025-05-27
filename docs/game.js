
// PG AI Agent – Persian-Isometric Strategy Game (Phaser.js)
// Base Game Setup with Persian Gulf and Ancient Iran theme, using international naming

const config = {
  type: Phaser.AUTO,
  width: 960,
  height: 640,
  backgroundColor: "#003049", // Persian Gulf dark blue
  parent: "game-container",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
  scene: [PreloadScene, MainGameScene]
};

class PreloadScene extends Phaser.Scene {
  constructor() {
    super("PreloadScene");
  }

  preload() {
    this.load.image("tiles", "assets/tilesets/iranian_art_tileset.png");
    this.load.tilemapTiledJSON("map", "assets/sprites/iran_isometric_map_embedded.tmj");
    this.load.spritesheet("agent", "assets/sprites/pg_agent_goldturq.png", {
      frameWidth: 64,
      frameHeight: 64
    });
    this.load.image("resource", "assets/sprites/crystal_persian.png");
    this.load.audio("theme", ["assets/audio/persian_theme.mp3"]);
  }

  create() {
    this.scene.start("MainGameScene");
  }
}

class MainGameScene extends Phaser.Scene {
  constructor() {
    super("MainGameScene");
  }

  create() {
    this.music = this.sound.add("theme");
    this.music.play({ loop: true, volume: 0.3 });

    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage("iranian_art_tileset", "tiles");
    const baseLayer = map.createLayer(0, tileset, 0, 0);

    this.player = this.physics.add.sprite(100, 100, "agent");
    this.player.setCollideWorldBounds(true);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.resource = this.physics.add.sprite(320, 250, "resource");
    this.physics.add.overlap(this.player, this.resource, () => {
      this.resource.destroy();
      alert("✨ Rare resource discovered: Gulf Crystal! ✨");
    });
  }

  update() {
    this.player.setVelocity(0);
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-150);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(150);
    }
    if (this.cursors.up.isDown) {
      this.player.setVelocityY(-150);
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(150);
    }
  }
}

window.onload = function () {
  new Phaser.Game(config);
};
