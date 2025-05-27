import Phaser from "https://cdn.jsdelivr.net/npm/phaser@3.60.0/dist/phaser.esm.js";

const config = {
  type: Phaser.AUTO,
  width: 960,
  height: 640,
  backgroundColor: "#003049",
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
    this.load.tilemapTiledJSON("map", "assets/maps/iran_isometric_map.json");
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
    map.createLayer(0, tileset, 0, 0);
  }
}

export default new Phaser.Game(config);
