<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-width="200"
    offset-y
    right
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="rgba(255,255,255, .24)"
        class="mr-1"
        v-bind="attrs"
        v-on="on"
      >
        <v-icon>{{ icon }}</v-icon>
      </v-btn>
    </template>
    <v-card elevation="0" flat width="384px">
      <v-toolbar dense flat>
        <v-toolbar-title>
          {{ title }}
        </v-toolbar-title>
        <v-btn icon absolute right @click="menu = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-divider></v-divider>
      <slot></slot>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  name: 'MenuPopOver',
  props: {
    btnText: String,
    title: String,
    icon: String
  },
  data() {
    return {
      menu: false
    }
  },
  watch: {
    btnText(val){
      if (val) {
        this.menu = false
      }
    }
  }
}
</script>

<style scoped>

</style>
