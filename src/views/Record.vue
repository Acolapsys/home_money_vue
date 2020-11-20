<template>
  <v-card flat>
    <v-card-title>
      <h2 class="display-1">Новая запись</h2>
    </v-card-title>
    <v-divider></v-divider>

    <v-form style="max-width: 500px">
      <v-radio-group v-model="radioGroup">
        <v-radio label="Доход" value="income"></v-radio>
        <v-radio label="Расход" value="outcome"></v-radio>
      </v-radio-group>

      <v-text-field type="number" label="Сумма" v-model="name" required>
      </v-text-field>

      <v-text-field label="Описание" v-model="description" required>
      </v-text-field>
      <v-btn color="orange">Создать<v-icon right>mdi-send</v-icon></v-btn>
    </v-form>
  </v-card>
</template>
