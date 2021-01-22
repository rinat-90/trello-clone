<template>
  <v-overlay
    data-overlay
    ref="overlay"
    :value="value"
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
                  <v-btn x-small icon dark @click="onClose">
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
              <ColorPalette
                :checked-color="board.background"
                @onColorCheck="color => this.board.background = color" />
            </v-flex>
            <v-btn @click.prevent="onCreate" color="success" :loading="loading" :disabled="valid">create board</v-btn>
          </v-layout>
        </v-container>
      </div>

    </div>
  </v-overlay>
</template>

<script>
import PopOverMenu from "@/components/PopOverMenu";
import ColorPalette from "@/components/ColorPalette";
import List from "@/components/List";

export default {
  name: "OverlayModal",
  props: {
    value: Boolean,
    loading: Boolean,
    createBoardHandler: Function
  },
  components: { PopOverMenu, List, ColorPalette },
  data() {
    return {
      btnText: 'Private',
      board: {
        name: '',
        background: 'blue',
      },
      notEmptyRules: [
        v => !!v || 'Password is required',
      ],
    }
  },
  computed: {
    valid(){
      return this.board.name === ''
    },
  },
  methods: {
    onClose(){
      this.$emit('onClose')
    },
    async onCreate(){
      if(!this.valid){
        await this.createBoardHandler(this.board)
        this.onClose()
      }

    },
    clickOutsideHandler(e) {
      if(e.target.classList.contains('v-overlay__scrim')){
        this.board.name = ''
        this.onClose()
      }
    },
  }
}
</script>

<style scoped>

</style>
