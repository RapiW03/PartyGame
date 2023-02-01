<template>
  <div class="flex-row mx-auto d-flex justify-center fill-height">
    <div align="center" justify="center" class="mx-auto verticalAlign">
      <h2>Spielauswahl</h2>
      <v-list dense>
        <v-list-item-group>
          <v-list-item v-for="g of games" :key="g.Game_ID">
            <button class="buttonsMenu" role="button">{{ g.Name }}</button>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </div>
  </div>
</template>

<script>
import server from '@/serverInterface';
export default {
  data() {
    return {
      games: [],
    };
  },
  methods: {
    async getAllGames() {
      this.games = (
        await server.get(`${process.env.VUE_APP_SERVER_BASE_URL}/game/allGames`)
      ).data;
    },
  },
  created() {
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
