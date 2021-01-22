<template>
  <v-list three-line dense>
    <v-list-item
      link v-for="item in list"
      :key="list.type"
      @click="$emit('onItemClicked', item)">
      <v-list-item-avatar>
        <v-icon>{{ item.icon }}</v-icon>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title >{{ item.type }}</v-list-item-title>
        <v-list-item-subtitle>{{ item.text }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  name: "List",
  props: {
    list: {
      type: Array,
      default() {
        return [
          { icon: 'mdi-lock-outline', type: 'Private', text: 'Lorem ipsum dolor sit amet. Adipisci culpa cumque ipsa nemo similique temporibus?' },
          { icon: 'mdi-account-multiple-outline', type: 'Team', text: 'Lorem ipsum dolor sit amet. Adipisci culpa cumque ipsa nemo similique temporibus?' },
          { icon: 'mdi-earth', type: 'Public', text: 'Lorem ipsum dolor sit amet. Adipisci culpa cumque ipsa nemo similique temporibus?' }
        ]
      }
    }
  }
}
</script>

<style scoped>

</style>
