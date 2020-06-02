<template>
  <div>
    <v-card class="mx-auto" max-width="804" outlined>
      <v-expansion-panels accordion multiple hover tile>
        <v-expansion-panel @change="storageToggle = !storageToggle">
          <v-expansion-panel-header>Cloud Storage</v-expansion-panel-header>
          <v-expansion-panel-content>
            input buttoni itd
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel @change="functionToggle = !functionToggle">
          <v-expansion-panel-header>Cloud Function</v-expansion-panel-header>
          <v-expansion-panel-content>
            input buttoni itd
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel @change="vmToggle = !vmToggle">
          <v-expansion-panel-header>Cloud VM</v-expansion-panel-header>
          <v-expansion-panel-content>
            input buttoni itd
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel @change="sqlToggle = !sqlToggle">
          <v-expansion-panel-header>Cloud SQL Db</v-expansion-panel-header>
          <v-expansion-panel-content>
            input buttoni itd
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <v-list-item one-line class="mt-6">
        <v-list-item-content>
          <v-list-item-title class="headline mb-0"
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
          @click="dialog = !dialog"
          >Calculate
          <v-icon class="ml-6">mdi-calculator</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'Calculator',
  middleware: 'auth',
  data() {
    return {
      storageToggle: false,
      functionToggle: false,
      vmToggle: false,
      sqlToggle: false,
      cloudVM: {
        instanceNb: 0,
        operatingSystem: 0,
        core: 0,
        ram: 0,
        storage: 0,
        storageType: 0,
        averageHoursPerDay: 0,
        averageDaysPerWeek: 0
      },
      cloudStorage: {
        totalAmount: 0,
        readOperationsPerMonth: 0,
        writeOperationsPerMonth: 0
      },
      cloudDbSQL: {
        instance: 0,
        ram: 0,
        cpuCores: 0,
        baskupSize: 0,
        averageHoursPerDay: 0,
        averageDaysPerWeek: 0,
        sqlServerType: 0
      },
      cloudFunction: {
        executinPerRequestInMiliseconds: 0,
        memorySizeInMB: 0,
        executionsPerMonth: 0
      }
    }
  }
}
</script>
<style scoped></style>
