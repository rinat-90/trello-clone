<template>
  <v-container fluid class="pa-5" :style="{'background': board ? board.background : '#cccc' }" style="color:#fff; height: calc(100vh - 64px)">
    <v-layout v-if="listsError || cardsError">
      <v-flex xs12>
        <v-alert type="error">
          <div>Unauthorized</div>
        </v-alert>
      </v-flex>
    </v-layout>
    <v-layout v-else-if="isGetPending || isFindPending">
      <v-progress-circular
          :size="70"
          width="70"
          color="primary"
          indeterminate
      />
    </v-layout>
    <v-layout row wrap v-else>
      <v-flex xs12>
        <BoardToolbar @onMenuClick="drawer = true" :board-title="board.name" />
<!--        <div style="position: relative" class="display-1 text-center text&#45;&#45;white mb-3" v-if="board">{{ board.name }}</div>-->
      </v-flex>
      <v-flex xs12>
        <v-layout wrap>
          <v-flex v-if="!isGetPending" v-for="list in lists" :key="list._id" xs6 sm4 md2 pa-2>
            <v-card elevation="0" :color="droppingList === list ? 'green lighten-4': '#ebebef'" @dragover="setDroppingList(list)">
              <v-subheader class="font-weight-bold">{{ list.name }}</v-subheader>
              <v-card
                  draggable="true"
                  @dragstart="startDraggingCard(card)"
                  @dragend="dropCard"
                  v-if="cardsByListId[list._id]"
                  v-for="card in cardsByListId[list._id]"
                  :key="card._id"
                  color="pa-2 ma-2"
                  elevation="1">
                <div style="font-size: 14px">{{ card.title }}</div>
              </v-card>
              <create-card :board-id="id" :list-id="list._id" :create-activity="createActivity" :user="user" />
            </v-card>
          </v-flex>
          <v-flex xs6 sm4 md2 pa-2>
            <v-btn v-if="!isCreating" block large color="rgba(255,255,255, .24)" @click="isCreating = true" dark>
              <v-icon left>mdi-plus</v-icon>
              Add another list
            </v-btn>
            <v-card v-else>
              <v-form ref="form" v-model="valid">
                <v-card-text class="pa-2">
                  <v-text-field
                      @keydown.enter.prevent="createListHandler"
                      v-model="list.name"
                      :rules="notEmptyRules"
                      placeholder="Enter list title..."
                      autofocus
                      flat
                      dense
                      solo
                      required
                  />
                  <v-btn
                      color="success"
                      @click.prevent="createListHandler"
                      :loading="isCreatePending"
                      :disabled="!valid || isCreatePending"
                      small>
                    Add
                  </v-btn>
                  <v-btn class="ml-2" icon text @click="isCreating = false">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-card-text>
              </v-form>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-navigation-drawer
        v-model="drawer"
        right
        absolute
        temporary
    >
      <v-toolbar elevation="1">
        <v-flex class="text-center heading"><strong>Menu</strong></v-flex>
        <v-btn icon absolute right @click="drawer = !drawer">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-list
          three-line
          dense
          nav
          class="py-0"
      >
        <v-subheader>Activities</v-subheader>
        <v-list-item two-line v-for="activity in activities" :key="activity._id">
          <v-list-item-avatar>
            <v-icon color="green">mdi-plus</v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-subtitle v-html="markdownify(activity.text)"></v-list-item-subtitle>
            <v-list-item-subtitle>
              <timeago :datetime="activity.createdAt" :auto-update="60"></timeago>
              </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-container>
</template>

<script>
import marked from 'marked'
import {mapActions, mapGetters, mapState} from "vuex";
import {models} from "feathers-vuex";
import CreateCard from "@/components/CreateCard";
import BoardToolbar from "@/components/BoardToolbar";

export default {
  name: "Board",
  props: {
    id: String
  },
  components: { CreateCard, BoardToolbar },
  data(){
    return {
      drawer: false,
      draggingCard: null,
      droppingList: null,
      isCreating: false,
      cardValid: false,
      valid: false,
      board: {},
      list: {
        name: '',
        order: 0,
        archived: false
      },
      notEmptyRules: [
        v => !!v || 'Password is required',
      ],
    }
  },
  computed: {
    ...mapState('auth', { user: 'user'}),
    ...mapState('boards', {
      isGetPending: 'isGetPending',
      boardsError: 'errorOnGet'
    }),
    ...mapState('lists', {
      isFindPending: 'isFindPending',
      isCreatePending: 'isCreatePending',
      listsError: 'errorOnFind'
    }),
    ...mapState('cards', {
      cardsError: 'errorOnFind'
    }),
    ...mapGetters('lists', { findListsInStore: 'find'}),
    ...mapGetters('activities', { findActivitiesInStore: 'find'}),
    ...mapGetters('cards', { findCardsInStore: 'find'}),
    activities() {
      return this.findActivitiesInStore({ query: { boardId: this.id } }).data
    },
    lists() {
      return this.findListsInStore({ query: { boardId: this.id } }).data
    },
    cards() {
      return this.findCardsInStore({ query: { boardId: this.id } }).data
    },
    cardsByListId (){
      return this.cards.reduce((byId, card) => {
        byId[card.listId] = byId[card.listId] || []
        byId[card.listId].push(card)
        return byId
      }, {})
    }
  },
  methods: {
    ...mapActions('boards', { getBoard: 'get' }),
    ...mapActions('lists', { getLists: 'find' }),
    ...mapActions('cards', { getCards: 'find' }),
    ...mapActions('activities', { getActivities: 'find' }),
    async createListHandler(){
      if(this.$refs.form.validate()){
        this.list.boardId = this.id
        const list = new models.api.List(this.list)
        await list.save()
        this.$refs.form.reset()
        this.list = {
          name: '',
          order: this.list.order+ 1,
          archived: false
        }
        this.createActivity(`**${this.user.displayName}** added **${list.name}**`)

      }
      this.isCreating = false
    },
    createActivity(text) {
      const activity= new models.api.Activity()
      activity.text = text
      activity.boardId = this.id
      activity.save()
    },
    startDraggingCard(card) {
      this.draggingCard = card
    },
    setDroppingList(list) {
      this.droppingList = list
    },
    async dropCard() {
      if (this.droppingList) {
        if (this.draggingCard.listId !== this.droppingList._id){
          const fromList = this.lists.find(list => list._id === this.draggingCard.listId)
          const toList = this.lists.find(list => list._id === this.droppingList._id)
          console.log(fromList)
          console.log(toList)
          this.draggingCard.listId = this.droppingList._id;
          await this.draggingCard.save()
          this.createActivity(`**${this.user.displayName}** moved card **${this.draggingCard.title}** from **${fromList.name}** to **${toList.name}**`)
        }

      }
      this.droppingList = null
      this.draggingCard = null
    },
    markdownify(text) {
      return marked(text)
    }
  },
  async mounted() {
    this.getBoard(this.id)
      .then(res => {
        this.board = res.data || res
      })
    await this.getLists({ query: { boardId: this.id }})
    await this.getCards({ query: { boardId: this.id }})
    await this.getActivities({ query: { boardId: this.id }})

  },


}
</script>

<style scoped>
.board{
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top:0;
}
</style>