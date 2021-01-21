<template>
  <v-container fluid class="pa-5">
    <BoardsList />
  </v-container>
</template>
<script>
import BoardsList from "@/components/BoardsList";

export default {
  name: 'Boards',
  components: { BoardsList, },
  data(){
    return{
      dialog: false
    }
  }

}
</script>

<style>

</style>
