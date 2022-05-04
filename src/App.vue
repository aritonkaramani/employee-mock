<template>
  <div class="app-wrapper">
    <input v-model="search_query" />
    <div class="employee-wrapper">
      <info-card
        v-for="(employee, index) in employees"
        :key="index"
        :employee="employee"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import InfoCard from "./components/InfoCard.vue";
export default {
  name: "App",
  components: {
    InfoCard,
  },
  data() {
    return {
      employees: [],
      search_query: "",
    };
  },
  mounted() {
    this.getEmployees();
  },
  methods: {
    async getEmployees() {
      const response = await axios.get("https://api.1337co.de/v3/employees", {
        headers: {
          Authorization: `${process.env.VUE_APP_API_AUTH_TOKEN}`,
        },
      });
      this.employees = response.data;
      this.employees.map((employee) => {
        if (employee.office === null) {
          employee.office = "";
        }
        if (employee.name === null) {
          employee.name = "";
        }
      });
    },
  },
};
</script>

<style lang="scss">
@use "./app.scss";
</style>
