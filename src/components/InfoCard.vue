<template>
  <div>
    {{ employee.name }}
  </div>
</template>

<script>
export default {
  name: "EmployeeCard",
  props: {
    employee: Object,
  },
  mounted() {
    console.log(this.employee);
  },
};
</script>

<style></style>
