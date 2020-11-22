const generateRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const app = Vue.createApp({
  data() {
    return {
      monsterImages: ["./images/virus.jpg", "./images/covidMonster.jpg"],
      playerImages: [
        "./images/player3.jpg",
        "./images/player2.jpg",
        "./images/doctor.png",
      ],
      currentMonster: 0,
      currentPlayer: 0,
      playerHealth: 100,
      monsterHealth: 100,
      round: 0,
      SoundOn: true,
      BackgroundSoundOn: false,
      winner: null,
      AttackActive: false,
      TurboActive: false,
      HealActive: false,
      resign: false,
    };
  },

  computed: {
    monsterLifeBar() {
      if (this.monsterHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.monsterHealth + "%" };
    },
    playerLifeBar() {
      if (this.playerHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.playerHealth + "%" };
    },
  },

  watch: {
    playerHealth(value) {
      if (value <= 0) {
        this.winner = "Monster";
      }
    },
    monsterHealth(value) {
      if (value <= 0) {
        this.winner = "Player";
      }
    },
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
      if (this.SoundOn) {
        if (this.currentMonster == 1) {
          var snd = new Audio("./SoundEffects/roar.mp3");
          snd.play();
        } else if (this.currentMonster == 0) {
          var virusSound = new Audio("./SoundEffects/haha.mp3");
          virusSound.play();
        }
      }
    },
    playBackgroundSound() {
      console.log(this.BackgroundSoundOn);
      if (this.BackgroundSoundOn) {
        var backgroundMusic = new Audio("./SoundEffects/background.mp3");
        backgroundMusic.play();
      }
    },

    AttackOnMonster() {
      this.round++;
      this.monsterHealth = this.monsterHealth - generateRandom(0, 10);
      this.AttackOnPlayer();
    },

    AttackOnPlayer() {
      //Remember, Monster hits harder than player !
      this.playerHealth = this.playerHealth - generateRandom(2, 12);
    },

    TurboAttack() {
      //More powerful attack on the monster ! Not always available though!
      this.round++;
      this.monsterHealth = this.monsterHealth - generateRandom(20, 30);
      this.AttackOnPlayer();
    },
    heal() {
      //It is a magical first aid button that can improve player's health!
      //OF course, even with using this button, the monster will then attack the player!
      //And it counts as one round also.

      this.round++;
      const healValue = generateRandom(10, 20);
      if (this.playerHealth + healValue >= 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healValue;
      }
      this.AttackOnPlayer();
    },
  },
});
app.mount("#game");
