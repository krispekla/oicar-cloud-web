<template>
  <div class="calculator-result mx-auto">
    <h2 class="font-weight-light mt-8 mb-3 d-flex"
      ><span class="mr-auto -12">Cloud Calculator Result</span
      ><span class="ml-auto"
        >recommended provider:<span class="ml-4 font-weight-bold">{{
          computeResultProvider
        }}</span></span
      ></h2
    >
    <ResultItem :result="result" />
    <v-card class="elevation-7 mt-8 mb-6 green lighten-4" height="80">
      <v-card-text class="d-flex">
        <span class="title ml-auto mr-12 pt-2">
          You can save your configuration for later!
        </span>
        <v-btn large color="green" @click="dialog = true">Save</v-btn>
      </v-card-text>
    </v-card>
    <v-dialog v-model="dialog" max-width="340">
      <v-card>
        <v-card-title class="headline-2">Name your configuration</v-card-title>

        <v-card-text class="p-4 mt-4">
          <v-form ref="form" v-model="valid" :lazy-validation="lazy">
            <v-text-field
              v-model="name"
              label="Name"
              :rules="[rules.required]"
              :error-messages="errors"
            ></v-text-field>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="black" text @click="dialog = false">
            Cancel
          </v-btn>

          <v-btn large color="green darken-1" @click="onSaveConfiguration">
            Save Configuration
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import ResultItem from '../components/ResultItem'
import api from '../utils/baseApiService'
import { copy } from '../utils/helper'
export default {
  name: 'CalculatorResult',
  components: {
    ResultItem,
  },
  data() {
    return {
      cloudProvider: ['Amazon Web Services', 'Azure', 'Google Cloud'],
      name: '',
      dialog: true,
      rules: {
        required: value => !!value || 'Required.',
      },
    }
  },
  props: {
    result: Object,
  },
  computed: {
    computeResultProvider() {
      if (this.result.cloudCombinationResult.cloudDbSQL != null)
        return this.cloudProvider[this.result.cloudCombinationResult.cloudDbSQL.cloudProvider]
      else if (this.result.cloudCombinationResult.cloudStorage != null)
        return this.cloudProvider[this.result.cloudCombinationResult.cloudStorage.cloudProvider]
      else if (this.result.cloudCombinationResult.cloudFunction != null)
        return this.cloudProvider[this.result.cloudCombinationResult.cloudFunction.cloudProvider]
      else if (this.result.cloudCombinationResult.cloudVM != null)
        return this.cloudProvider[this.result.cloudCombinationResult.cloudVM.cloudProvider]
      else return '-'
    },
  },
  methods: {
    async onSaveConfiguration() {
      const isValid = this.$refs.form.validate()
      if (!isValid) return
      try {
        this.dialog = false
        const resultObject = copy(this.result)
        resultObject.name = this.name
        resultObject.userId = this.$store.getters['account/id']
        const result = await api.post('UserCloudConfiguration/save', resultObject)
        if (result.status == 200) {
          console.log('asd')
          this.$router.push('configurations')
        }
      } catch (e) {
        this.$alert.error(e.message)
      }
    },
  },
}
</script>
<style>
.calculator-result {
  min-width: 360px;
  max-width: 1024px;
}
</style>
