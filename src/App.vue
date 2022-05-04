<template>
  <div></div>
</template>

<script>
import axios from "axios";
export default {
  name: "App",
  mounted() {
    this.getEmployees();
    console.log(process.env);
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
      console.log(this.employees);
    },
  },
};
</script>

<style lang="scss"></style>
