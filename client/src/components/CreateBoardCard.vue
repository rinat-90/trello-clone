<template>
  <v-hover
    v-slot:default="{ hover }"
    close-delay="200"
  >
    <v-card
      @click="$emit('onDialogOpen')"
      flat
      height="96px"
      style="border: 1px solid red; cursor: pointer; transition: all .2s ease"
      class="d-flex column fill-height align-center grey "
      :class="[hover ? 'lighten-4' : 'lighten-5']"
    >
      <span class="mx-auto">Create new board</span>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  name: "CreateBoardForm",
  props: {
    show: Boolean
  }
}
</script>

<style scoped>

</style>
