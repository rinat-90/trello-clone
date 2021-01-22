<template>
  <v-card>
    <v-form ref="form" v-model="valid">
      <v-card-text class="pa-2">
        <v-text-field
          @keydown.enter.prevent="onCreateList"
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
          @click.prevent="onCreateList"
          :loading="loading"
          :disabled="!valid || loading"
          small>
          Add
        </v-btn>
        <v-btn class="ml-2" icon text @click="isCreating = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-text>
    </v-form>
  </v-card>
</template>

<script>
export default {
  name: "CardsList",
  props: {
    loading: Boolean,
    createListHandler: Function
  },
  data(){
    return {
      valid: false,
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
  methods: {
    async onCreateList(){
      if(this.$refs.form.validate()){
        await this.createListHandler(this.list)
        this.list = {
          name: '',
          order: this.list.order+ 1,
          archived: false
        }
      }

    }
  }
}
</script>

<style scoped>

</style>
