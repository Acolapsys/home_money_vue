<template>
  <v-col sm="12" md="6">
    <v-card height="310px" class="pa-4" flat>
      <v-card-subtitle class="font-weight-light ">
        <span class="display-1">{{ 'Create' | localize }}</span>
      </v-card-subtitle>
      <v-form @submit.prevent="submitHandler">
        <v-text-field
          :label="'Title' | localize"
          v-model="title"
          required
          :class="{ invalid: $v.title.$dirty && !$v.title.required }"
          :error-messages="titleError"
        >
        </v-text-field>

        <v-text-field
          :label="'Limit' | localize"
          v-model.number="limit"
          required
          :class="{ invalid: $v.limit.$dirty && !$v.limit.minValue }"
          :error-messages="limitError"
        >
        </v-text-field>

        <v-btn class="mt-5" color="success" type="submit"
          >{{ 'Create' | localize }}<v-icon right>mdi-send</v-icon></v-btn
        >
      </v-form>
    </v-card>
    <v-snackbar v-model="snackbar">{{ alertMessage }}</v-snackbar>
  </v-col>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators'
import localizeFilter from '@/filters/localize.filter'
export default {
  data() {
    return {
      title: '',
      limit: 100,
      snackbar: false,
      alertMessage: ''
    }
  },
  validations: {
    title: { required },
    limit: { minValue: minValue(100) }
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      try {
        const category = await this.$store.dispatch('createCategory', {
          title: this.title,
          limit: this.limit
        })
        this.title = ''
        this.limit = 100
        this.$v.$reset()
        this.alertMessage = localizeFilter('Message_CategoryCreated')
        this.snackbar = true
        this.$emit('created', category)
      } catch (e) {
        console.log(e)
      }
    }
  },
  computed: {
    titleError() {
      if (this.$v.title.$dirty && !this.$v.title.required) {
        return localizeFilter('Message_EnterCategoryTitle')
      }
      return ''
    },
    limitError() {
      if (this.$v.limit.$dirty && !this.$v.limit.minValue) {
        return (
          localizeFilter('Message_MinValue') +
          this.$v.limit.$params.minValue.min
        )
      }
      return ''
    }
  }
}
</script>
