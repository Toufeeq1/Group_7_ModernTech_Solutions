<script>
import { mapState } from "vuex";

export default {
  name: "PayrollView",

  data() {
    return {
      headers: [
        { title: "Name", key: "name", sortable: true },
        { title: "Position", key: "position", sortable: true },
        { title: "Department", key: "department", sortable: true },
        { title: "Actions", key: "actions", sortable: false, align: "center" },
      ],
      search: "",
      itemsPerPage: 10,
      currentPage: 1,
    };
  },

  computed: {
    ...mapState(["employees"]),

    itemsWithUniqueIds() {
      return this.employees.map((employee, index) => ({
        ...employee,
        uniqueId: employee.employeeId ? `emp-${employee.employeeId}` : `emp-${index}-${Date.now()}`
      }));
    },

    totalPayroll() {
      return this.employees.reduce((sum, employee) => sum + (employee.salary || 0), 0);
    },

    employeesProcessed() {
      return this.employees.length;
    },

    nextPayrollDate() {
      const now = new Date();
      const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
      return nextMonth.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    }
  },

  methods: {
    generatePayslip(employee) {
      console.log("Generating payslip for:", employee);
      alert(`Generating payslip for ${employee.name}`);
    },
  }
};
</script>

<template>
  <v-container fluid class="pa-4">
    <div class="text-h4 font-weight-bold mb-2">Payroll Management</div>
    <div class="text-subtitle-1 text-medium-emphasis mb-6">
      Manage employee compensation and benefits
    </div>

    <v-row no-gutters class="mb-6">
      <v-col cols="12" sm="4" class="pr-sm-2 mb-4">
        <v-card class="pa-4 d-flex align-center h-100" style="border-radius: 8px">
          <v-avatar color="primary" size="48" class="mr-4">
            <v-icon>mdi-currency-usd</v-icon>
          </v-avatar>
          <div>
            <div class="text-caption">Total Payroll</div>
            <div class="text-h5 font-weight-bold">${{ totalPayroll.toLocaleString() }}</div>
          </div>
          <v-spacer></v-spacer>
          <v-chip color="success" variant="tonal" class="ml-2" size="small">
            <v-icon left small>mdi-currency-usd</v-icon>
            Paid
          </v-chip>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4" class="px-sm-2 mb-4">
        <v-card class="pa-4 d-flex align-center h-100" style="border-radius: 8px">
          <v-avatar color="primary" size="48" class="mr-4">
            <v-icon>mdi-account-multiple</v-icon>
          </v-avatar>
          <div>
            <div class="text-caption">Employees Processed</div>
            <div class="text-h5 font-weight-bold">{{ employeesProcessed }}</div>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4" class="pl-sm-2 mb-4">
        <v-card class="pa-4 d-flex align-center h-100" style="border-radius: 8px">
          <v-avatar color="primary" size="48" class="mr-4">
            <v-icon>mdi-calendar</v-icon>
          </v-avatar>
          <div>
            <div class="text-caption">Next Payroll</div>
            <div class="text-h5 font-weight-bold">{{ nextPayrollDate }}</div>
          </div>
          <v-spacer></v-spacer>
          <v-icon color="warning" size="24">mdi-calendar-clock</v-icon>
        </v-card>
      </v-col>
    </v-row>

    <div class="text-h6 font-weight-medium mb-4">Payroll Actions</div>
    <v-row justify="center" no-gutters class="mb-6">
      <v-col cols="12" md="10">
        <v-row justify="center" no-gutters>
          <v-col cols="6" md="3" class="pr-2 mb-4">
            <v-card
              class="pa-4 d-flex flex-column align-center mx-auto"
              style="height: 120px; border-radius: 8px; max-width: 200px"
              elevation="1"
            >
              <v-avatar color="primary" variant="tonal" size="40" class="mb-3">
                <v-icon>mdi-currency-usd</v-icon>
              </v-avatar>
              <div class="text-caption text-center">Process Payroll</div>
            </v-card>
          </v-col>
          <v-col cols="6" md="3" class="px-2 mb-4">
            <v-card
              class="pa-4 d-flex flex-column align-center mx-auto"
              style="height: 120px; border-radius: 8px; max-width: 200px"
              elevation="1"
            >
              <v-avatar color="primary" variant="tonal" size="40" class="mb-3">
                <v-icon>mdi-cog</v-icon>
              </v-avatar>
              <div class="text-caption text-center">Tax Settings</div>
            </v-card>
          </v-col>
          <v-col cols="6" md="3" class="pl-2 mb-4">
            <v-card
              class="pa-4 d-flex flex-column align-center mx-auto"
              style="height: 120px; border-radius: 8px; max-width: 200px"
              elevation="1"
            >
              <v-avatar color="primary" variant="tonal" size="40" class="mb-3">
                <v-icon>mdi-chart-bar</v-icon>
              </v-avatar>
              <div class="text-caption text-center">Analytics</div>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <div class="mb-4">
      <div class="text-h6 font-weight-medium mb-3">Employee Payroll</div>
      <v-card elevation="1" rounded="lg">
        <v-card-text class="pa-0">
          <div class="pa-4 pb-2">
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search employees"
              single-line
              hide-details
              clearable
              density="compact"
              variant="outlined"
            ></v-text-field>
          </div>

          <v-data-table
            :headers="headers"
            :items="itemsWithUniqueIds"
            :search="search"
            :items-per-page="itemsPerPage"
            item-key="uniqueId"
            :mobile-breakpoint="0"
            density="comfortable"
            class="elevation-0"
            :footer-props="{
              'items-per-page-options': [10, 20, 30],
              'show-current-page': true,
              'show-first-last-page': true
            }"
          >
            <template #item.name="{ item }">
              <div class="d-flex align-center py-2">
                <v-avatar size="36" class="me-3" color="primary">
                  <span class="white--text">{{ item.name.charAt(0) }}</span>
                </v-avatar>
                <div class="font-weight-medium">{{ item.name }}</div>
              </div>
            </template>

            <template #item.department="{ item }">
              <v-chip size="small" color="blue" text-color="white">
                {{ item.department }}
              </v-chip>
            </template>

            <template #item.actions="{ item }">
              <v-btn
                size="small"
                color="primary"
                variant="flat"
                @click="generatePayslip(item)"
                class="text-none"
              >
                Generate Payslip
              </v-btn>
            </template>

            <template #item="{ item }" v-if="$vuetify.display.mobile">
              <tr>
                <td colspan="4" class="pa-2">
                  <div class="d-flex align-center">
                    <v-avatar size="40" class="me-3" color="primary">
                      <span class="white--text">{{ item.name.charAt(0) }}</span>
                    </v-avatar>
                    <div class="flex-grow-1">
                      <div class="font-weight-medium">{{ item.name }}</div>
                      <div class="text-caption d-flex justify-space-between mt-1">
                        <span>{{ item.position }}</span>
                        <v-chip size="x-small" color="blue" text-color="white">
                          {{ item.department }}
                        </v-chip>
                      </div>
                    </div>
                    <v-btn
                      size="small"
                      color="primary"
                      variant="flat"
                      @click="generatePayslip(item)"
                      class="ml-2 text-none"
                    >
                      Generate
                    </v-btn>
                  </div>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </div>
  </v-container>
</template>

<style scoped>
.v-container {
  max-width: 100%;
}

.v-card {
  border: 1px solid rgba(0, 0, 0, 0.12);
}

:deep(.v-data-table-footer) {
  padding: 8px 16px !important;
  min-height: 40px !important;
  border-top: 1px solid rgba(0, 0, 0, 0.12);
}

:deep(.v-data-table-footer__pagination) {
  margin: 0 !important;
}

@media (max-width: 600px) {
  .text-h4 {
    font-size: 1.5rem !important;
  }
  .text-h6 {
    font-size: 1rem !important;
  }
  .v-data-table {
    font-size: 0.875rem;
  }
  .v-btn {
    padding: 0 8px;
    min-width: 0;
  }
}
</style>