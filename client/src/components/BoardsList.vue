<template>
  <v-layout row wrap>
    <v-flex sx12 v-if="isFindPending">
      <v-progress-circular
          :size="70"
          width="70"
          color="primary"
          indeterminate
      />
    </v-flex>
    <v-flex v-if="!isFindPending" v-for="board in boards" :key="board._id" xs6 sm3 md3 lg2 pa-2>
      <SingleBoard :board="board" />
    </v-flex>
    <v-flex xs6 sm3 md3 lg2 pa-2>
      <CreateBoardCard @onDialogOpen="dialog = true" />
    </v-flex>
    <CreateBoardDialog
      v-model="dialog"
      :loading="isCreatePending"
      :createBoardHandler="createBoardHandler"
      @onClose="dialog = false" />
  </v-layout>
</template>

<script>
import SingleBoard from "@/components/SingleBoard";
import CreateBoardDialog from "@/components/CreateBoardDialog";
import CreateBoardCard from "@/components/CreateBoardCard";
import { mapActions, mapGetters, mapState } from "vuex";
import { models } from "feathers-vuex";

export default {
  name: 'BoardsList',
  components: { SingleBoard, CreateBoardDialog, CreateBoardCard },
  data(){
    return {
      dialog: false,
    }
  },
  mounted() {
    this.findBoards({ query: {} })
  },
  methods: {
    ...mapActions('boards', { findBoards: 'find' }),
    async createBoardHandler(board){
      const newBoard = new models.api.Board(board)
      newBoard.save()
    },
  },
  computed: {
    ...mapState('auth', { user: 'user'}),
    ...mapState('boards', {
      isFindPending: 'isFindPending',
      isCreatePending: 'isCreatePending'
    }),
    ...mapGetters('boards', { findBoardsInStore: 'find' }),
    boards(){
      return this.user ? this.findBoardsInStore({
        query: {
          ownerId: this.user._id
        }
      }).data : []
    },

  },
}
</script>

<style>
.card-overlay {
  background-color: rgba(0,0,0, .20);
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
}

.create-board{
  width: 296px;
  position: relative;
}
.create-board-wrapper{
  display: flex;
  justify-content: space-between;
  width: 406px;
}
.board-background{
  width: 100px;
}

.create-board-input{
  width: 90%;
  outline: none;
  color: #fff;
  line-height: 24px;
  margin-bottom: 4px;
  padding: 2px 8px;
  border-radius: 5px;
  margin-right: 20px;
}
.create-board-input:focus {
  background-color: rgba(255,255,255, .3);
}
.create-board-input::placeholder{
  font-weight: bolder;
  color: rgba(255,255, 255, .7);
}

</style>
