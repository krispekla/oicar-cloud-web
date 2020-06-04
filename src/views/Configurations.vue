<template>
  <div>
    <h2 class="font-weight-light mt-8 mr-12 text-center">User configurations</h2>
    <v-card class="cloud-configuration-card elevation-3 mt-6">
      <v-row class="cloud-content-wrapper">
        <v-col class="d-flex  flex-column justify-start">
          <h4 class="font-weight-medium pt-4 ml-4 mb-6">List of all saved configurations</h4>
          <v-data-table
            v-model="currentlySelectedUserConfiguration"
            :headers="headers"
            :items="computedUserConfigurations"
            single-select
            item-key="name"
            show-select
            class="elevation-1"
          >
          </v-data-table>

          <v-card class="elevation-7 mt-8 mb-6 light-blue lighten-5" height="80">
            <v-card-text class="d-flex justify-space-around">
              <span class="title ml-auto mr-12 pt-2">
                Change your configuration
              </span>
              <v-btn class="mr-6" large color="error">Delete</v-btn>
              <v-btn large color="primary">Change name</v-btn>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col>
          <div class="d-flex">
            <span class="font-weight-medium pt-4 ml-1"
              >Name:
              <span class="font-weight-light ml-4">{{
                currentlySelectedUserConfiguration.length > 0
                  ? currentlySelectedUserConfiguration[0].name
                  : '-'
              }}</span></span
            >
              <v-btn class="ml-auto mt-2" color="success">Recalculate</v-btn>
            <h4 class="font-weight-medium pt-4 ml-auto mr-12">Results</h4>
          </div>
          <transition name="fade" mode="out-in">
            <ResultItem v-if="getCurrentConfig" :result="getCurrentConfig" />
            <div v-else>
              <h3 class="font-weight-light pt-4 ml-12 mt-4 mb-6">Please select configuration!</h3>
            </div>
          </transition>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import api from '../utils/baseApiService'
import ResultItem from '../components/ResultItem'
import { copy } from '../utils/helper'
export default {
  name: 'Configurations',
  components: {
    ResultItem,
  },
  async mounted() {
    try {
      const userId = this.$store.getters['account/id']
      const result = await api.get('UserCloudConfiguration/getAll', { params: { id: userId } })

      if (result.status == 200) {
        this.userConfigurations = result.data
      }
    } catch (e) {
      this.$alert.error(e.message)
    }
  },
  computed: {
    computedUserConfigurations() {
      let computeConfig = []
      this.userConfigurations.forEach(element => {
        let temp = copy(element)
        let totalPrice = 0
        // if (!isEmptyObject(element.cloudCombinationResult.cloudDbSQL))
        //   totalPrice += element.cloudCombinationResult.cloudDbSQL.price
        // if (!isEmptyObject(element.cloudCombinationResult.cloudFunction))
        //   totalPrice += element.cloudCombinationResult.cloudFunction.price
        // if (!isEmptyObject(element.cloudCombinationResult.cloudStorage))
        //   totalPrice += element.cloudCombinationResult.cloudStorage.price
        // if (!isEmptyObject(element.cloudCombinationResult.cloudVM))
        //   totalPrice += element.cloudCombinationResult.cloudVM.price

        temp.totalPrice = totalPrice
        computeConfig.push(temp)
      })
      return computeConfig
    },
    getCurrentConfig() {
      if (this.currentlySelectedUserConfiguration.length > 0)
        return this.currentlySelectedUserConfiguration[0]

      return null
    },
  },
  data() {
    return {
      currentlySelectedUserConfiguration: [],
      userConfigurations: [],
      selected: [],
      headers: [
        {
          text: 'Id',
          sortable: false,
          value: 'id',
        },
        {
          text: 'Configuration name',
          sortable: false,
          value: 'name',
        },
        {
          text: 'Total price',
          sortable: false,
          value: 'totalPrice',
        },
      ],
    }
  },
}
</script>
<style scoped>
.cloud-configuration-card {
  background: rgba(241, 241, 241, 0.199);
  /* min-height: 350px; */
  min-width: 360px;
  min-height: 780px;
  max-width: 1920px;
  margin: 30px auto;
}
</style>
