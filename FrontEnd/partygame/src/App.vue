<template>
  <v-app class="backgroundClass">
    <v-app-bar app color="black" dark
      ><span color="white">Drinking Game</span>
      <v-spacer></v-spacer>
      <v-btn @click="toMainMenu" depressed color="black"> Menu </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  methods: {
    toMainMenu() {
      this.$router.replace(`/mainmenu`);
    },
  },
  data: () => ({
    //
  }),
};
</script>
<style scoped>
.backgroundClass {
  background-color: lightgray;
}
</style>
