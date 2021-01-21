<template>
  <div ref="card">
    <v-card-text class="pa-2">
      <v-btn light block text class="grey--text" @click="isCreating = true" v-if="!isCreating">
        <v-icon left>mdi-plus</v-icon>
        <span>Add another card</span>
      </v-btn>
      <v-form v-model="valid" ref="form" v-if="isCreating" @submit.prevent="createCardHandler">
        <v-text-field
            v-model="card.title"
            ref="titleInput"
            @keydown.enter.prevent="createCardHandler"
            @focusout="focusOut"
            :rules="notEmptyRules"
            placeholder="Enter a title for this card"
            autofocus
            flat
            dense
            solo
        />
      </v-form>
    </v-card-text>
    <v-card-actions v-if="isCreating">
      <v-btn
          color="success"
          type="button"
          :loading="isCreatePending"
          :disabled="!valid || isCreatePending"
          small>
        Add card
      </v-btn>
      <v-btn class="ml-2" icon text @click="isCreating = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-actions>
  </div>
</template>

<script>
import {models} from "feathers-vuex";
import { mapState } from 'vuex'

export default {
  name: "CreateCard",
  props: {
    listId: String,
    boardId: String,
    user: Object,
    createActivity: Function
  },
  data(){
    return {
      isCreating: false,
      isCreatePending: false,
      valid: true,
      card: {
        title: '',
        members: [],
      },
      notEmptyRules: [
        v => !!v || 'Password is required',
      ],
    }
  },
  methods: {
    async createCardHandler(){
      if(this.$refs.form.validate()){
        this.card.boardId = this.boardId
        this.card.listId = this.listId
        const card = new models.api.Card(this.card)
        this.isCreatePending = true
        await card.save()
        this.isCreatePending = false
        this.$refs.form.reset()
        this.createActivity(`**${this.user.displayName}** added card **${card.title}**`)
      }
      this.$refs.titleInput.$el.focus()
    },
    focusOut(e) {
    }
  },
}
</script>

<style scoped>

</style>