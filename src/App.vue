<template>
  <div class="app-wrapper">
    <input v-model="search_query" />
    <div class="employee-wrapper">
      <info-card
        v-for="(employee, index) in filteredEmployeeList"
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
  computed: {
    filteredEmployeeList() {
      return this.employees.filter((user) => {
        return (
          user.name.toLowerCase().match(this.search_query.toLowerCase()) ||
          user.office.toLowerCase().match(this.search_query.toLowerCase())
        );
      });
    },
  },
  mounted() {
    this.setup();
  },
  methods: {
    async setup() {
      this.employees = await this.getEmployees();
      this.employees = this.fixNullData(this.employees);
    },
    async getEmployees() {
      return await axios
        .get("https://api.1337co.de/v3/employees", {
          headers: {
            Authorization: `${process.env.VUE_APP_API_AUTH_TOKEN}`,
          },
        })
        .then((response) => {
          return Promise.resolve(response.data);
        });
    },
    fixNullData(array) {
      array.map((item) => {
        if (item.office === null) {
          item.office = "";
        }
        if (item.name === null) {
          item.name = "";
        }
      });
      return array;
    },
  },
};
</script>

<style lang="scss">
@use "./app.scss";
</style>
