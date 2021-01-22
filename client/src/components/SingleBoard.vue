<template>
  <v-card :to="`/boards/${board._id}`">
    <v-sheet height="96px" :color="board.background">
      <v-img
          class="white--text align-end"
          height="96px"
          :src="board.background"
      >
        <div class="card-overlay"></div>
        <div style="position: absolute; top: 0; left:0; line-height: 20px" class="pa-2 font-weight-bold">{{ board.name }}</div>
      </v-img>
    </v-sheet>
  </v-card>
</template>

<script>
export default {
  name: "SingleBoard",
  props: {
    board: Object
  }
}
</script>

<style scoped>

</style>
