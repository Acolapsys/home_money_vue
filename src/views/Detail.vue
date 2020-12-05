<template>
  <div>
    <Loader v-if="loading" />

    <p v-else-if="!record" class="text-center pt-5">
      Запись с id=<strong>{{ $route.params.id }}</strong> не найдена
    </p>

    <div v-else>
      <v-breadcrumbs :items="menuItems" />

      <v-container>
        <v-row>
          <v-col sm="12" md="6">
            <v-card :class="record.typeClass" color="text--white" elevation="2">
              <v-card-title> Описание: {{ record.description }} </v-card-title>
              <v-card-subtitle> Сумма: {{ record.amount | currency}} </v-card-subtitle>
              <v-card-text>
                <div>
                  <p>Категория: {{ record.categoryName }}</p>
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
export default {
  data: () => ({
    loading: true,
    record: {}
  }),
  computed: {
    menuItems() {
      return [
        {
          text: "История",
          disabled: false,
          href: "history"
        },
        {
          text: this.record.typeText,
          disabled: true,
          href: ""
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
      typeText: record.type === "income" ? "Доход" : "Расход"
    };

    this.loading = false;
  }
};
</script>
