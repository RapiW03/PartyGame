<!-- Bei diesem View werden simple Fragen spiele wie: Ich hab noch nie, Trinkspiel Fragen; gespielt aufgrund er gleibleibenden Logik dieser Spiele -->
<!-- Aufwändigere Spiele werden eigene Seiten bekommen wie: Busfahrer, Pferderennen, Wer würde eher-->
<template>
  <div class="flex-row mx-auto d-flex justify-center fill-height">
    <div
      v-if="gameStarted == false && finished == false"
      align="center"
      justify="center"
      class="mx-auto verticalAlign"
    >
      <h2 v-if="game.Game_ID == 1">Trinkspiel Fragen</h2>
      <h2 v-if="game.Game_ID == 2">Ich hab noch nie</h2>
      <button @click="startGame" class="buttonsMenu" role="button">
        Starten
      </button>
    </div>
    <div
      v-if="gameStarted == true && finished == false"
      align="center"
      justify="center"
      class="mx-auto verticalAlign"
    >
      <h2 v-if="game.Game_ID == 1">Trinkspiel Fragen</h2>
      <h2 v-if="game.Game_ID == 2">Ich hab noch nie</h2>
      <v-card class="mx-auto" outlined>
        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title class="text-h5 mb-1">
              {{ curFrage.Frage }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-card-actions>
          <v-btn class="buttonsMenu" role="button" @click="getNextQuestion">
            Nächste Frage
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
    <div
      v-if="finished == true"
      align="center"
      justify="center"
      class="mx-auto verticalAlign"
    >
      <h1>ALLE FRAGEN DURCHGESPIELT</h1>
    </div>
  </div>
</template>

<script>
import server from '@/serverInterface';
export default {
  data() {
    return {
      players: [],
      fragen: [],
      usedFragen: [],
      game: {},
      curFrage: {},
      gameStarted: false,
      lastUser: '',
      finished: false,
    };
  },
  methods: {
    async getGameSettings() {
      this.game = (
        await server.get(
          `${process.env.VUE_APP_SERVER_BASE_URL}/activegame/getGame`
        )
      ).data[0];
      this.players = this.game.Players.split(';');
      this.getQuestions();
    },
    async getQuestions() {
      let allFragen = (
        await server.get(
          `${process.env.VUE_APP_SERVER_BASE_URL}/ask/gameQuestions/${this.game.Game_ID}`
        )
      ).data;
      this.fragen = allFragen.filter((e) => e.Kategorie == this.game.Kategorie);
    },
    startGame() {
      this.gameStarted = true;
      this.getNextQuestion();
    },
    getNextQuestion() {
      if (this.fragen.length == 0) {
        this.finished = true;
        return;
      }
      let idx = Math.floor(Math.random() * this.fragen.length);
      console.log(this.fragen);
      this.curFrage = this.fragen[idx];
      if (this.curFrage.SingleFrage) {
        let player =
          this.players[Math.floor(Math.random() * this.players.length)];
        let x = this.curFrage.Frage.replace('X', player);
        this.curFrage.Frage = x;
        if (this.lastUser != '') {
          this.players.push(this.lastUser);
        }
        this.lastUser = player;
        this.players = this.players.filter((p) => p != player);
      }
      this.usedFragen.push(this.fragen[idx]);
      this.fragen = this.fragen.filter(
        (f) => f.Fragen_ID != this.curFrage.Fragen_ID
      );
    },
  },
  created() {
    this.getGameSettings();
  },
};
</script>

<style>
.buttonsMenu {
  appearance: button;
  background-color: #000;
  background-image: none;
  border: 1px solid #000;
  border-radius: 4px;
  box-shadow: #fff 4px 4px 0 0, #000 4px 4px 0 1px;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-family: ITCAvantGardeStd-Bk, Arial, sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  margin: 0 5px 10px 0;
  overflow: visible;
  padding: 12px 40px;
  text-align: center;
  text-transform: none;
  touch-action: manipulation;
  user-select: none;
  -webkit-user-select: none;
  vertical-align: middle;
  white-space: nowrap;
}

.buttonsMenu:focus {
  text-decoration: none;
}

.buttonsMenu:hover {
  text-decoration: none;
}

.buttonsMenu:active {
  box-shadow: rgba(0, 0, 0, 0.125) 0 3px 5px inset;
  outline: 0;
}

.buttonsMenu:not([disabled]):active {
  box-shadow: #fff 2px 2px 0 0, #000 2px 2px 0 1px;
  transform: translate(2px, 2px);
}

@media (min-width: 768px) {
  .buttonsMenu {
    padding: 12px 50px;
  }
}

.verticalAlign {
  margin: 0;
  position: absolute;
  top: 40%;
  -ms-transform: translateY(-40%);
  transform: translateY(-40%);
}
</style>
