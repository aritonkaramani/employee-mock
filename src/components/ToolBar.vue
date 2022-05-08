<template>
  <div>
    <input v-model="query" />
    <select name="Sort" id="Sort" v-model="sortOption">
      <option value="NameAsc">Name (Ascending)</option>
      <option value="NameDsc">Name (Descending)</option>
      <option value="OfficeAsc">Office (Ascending)</option>
      <option value="OfficeDsc">Office (Descending)</option>
    </select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: "",
      sortOption: "NameAsc",
    };
  },
  watch: {
    query() {
      this.$emit("search-filter", this.query);
    },
    sortOption() {
      this.$emit("sort-order", this.sortOption);
    },
  },
};
</script>

<style></style>
