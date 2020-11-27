<template>
  <v-card style="width: 500px">
    <v-card-title>
      <span class="headline">Домашняя бухгалтерия</span>
    </v-card-title>
    <v-form ref="form" class="pa-7 text-center" @submit.prevent="submitHandler">
      <v-text-field
        v-model.trim="email"
        label="E-mail"
        id="email"
        :class="{
          invalid:
            ($v.email.$dirty && !$v.email.required) ||
            ($v.email.$dirty && $v.email.email)
        }"
      ></v-text-field>
      <small
        v-if="$v.email.$dirty && !$v.email.required"
        class="red--text d-flex flex-start"
        >Введите e-mail</small
      >
      <small
        v-else-if="$v.email.$dirty && !$v.email.email"
        class="red--text d-flex flex-start"
        >Неверный e-mail</small
      >

      <v-text-field
        type="password"
        v-model="password"
        label="Password"
        id="password"
        :class="{
          invalid:
            ($v.password.$dirty && !$v.password.required) ||
            ($v.password.$dirty && $v.password.minLength)
        }"
      ></v-text-field>
      <small
        v-if="$v.password.$dirty && !$v.password.required"
        class="red--text d-flex flex-start"
        >Введите пароль</small
      >

      <small
        v-else-if="$v.password.$dirty && !$v.password.minLength"
        class="red--text d-flex flex-start"
        >Пароль должен быть не меньше
        {{ this.$v.password.$params.minLength.min }} символов</small
      >

      <v-divider class="mt-10"></v-divider>
      <v-card-actions class="d-flex flex-column">
        <v-btn color="success" class="mr-4 mt-3" type="submit" block>
          Войти
          <v-icon right>mdi-send</v-icon>
        </v-btn>
        <p class="center mt-3">
          Нет аккаунта?
          <router-link
            to="/register"
            class="orange--text text-uppercase text-decoration-none"
            >Зарегистрироваться</router-link
          >
        </p>
      </v-card-actions>
    </v-form>
    
    <v-snackbar v-model="snackbar">{{ alertMessage }}</v-snackbar>
  </v-card>

</template>
<script>
import { email, required, minLength } from "vuelidate/lib/validators";
import messages from '@/plugins/messages'

export default {
  name: "login",
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6) }
  },
  data() {
    return {
      email: "",
      password: "",
      snackbar: false,
      alertMessage: ""
    };
  },
  computed: {
    error() {
      return this.$store.getters.getError
    }
  },

  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      const formData = {
        email: this.email,
        password: this.password
      };
      console.log(formData);

      try {
        await this.$store.dispatch("login", formData);
        this.$router.push("/");
      } catch (e) {
        console.log(e.message);
        this.alertMessage = messages[this.error.code] || 'Что-то пошло не так'
      this.snackbar = true
      }
    }
  }
};
</script>
