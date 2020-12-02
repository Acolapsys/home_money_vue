<template>
  <v-card flat>
    <v-card-title>
      <h2 class="display-1">Новая запись</h2>
    </v-card-title>
    <v-divider></v-divider>

    <Loader v-if="loading" />
    <p v-else-if="!categories.length" class="text-center pt-5">
      Категорий пока нет.
      <router-link to="/categories">Добавить новую категорию</router-link>
    </p>

    <v-form v-else style="max-width: 500px" @submit.prevent="submitHandler">
      <v-select
        :items="categories"
        item-text="title"
        item-value="limit"
        return-object
        v-model="select"
        label="Название"
      ></v-select>

      <v-radio-group v-model="type" row>
        <v-radio label="Доход" value="income"></v-radio>
        <v-radio label="Расход" value="outcome"></v-radio>
      </v-radio-group>

      <v-text-field
        type="number"
        label="Сумма"
        v-model.number="amount"
        required
        :error-messages="amountError"
        :class="{ invalid: $v.amount.$dirty && !$v.amount.minValue }"
      >
      </v-text-field>

      <v-text-field
        label="Описание"
        v-model="description"
        required
        :error-messages="descriptionError"
        :class="{ invalid: $v.description.$dirty && !$v.description.required }"
      >
      </v-text-field>
      <v-btn color="success" type="submit"
        >Создать<v-icon right>mdi-send</v-icon></v-btn
      >
    </v-form>
    <v-snackbar v-model="snackbar">{{ alertMessage }}</v-snackbar>
  </v-card>
</template>
<script>
import { mapGetters } from "vuex";
import { required, minValue } from "vuelidate/lib/validators";
export default {
  name: "record",
  data: () => ({
    loading: true,
    categories: [],
    select: {},
    type: "outcome",
    amount: 1,
    description: "",
    snackbar: false,
    alertMessage: ""
  }),
  async mounted() {
    this.categories = await this.$store.dispatch("fetchCategories");
    this.loading = false;
    if (this.categories.length) {
      this.select = this.categories[0];
    }
  },
  computed: {
    ...mapGetters(["getInfo"]),
    canCreateRecord() {
      if (this.type === "income") {
        return true;
      }
      return this.getInfo.bill >= this.amount;
    },
    amountError() {
      if (this.$v.amount.$dirty && !this.$v.amount.minValue) {
        return "Минимальное значение " + this.$v.limit.$params.minValue.min;
      }
      return "";
    },
    descriptionError() {
      if (this.$v.description.$dirty && !this.$v.description.required) {
        return "Введите описание";
      }
      return "";
    }
  },
  validations: {
    description: { required },
    amount: { minValue: minValue(1) }
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      if (this.canCreateRecord) {
        try {
          await this.$store.dispatch("createRecord", {
            categoryId: this.select.id,
            amount: this.amount,
            description: this.description,
            type: this.type,
            date: new Date().toJSON()
          });
          const bill =
            this.type === "income"
              ? this.getInfo.bill + this.amount
              : this.getInfo.bill - this.amount;
          await this.$store.dispatch("updateInfo", { bill });

          this.alertMessage = "Запись успешно создана";
          this.snackbar = true;
          this.$v.$reset();
          this.amount = 1;
          this.description = "";
        } catch (e) {
          console.log(e);
        }
      } else {
        this.alertMessage = `Недостаточно средств на счете (${this.amount -
          this.getInfo.bill})`;
        this.snackbar = true;
      }
    }
  }
};
</script>
