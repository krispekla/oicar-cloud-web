<template>
  <div>
    <h2 class="font-weight-light mt-8 mb-3 text-center">User cloud statistics</h2>
    <v-card max-width="1200" class="cloud-suggestion-topall-card elevation-3 mt-6">
      <h4 class="font-weight-medium ml-4 mb-6">Top cloud configurations</h4>
      <v-data-table
        :headers="topCloudHeaders"
        :items="topCloudItems"
        class="elevation-1"
        show-expand
        item-key="date"
        single-expand
      >
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">
            <v-card-title class="subtitle text-center justify-center"> </v-card-title>
            <v-row class="cloud-content-wrapper" align="center" justify="center">
              <v-col>
                <h4 class="font-weight-medium ml-12">Cloud Function</h4>
                <div class="d-flex flex-column ml-12 mt-6 justify-center">
                  <div class="font-weight-light my-2">
                    Execution per request in milisecond:
                    <span class="font-weight-medium">{{
                      item.cloudFunction.executinPerRequestInMiliseconds
                    }}</span>
                  </div>
                  <div class="font-weight-light my-2">
                    Memory size in mb:
                    <span class="font-weight-medium"
                      >{{ item.cloudFunction.memorySizeInMB }} MB</span
                    >
                  </div>
                  <div class="font-weight-light my-2">
                    Executions per month:
                    <span class="font-weight-medium">{{
                      item.cloudFunction.executionsPerMonth
                    }}</span>
                  </div>
                </div>
              </v-col>
              <v-col>
                <h4 class="font-weight-medium ml-12">Cloud Storage</h4>
                <div class="d-flex flex-column ml-12 mt-6 justify-center">
                  <div class="font-weight-light my-2">
                    Total amount:
                    <span class="font-weight-medium">{{ item.cloudStorage.totalAmount }}</span>
                  </div>
                  <div class="font-weight-light my-2">
                    Read operations per month:
                    <span class="font-weight-medium">{{
                      item.cloudStorage.readOperationsPerMonth
                    }}</span>
                  </div>
                  <div class="font-weight-light my-2">
                    Write operations per month:
                    <span class="font-weight-medium">{{
                      item.cloudStorage.writeOperationsPerMonth
                    }}</span>
                  </div>
                </div>
              </v-col>
            </v-row>
            <v-row class="cloud-content-wrapper" align="center" justify="center">
              <v-col>
                <h4 class="font-weight-medium ml-12">Cloud SQL Db</h4>
                <div class="d-flex flex-column ml-12 mt-6 justify-center">
                  <div class="font-weight-light my-2">
                    Number of instances:
                    <span class="font-weight-medium">{{ item.cloudDbSQL.instance }}</span>
                  </div>
                  <div class="font-weight-light my-2">
                    SQL Server type:
                    <span class="font-weight-medium">{{
                      sqlServerType[item.cloudDbSQL.sqlServerType]
                    }}</span>
                  </div>
                  <div class="font-weight-light my-2">
                    Cpu cores:
                    <span class="font-weight-medium">{{ item.cloudDbSQL.cpuCores }}</span>
                  </div>
                  <div class="font-weight-light my-2">
                    Ram:
                    <span class="font-weight-medium">{{ item.cloudDbSQL.ram }}</span>
                  </div>
                  <div class="font-weight-light my-2">
                    Backup size:
                    <span class="font-weight-medium">{{ item.cloudDbSQL.baskupSize }}</span>
                  </div>
                  <div class="font-weight-light my-2">
                    Average hours per day:
                    <span class="font-weight-medium">{{ item.cloudDbSQL.averageHoursPerDay }}</span>
                  </div>
                  <div class="font-weight-light my-2">
                    Average days per week:
                    <span class="font-weight-medium">{{ item.cloudDbSQL.averageDaysPerWeek }}</span>
                  </div>
                </div>
              </v-col>
              <v-col>
                <h4 class="font-weight-medium ml-12">Cloud VM</h4>
                <div class="d-flex flex-column ml-12 mt-6 justify-center">
                  <div class="font-weight-light my-2">
                    Number of instances:
                    <span class="font-weight-medium">{{ item.cloudVM.instanceNb }}</span>
                  </div>
                  <div class="font-weight-light my-2">
                    Operating system:
                    <span class="font-weight-medium">{{
                      operatingSystem[item.cloudVM.operatingSystem].name
                    }}</span>
                  </div>
                  <div class="font-weight-light my-2">
                    Cores:
                    <span class="font-weight-medium">{{ item.cloudVM.core }}</span>
                  </div>
                  <div class="font-weight-light my-2">
                    Ram:
                    <span class="font-weight-medium">{{ item.cloudVM.ram }}</span>
                  </div>
                  <div class="font-weight-light my-2">
                    Storage:
                    <span class="font-weight-medium">{{ item.cloudVM.storage }}</span>
                  </div>
                  <div class="font-weight-light my-2">
                    Storage type:
                    <span class="font-weight-medium">{{
                      storageType[item.cloudVM.storageType].name
                    }}</span>
                  </div>
                  <div class="font-weight-light my-2">
                    Average hours per day:
                    <span class="font-weight-medium">{{ item.cloudVM.averageHoursPerDay }}</span>
                  </div>
                  <div class="font-weight-light my-2">
                    Average days per week:
                    <span class="font-weight-medium">{{ item.cloudVM.averageDaysPerWeek }}</span>
                  </div>
                </div>
              </v-col>
            </v-row>
          </td>
        </template>
      </v-data-table>
    </v-card>

    <v-row class="cloud-content-wrapper" align="center" justify="center">
      <v-col>
        <v-card max-width="960" class="cloud-suggestion-topall-card elevation-3 mt-6">
          <h4 class="font-weight-medium ml-4 mb-6">Top Cloud Storage</h4>
          <v-data-table
            :headers="topCloudStorageHeaders"
            :items="topCloudStorageItems"
            class="elevation-1"
            item-key="date"
          >
          </v-data-table>
        </v-card>
      </v-col>
      <v-col>
        <v-card max-width="960" class="cloud-suggestion-topall-card elevation-3 mt-6">
          <h4 class="font-weight-medium ml-4 mb-6">Top Cloud Function</h4>
          <v-data-table
            :headers="topCloudFunctionHeaders"
            :items="topCloudFunctionItems"
            class="elevation-1"
          >
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="cloud-content-wrapper" align="center" justify="center">
      <v-col>
        <v-card max-width="960" class="cloud-suggestion-topall-card elevation-3 mt-6">
          <h4 class="font-weight-medium ml-4 mb-6">Top Cloud VM</h4>
          <v-data-table
            :headers="topCloudVMHeaders"
            :items="topCloudVMItems"
            class="elevation-1"
            item-key="date"
          >
          </v-data-table>
        </v-card>
      </v-col>
      <v-col>
        <v-card max-width="960" class="cloud-suggestion-topall-card elevation-3 mt-6">
          <h4 class="font-weight-medium ml-4 mb-6">Top Cloud SQL Db</h4>
          <v-data-table
            :headers="topCloudDbHeaders"
            :items="topCloudDbItems"
            class="elevation-1"
            item-key="date"
          >
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import api from '../utils/baseApiService'
export default {
  name: 'Suggestions',
  data() {
    return {
      topCloudHeaders: [
        {
          text: 'Provider',
          sortable: false,
          value: 'provider',
        },
        {
          text: 'Date created',
          sortable: false,
          value: 'date',
        },
        {
          text: 'Total price',
          sortable: false,
          value: 'totalPrice',
        },
      ],
      topCloudFunctionHeaders: [
        {
          text: 'executinPerRequestInMiliseconds',
          sortable: false,
          value: 'key.executinPerRequestInMiliseconds',
        },
        {
          text: 'memorySizeInMB',
          sortable: false,
          value: 'key.memorySizeInMB',
        },
        {
          text: 'executionsPerMonth',
          sortable: false,
          value: 'key.executionsPerMonth',
        },
        {
          text: 'price',
          sortable: false,
          value: 'key.price',
        },
        {
          text: 'occurances',
          sortable: true,
          value: 'value',
        },
      ],
      topCloudDbHeaders: [
        {
          text: 'instances',
          sortable: false,
          value: 'key.instance',
        },
        {
          text: 'ram',
          sortable: false,
          value: 'key.ram',
        },
        {
          text: 'cpuCores',
          sortable: false,
          value: 'key.cpuCores',
        },
        {
          text: 'baskupSize',
          sortable: false,
          value: 'key.baskupSize',
        },
        {
          text: 'averageHoursPerDay',
          sortable: false,
          value: 'key.averageHoursPerDay',
        },
        {
          text: 'averageDaysPerWeek',
          sortable: false,
          value: 'key.averageDaysPerWeek',
        },
        {
          text: 'price',
          sortable: false,
          value: 'key.price',
        },
        {
          text: 'occurances',
          sortable: true,
          value: 'value',
        },
      ],
      topCloudStorageHeaders: [
        {
          text: 'total amount',
          sortable: false,
          value: 'key.totalAmount',
        },
        {
          text: 'read oper per month',
          sortable: false,
          value: 'key.readOperationsPerMonth',
        },
        {
          text: 'write oper per month',
          sortable: false,
          value: 'key.writeOperationsPerMonth',
        },
        {
          text: 'price',
          sortable: false,
          value: 'key.price',
        },
        {
          text: 'occurances',
          sortable: true,
          value: 'value',
        },
      ],
      topCloudVMHeaders: [
        {
          text: 'instances',
          sortable: false,
          value: 'key.instanceNb',
        },
        {
          text: 'ram',
          sortable: false,
          value: 'key.ram',
        },
        {
          text: 'cpuCores',
          sortable: false,
          value: 'key.core',
        },
        {
          text: 'storage',
          sortable: false,
          value: 'key.storage',
        },
        {
          text: 'averageHoursPerDay',
          sortable: false,
          value: 'key.averageHoursPerDay',
        },
        {
          text: 'averageDaysPerWeek',
          sortable: false,
          value: 'key.averageDaysPerWeek',
        },
        {
          text: 'price',
          sortable: false,
          value: 'key.price',
        },
        {
          text: 'occurances',
          sortable: true,
          value: 'value',
        },
      ],
      topCloudItems: [],
      topCloudStorageItems: [],
      topCloudFunctionItems: [],
      topCloudVMItems: [],
      topCloudDbItems: [],
      sqlServerType: ['Standard2017', 'Enterprise2017', 'Express2017', 'Web2017'],
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
      storageType: [
        {
          id: 0,
          name: 'HDD',
        },
        {
          id: 1,
          name: 'SSD',
        },
      ],
    }
  },
  async mounted() {
    try {
      const resultTopClouds = await api.get('Statistic/topCombination')
      const resultCloudFunction = await api.get('Statistic/cloudFunction')
      const resultCloudStorage = await api.get('Statistic/cloudStorage')
      const resultCloudDb = await api.get('Statistic/cloudDb')
      const resultCloudVM = await api.get('Statistic/cloudVM')

      if (
        resultTopClouds.status == 200 &&
        resultCloudFunction.status == 200 &&
        resultCloudStorage.status == 200 &&
        resultCloudVM.status == 200 &&
        resultCloudDb.status == 200
      ) {
        this.topCloudItems = resultTopClouds.data
        this.topCloudDbItems = resultCloudDb.data
        this.topCloudVMItems = resultCloudVM.data
        this.topCloudStorageItems = resultCloudStorage.data
        this.topCloudFunctionItems = resultCloudFunction.data
      }
    } catch (e) {
      this.$alert.error(e.message)
    }
  },
}
</script>

<style scoped>
.cloud-suggestion-topall-card {
  background: rgba(241, 241, 241, 0.199);
  margin: 30px auto;
  min-height: 360px;
  padding: 40px;
}
</style>
