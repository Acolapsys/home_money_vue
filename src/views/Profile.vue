<template>
  <v-card flat>
    <v-card-title>
      <h3 class="display-1">{{'ProfileTitle' | localize}}</h3>
    </v-card-title>
    <v-divider></v-divider>

    <v-form style="max-width: 500px" @submit.prevent="submitHandler">
      <v-text-field
        :label="'Name' | localize"
        v-model="name"
        required
        :class="{ invalid: $v.name.$dirty && !$v.name.required }"
        :error-messages="nameError"
      >
      </v-text-field>
      <v-radio-group v-model="locale" mandatory row>
        <v-radio label="Русский" value="russian"></v-radio>
        <v-radio label="English" value="english"></v-radio>
      </v-radio-group>
      <v-btn class="mt-5" color="success" type="submit"
        >{{'Update' | localize}}<v-icon right>mdi-send</v-icon></v-btn
      >
    </v-form>
  </v-card>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import localizeFilter from '@/filters/localize.filter'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'profile',
  data: () => ({
    name: '',
    locale: 'russian'
  }),
  mounted() {
    this.name = this.getInfo.name
    this.locale = this.getInfo.locale
  },
  validations: {
    name: { required }
  },
  computed: {
    ...mapGetters(['getInfo']),
    nameError() {
      if (this.$v.name.$dirty && !this.$v.name.required) {
        return localizeFilter('Message_EnterName')
      }
      return ''
    }
  },
  methods: {
    ...mapActions(['updateInfo']),
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      try {
        await this.updateInfo({
          name: this.name,
          locale: this.locale
        })
      }
      catch(e) {
        console.log(e)

      }
    }
  }
}
</script>
