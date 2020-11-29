<template>
  <v-card flat>
    <v-card-title>
      <h2 class="display-1">Категории</h2>
    </v-card-title>
    <v-divider></v-divider>
    <v-container fluid>
      <v-row>
        <CategoryCreate />
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
      
    }
    
  },
  components: {
    CategoryCreate, CategoryEdit
  }
}
</script>
