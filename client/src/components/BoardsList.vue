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
      <BoardsCard :board="board" />
    </v-flex>
    <v-flex xs6 sm3 md3 lg2 pa-2>
      <v-hover
          v-slot:default="{ hover }"
          close-delay="200"
      >
        <v-card
            @click="dialog = true"
            flat
            height="96px"
            style="border: 1px solid red; cursor: pointer; transition: all .2s ease"
            class="d-flex column fill-height align-center grey "
            :class="[hover ? 'lighten-4' : 'lighten-5']"
        >
          <span class="mx-auto">Create new board</span>
        </v-card>
      </v-hover>
    </v-flex>

    <v-overlay
        data-overlay
        ref="overlay"
        :value="dialog"
        opacity=".82"
        @click.native="clickOutsideHandler"
        dark>
      <div style="position: relative; top: -35vh">
        <div style="width: 406px">
          <v-container>
            <v-layout row wrap>
              <v-flex xs12 sm9 px-1 style="position: relative">
                <v-sheet :color="board.background" width="296px" class="rounded">
                  <div style="position: absolute; right: 7px; top: 7px; z-index: 2">
                    <v-btn x-small icon dark @click="dialog = false">
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                  </div>
                  <div class="px-3 py-5">
                    <input
                        v-model="board.name"
                        @keyup.enter.prevent="createBoardHandler"
                        type="text"
                        class="create-board-input"
                        placeholder="Add board title"
                    />
                    <PopOverMenu :btn-text="btnText">
                      <List @onItemClicked="item => this.btnText = item.type" />
                    </PopOverMenu>

                  </div>
                </v-sheet>
              </v-flex>
              <v-flex xs12 sm3 px-1>
                <v-container>
                  <v-layout row justify-space-between>
                    <v-flex xs4 v-for="(color, i) in colors" :key="i" mb-2>
                      <v-sheet
                        @click="board.background = colors[i]"
                        :color="color"
                        width="28px"
                        height="28px"
                        class="rounded d-flex align-center justify-center">
                        <v-icon small v-if="board.background === color">mdi-check</v-icon>
                      </v-sheet>
                    </v-flex>
                    <v-flex xs4 mb-2>
                      <v-sheet width="28px" height="28px" color="white" class="rounded d-flex align-center justify-center">
                        <v-icon small class="ma-auto" dark color="blue">mdi-dots-horizontal</v-icon>
                      </v-sheet>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-flex>
              <v-btn @click.prevent="createBoardHandler" color="success" :loading="isCreatePending" :disabled="valid">create board</v-btn>
            </v-layout>
          </v-container>
        </div>

      </div>
    </v-overlay>
  </v-layout>
</template>

<script>
import BoardsCard from "@/components/BoardsCard";
import PopOverMenu from "@/components/PopOverMenu";
import List from "@/components/List";
import {mapActions, mapGetters, mapState} from "vuex";
import {models} from "feathers-vuex";

export default {
  name: "BoardsList",
  components: { BoardsCard, PopOverMenu, List },
  inject: ['dialog'],
  data(){
    return {
      btnText: 'Private',
      colors: ['blue', 'orange', 'brown', 'grey', 'teal', 'navy', 'indigo', 'purple'],
      // dialog: false,
      boardType: 'Private',
      board: {
        name: '',
        background: 'blue',
      },
      notEmptyRules: [
        v => !!v || 'Password is required',
      ],
    }
  },
  mounted() {
    this.findBoards({ query: {} })
  },
  methods: {
    ...mapActions('boards', { findBoards: 'find' }),
    createBoardHandler(){
      if(!this.valid){
        const board = new models.api.Board(this.board)
        board.save()
        this.board.name = ''

      }
    },
    clickOutsideHandler(e) {
      if(e.target.classList.contains('v-overlay__scrim')){
        this.board.name = ''
        this.dialog = false
        this.menu = false
      }
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
    valid(){
      return this.board.name === ''
    },

  },
}
</script>

<style scoped>
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
