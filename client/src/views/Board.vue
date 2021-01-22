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
        <BoardToolbar @onMenuClick="drawer = true" :board-name="board.name" />
      </v-flex>
      <v-flex xs12>
        <v-layout wrap>
          <v-flex v-if="!isGetPending" v-for="list in lists" :key="list._id" xs6 sm4 md3 lg2 pa-2>
            <v-card
              @dragover="setDroppingList(list)"
              elevation="0"
              :color="droppingList === list ? 'green lighten-4': '#ebebef'">
              <v-subheader class="font-weight-bold">{{ list.name }}</v-subheader>
              <v-card
                v-if="cardsByListId[list._id]"
                v-for="card in cardsByListId[list._id]"
                :key="card._id"
                draggable="true"
                @dragstart="startDraggingCard(card)"
                @dragend="dropCard"
                color="pa-2 ma-2"
                elevation="1">
                <div style="font-size: 14px">{{ card.title }}</div>
              </v-card>
              <create-card
                :list-id="list._id"
                :board-id="id"
                :loading="isCreatePending"
                :create-card-handler="createCardHandler"  />
            </v-card>
          </v-flex>
          <v-flex xs6 sm4 md2 pa-2>
            <v-btn v-if="!isCreating" block large color="rgba(255,255,255, .24)" @click="isCreating = true" dark>
              <v-icon left>mdi-plus</v-icon>
              Add another list
            </v-btn>
            <CreateListCard
              v-else
              :loading="isCreatePending"
              :create-list-handler="createListHandler" />
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    <ActivityList
      :value="drawer"
      :activities="activities"
      @onClose="drawer = false" />
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import  {models } from "feathers-vuex";
import ActivityList from "@/components/ActivityList";
import CreateCard from "@/components/CreateCard";
import BoardToolbar from "@/components/BoardToolbar";
import CreateListCard from "@/components/CreateListCard";

export default {
  name: "Board",
  props: {
    id: String
  },
  components: { CreateCard, BoardToolbar, ActivityList, CreateListCard },
  data(){
    return {
      isCreating: false,
      drawer: false,
      draggingCard: null,
      droppingList: null,
      valid: false,
      board: {},
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
    async createListHandler(list){
      list.boardId = this.id
      const newList = new models.api.List(list)
      await newList.save()
      this.createActivity(`**${this.user.displayName}** added **${newList.name}**`)
      this.isCreating = false
    },
    async createCardHandler(card){
      const newCard = new models.api.Card(card)
      await newCard.save()
      this.createActivity(`**${this.user.displayName}** added card **${card.title}**`)
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
          this.draggingCard.listId = this.droppingList._id;
          await this.draggingCard.save()
          this.createActivity(`**${this.user.displayName}** moved card **${this.draggingCard.title}** from **${fromList.name}** to **${toList.name}**`)
        }

      }
      this.droppingList = null
      this.draggingCard = null
    },
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
