<template>
  <v-app class="backgroundClass">
    <v-app-bar app color="black" dark
      ><span color="white">Drinking Game</span>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',

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
