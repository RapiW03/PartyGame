<template>
  <div>
    <h1 v-if="game_id == '1'">Trinkspiel Fragen</h1>
    <h1 v-if="game_id == '9999'">Test</h1>
    <v-list dense v-if="game_id == '1'">
      <v-list-item-group>
        <v-list-item>
          <button
            class="buttonsMenu"
            role="button"
            @click="newDrinkingGameDialog('1')"
          >
            Neues Spiel
          </button>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <v-dialog max-width="600" v-model="dialogNewGame">
      <v-form v-model="createForm">
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
            color="purple darken-2"
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
          ></v-select>
        </div>
        <v-btn color="primary" text @click="dialogNewGame = false">
          Schließen
        </v-btn>
        <v-btn color="success" @click="createDrinkingGame">
          Spiel erstellen
        </v-btn>
      </v-form>
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
      console.log(this.activeGame);
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
    createDrinkingGame() {
      console.log(this.createForm);
    },
  },
  created() {
    this.getActiveGame();
    this.getAllGames();
  },
};
</script>

<style></style>
