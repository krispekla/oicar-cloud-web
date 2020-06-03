<template>
  <div>
    <v-card
      v-if="result.cloudCombinationInput.cloudFunction"
      class="cloud-card elevation-3"
      height="350"
    >
      <v-card-title class="headline text-center justify-center">
        Cloud Function
      </v-card-title>
      <v-row class="cloud-content-wrapper" align="center" justify="center">
        <v-col>
          <h4 class="font-weight-medium text-center">User input</h4>
          <div class="d-flex flex-column ml-12 mt-6 justify-center">
            <div class="font-weight-light my-2">
              Execution per request in milisecond:
              <span class="font-weight-medium">{{
                result.cloudCombinationInput.cloudFunction.executinPerRequestInMiliseconds
              }}</span>
            </div>
            <div class="font-weight-light my-2">
              Memory size in mb:
              <span class="font-weight-medium"
                >{{ result.cloudCombinationInput.cloudFunction.memorySizeInMB }} MB</span
              >
            </div>
            <div class="font-weight-light my-2">
              Executions per month:
              <span class="font-weight-medium">{{
                result.cloudCombinationInput.cloudFunction.executionsPerMonth
              }}</span>
            </div>
          </div>
        </v-col>
        <v-col>
          <h4 class="font-weight-medium text-center">Recommended provider</h4>
          <div class="d-flex flex-column ml-12 mt-6 justify-center">
            <div class="font-weight-light my-2">
              Execution per request in milisecond:
              <span class="font-weight-medium">{{
                result.cloudCombinationResult.cloudFunction.executinPerRequestInMiliseconds
              }}</span>
            </div>
            <div class="font-weight-light my-2">
              Memory size in mb:
              <span class="font-weight-medium"
                >{{ result.cloudCombinationResult.cloudFunction.memorySizeInMB }} MB</span
              >
            </div>
            <div class="font-weight-light my-2">
              Executions per month:
              <span class="font-weight-medium">{{
                result.cloudCombinationResult.cloudFunction.executionsPerMonth
              }}</span>
            </div>
          </div>
        </v-col>
      </v-row>
      <div class="font-weight-bold text-right mr-12">
        Price:
        <span class="font-weight-medium"
          >{{ result.cloudCombinationResult.cloudFunction.price }} $</span
        >
      </div>
    </v-card>
    <v-card
      v-if="result.cloudCombinationInput.cloudStorage"
      class="cloud-card elevation-3"
      height="350"
    >
      <v-card-title class="headline text-center justify-center">
        Cloud Storage
      </v-card-title>
      <v-row class="cloud-content-wrapper" align="center" justify="center">
        <v-col>
          <h4 class="font-weight-medium text-center">User input</h4>
          <div class="d-flex flex-column ml-12 mt-6 justify-center">
            <div class="font-weight-light my-2">
              Total amount:
              <span class="font-weight-medium">{{
                result.cloudCombinationInput.cloudStorage.totalAmount
              }}</span>
            </div>
            <div class="font-weight-light my-2">
              Read operations per month:
              <span class="font-weight-medium">{{
                result.cloudCombinationInput.cloudStorage.readOperationsPerMonth
              }}</span>
            </div>
            <div class="font-weight-light my-2">
              Write operations per month:
              <span class="font-weight-medium">{{
                result.cloudCombinationInput.cloudStorage.writeOperationsPerMonth
              }}</span>
            </div>
          </div>
        </v-col>
        <v-col>
          <h4 class="font-weight-medium text-center">Recommended provider</h4>
          <div class="d-flex flex-column ml-12 mt-6 justify-center">
            <div class="font-weight-light my-2">
              Total amount:
              <span class="font-weight-medium">{{
                result.cloudCombinationResult.cloudStorage.totalAmount
              }}</span>
            </div>
            <div class="font-weight-light my-2">
              Read operations per month:
              <span class="font-weight-medium">{{
                result.cloudCombinationResult.cloudStorage.readOperationsPerMonth
              }}</span>
            </div>
            <div class="font-weight-light my-2">
              Write operations per month:
              <span class="font-weight-medium">{{
                result.cloudCombinationResult.cloudStorage.writeOperationsPerMonth
              }}</span>
            </div>
          </div>
        </v-col>
      </v-row>
      <div class="font-weight-bold text-right mr-12">
        Price:
        <span class="font-weight-medium"
          >{{ result.cloudCombinationResult.cloudStorage.price }} $</span
        >
      </div>
    </v-card>
    <v-card v-if="result.cloudCombinationInput.cloudVM" class="cloud-card elevation-3" height="550">
      <v-card-title class="headline text-center justify-center">
        Cloud VM
      </v-card-title>
      <v-row class="cloud-content-wrapper" align="center" justify="center">
        <v-col>
          <h4 class="font-weight-medium text-center">User input</h4>
          <div class="d-flex flex-column ml-12 mt-6 justify-center">
            <div class="font-weight-light my-2">
              Number of instances:
              <span class="font-weight-medium">{{
                result.cloudCombinationInput.cloudVM.instanceNb
              }}</span>
            </div>
            <div class="font-weight-light my-2">
              Operating system:
              <span class="font-weight-medium">{{
                operatingSystem[result.cloudCombinationInput.cloudVM.operatingSystem].name
              }}</span>
            </div>
            <div class="font-weight-light my-2">
              Cores:
              <span class="font-weight-medium">{{
                result.cloudCombinationInput.cloudVM.core
              }}</span>
            </div>
            <div class="font-weight-light my-2">
              Ram:
              <span class="font-weight-medium">{{ result.cloudCombinationInput.cloudVM.ram }}</span>
            </div>
            <div class="font-weight-light my-2">
              Storage:
              <span class="font-weight-medium">{{
                result.cloudCombinationInput.cloudVM.storage
              }}</span>
            </div>
            <div class="font-weight-light my-2">
              Storage type:
              <span class="font-weight-medium">{{
                storageType[result.cloudCombinationInput.cloudVM.storageType].name
              }}</span>
            </div>
            <div class="font-weight-light my-2">
              Average hours per day:
              <span class="font-weight-medium">{{
                result.cloudCombinationInput.cloudVM.averageHoursPerDay
              }}</span>
            </div>
            <div class="font-weight-light my-2">
              Average days per week:
              <span class="font-weight-medium">{{
                result.cloudCombinationInput.cloudVM.averageDaysPerWeek
              }}</span>
            </div>
          </div>
        </v-col>
        <v-col>
          <h4 class="font-weight-medium text-center">Recommended provider</h4>
          <div class="d-flex flex-column ml-12 mt-6 justify-center">
            <div class="font-weight-light my-2">
              Number of instances:
              <span class="font-weight-medium">{{
                result.cloudCombinationResult.cloudVM.instanceNb
              }}</span>
            </div>
            <div class="font-weight-light my-2">
              Operating system:
              <span class="font-weight-medium">{{
                operatingSystem[result.cloudCombinationResult.cloudVM.operatingSystem].name
              }}</span>
            </div>
            <div class="font-weight-light my-2">
              Cores:
              <span class="font-weight-medium">{{
                result.cloudCombinationResult.cloudVM.core
              }}</span>
            </div>
            <div class="font-weight-light my-2">
              Ram:
              <span class="font-weight-medium">{{
                result.cloudCombinationResult.cloudVM.ram
              }}</span>
            </div>
            <div class="font-weight-light my-2">
              Storage:
              <span class="font-weight-medium">{{
                result.cloudCombinationResult.cloudVM.storage
              }}</span>
            </div>
            <div class="font-weight-light my-2">
              Storage type:
              <span class="font-weight-medium">{{
                storageType[result.cloudCombinationResult.cloudVM.storageType].name
              }}</span>
            </div>
            <div class="font-weight-light my-2">
              Average hours per day:
              <span class="font-weight-medium">{{
                result.cloudCombinationResult.cloudVM.averageHoursPerDay
              }}</span>
            </div>
            <div class="font-weight-light my-2">
              Average days per week:
              <span class="font-weight-medium">{{
                result.cloudCombinationResult.cloudVM.averageDaysPerWeek
              }}</span>
            </div>
          </div>
        </v-col>
      </v-row>
      <div class="font-weight-bold text-right mr-12">
        Price:
        <span class="font-weight-medium">{{ result.cloudCombinationResult.cloudVM.price }} $</span>
      </div>
    </v-card>
    <v-card
      v-if="result.cloudCombinationInput.cloudDbSQL"
      class="cloud-card elevation-3"
      height="550"
    >
      <v-card-title class="headline text-center justify-center">
        Cloud SQL Db
      </v-card-title>
      <v-row class="cloud-content-wrapper" align="center" justify="center">
        <v-col>
          <h4 class="font-weight-medium text-center">User input</h4>
          <div class="d-flex flex-column ml-12 mt-6 justify-center">
            <div class="font-weight-light my-2">
              Number of instances:
              <span class="font-weight-medium">{{
                result.cloudCombinationInput.cloudDbSQL.instance
              }}</span>
            </div>
            <div class="font-weight-light my-2">
              SQL Server type:
              <span class="font-weight-medium">{{
                sqlServerType[result.cloudCombinationInput.cloudDbSQL.sqlServerType]
              }}</span>
            </div>
            <div class="font-weight-light my-2">
              Cpu cores:
              <span class="font-weight-medium">{{
                result.cloudCombinationInput.cloudDbSQL.cpuCores
              }}</span>
            </div>
            <div class="font-weight-light my-2">
              Ram:
              <span class="font-weight-medium">{{
                result.cloudCombinationInput.cloudDbSQL.ram
              }}</span>
            </div>
            <div class="font-weight-light my-2">
              Backup size:
              <span class="font-weight-medium">{{
                result.cloudCombinationInput.cloudDbSQL.baskupSize
              }}</span>
            </div>
            <div class="font-weight-light my-2">
              Average hours per day:
              <span class="font-weight-medium">{{
                result.cloudCombinationInput.cloudDbSQL.averageHoursPerDay
              }}</span>
            </div>
            <div class="font-weight-light my-2">
              Average days per week:
              <span class="font-weight-medium">{{
                result.cloudCombinationInput.cloudDbSQL.averageDaysPerWeek
              }}</span>
            </div>
          </div>
        </v-col>
        <v-col>
          <h4 class="font-weight-medium text-center">Recommended provider</h4>
          <div class="d-flex flex-column ml-12 mt-6 justify-center">
            <div class="font-weight-light my-2">
              Number of instances:
              <span class="font-weight-medium">{{
                result.cloudCombinationResult.cloudDbSQL.instance
              }}</span>
            </div>
            <div class="font-weight-light my-2">
              SQL Server type:
              <span class="font-weight-medium">{{
                sqlServerType[result.cloudCombinationResult.cloudDbSQL.sqlServerType]
              }}</span>
            </div>
            <div class="font-weight-light my-2">
              Cpu cores:
              <span class="font-weight-medium">{{
                result.cloudCombinationResult.cloudDbSQL.cpuCores
              }}</span>
            </div>
            <div class="font-weight-light my-2">
              Ram:
              <span class="font-weight-medium">{{
                result.cloudCombinationResult.cloudDbSQL.ram
              }}</span>
            </div>
            <div class="font-weight-light my-2">
              Backup size:
              <span class="font-weight-medium">{{
                result.cloudCombinationResult.cloudDbSQL.baskupSize
              }}</span>
            </div>
            <div class="font-weight-light my-2">
              Average hours per day:
              <span class="font-weight-medium">{{
                result.cloudCombinationResult.cloudDbSQL.averageHoursPerDay
              }}</span>
            </div>
            <div class="font-weight-light my-2">
              Average days per week:
              <span class="font-weight-medium">{{
                result.cloudCombinationResult.cloudDbSQL.averageDaysPerWeek
              }}</span>
            </div>
          </div>
        </v-col>
      </v-row>
      <div class="font-weight-bold text-right mr-12">
        Price:
        <span class="font-weight-medium"
          >{{ result.cloudCombinationResult.cloudDbSQL.price }} $</span
        >
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'CalculatorResult',
  data() {
    return {
      cloudProvider: ['Amazon Web Services', 'Azure', 'Google Cloud'],
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
      sqlServerType: ['Standard2017', 'Enterprise2017', 'Express2017', 'Web2017'],
    }
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
  props: {
    result: Object,
  },
}
</script>

<style>
.calculator-result {
  min-width: 360px;
  max-width: 1024px;
}
.cloud-card {
  background: rgba(241, 241, 241, 0.199);
  /* min-height: 350px; */
  min-width: 360px;
  max-width: 1024px;
  margin: 30px auto;
}
.cloud-content-wrapper {
  position: relative;
  padding: 20px;
  padding-top: 0;
}
.cloud-card:after {
  content: '';
  position: absolute;
  z-index: 1;
  top: 105px;
  bottom: 55px;
  left: 50%;
  transform: translate(-50%);
  border-left: 2px solid #a7a7a7b0 !important;
}
</style>
