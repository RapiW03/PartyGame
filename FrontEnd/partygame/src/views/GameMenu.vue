<template>
  <div class="flex-row mx-auto d-flex justify-center fill-height">
    <v-overlay
      zIndex="9996"
      :absolute="absolute"
      :value="overlay"
      opacity="0.35"
    ></v-overlay>
    <div align="center" justify="center" class="mx-auto verticalAlign">
      <h1 v-if="game_id == '1'">Trinkspiel Fragen</h1>
      <h1 v-if="game_id == '2'">Ich hab noch nie</h1>
      <h1 v-if="game_id == '9999'">Test</h1>
      <v-list dense>
        <v-list-item-group>
          <v-list-item>
            <button
              class="buttonsMenu"
              role="button"
              @click="newDrinkingGameDialog(game_id)"
            >
              Neues Spiel
            </button>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </div>
    <v-dialog max-width="600" v-model="dialogNewGame">
      <v-card>
        <v-form>
          <div>
            <v-slider
              v-model="anzPlayer"
              color="orange"
              label="Anzahl Spieler"
              min="2"
              max="20"
              thumb-label
            ></v-slider>
            <v-text-field
              :label="`Spieler ${a}`"
              required
              v-for="a of anzPlayer"
              :key="a"
              :id="`player${a}`"
            ></v-text-field>
          </div>
          <div>
            <v-select
              :items="selectedGame.Kategorien"
              label="Kategorien"
              outlined
              v-model="selKategorie"
            ></v-select>
          </div>
          <v-btn color="primary" text @click="dialogNewGame = false">
            Schließen
          </v-btn>
          <v-btn color="success" @click="createDrinkingGame">
            Spiel erstellen
          </v-btn>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import server from '@/serverInterface';
export default {
  data() {
    return {
      activeGame: {},
      allGames: [],
      selectedGame: {},
      anzPlayer: 2,
      dialogNewGame: false,
      createForm: {},
      selKategorie: '',
      overlay: false,
      absolute: true,
    };
  },
  props: {
    game_id: {
      type: String,
    },
  },
  methods: {
    async getActiveGame() {
      this.activeGame = (
        await server.get(
          `${process.env.VUE_APP_SERVER_BASE_URL}/activegame/getGame`
        )
      ).data[0];
    },
    async getAllGames() {
      this.allGames = (
        await server.get(`${process.env.VUE_APP_SERVER_BASE_URL}/game/allGames`)
      ).data;
    },
    newDrinkingGameDialog(gameID) {
      this.selectedGame = this.allGames.find((e) => e.Game_ID == gameID);
      this.selectedGame.Kategorien = this.selectedGame.Kategorien.split(';');
      this.dialogNewGame = true;
    },
    async createDrinkingGame() {
      let playerArr = [];
      for (let i = 1; i <= this.anzPlayer; i++) {
        playerArr.push(document.querySelector(`#player${i}`).value);
      }
      let playerString = playerArr.join(';');
      await server.post(
        `${process.env.VUE_APP_SERVER_BASE_URL}/activegame/creategame`,
        {
          game_id: this.selectedGame.Game_ID,
          players: playerString,
          kategorie: this.selKategorie,
        }
      );
      this.dialogNewGame = false;
      this.$router.replace(`/gamesite`);
    },
  },
  created() {
    this.getActiveGame();
    this.getAllGames();
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
