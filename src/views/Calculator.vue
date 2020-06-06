<template>
  <div>
    <h2 v-if="resultData" class="font-weight-light text-center mt-6 mb-3">
      Select your cloud services:
    </h2>
    <v-card v-if="resultData" class="mx-auto" max-width="804" outlined>
      <v-expansion-panels accordion multiple hover tile>
        <!-- Cloud Storage -->
        <v-expansion-panel @change="storageToggle = !storageToggle">
          <v-expansion-panel-header
            >Cloud Storage
            <template v-slot:actions>
              <v-icon v-if="!storageToggle" color="blue">mdi-plus</v-icon>
              <v-icon v-else color="blue">mdi-minus</v-icon>
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content class="expansion-cloud-content">
            <ValidationProvider
              v-slot="{ errors }"
              name="Total amount"
              rules="numeric|required|max:5"
            >
              <v-col cols="5">
                <v-text-field
                  v-model="cloudStorage.totalAmount"
                  label="Total amount"
                  required
                  :error-messages="errors"
                ></v-text-field>
              </v-col>
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              name="Read operations"
              rules="numeric|required|max:5"
            >
              <v-col cols="5">
                <v-text-field
                  v-model="cloudStorage.readOperationsPerMonth"
                  label="Read operations per month"
                  required
                  :error-messages="errors"
                ></v-text-field>
              </v-col>
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              name="Write operations"
              rules="numeric|required|max:5"
            >
              <v-col cols="5">
                <v-text-field
                  v-model="cloudStorage.writeOperationsPerMonth"
                  label="Write operations per month"
                  required
                  :error-messages="errors"
                ></v-text-field>
              </v-col>
            </ValidationProvider>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <!-- Cloud Function -->
        <v-expansion-panel @change="functionToggle = !functionToggle">
          <v-expansion-panel-header
            >Cloud Function
            <template v-slot:actions>
              <v-icon v-if="!functionToggle" color="blue">mdi-plus</v-icon>
              <v-icon v-else color="blue">mdi-minus</v-icon>
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <ValidationProvider
              v-slot="{ errors }"
              name="Memory size in MB"
              rules="numeric|required|max:5"
            >
              <v-col cols="3">
                <v-text-field
                  v-model="cloudFunction.memorySizeInMB"
                  label="Memory size in mb"
                  required
                  :error-messages="errors"
                ></v-text-field>
              </v-col>
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              name="Executions per request in miliseconds"
              rules="numeric|required|max:5"
            >
              <v-col cols="3">
                <v-text-field
                  v-model="cloudFunction.executinPerRequestInMiliseconds"
                  label="Exec per request"
                  required
                  :error-messages="errors"
                ></v-text-field>
              </v-col>
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              name="Executions per month"
              rules="numeric|required|max:5"
            >
              <v-col cols="3">
                <v-text-field
                  v-model="cloudFunction.executionsPerMonth"
                  label="Executions per month"
                  required
                  :error-messages="errors"
                ></v-text-field>
              </v-col>
            </ValidationProvider>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <!-- Cloud VM -->
        <v-expansion-panel @change="vmToggle = !vmToggle">
          <v-expansion-panel-header
            >Cloud VM
            <template v-slot:actions>
              <v-icon v-if="!vmToggle" color="blue">mdi-plus</v-icon>
              <v-icon v-else color="blue">mdi-minus</v-icon>
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <ValidationProvider
              v-slot="{ errors }"
              name="Nb of instances"
              rules="numeric|required|max:5"
            >
              <v-col cols="5">
                <v-text-field
                  v-model="cloudVM.instanceNb"
                  label="Nb of instances"
                  required
                  :error-messages="errors"
                ></v-text-field>
              </v-col>
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              name="Operating System"
              rules="numeric|required|max:2"
            >
              <v-col cols="5">
                <v-select
                  v-model="cloudVM.operatingSystem"
                  :items="operatingSystem"
                  item-text="name"
                  item-value="id"
                  :error-messages="errors"
                  label="Operating system"
                ></v-select>
              </v-col>
            </ValidationProvider>
            <ValidationProvider v-slot="{ errors }" name="Ram size" rules="numeric|required|max:5">
              <v-col cols="5">
                <v-text-field
                  v-model="cloudVM.ram"
                  label="Ram"
                  required
                  :error-messages="errors"
                ></v-text-field>
              </v-col>
            </ValidationProvider>
            <ValidationProvider v-slot="{ errors }" name="Cores" rules="numeric|required|max:2">
              <v-col cols="5">
                <v-text-field
                  v-model="cloudVM.core"
                  label="Cores"
                  required
                  :error-messages="errors"
                ></v-text-field>
              </v-col>
            </ValidationProvider>
            <ValidationProvider v-slot="{ errors }" name="Storage" rules="numeric|required|max:5">
              <v-col cols="5">
                <v-text-field
                  v-model="cloudVM.storage"
                  label="Storage"
                  required
                  :error-messages="errors"
                ></v-text-field>
              </v-col>
            </ValidationProvider>

            <v-col cols="5">
              <v-slider
                v-model="cloudVM.averageHoursPerDay"
                label="Average Hours per day"
                :thumb-size="24"
                max="24"
                min="1"
                thumb-label="always"
              ></v-slider>
            </v-col>

            <v-col cols="5">
              <v-slider
                v-model="cloudVM.averageDaysPerWeek"
                label="Average Hours per day"
                :thumb-size="24"
                max="7"
                min="1"
                thumb-label="always"
              ></v-slider>
            </v-col>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <!-- Cloud SQL db -->
        <v-expansion-panel @change="sqlToggle = !sqlToggle">
          <v-expansion-panel-header
            >Cloud SQL Db
            <template v-slot:actions>
              <v-icon v-if="!sqlToggle" color="blue">mdi-plus</v-icon>
              <v-icon v-else color="blue">mdi-minus</v-icon>
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <ValidationProvider v-slot="{ errors }" name="Instances" rules="numeric|required|max:2">
              <v-col cols="5">
                <v-text-field
                  v-model="cloudDbSQL.instance"
                  label="Instances"
                  required
                  :error-messages="errors"
                ></v-text-field>
              </v-col>
            </ValidationProvider>
            <ValidationProvider v-slot="{ errors }" name="Ram size" rules="numeric|required|max:5">
              <v-col cols="5">
                <v-text-field
                  v-model="cloudDbSQL.ram"
                  label="Ram"
                  required
                  :error-messages="errors"
                ></v-text-field>
              </v-col>
            </ValidationProvider>
            <ValidationProvider v-slot="{ errors }" name="Cores" rules="numeric|required|max:2">
              <v-col cols="5">
                <v-text-field
                  v-model="cloudDbSQL.cpuCores"
                  label="Cpu Cores"
                  required
                  :error-messages="errors"
                ></v-text-field>
              </v-col>
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              name="Backup size"
              rules="numeric|required|max:5"
            >
              <v-col cols="5">
                <v-text-field
                  v-model="cloudDbSQL.baskupSize"
                  label="Backup size"
                  required
                  :error-messages="errors"
                ></v-text-field>
              </v-col>
            </ValidationProvider>

            <v-col cols="5">
              <v-slider
                v-model="cloudDbSQL.averageHoursPerDay"
                label="Average Hours per day"
                :thumb-size="24"
                max="24"
                min="1"
                thumb-label="always"
              ></v-slider>
            </v-col>

            <v-col cols="5">
              <v-slider
                v-model="cloudDbSQL.averageDaysPerWeek"
                label="Average Days per week"
                :thumb-size="24"
                max="7"
                min="1"
                thumb-label="always"
              ></v-slider>
            </v-col>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <v-list-item one-line class="mt-6">
        <v-list-item-content>
          <v-list-item-title class="headline-1 mb-0"
            >Find cheapest Cloud Provider for your case</v-list-item-title
          >
        </v-list-item-content>
      </v-list-item>

      <v-card-actions>
        <v-btn
          color="blue accent-1"
          bottom
          right
          absolute
          large
          width="200"
          @click="onCalculatorSubmit"
          >Calculate
          <v-icon class="ml-6">mdi-calculator</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { ValidationProvider } from 'vee-validate'
