import { createStore } from "vuex";
import { tableModule } from "./itemModule";

export default createStore({
  modules: {
    table: tableModule,
  },
});
