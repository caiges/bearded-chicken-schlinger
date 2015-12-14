var game = new Phaser.Game('100', '100', Phaser.WEBGL, '', {
  preload: preload,
  create: create,
  update: update
});

var GROUND_LEVEL;
var LEFT = 'left';
var RIGHT = 'right';

function preload() {
  // game.load.spritesheet('sky', 'assets/images/sky.png', 100, 100);
  game.load.spritesheet('chicky_1', 'assets/images/original_pixel_turkey_scaled_1.png', 256, 256, 5);
  game.load.spritesheet('chicky_2', 'assets/images/original_pixel_turkey_scaled_2.png', 256, 256, 5);
  game.load.spritesheet('chicky_3', 'assets/images/original_pixel_turkey_scaled_3.png', 256, 256, 5);
  game.load.spritesheet('chicky_4', 'assets/images/original_pixel_turkey_scaled_4.png', 256, 256, 5);
  game.load.spritesheet('man', 'assets/images/man.png', 80, 80);
  game.load.spritesheet('grass', 'assets/images/grass.png', 100, 75);
  game.load.spritesheet('egg', 'assets/images/egg_scaled.png', 256, 256, 4);
  game.load.audio('schling', 'assets/sounds/schling.wav');
}

function create() {

  // Initialize constants that rely on the game being initialized.
  GROUND_LEVEL = game.scale.height - 260;

  // Capture mouse events
  game.input.mouse.capture = true;

  // Sky
  sky = new Sky(game, 0, 0, {
    size: 50,
    colors: [0x0c160a, 0x1f1d2b, 0x0e1b0a],
    alpha: 1,
    fill: {
      color: 0x1c1b29,
      alpha: 1
    }
  });

  // Man
  man = new Man(game, 100, game.scale.height - 190);
  man.drawHealthPool();

  // Ground
  ground = new Ground(game, 0, game.scale.height - 100, {
    size: 1,
    colors: [0x308b4f, 0xb49066, 0xb9775e, 0xe9d3a1, 0xafcf6c],
    alpha: 1,
    fill: {
      color: 0x1c1b29,
      alpha: 1
    }
  });

  // Windup meter
  windupMeter = new WindupMeter(game, 270, game.scale.height - 85, {
    width: 100,
    height: 20,
    color: 0xb54167,
    alpha: 1,
    fill: {
      color: 0x73af53,
      alpha: 1
    }
  });

  // Chicken
  chick = new Chicken(1, 100, 100, game);
  chick.startWander(20000)
  chick.target = man;

  // Initialize cursor keys
  cursors = game.input.keyboard.createCursorKeys();
}

function update() {
  // Update windup meter
  windupMeter.fillTo(man.windupPercentage());

  // Probably want to make this a call to a move function
  if (cursors.left.isDown) {
    man.move(LEFT);
  } else if (cursors.right.isDown) {
    man.move(RIGHT);
  }

  // Update man
  man.update(chick.eggs.children);

  // Update chick
  chick.update(man.foods.children, GROUND_LEVEL);
}