import api from '../utils/baseApiService'
export default {
  name: 'Calculator',
  middleware: 'auth',
  components: {
    ValidationProvider,
  },
  data() {
    return {
      storageToggle: false,
      functionToggle: false,
      vmToggle: false,
      sqlToggle: false,
      resultData: {},
      operatingSystem: [
        {
          id: 0,
          name: 'Windows',
        },
        {
          id: 1,
          name: 'Linux',
        },
      ],
      cloudVM: {
        instanceNb: 1,
        operatingSystem: 0,
        core: 1,
        ram: 1,
        storage: 1,
        storageType: 0,
        averageHoursPerDay: 1,
        averageDaysPerWeek: 1,
      },
      cloudStorage: {
        totalAmount: 1,
        readOperationsPerMonth: 1,
        writeOperationsPerMonth: 1,
      },
      cloudDbSQL: {
        instance: 1,
        ram: 1,
        cpuCores: 1,
        baskupSize: 1,
        averageHoursPerDay: 1,
        averageDaysPerWeek: 1,
        sqlServerType: 0,
      },
      cloudFunction: {
        executinPerRequestInMiliseconds: 1,
        memorySizeInMB: 1,
        executionsPerMonth: 1,
      },
      CloudStorageRules: {
        totalAmount: [
          value => !!value || 'Required.',
          value => (value || '').length <= 100000 || 'Max 100000 characters',
          value => (value || '').length === 0 || 'Min 1 characters',
        ],
      },
    }
  },
  methods: {
    async onCalculatorSubmit() {
      // this.$refs.observer.validate()
      try {
        this.dialog = !this.dialog
        const userInput = {
          cloudStorage: this.storageToggle ? this.cloudStorage : null,
          cloudFunction: this.functionToggle ? this.cloudFunction : null,
          cloudVM: this.vmToggle ? this.cloudVM : null,
          cloudDbSQL: this.sqlToggle ? this.cloudDbSQL : null,
        }

        const result = await api.post('Calculator', userInput)

        if (result.status == 200) {
          this.$router.push({ name: 'calculator-result', params: { result: result.data } })
        }
      } catch (e) {
        this.$alert.error(e.message)
      }
    },
  },
}
</script>
<style scoped>
.expansion-cloud-content {
  min-height: 300px !important;
  background: rgba(233, 233, 233, 0.527);
}
</style>
