<template>
  <div>
    <h1 class="title">Simon Says</h1>
    <div class="game-board">
      <div class="circle">
        <ul>
          <li class="sector red" data-tile="1"></li>
          <li class="sector blue" data-tile="2"></li>
          <li class="sector yellow" data-tile="3"></li>
          <li class="sector green" data-tile="4"></li>
        </ul>
      </div>
      <div class="option">
        <div class="game-info">
          <h2 class="sub-title">Round: {{this.round}}</h2>
          <button type="button" @click="start">Start</button>
          <p v-if="!active">Sorry, you lost after {{this.round}} rounds!</p>
        </div>
        <div class="game-level">
          <h2 class="sub-title">Game level:</h2>
          <input type="radio" v-model="level" value="easy" checked>Easy<br>
          <input type="radio" v-model="level" value="normal">Normal<br>
          <input type="radio" v-model="level" value="difficult">Difficult<br>
        </div>
      </div>
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
      active: true,
      level: 'easy',
    }
  },
  methods: {
    start() {

    }
  }

}

</script>