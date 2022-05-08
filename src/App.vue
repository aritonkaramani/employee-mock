<template>
  <div class="app-wrapper">
    <tool-bar @search-filter="setQuery(event)" @sort-order="sortList($event)" />
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
import ToolBar from "./components/ToolBar.vue";
export default {
  name: "App",
  components: {
    InfoCard,
    ToolBar,
  },
  data() {
    return {
      employees: [],
      searchQuery: "",
    };
  },
  computed: {
    filteredEmployeeList() {
      return this.employees.filter((user) => {
        return (
          user.name.toLowerCase().match(this.searchQuery.toLowerCase()) ||
          user.office.toLowerCase().match(this.searchQuery.toLowerCase())
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
    setQuery(event) {
      this.searchQuery = event;
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
    sortList(event) {
      console.log(event);
      switch (event) {
        case "NameAsc":
          this.employees.sort(this.propertySort("name", 1));
          break;
        case "NameDsc":
          this.employees.sort(this.propertySort("name", -1));
          break;
        case "OfficeAsc":
          this.employees.sort(this.propertySort("office", 1));
          break;
        case "OfficeDsc":
          this.employees.sort(this.propertySort("office", -1));
          break;
      }
    },
    propertySort(property, sortOrder) {
      return function (a, b) {
        let result = 0;
        if (a[property] < b[property]) {
          result = -1;
        } else if (a[property] > b[property]) {
          result = 1;
        }
        return result * sortOrder;
      };
    },
  },
};
</script>

<style lang="scss">
@use "./app.scss";
</style>
