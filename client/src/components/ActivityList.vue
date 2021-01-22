<template>
  <v-navigation-drawer
    :value="value"
    right
    absolute
    temporary
  >
    <v-toolbar elevation="1">
      <v-flex class="text-center heading"><strong>Menu</strong></v-flex>
      <v-btn icon absolute right @click="$emit('onClose')">
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
</template>

<script>
import marked from "marked";

export default {
  name: "ActivityList",
  props: {
    activities: Array,
    value: Boolean
  },
  methods: {
    markdownify(text) {
      return marked(text)
    }
  }
}
</script>

<style scoped>

</style>
