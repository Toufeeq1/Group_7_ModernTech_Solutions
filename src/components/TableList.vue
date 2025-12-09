<script>
export default {
  props: {
    payrollData: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      headers: [
        { title: "Name", key: "name", sortable: true },
        { title: "Position", key: "position", sortable: true },
        { title: "Department", key: "department", sortable: true },
        { title: "Actions", key: "actions", sortable: false, align: 'center' },
      ],
      mobileBreakpoint: 600,
      search: '',
      itemsPerPage: 10,
      currentPage: 1,
    };
  },
  computed: {
    items() {
      return this.payrollData;
    },
    isMobile() {
      return this.$vuetify.display.width < this.mobileBreakpoint;
    },
    mobileHeaders() {
      return [
        { title: "Name", key: "name", sortable: true },
        { title: "Actions", key: "actions", sortable: false, align: 'center' },
      ];
    }
  },
  methods: {
    generatePayslip(employee) {
      console.log("Generating payslip for:", employee);
      alert(`Generating payslip for ${employee.name}`);
    },
  },
};
</script>

<template>
  <v-container fluid class="pa-0">
    <v-row class="mb-4">
      <v-col cols="12" md="6">
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
      </v-col>
    </v-row>

    <v-data-table
      :headers="isMobile ? mobileHeaders : headers"
      :items="items"
      :search="search"
      :items-per-page="itemsPerPage"
      item-key="employeeId"
      class="elevation-1"
      :mobile-breakpoint="mobileBreakpoint"
      :fixed-header="true"
      :height="isMobile ? 'auto' : 'calc(100vh - 200px)'"
      density="comfortable"
    >

      <template v-if="isMobile" #item="{ item }">
        <tr>
          <td>
            <div class="d-flex align-center py-2">
              <v-avatar size="40" class="me-3" color="primary">
                <span class="white--text">
                  {{ item.name.charAt(0) }}
                </span>
              </v-avatar>
              <div>
                <div class="font-weight-medium">{{ item.name }}</div>
                <div class="text-caption">
                  <v-icon size="small" class="me-1">mdi-briefcase</v-icon>
                  {{ item.position }}
                </div>
                <div class="text-caption">
                  <v-icon size="small" class="me-1">mdi-domain</v-icon>
                  {{ item.department }}
                </div>
              </div>
            </div>
          </td>
          <td class="text-center">
            <v-btn
              size="small"
              color="primary"
              variant="flat"
              @click="generatePayslip(item)"
              class="mb-2"
            >
              Payslip
            </v-btn>
          </td>
        </tr>
      </template>

      <template #item.name="{ item }">
        <div class="d-flex align-center py-2">
          <v-avatar size="36" class="me-3" color="primary">
            <span class="white--text">
              {{ item.name.charAt(0) }}
            </span>
          </v-avatar>
          <div class="font-weight-medium">
            {{ item.name }}
          </div>
        </div>
      </template>

      <template #item.department="{ item }">
        <v-chip size="small" color="blue" text-color="white">
          {{ item.department }}
        </v-chip>
      </template>

      <template #item.actions="{ item }">
        <div class="d-flex justify-center">
          <v-btn
            size="small"
            color="primary"
            variant="flat"
            @click="generatePayslip(item)"
          >
            <v-icon left>mdi-file-document</v-icon>
            Generate Payslip
          </v-btn>
        </div>
      </template>

      <template #bottom>
        <div class="table-footer d-flex justify-space-between align-center pa-2">
          <div class="text-caption">
            Showing {{ items.length }} employees
          </div>
          <v-pagination
            v-model="currentPage"
            :length="Math.ceil(items.length / itemsPerPage)"
            :total-visible="isMobile ? 3 : 7"
          ></v-pagination>
        </div>
      </template>
    </v-data-table>
  </v-container>
</template>

<style scoped>
.v-data-table__mobile-row {
  border-bottom: thin solid rgba(0, 0, 0, 0.12);
}

.v-data-table {
  width: 100%;
}

.v-btn {
  margin: 0.25rem;
}
</style>
