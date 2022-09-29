import axios from "axios";

export const tableModule = {
  state: () => ({
    items: [],
    loading: false,
    activeItems: [],
    itemsOnPage: [],
    activePage: 1,
    limit: 5,
    totalPages: 0,
    categoriesValue: "",
    sortByValue: "",
    searchTextValue: null,
  }),
  mutations: {
    setItems(state, items) {
      state.items = items;
    },
    setLoading(state, loading) {
      state.loading = loading;
    },
    setActiveItems(state, activeItems) {
      state.activeItems = activeItems;
    },
    setItemsOnPage(state, itemsOnPage) {
      state.itemsOnPage = itemsOnPage;
    },
    setActivePage(state, activePage) {
      state.activePage = activePage;
    },
    setTotalPages(state, totalPages) {
      state.totalPages = totalPages;
    },
    setCategoriesValue(state, categoriesValue) {
      state.categoriesValue = categoriesValue;
    },
    setSortByValue(state, sortByValue) {
      state.sortByValue = sortByValue;
    },
    setSearchTextValue(state, searchTextValue) {
      state.searchTextValue = searchTextValue;
    },
  },
  actions: {
    async fetchItems({ state, commit }) {
      // const response = await axios.get("http://localhost:5000/api/tableInfo");
      commit("setLoading", true);
      const response = await axios.get(
        "https://powerful-river-48074.herokuapp.com/api/tableInfo"
      );
      commit("setLoading", false);
      commit("setItems", response.data);
      commit("setActiveItems", response.data);
      commit("setTotalPages", Math.ceil(response.data.length / state.limit));
      commit("setItemsOnPage", response.data.slice(0, 5));
    },

    changeItemsOnPage({ state, commit }, newPageNumber) {
      let startIndex;
      let endIndex;

      if (newPageNumber === 1) {
        startIndex = 0;
        endIndex = 5;
      } else {
        startIndex = newPageNumber * state.limit - state.limit;
        endIndex = newPageNumber * state.limit;
      }

      const newActiveItems = state.activeItems.slice(startIndex, endIndex);
      commit("setItemsOnPage", newActiveItems);
    },

    changeActivePage({ commit }, newPageNumber) {
      commit("setActivePage", newPageNumber);
    },

    changeCategoriesValue({ commit }, newVal) {
      commit("setCategoriesValue", newVal);
    },
    changeSortByValue({ commit }, newVal) {
      commit("setSortByValue", newVal);
    },
    changeSearchTextValue({ commit }, newVal) {
      commit("setSearchTextValue", newVal);
    },

    changeAndSortItemList({ state, commit }) {
      let newItems;
      if (state.categoriesValue === "name") {
        if (state.sortByValue === "equals") {
          newItems = state.items.filter((item) => {
            return item[state.categoriesValue] === state.searchTextValue;
          });
        } else if (state.sortByValue === "contains") {
          newItems = state.items.filter((item) => {
            return String(item[state.categoriesValue]).includes(
              state.searchTextValue
            );
          });
          newItems = newItems.sort((item1, item2) =>
            item1[state.categoriesValue]?.localeCompare(
              item2[state.categoriesValue]
            )
          );
        }
      } else {
        if (state.sortByValue === "equals") {
          newItems = state.items.filter((item) => {
            return (
              item[state.categoriesValue] === Number(state.searchTextValue)
            );
          });
        } else if (state.sortByValue === "more") {
          newItems = state.items.filter(
            (item) =>
              item[state.categoriesValue] > Number(state.searchTextValue)
          );
          newItems = newItems.sort(
            (item1, item2) =>
              item1[state.categoriesValue] - item2[state.categoriesValue]
          );
        } else if (state.sortByValue === "less") {
          newItems = state.items.filter(
            (item) =>
              item[state.categoriesValue] < Number(state.searchTextValue)
          );
          newItems = newItems.sort(
            (item1, item2) =>
              item2[state.categoriesValue] - item1[state.categoriesValue]
          );
        } else {
          newItems = state.items.filter((item) => {
            return String(item[state.categoriesValue]).includes(
              state.searchTextValue
            );
          });
        }
      }

      commit("setActiveItems", newItems);
      commit("setTotalPages", Math.ceil(newItems.length / state.limit));
      commit("setActivePage", 1);
      if (newItems.length >= 5) {
        commit("setItemsOnPage", newItems.slice(0, 5));
      } else {
        commit("setItemsOnPage", newItems.slice(0, newItems.length));
      }
    },
  },
  namespaced: true,
};
