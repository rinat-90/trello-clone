<template>
  <div ref="card">
    <v-card-text class="pa-2">
      <v-btn light block text class="grey--text" @click="isCreating = true" v-if="!isCreating">
        <v-icon left>mdi-plus</v-icon>
        <span>Add another card</span>
      </v-btn>
      <v-form v-model="valid" ref="form" v-if="isCreating">
        <v-text-field
            v-model="card.title"
            ref="titleInput"
            @keydown.enter.prevent="onCreateCard"
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
        @click.prevent="onCreateCard"
          color="success"
          :loading="loading"
          :disabled="!valid || loading"
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
export default {
  name: "CreateCard",
  props: {
    createCardHandler: Function,
    loading: Boolean,
    boardId: String,
    listId: String
  },
  data(){
    return {
      isCreating: false,
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
    async onCreateCard(){
      if(this.$refs.form.validate()){
        this.card.boardId = this.boardId
        this.card.listId = this.listId

        await this.createCardHandler(this.card)
        await this.$refs.form.reset()
      }
    },
  },
}
</script>

<style scoped>

</style>
