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
  scene: {
    preload,
    create,
    update
  }
};

let player;
let cursors;
let resource;
let music;

function preload() {
  this.load.image("tiles", "assets/tilesets/iranian_art_tileset.png");
  this.load.tilemapTiledJSON("map", "assets/maps/iran_isometric_map.json");
  this.load.spritesheet("agent", "assets/sprites/pg_agent_goldturq.png", {
    frameWidth: 64,
    frameHeight: 64
  });
  this.load.image("resource", "assets/sprites/crystal_persian.png");
  this.load.audio("theme", ["assets/audio/persian_theme.mp3"]);
}

function create() {
  music = this.sound.add("theme");
  music.play({ loop: true, volume: 0.3 });

  const map = this.make.tilemap({ key: "map" });
  const tileset = map.addTilesetImage("iranian_art_tileset", "tiles");
  map.createLayer("Ground", tileset, 0, 0);
  map.createLayer("Structures", tileset, 0, 0);

  player = this.physics.add.sprite(100, 100, "agent");
  player.setCollideWorldBounds(true);

  this.anims.create({
    key: "idle",
    frames: this.anims.generateFrameNumbers("agent", { start: 0, end: 3 }),
    frameRate: 4,
    repeat: -1
  });

  player.anims.play("idle");

  cursors = this.input.keyboard.createCursorKeys();

  resource = this.physics.add.sprite(320, 250, "resource");
  this.physics.add.overlap(player, resource, () => {
    resource.destroy();
    alert("✨ Rare resource discovered: Gulf Crystal! ✨");
  });
}

function update() {
  player.setVelocity(0);

  if (cursors.left.isDown) {
    player.setVelocityX(-150);
  } else if (cursors.right.isDown) {
    player.setVelocityX(150);
  }

  if (cursors.up.isDown) {
    player.setVelocityY(-150);
  } else if (cursors.down.isDown) {
    player.setVelocityY(150);
  }
}

new Phaser.Game(config);

