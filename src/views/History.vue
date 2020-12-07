<template>
  <v-card flat>
    <v-card-title>
      <h2 class="display-1">История записей</h2>
    </v-card-title>
    <v-divider></v-divider>
    <div class="history-chart">
      <GChart type="PieChart" :data="chartData" :options="chartOptions" />
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
import { GChart } from "vue-google-charts";
import HistoryTable from "@/components/HistoryTable";
import paginationMixin from "@/mixins/pagination.mixin";
export default {
  name: "history",
  mixins: [paginationMixin],
  components: {
    HistoryTable,
    GChart
  },
  data: () => ({
    loading: true,
    records: [],
    chartData: [],
    chartOptions: {
      chart: {
        title: "Диаграмма расходов",
        subtitle: "Расходы по категориям"
      }
    }
  }),
  async mounted() {
    this.records = await this.$store.dispatch("fetchRecords");
    const categories = await this.$store.dispatch("fetchCategories");
    this.setup(categories);

    this.loading = false;
  },
  methods: {
    setup(categories) {
      +this.setupPagination(
        this.records.map(r => ({
          ...r,
          categoryName: categories.find(c => c.id === r.categoryId).title,
          typeClass: r.type === "income" ? "green" : "red",
          typeText: r.type === "income" ? "Доход" : "Расход"
        }))
      );
      this.chartData = [['Category', 'Outcome'], ...categories.map(el => {
        return [
          el.title,
          this.records.reduce((total, rec) => {
            if (rec.categoryId === el.id && rec.type === "outcome") {
              total += rec.amount;
            }
            return total;
          }, 0)
        ];
      })]
    }
  }
};
</script>
