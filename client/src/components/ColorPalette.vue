<template>
  <v-container>
    <v-layout row justify-space-between>
      <v-flex xs4 v-for="(color, i) in colors" :key="i" mb-2>
        <v-sheet
          @click="$emit('onColorCheck', colors[i])"
          :color="color"
          width="28px"
          height="28px"
          class="rounded d-flex align-center justify-center">
          <v-icon small v-if="checkedColor === color">mdi-check</v-icon>
        </v-sheet>
      </v-flex>
      <v-flex xs4 mb-2>
        <v-sheet width="28px" height="28px" color="white" class="rounded d-flex align-center justify-center">
          <v-icon small class="ma-auto" dark color="blue">mdi-dots-horizontal</v-icon>
        </v-sheet>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "ColorPalette",
  props:{
    checkedColor: String,
    colors: {
      type: Array,
      default(){
        return ['blue', 'orange', 'brown', 'grey', 'teal', 'navy', 'indigo', 'purple']
      }
    }
  }
}
</script>

<style scoped>

</style>
