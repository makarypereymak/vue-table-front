<template>
  <ul class="pagination">
    <li class="pagination__item" v-for="page in $store.state.table.totalPages">
      <button
        v-if="page === $store.state.table.activePage"
        class="pagination__button pagination__button--active"
        type="button"
        @click="buttonHandler(page)"
      >
        {{ page }}
      </button>

      <button
        v-else
        class="pagination__button"
        type="button"
        @click="buttonHandler(page)"
      >
        {{ page }}
      </button>
    </li>
  </ul>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  methods: {
    ...mapActions({
      changeItemsOnPage: "table/changeItemsOnPage",
      changeActivePage: "table/changeActivePage",
    }),
    buttonHandler(pageNumber) {
      this.changeItemsOnPage(pageNumber);
      this.changeActivePage(pageNumber);
    },
  },
  computed: {
    ...mapState({
      activePage: (state) => state.table.activePage,
      itemsOnPage: (state) => state.table.itemsOnPage,
    }),
  },
};
</script>

<style>
.pagination {
  display: flex;
  gap: 10px;
  list-style-type: none;
}

.pagination__button {
  font-size: 15px;
  padding: 1-px;
  background-color: #fff;
  border: 1px solid black;
}

.pagination__button--active {
  background-color: lightgray;
}
</style>
