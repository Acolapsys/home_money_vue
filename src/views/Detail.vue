<template>
  <div>
    <Loader v-if="loading" />

    <p v-else-if="!record" class="text-center pt-5">
      {{"Message_RecordWith" | localize}}id=<strong>{{ $route.params.id }}</strong>{{"Message_NotFound" | localize}}
    </p>

    <div v-else>
      <v-breadcrumbs :items="menuItems" />

      <v-container>
        <v-row>
          <v-col sm="12" md="6">
            <v-card :class="record.typeClass" color="text--white" elevation="2">
              <v-card-title> {{'Title' | localize}}: {{ record.description }} </v-card-title>
              <v-card-subtitle> {{'Amount' | localize}}: {{ record.amount | currency}} </v-card-subtitle>
              <v-card-text>
                <div>
                  <p>{{"Category" | localize}}: {{ record.categoryName }}</p>
                  <small>{{ record.date | date("datetime") }}</small>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>
<script>
import localizeFilter from '@/filters/localize.filter'
export default {
  data: () => ({
    loading: true,
    record: {}
  }),
  computed: {
    menuItems() {
      return [
        {
          text: localizeFilter("Menu_History"),
          disabled: false,
          to: "/history"
        },
        {
          text: this.record.typeText,
          disabled: true,
          to: ""
        }
      ];
    }
  },
  async mounted() {
    const id = this.$route.params.id;
    const record = await this.$store.dispatch("fetchRecordById", id);
    const category = await this.$store.dispatch(
      "fetchCategoryById",
      record.categoryId
    );
    this.record = {
      ...record,
      categoryName: category.title,
      typeClass: record.type === "income" ? "green" : "red",
      typeText: record.type === "income" ? localizeFilter("Income") : localizeFilter("Outcome")
    };

    this.loading = false;
  }
};
</script>
