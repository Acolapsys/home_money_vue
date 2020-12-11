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
        >{{ 'Message_EnterEmail' | localize }}</small
      >
      <small
        v-else-if="$v.email.$dirty && !$v.email.email"
        class="red--text d-flex flex-start"
        >{{ 'Message_WrongEmail' | localize }}</small
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
        >{{ 'Message_EnterPassword' | localize }}</small
      >

      <small
        v-else-if="$v.password.$dirty && !$v.password.minLength"
        class="red--text d-flex flex-start"
        >{{ 'Message_PasswordMinLength' | localize }}
        {{ this.$v.password.$params.minLength.min
        }}{{ 'Message_Signs' | localize }}</small
      >

      <v-divider class="mt-10"></v-divider>
      <v-card-actions class="d-flex flex-column">
        <v-btn color="success" class="mr-4 mt-3" type="submit" block>
          {{ 'Login' | localize }}
          <v-icon right>mdi-send</v-icon>
        </v-btn>
        <p class="center mt-3">
          {{ 'Message_NeedAnAccount' | localize }}
          <router-link
            to="/register"
            class="orange--text text-uppercase text-decoration-none"
            >{{ 'Message_SignUp' | localize }}</router-link
          >
        </p>
      </v-card-actions>
    </v-form>

    <v-snackbar v-model="snackbar">{{ alertMessage }}</v-snackbar>
  </v-card>
</template>
<script>
import { email, required, minLength } from 'vuelidate/lib/validators'
import messages from '@/plugins/messages'
import localizeFilter from '@/filters/localize.filter'

export default {
  metaInfo() {
    return {
      title: this.$title('Login')
    }
  },
  name: 'login',
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6) }
  },
  data() {
    return {
      email: '',
      password: '',
      snackbar: false,
      alertMessage: ''
    }
  },
  computed: {
    error() {
      return this.$store.getters.getError
    }
  },
  mounted() {
    if (messages[this.$route.query.message]) {
      this.alertMessage = messages[this.$route.query.message]
      this.snackbar = true
    }
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const formData = {
        email: this.email,
        password: this.password
      }

      try {
        await this.$store.dispatch('login', formData)
        this.$router.push('/')
      } catch (e) {
        this.alertMessage =
          messages[this.error.code] ||
          localizeFilter('Message_SomethingWentWrong')
        this.snackbar = true
      }
    }
  }
}
</script>
