<template>
  <v-app>
    <Navigation />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Navigation from "@/components/Navigation";
export default {
  name: 'App',
  components:{ Navigation },
  provide: {
    dialog: false
  }
};
</script>

<style>

@font-face {
  font-family: 'fontello';
  src: url('./assets/font/fontello.eot?42115975');
  src: url('./assets/font/fontello.eot?42115975#iefix') format('embedded-opentype'),
  url('./assets/font/fontello.woff2?42115975') format('woff2'),
  url('./assets/font/fontello.woff?42115975') format('woff'),
  url('./assets/font/fontello.ttf?42115975') format('truetype'),
  url('./assets/font/fontello.svg?42115975#fontello') format('svg');
  font-weight: normal;
  font-style: normal;
}

</style>
