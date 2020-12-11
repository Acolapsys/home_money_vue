<template>
  <v-card flat>
    <v-card-title>
      <h2 class="display-1">{{ 'Menu_Planning' | localize }}</h2>
      <v-spacer></v-spacer>
      <h4 class="display-1">{{ getInfo.bill | currency('RUB') }}</h4>
    </v-card-title>
    <v-divider></v-divider>

    <Loader v-if="loading" />

    <p v-else-if="!categories.length" class="text-center pt-5">
      {{ 'Message_NoCategories' | localize }}
      <router-link to="/categories">{{
        'Message_AddNewCategory' | localize
      }}</router-link>
    </p>
    <v-card-text v-else v-for="cat of categories" :key="cat.id">
      <p>
        <strong>{{ cat.title }}:</strong>
        {{ cat.spend | currency }}{{ 'Message_Of' | localize
        }}{{ cat.limit | currency }}
      </p>
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-progress-linear
            :color="cat.progressColor"
            :value="cat.progressPercent"
            v-bind="attrs"
            v-on="on"
          />
        </template>
        <span>{{ cat.tooltip }}</span>
      </v-tooltip>
    </v-card-text>
  </v-card>
</template>
<script>
import { mapGetters } from 'vuex'
import currencyFilter from '@/filters/currency.filter'
import localizeFilter from '@/filters/localize.filter'
export default {
  metaInfo() {
    return {
      title: this.$title('Menu_Planning')
    }
  },
  name: 'planning',
  data: () => ({
    categories: [],
    loading: true
  }),
  computed: {
    ...mapGetters(['getInfo'])
  },
  async mounted() {
    const records = await this.$store.dispatch('fetchRecords')
    const categories = await this.$store.dispatch('fetchCategories')
    this.categories = categories.map(cat => {
      const spend = records
        .filter(r => r.categoryId === cat.id)
        .filter(r => r.type === 'outcome')
        .reduce((total, rec) => total + rec.amount, 0)
      const percent = (spend * 100) / cat.limit
      const progressPercent = percent > 100 ? 100 : percent
      const progressColor =
        percent < 60 ? 'green' : percent < 100 ? 'yellow' : 'red'

      const tooltipValue = cat.limit - spend
      const tooltip = `${
        tooltipValue >= 0
          ? localizeFilter('Message_Left')
          : localizeFilter('Message_OutOf')
      } ${currencyFilter(Math.abs(tooltipValue))}`

      return { ...cat, progressPercent, progressColor, spend, tooltip }
    })

    this.loading = false
  }
}
</script>
