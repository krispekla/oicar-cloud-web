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
              <v-btn
                @click="onCloudConfigDelete"
                :disabled="!getCurrentConfig"
                class="mr-6"
                large
                color="error"
                >Delete</v-btn
              >
              <v-btn
                @click="onCloudConfigChangeNameShow"
                :disabled="!getCurrentConfig"
                large
                color="primary"
                >Change name</v-btn
              >
            </v-card-text>
          </v-card>

          <v-dialog v-model="changeNameDialog" persistent max-width="290">
            <v-card>
              <v-card-title class="headline">Change name</v-card-title>
              <v-card-text>
                <v-form ref="form">
                  <v-text-field
                    v-model="changeName"
                    label="Name"
                    :rules="[rules.required]"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="black darken-1" text @click="onChangeNameCancel">Cancel</v-btn>
                <v-btn color="green darken-1" @click="dialog = false">Change name</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>
        <v-col>
          <div class="d-flex">
            <span class="font-weight-medium pt-4 ml-1"
              >Name:
              <span class="font-weight-light">{{
                currentlySelectedUserConfiguration.length > 0
                  ? currentlySelectedUserConfiguration[0].name
                  : '-'
              }}</span></span
            >
            <span class="font-weight-medium pt-4 ml-6"
              >Date: <span class="font-weight-light">{{ computeCloudItemDate }}</span></span
            >
            <div v-if="!cloudPriceIsValid" class="ml-auto d-inline-flex">
              <p class="mt-4 mr-3">Prices are not valid anymore!</p>
              <v-switch v-model="showNew" class="mx-2 mt-3" :label="computeSwitchLabel"></v-switch>
            </div>
            <v-btn
              @click="onRecalculate"
              :disabled="!getCurrentConfig"
              class="ml-auto mt-2"
              color="success"
              >Recalculate</v-btn
            >
            <h4 class="font-weight-medium pt-4 ml-4 mr-3"
              >Results <span class="font-weight-light">{{ computeResultProvider }}</span></h4
            >
          </div>
          <transition name="fade" mode="out-in">
            <ResultItem
              v-if="getCurrentConfig"
              :result="getCurrentConfig"
              :hasNewData="!cloudPriceIsValid"
              :showOld="showNew"
              :updatedData="updatedData"
            />
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
import { copy, isEmptyObject, formatDate } from '../utils/helper'
export default {
  name: 'Configurations',
  components: {
    ResultItem,
  },
  async mounted() {
    this.onGetAllConfigurations()
  },
  computed: {
    computedUserConfigurations() {
      let computeConfig = []
      this.userConfigurations.forEach(element => {
        let temp = copy(element)
        let totalPrice = 0
        if (!isEmptyObject(element.cloudCombinationResult)) {
          if (element.cloudCombinationResult.cloudDbSQL != null)
            totalPrice += element.cloudCombinationResult.cloudDbSQL.price
              ? element.cloudCombinationResult.cloudDbSQL.price
              : 0
          if (element.cloudCombinationResult.cloudFunction != null)
            totalPrice += element.cloudCombinationResult.cloudFunction.price
              ? element.cloudCombinationResult.cloudFunction.price
              : 0
          if (element.cloudCombinationResult.cloudStorage != null)
            totalPrice += element.cloudCombinationResult.cloudStorage.price
              ? element.cloudCombinationResult.cloudStorage.price
              : 0
          if (element.cloudCombinationResult.cloudVM != null)
            totalPrice += element.cloudCombinationResult.cloudVM.price
              ? element.cloudCombinationResult.cloudVM.price
              : 0
        }
        temp.totalPrice = `${totalPrice} $`
        computeConfig.push(temp)
      })
      return computeConfig
    },
    getCurrentConfig() {
      if (this.currentlySelectedUserConfiguration.length > 0)
        return this.currentlySelectedUserConfiguration[0]

      return null
    },
    computeSwitchLabel() {
      return !this.showNew ? 'Old' : 'New'
    },
    computeCloudItemDate() {
      return this.currentlySelectedUserConfiguration.length > 0
        ? this.currentlySelectedUserConfiguration[0].cloudCombinationInput.cloudFunction
          ? formatDate(
              this.currentlySelectedUserConfiguration[0].cloudCombinationInput.cloudFunction.created
            )
          : '-'
        : '-'
    },
    computeResultProvider() {
      if (this.currentlySelectedUserConfiguration.length > 0) {
        if (this.currentlySelectedUserConfiguration[0].cloudCombinationResult.cloudDbSQL != null)
          return this.cloudProvider[
            this.currentlySelectedUserConfiguration[0].cloudCombinationResult.cloudDbSQL
              .cloudProvider
          ]
        else if (
          this.currentlySelectedUserConfiguration[0].cloudCombinationResult.cloudStorage != null
        )
          return this.cloudProvider[
            this.currentlySelectedUserConfiguration[0].cloudCombinationResult.cloudStorage
              .cloudProvider
          ]
        else if (
          this.currentlySelectedUserConfiguration[0].cloudCombinationResult.cloudFunction != null
        )
          return this.cloudProvider[
            this.currentlySelectedUserConfiguration[0].cloudCombinationResult.cloudFunction
              .cloudProvider
          ]
        else if (this.currentlySelectedUserConfiguration[0].cloudCombinationResult.cloudVM != null)
          return this.cloudProvider[
            this.currentlySelectedUserConfiguration[0].cloudCombinationResult.cloudVM.cloudProvider
          ]
        else return '-'
      } else return '-'
    },
  },
  data() {
    return {
      cloudProvider: ['Amazon Web Services', 'Azure', 'Google Cloud'],
      changeName: '',
      showNew: false,
      cloudPriceIsValid: true,
      currentlySelectedUserConfiguration: [],
      updatedData: {},
      userConfigurations: [],
      selected: [],
      changeNameDialog: false,
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
      rules: {
        required: value => !!value || 'Required.',
      },
    }
  },
  methods: {
    async onGetAllConfigurations() {
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
    async onRecalculate() {
      try {
        const result = await api.post(
          'Calculator',
          this.currentlySelectedUserConfiguration[0].cloudCombinationInput
        )

        if (result.status == 200) {
          if (this.compareRecalculatedData(result.data)) {
            this.$alert.info('No cloud pricing changes')
            this.updatedData = {}
            this.showNew = false
            this.cloudPriceIsValid = true
          } else {
            this.$alert.success('Recalculation succesfully finnished')
            this.updatedData = result.data.cloudCombinationResult
            this.showNew = false
            this.cloudPriceIsValid = false
          }
        }
      } catch (e) {
        this.$alert.error(e.message)
      }
    },
    compareRecalculatedData(data) {
      let oldData = copy(this.currentlySelectedUserConfiguration[0].cloudCombinationResult)
      let newData = copy(data.cloudCombinationResult)

      if (oldData.cloudDbSQL) oldData.cloudDbSQL.userCloud = null
      if (oldData.cloudFunction) oldData.cloudFunction.userCloud = null
      if (oldData.cloudStorage) oldData.cloudStorage.userCloud = null
      if (oldData.cloudVM) oldData.cloudVM.userCloud = null
      let isValid = true
      if (JSON.stringify(oldData.cloudDbSQL) !== JSON.stringify(newData.cloudDbSQL)) isValid = false
      else if (JSON.stringify(oldData.cloudFunction) !== JSON.stringify(newData.cloudFunction))
        isValid = false
      else if (JSON.stringify(oldData.cloudStorage) !== JSON.stringify(newData.cloudStorage))
        isValid = false
      else if (JSON.stringify(oldData.cloudVM) !== JSON.stringify(newData.cloudVM)) isValid = false

      return isValid
    },
    async onCloudConfigDelete() {
      try {
        const result = await api.post(
          'UserCloudConfiguration',
          this.currentlySelectedUserConfiguration[0]
        )

        if (result.status == 200) {
          this.$alert.info('Cloud configuration succesfully deleted')
          this.onGetAllConfigurations()
        } else {
          this.$alert.warning('Could not delete configuration')
        }
      } catch (e) {
        this.$alert.error(e.message)
      }
    },
    onCloudConfigChangeNameShow() {
      this.changeName = this.currentlySelectedUserConfiguration[0].name
      this.changeNameDialog = true
    },
    onChangeNameCancel() {
      this.changeNameDialog = false
      this.changeName = ''
    },
  },
}
</script>
<style scoped>
.cloud-configuration-card {
  background: rgba(241, 241, 241, 0.199);
  min-width: 360px;
  min-height: 780px;
  max-width: 1920px;
  margin: 30px auto;
}
</style>
