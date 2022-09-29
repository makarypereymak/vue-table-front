<template>
  <form @submit.prevent class="form">
    <select
      class="form_element form_element--select"
      v-bind:value="$store.state.table.categoriesValue"
      @change="updateCategoriesSelector"
    >
      <option value="">Выберите категорию сортировки:</option>
      <option
        v-for="categorie in categorieOptions"
        :key="categorie.value"
        :value="categorie.value"
      >
        {{ categorie.text }}
      </option>
    </select>
    <select
      class="form_element form_element--select"
      v-bind:value="$store.state.table.sortByValue"
      @change="updateSortBySelector"
    >
      <option value="">Сортировать по:</option>
      <option
        v-for="option in sortByOptions"
        :key="option.value"
        :value="option.value"
      >
        {{ option.text }}
      </option>
    </select>
    <input
      class="form_element form_element--input"
      v-bind:value="$store.state.table.searchTextValue"
      @input="updateInput"
      type="text"
      placeholder="Введите значение"
    />
    <button class="form_element form_element--sort-buttun" @click="makeSort">
      Сортировать
    </button>
  </form>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      categorieOptions: [
        { value: "name", text: "Название" },
        { value: "amount", text: "Количество" },
        { value: "distance", text: "Расстояние" },
      ],
      sortByOptions: [
        { value: "equals", text: "Равно" },
        { value: "contains", text: "Содержит" },
        { value: "more", text: "Больше" },
        { value: "less", text: "Меньше" },
      ],
    };
  },
  methods: {
    updateInput(event) {
      this.changeSearchTextValue(event.target.value);
    },
    updateCategoriesSelector(event) {
      this.changeCategoriesValue(event.target.value);
    },
    updateSortBySelector(event) {
      this.changeSortByValue(event.target.value);
    },
    ...mapActions({
      changeCategoriesValue: "table/changeCategoriesValue",
      changeSortByValue: "table/changeSortByValue",
      changeSearchTextValue: "table/changeSearchTextValue",
      changeAndSortItemList: "table/changeAndSortItemList",
    }),
    makeSort() {
      this.changeAndSortItemList();
    },
  },
  computed: {
    ...mapState({
      categoriesValue: (state) => state.table.categoriesValue,
      sortByValue: (state) => state.table.sortByValue,
      searchTextValue: (state) => state.table.searchTextValue,
    }),
  },
};
</script>

<style>
.form {
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  margin-top: 50px;
  font-size: 18px;
}

@media (min-width: 800px) {
  .form {
    flex-direction: row;
    column-gap: 10px;
    row-gap: 0;
  }
}
.form_element {
  padding: 5px;
  border: 2px solid black;
}

.form_element--sort-buttun {
  background-color: #fff;
  width: 110px;
  margin: 0 auto;
}

@media (min-width: 800px) {
  .form_element--sort-buttun {
    background-color: #fff;
    width: auto;
    margin: 0;
  }
}
</style>
