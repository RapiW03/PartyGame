<template>
  <div>
    <h1 v-if="game_id == '1'">Trinkspiel Fragen</h1>
    <h1 v-if="game_id == '9999'">Test</h1>
    <v-list dense v-if="game_id == '1'">
      <v-list-item-group>
        <v-list-item>
          <button class="buttonsMenu" role="button">Neues Spiel</button>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script>
import server from '@/serverInterface';
export default {
  data() {
    return {
      activeGame: {},
      kategorien: [],
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
      ).data;
      console.log(this.activeGame);
    },
  },
  created() {
    this.getActiveGame();
  },
};
</script>

<style></style>
