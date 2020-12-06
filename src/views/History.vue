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

    <HistoryTable v-else :records="items" />
    <v-pagination
    class="pt-10"
      v-model="page"
      :length="pageCount"
      :total-visible="8"
      
    ></v-pagination>
  </v-card>
</template>
<script>
import HistoryTable from "@/components/HistoryTable";
import paginationMixin from '@/mixins/pagination.mixin'
export default {
  name: "history",
  mixins: [paginationMixin],
  components: {
    HistoryTable
  },
  data: () => ({
    loading: true,
    records: []
  }),
  async mounted() {
    this.records = await this.$store.dispatch("fetchRecords");
    const categories = await this.$store.dispatch("fetchCategories");
    this.setupPagination(this.records.map(r => ({
      ...r,
      categoryName: categories.find(c => c.id === r.categoryId).title,
      typeClass: r.type === 'income' ? 'green' : 'red',
      typeText: r.type === 'income' ? 'Доход' : 'Расход'
    })))
    this.loading = false
  }
};
</script>
