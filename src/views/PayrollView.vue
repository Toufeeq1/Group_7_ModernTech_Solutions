<script>
import { mapState } from "vuex";
import TableList from "../components/TableList.vue";

export default {
  name: "PayrollView",
  components: {
    TableList,
  },
  computed: {
    ...mapState(["payroll", "employees"]),
  },
};
</script>

<template>
  {{ console.log(payroll) }}
  <div>
    <TableList
      :payrollData="employees"
      :employees="employees"
      @edit-payroll="handleEditPayroll"
      @delete-payroll="handleDeletePayroll"
    />
  </div>
</template>
