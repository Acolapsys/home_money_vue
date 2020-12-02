<template>
  <v-card flat>
    <v-card-title>
      <h2 class="display-1">Категории</h2>
    </v-card-title>
    <v-divider></v-divider>
    <v-container fluid>
      <v-row>
        <CategoryCreate @created="addNewCategory"/>
        <CategoryEdit 
        v-if="categories.length"
        @updated="updateCategory"
        :categories="categories"/>
        <v-col v-else sm="12" md="6">
        <p class=" pa-4 headline text--secondary text-center">Категорий пока нет</p>
        </v-col>
        
      </v-row>
    </v-container>
  </v-card>
</template>
<script>
import CategoryCreate from '@/components/CategoryCreate'
import CategoryEdit from '@/components/CategoryEdit'
export default {
  data() {
    return {
      categories: [],
      loading: true
    }
  },
  components: {
    CategoryCreate, CategoryEdit
  },
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false
  },
  methods: {
    addNewCategory(category) {
      this.categories.push(category)
    },
    updateCategory(category) {
      const id = this.categories.findIndex(el => el.id === category.id)
      this.categories[id].title = category.title
      this.categories[id].limit = category.limit
    }
  }
}
</script>
