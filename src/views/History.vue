<template>
  <v-card flat>
    <v-card-title>
      <h2 class="display-1">{{"History_Title" | localize}}</h2>
    </v-card-title>
    <v-divider></v-divider>
    

    <Loader v-if="loading" />

    <p v-else-if="!records.length" class="text-center pt-5">
      {{"Message_NoRecords" | localize}}
      <router-link to="/record">{{"AddNewRecord" | localize}}</router-link>
    </p>
    <div v-else class="history-chart">
      <GChart type="PieChart" :data="chartData" :options="chartOptions" />
    

    <HistoryTable  :records="items" />
    </div>
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
import localizeFilter from '@/filters/localize.filter'
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
        title: localizeFilter("Chart_Title"),
        subtitle: localizeFilter("Chart_Subtitle")
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
          typeText: r.type === "income" ? localizeFilter("Income") : localizeFilter("Outcome")
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
