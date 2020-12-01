<template>
  <v-card flat>
    <v-card-title>
      <h2 class="display-1">Категории</h2>
    </v-card-title>
    <v-divider></v-divider>
    <v-container fluid>
      <v-row>
        <CategoryCreate @created="addNewCategory"/>
        <CategoryEdit />
        
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
    console.log(this.categories);
    this.loading = false

  },
  methods: {
    addNewCategory(category) {
      this.categories.push(category)
      console.log(this.categories);
    }
  }
}
</script>
