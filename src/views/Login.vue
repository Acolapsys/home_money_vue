<template>
  <v-dialog v-model="dialog" persistent max-width="500px">
    <template v-slot:activator="{ on }">
      <v-btn outline color="teal lighten-3" dark v-on="on"
        >Add new project</v-btn
      >
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Домашняя бухгалтерия</span>
      </v-card-title>
      <v-form ref="form" v-model="valid" lazy-validation class="pa-7 text-center">
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required
        ></v-text-field>

        <v-text-field
          v-model="password"
          :rules="passwordRules"
          label="Password"
          required
        ></v-text-field>

        <v-divider class="mt-10"></v-divider>
        <v-card-action>

        <v-btn 
          :disabled="!valid"
          color="success"
          class="mr-4 mt-3"
          @click="login"
          block
        >
          Войти
          <v-icon right>mdi-send</v-icon>
          
        </v-btn>
        <p class="center mt-3">
        Нет аккаунта?
        <router-link to="/register" class='orange--text text-uppercase text-decoration-none'>Зарегистрироваться</router-link>
      </p>
        </v-card-action>
        
        

        
      </v-form>
    </v-card>
  </v-dialog>

  <!-- <form class="card auth-card">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input id="email" type="text" class="validate" />
        <label for="email">Email</label>
        <small class="helper-text invalid">Email</small>
      </div>
      <div class="input-field">
        <input id="password" type="password" class="validate" />
        <label for="password">Пароль</label>
        <small class="helper-text invalid">Password</small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Войти
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Нет аккаунта?
        <a href="/">Зарегистрироваться</a>
      </p>
    </div>
  </form> -->
</template>
<script>
export default {
  data() {
    return {
      valid: false,

    }
  }
}
</script>