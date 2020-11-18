const generateRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const app = Vue.createApp({
  data() {
    return {
      monsterImages: ["./images/virus.jpg", "./images/monster.png"],
      playerImages: [
        "./images/player.png",
        "./images/player2.jpg",
        "./images/player3.jpg",
        "./images/doctor.png",
      ],
      currentMonster: 0,
      currentPlayer: 0,
      playerHealth: 100,
      monsterHealth: 100,
      round: 0,
    };
  },

  methods: {
    changeMonsterIcon() {
      if (this.currentMonster < this.monsterImages.length - 1) {
        this.currentMonster++;
      } else {
        this.currentMonster = 0;
      }
    },
    changePlayerIcon() {
      if (this.currentPlayer < this.playerImages.length - 1) {
        this.currentPlayer++;
      } else {
        this.currentPlayer = 0;
      }
    },

    playSound() {
      if (this.currentMonster == 1) {
        var snd = new Audio("./SoundEffects/roar.mp3");
        snd.play();
      } else if (this.currentMonster == 0) {
        var virusSound = new Audio("./SoundEffects/haha.mp3");
        virusSound.play();
      }
    },

    AttackOnMonster() {
      this.round++;
      this.monsterHealth = this.monsterHealth - generateRandom(0, 10);
      this.AttackOnPlayer();
    },

    AttackOnPlayer() {
      //Remember, Monster hits harder than player !
      this.playerHealth = this.playerHealth - generateRandom(4, 14);
    },

    TurboAttack() {
      //More powerful attack on the monster ! Not always available though!
      this.round++;
      this.monsterHealth = this.monsterHealth - generateRandom(10, 20);
      this.AttackOnPlayer();
    },
  },
});
app.mount("#game");
