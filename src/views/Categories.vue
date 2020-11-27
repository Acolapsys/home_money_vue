<template>
  <v-card flat>
    <v-card-title>
      <h2 class="display-1">Категории</h2>
    </v-card-title>
    <v-divider></v-divider>
    <v-container fluid>
      <v-row>
        <v-col sm="12" md="6">
          <v-card height="310px" class="pa-4" flat>
            <v-card-subtitle class="font-weight-light ">
              <span class="display-1">Создать</span>
            </v-card-subtitle>
            <v-form>
              <v-text-field label="Название" v-model="name" required>
              </v-text-field>

              <v-text-field label="Лимит" v-model="limit" required>
              </v-text-field>
              <v-btn color="orange"
                >Создать<v-icon right>mdi-send</v-icon></v-btn
              >
            </v-form>
          </v-card>
        </v-col>
        <v-col sm="12" md="6">
          <v-card height="310px" class="pa-4" flat>
            <v-card-subtitle class="font-weight-light ">
              <span class="display-1">Редактировать</span>
            </v-card-subtitle>
            <v-form>
              <v-text-field label="Название" v-model="name" required>
              </v-text-field>

              <v-text-field label="Лимит" v-model="limit" required>
              </v-text-field>
              <v-btn color="orange"
                >Обновить<v-icon right>mdi-send</v-icon></v-btn
              >
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      limit: ''
    }
    
  }
}
</script>
