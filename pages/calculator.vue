<template>
  <div>
    <v-card class="mx-auto" max-width="364" outlined>
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title class="headline mb-1"
            >Add Cloud category</v-list-item-title
          >
        </v-list-item-content>
      </v-list-item>

      <v-card-actions>
        <v-btn
          fab
          color="red accent-2"
          bottom
          right
          absolute
          @click="dialog = !dialog"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card class="p-12">
        <v-card-text>
          <normal class="grey--text">Cloud Storage</normal>
          <v-btn fab color="red accent-2" @click="dialog = !dialog">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-card-text>
        <v-card-text>
          <normal class="grey--text">Cloud Function</normal>
          <v-btn fab color="red accent-2" @click="dialog = !dialog">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-card-text>
        <v-card-text>
          <normal class="grey--text">Cloud VM</normal>
          <v-btn fab color="red accent-2" @click="dialog = !dialog">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-card-text>
        <v-card-text>
          <normal class="grey--text">Cloud SQL Db</normal>
          <v-btn fab color="red accent-2" @click="dialog = !dialog">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="dark" @click="dialog = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'Calculator',
  middleware: 'auth',
  data() {
    return {
      dialog: false
    }
  }
}
</script>
<style scoped></style>
