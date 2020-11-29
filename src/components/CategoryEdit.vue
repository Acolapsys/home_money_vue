<template>
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
</template>