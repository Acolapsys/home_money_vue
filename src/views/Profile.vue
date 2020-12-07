<template>
  <v-card flat>
    <v-card-title>
      <h3 class="display-1">Профиль</h3>
    </v-card-title>
    <v-divider></v-divider>

    <v-form style="max-width: 500px" @submit.prevent="submitHandler">
      <v-text-field
        label="Имя"
        v-model="name"
        required
        :class="{ invalid: $v.name.$dirty && !$v.name.required }"
        :error-messages="nameError"
      >
      </v-text-field>
      <v-radio-group v-model="radios" mandatory>
        <v-radio label="Русский" value="russian"></v-radio>
        <v-radio label="English" value="english"></v-radio>
      </v-radio-group>
      <v-btn class="mt-5" color="success" type="submit"
        >Обновить<v-icon right>mdi-send</v-icon></v-btn
      >
    </v-form>
  </v-card>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'
export default {
  name: 'profile',
  data: () => ({
    name: '',
    radios: 'russian'
  }),
  mounted() {
    this.name = this.getInfo.name
  },
  validations: {
    name: { required }
  },
  computed: {
    ...mapGetters(['getInfo']),
    nameError() {
      if (this.$v.name.$dirty && !this.$v.name.required) {
        return 'Введите имя'
      }
      return ''
    }
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
    }
  }
}
</script>
