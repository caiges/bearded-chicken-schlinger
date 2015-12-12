var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var amish;
var cursors;

function preload() {

  game.load.spritesheet('chicky', 'assets/images/chicky.png', 80, 80);
  game.load.spritesheet('amish', 'assets/images/amish.png', 80, 80);
}

function create() {

  // game.physics.startSystem(Phaser.Physics.ARCADE);

  var graphics = this.game.add.graphics(0, 500);

  // Ground
  var ground = new Ground(game, graphics);

  // Chicken
  chick = new Chicken(1, 100, 300, game);
  chick.startWander(5000)
  // chick.tweenHeight(150, 1);

  // Amish
  amish = new Amish(game, 100, 420);

  // Initialize cursor keys
  cursors = game.input.keyboard.createCursorKeys();
}

function update() {
  amish.player.body.velocity.setTo(0, 0);

  if (cursors.left.isDown) {
    amish.player.body.velocity.x = -200;
  }
  else if (cursors.right.isDown) {
    amish.player.body.velocity.x = 200;
  }
  amish.update();

  // chick stuff
  chick.update();
  chick.collided(amish.foods, 200)
  chick.moveX(1)
  chick.moveY((Math.round(Math.random() - 1) + 0.5) * Math.floor((Math.random() * 2) + 1))
}
