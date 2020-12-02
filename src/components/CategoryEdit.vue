<template>
  <v-col sm="12" md="6">
    <v-card height="310px" class="pa-4" flat>
      <v-card-subtitle class="font-weight-light ">
        <span class="display-1">Редактировать</span>
      </v-card-subtitle>
      <v-form @submit.prevent="submitHandler">
        <v-select :items="categories" item-text="title" item-value="limit" return-object v-model="select" label="Название"></v-select>

        <v-text-field
          label="Название"
          v-model="title"
          required
          :class="{ invalid: $v.title.$dirty && !$v.title.required }"
          :error-messages="titleError"
        >
        </v-text-field>

        <v-text-field
          label="Лимит"
          v-model.number="limit"
          required
          :class="{ invalid: $v.limit.$dirty && !$v.limit.minValue }"
          :error-messages="limitError"
        >
        </v-text-field>

 
        <v-btn class="mt-5" color="success" type="submit">Обновить<v-icon right>mdi-send</v-icon></v-btn>
      </v-form>
    </v-card>
         <v-snackbar v-model="snackbar">{{ alertMessage }}</v-snackbar>
  </v-col>
</template>

<script>
import { required, minValue } from "vuelidate/lib/validators";
export default {
  props: ["categories"],
  data: () => ({
    select: {},
      snackbar: false,
      alertMessage: "",
      title: "",
      limit: null
  }),
  validations: {
    title: { required },
    limit: { minValue: minValue(100) }
  },
  watch: {
    select(value) {
      this.title = value.title
      this.limit = value.limit
    }
  },
  computed: {
    titleError() {
      if (this.$v.title.$dirty && !this.$v.title.required) {
        return "Введите название категории";
      }
      return "";
    },
    limitError() {
      if (this.$v.limit.$dirty && !this.$v.limit.minValue) {
        return "Минимальное значение " + this.$v.limit.$params.minValue.min;
      }
      return "";
    }
  },
  created() {
    console.log(this.categories);
  },
  methods: {
    async submitHandler() {
        if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      try {

        await this.$store.dispatch('updateCategory', {id: this.select.id, title: this.title, limit: this.limit})
        this.alertMessage = "Категория успешно обновлена"
        this.snackbar = true
        this.$emit('updated', {id: this.select.id, title: this.title, limit: this.limit})

      }
      catch(e) {console.log(e);}
    }
  }
}

</script>