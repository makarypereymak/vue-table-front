<template>
  <table
    class="table"
    v-if="
      $store.state.table.activeItems.length >= 1 &&
      $store.state.table.loading === false
    "
  >
    <tr class="table__label-row">
      <td>Дата</td>
      <td>Название</td>
      <td>Количество</td>
      <td>Расстояние</td>
    </tr>
    <tr v-for="item in $store.state.table.itemsOnPage">
      <td>{{ dateFormater(item.date) }}</td>
      <td>{{ item.name }}</td>
      <td>{{ item.amount }}</td>
      <td>{{ item.distance }}</td>
    </tr>
  </table>
  <p
    class="text-info"
    v-if="
      $store.state.table.activeItems.length === 0 &&
      $store.state.table.loading === false
    "
  >
    Записей в таблице не найдено
  </p>
  <p class="text-info" v-if="$store.state.table.loading === true">
    Идет загрузка...
  </p>
  <Pagination />
</template>

<script>
import { mapState, mapActions } from "vuex";
import Pagination from "./Pagination.vue";
export default {
  methods: {
    ...mapActions({
      fetchItems: "table/fetchItems",
    }),
    dateFormater(startDate) {
      const date = new Date(startDate);
      return (
        date.getDate() +
        "." +
        (date.getMonth() + 1) +
        "   " +
        date.getHours() +
        ":" +
        date.getMinutes()
      );
    },
  },
  mounted() {
    this.fetchItems();
  },
  computed: {
    ...mapState({
      itemsOnPage: (state) => state.table.itemsOnPage,
      activeItems: (state) => state.table.activeItems,
      loading: (state) => state.table.loading,
    }),
  },
  components: { Pagination },
};
</script>

<style>
.table {
  margin: 50px 0;
  border-collapse: collapse;
}

.text-info {
  margin-top: 50px;
  font-size: 15px;
  font-weight: bold;
}

@media (min-width: 800px) {
  .text-info {
    font-size: 30px;
  }
}

.table__label-row {
  font-weight: bold;
}

td {
  font-size: 11px;
  border: 1px solid black;
  padding: 5px;
}

@media (min-width: 800px) {
  td {
    font-size: 20px;
  }
}
</style>
