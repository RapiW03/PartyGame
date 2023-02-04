<template>
  <div>
    <h1>GameSite</h1>
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
    };
  },
  methods: {
    async getGameSettings() {
      this.game = (
        await server.get(
          `${process.env.VUE_APP_SERVER_BASE_URL}/activegame/getGame`
        )
      ).data[0];
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
  },
  created() {
    this.getGameSettings();
  },
};
</script>

<style></style>
