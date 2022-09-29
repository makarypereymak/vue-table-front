<template>
  <Form />
  <Table />
</template>

<script>
import Form from "@/components/Form.vue";
import Table from "@/components/Table.vue";

export default {
  components: {
    Form,
    Table,
  },
};
</script>

<style>
body {
  margin: 0;
}
#app {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
