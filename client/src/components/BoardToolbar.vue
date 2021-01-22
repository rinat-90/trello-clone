<template>
  <v-toolbar class="px-0" flat dense light color="rgba(0,0,0,0)" width="100%">
    <v-toolbar-items>
      <v-btn small dark color="rgba(255,255,255, .24)" class="rounded-lg">{{ boardName }}</v-btn>
      <v-btn small dark color="rgba(255,255,255, .24)" class="ml-2 rounded-lg">
        <v-icon color="orange">mdi-star-outline</v-icon>
      </v-btn>
    </v-toolbar-items>
    <v-spacer />
    <v-toolbar-items >
      <v-btn small dark color="rgba(255,255,255, .24)" class="rounded-lg" @click="$emit('onMenuClick')">
        <v-icon left>mdi-dots-horizontal</v-icon>
        show menu
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  name: "BoardToolbar",
  props: {
    boardName: String
  }
}
</script>

<style scoped>

</style>
