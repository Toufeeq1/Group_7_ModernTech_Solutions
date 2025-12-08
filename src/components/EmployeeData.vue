<script>
import store from '@/store';
export default {
  name: 'EmployeeData',
  computed: {
    employee() {
      return this.$store.state.employees;
    
    },
  },
};
</script>

<template> 
<h2>Employee Data</h2>
  <div class="card" v-for="employee in employee" :key="employee.employeeId">
    <div class="cards">
     


      <div class="card-body">
        <div class="form-row">
          <label for="employeeId">employeeId:</label>
          <span id="employeeId">{{ employee.employeeId }}</span>
        </div>
      </div>

      <div class="form-row">
        <label for="department">Department:</label>
        <span id="department">{{ employee.department }}</span>
      </div>

      <div class="form-row">
        <label for="salary">Salary:</label>
        <span id="salary">{{ employee.salary }}</span>
      </div>

      <div class="form-row">
        <label for="employmentHistory">employmentHistory:</label>
        <span id="employmentHistory">{{ employee.History }}</span>
      </div>

      <div class="form-row">
        <label for="contact">Contact:</label>
        <span id="">{{ employee.contact }}</span>

  
  <v-card
    class="mx-auto"
    max-width="344"
  >
    <v-img
      height="200px"
      src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
      cover
    ></v-img>

    <v-card-title>
      <div class="form-row">
        <b><label for="name">Name:</label></b>
        <b><span id="name">{{ employee.name }}</span></b>
      </div>
    </v-card-title>

    <v-card-subtitle>
      <div class="form-row">
        <label for="position">Position:</label>
        <span id="position">{{ employee.position }}</span>
      </div>
    </v-card-subtitle>

    <v-card-actions>
      <v-btn
        color="orange-lighten-2"
        text="More Info"
      ></v-btn>

      <v-spacer></v-spacer>

      <v-btn
        :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
        @click="show = !show"
      ></v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
          I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>