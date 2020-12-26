<template>
  <div>
    <h1 class="title">Simon Says</h1>
    <div class="game-board">
      <div class="circle">
        <ul>
          <li class="sector red" id="1" @click="listenUserAction"></li>
          <li class="sector blue" id="2" @click="listenUserAction" ></li>
          <li class="sector yellow" id="3" @click="listenUserAction" ></li>
          <li class="sector green" id="4" @click="listenUserAction" ></li>
        </ul>
      </div>
      <div class="option">
        <div class="game-info">
          <h2 class="sub-title">Round: {{this.round}}</h2>
          <button type="button" @click="start">Start</button>
          <p v-if="!active">Sorry, you lost after {{this.copyRound}} rounds!</p>
        </div>
        <div class="game-level">
          <h2 class="sub-title">Game level:</h2>
          <input type="radio" v-model="level" value="1500" checked>Easy<br>
          <input type="radio" v-model="level" value="1000">Normal<br>
          <input type="radio" v-model="level" value="400">Difficult<br>
        </div>
      </div>
    </div>
    <div id="sound">
      <audio id="audio1">
        <source src="1.mp3" type="audio/mpeg" />
      </audio>
      <audio id="audio2">
        <source src="2.mp3" type="audio/mpeg" />
      </audio>
      <audio id="audio3">
        <source src="3.mp3" type="audio/mpeg" />
      </audio>
      <audio id="audio4">
        <source src="4.mp3" type="audio/mpeg" />
      </audio>
    </div>
  </div>
</template>

<script>


export default {
  name: 'Game',
  data() {
    return {
      simonSequence: [],
      userSequence: []    ,
      round: 0,
      copyRound: 0,
      active: true,
      level: 1500,
      activateSimonBoard: false
    }
  },
  methods: {
    start() {
      this.simonSequence = [];
      this.userSequence = [];
      this.round = 0;
      this.copyRound = 0;
      this.active = true;
      this.newRound();
    },

    newRound() {
      this.round++
      this.simonSequence.push(this.randomNumber());
      this.userSequence = this.simonSequence.slice(0);
      this.animateSector(this.simonSequence);
    },

    randomNumber() {
      return Math.ceil((Math.random()*4))
    },

    animateSector(sequence) {
      let i = 0;
      let interval = setInterval(() => {
        this.playSound(sequence[i])
        this.lightUp(sequence[i])
        i++;
        if (i >= sequence.length) {
          clearInterval(interval)
          this.activateSimonBoard = true;
        }
      }, +this.level);
    },

    lightUp(item) {
      let sector = document.getElementById(item)
      sector.classList.add('animate');
      setTimeout(() => {
        sector.classList.remove('animate');
      }, +this.level);
    },

    playSound(item) {
      let audio = document.getElementById(`audio${item}`)
      audio.play();
    },

    listenUserAction(event) {
      if(this.activateSimonBoard) {
        event.target.classList.add('animate');
        this.playSound(event.target.id);
        setTimeout(()=>{event.target.classList.remove('animate')}, +this.level);
        let correctResponse = this.userSequence.shift();
        let userResponse = event.target.id;
        this.active = (userResponse == correctResponse);
        this.checkLose();
      }
    },

    checkLose() {
      if (this.userSequence.length === 0 && this.active) {
        this.activateSimonBoard = false;
        this.newRound();

      } else if (!this.active) {
        this.activateSimonBoard = false;
        this.endGame();
      }
    },

    endGame() {
      this.copyRound = this.round
      this.round = 0;
      this.active = false;
    }
  }

}

</script>