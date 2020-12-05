<template>
  <v-card flat>
    <v-card-title>
      <h2 class="display-1">История записей</h2>
    </v-card-title>
    <v-divider></v-divider>
    <div class="history-chart">
      <canvas></canvas>
    </div>

    <Loader v-if="loading" />

    <p v-else-if="!records.length" class="text-center pt-5">
      Записей пока нет.
      <router-link to="/record">Добавить новую запись</router-link>
    </p>

    <HistoryTable v-else :records="records" />
  </v-card>
</template>
<script>
import HistoryTable from "@/components/HistoryTable";
export default {
  name: "history",
  components: {
    HistoryTable
  },
  data: () => ({
    loading: true,
    records: [],
    categories: []
  }),
  async mounted() {
    const records = await this.$store.dispatch("fetchRecords");
    this.categories = await this.$store.dispatch("fetchCategories");
    this.records = records.map(r => ({
      ...r,
      categoryName: this.categories.find(c => c.id === r.categoryId).title,
      typeClass: r.type === 'income' ? 'green' : 'red',
      typeText: r.type === 'income' ? 'Доход' : 'Расход'
    }))
    this.loading = false
  }
};
</script>
