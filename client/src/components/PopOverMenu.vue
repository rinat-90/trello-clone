<template>
  <div>
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="200"
      offset-y
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          small
          dark
          text
          v-bind="attrs"
          v-on="on"
        >
          <v-icon small left>mdi-lock-outline</v-icon>
          <span>{{ btnText }}</span>
          <v-icon small right>mdi-chevron-down</v-icon>
        </v-btn>
      </template>
      <v-card width="370px">
        <slot></slot>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
export default {
  name: "PopOverMenu",
  props: {
    btnText: String
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
