<template>
  <v-card style="width: 500px">
    <v-card-title>
      <span class="headline">{{ 'HomeBookkeeping' | localize }}</span>
    </v-card-title>
    <v-form ref="form" @submit.prevent="submitHandler" class="pa-7 text-center">
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
        :label="'Password' | localize"
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

      <v-text-field
        id="name"
        v-model="name"
        :label="'Name' | localize"
        :class="{
          invalid: $v.name.$dirty && !$v.name.required
        }"
      ></v-text-field>
      <small
        v-if="$v.name.$dirty && !$v.name.required"
        class="red--text d-flex flex-start"
        >{{ 'Message_EnterName' | localize }}</small
      >

      <v-checkbox
        v-model="agree"
        :label="'Message_Agreement' | localize"
        :class="{
          invalid: $v.agree.$dirty && !$v.agree.checked
        }"
      ></v-checkbox>
      <small
        v-if="$v.agree.$dirty && !$v.agree.checked"
        class="red--text d-flex flex-start"
        >{{ 'Message_NeedToAgree' | localize }}</small
      >

      <v-divider class="mt-2"></v-divider>
      <v-card-actions class="d-flex flex-column">
        <v-btn
          color="success"
          class="mr-4 mt-3 text-uppercase"
          block
          type="submit"
        >
          {{ 'Message_SignUp' | localize }}
          <v-icon right>mdi-send</v-icon>
        </v-btn>
        <p class="center mt-3">
          {{ 'Message_NeedAnAccount' | localize }}
          <router-link
            to="/login"
            class="orange--text text-uppercase text-decoration-none"
            >{{ 'Login' | localize }}</router-link
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
      title: this.$title('Message_SignUp')
    }
  },
  name: 'register',
  data() {
    return {
      email: '',
      password: '',
      name: '',
      agree: false,
      snackbar: false,
      alertMessage: ''
    }
  },
  computed: {
    error() {
      return this.$store.getters.getError
    }
  },
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6) },
    name: { required },
    agree: { checked: v => v }
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const formData = {
        email: this.email,
        password: this.password,
        name: this.name
      }

      try {
        await this.$store.dispatch('register', formData)

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
