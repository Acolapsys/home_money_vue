<template>
 
    <v-card style="width: 500px">
      <v-card-title>
        <span class="headline">Домашняя бухгалтерия</span>
      </v-card-title>
      <v-form ref="form" v-model="valid" lazy-validation class="pa-7 text-center" >
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required
        ></v-text-field>

        <v-text-field
          v-model="password"
          :rules="passwordRules"
          label="Пароль"
          required
        ></v-text-field>

        <v-text-field
          v-model="name"
          :rules="nameRules"
          label="Имя"
          required
        ></v-text-field>

        <v-checkbox
      v-model="agreement"
      :label="`С правилами согласен`"
    ></v-checkbox>

        <v-divider class="mt-2"></v-divider>
        <v-card-action>

        <v-btn 
          :disabled="!valid"
          color="success"
          class="mr-4 mt-3 text-uppercase"
          @click.stop="register"
          block
        >
          Зарегистрироваться
          <v-icon right>mdi-send</v-icon>
          
        </v-btn>
        <p class="center mt-3">
        Нет аккаунта?
        <router-link to="/login" class='orange--text text-uppercase text-decoration-none'>Войти</router-link>
      </p>
        </v-card-action>
        
        

        
      </v-form>
    </v-card>



  <!-- <form class="card auth-card">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input id="email" type="text" />
        <label for="email">Email</label>
        <small class="helper-text invalid">Email</small>
      </div>
      <div class="input-field">
        <input id="password" type="password" class="validate" />
        <label for="password">Пароль</label>
        <small class="helper-text invalid">Password</small>
      </div>
      <div class="input-field">
        <input id="name" type="text" class="validate" />
        <label for="name">Имя</label>
        <small class="helper-text invalid">Name</small>
      </div>
      <p>
        <label>
          <input type="checkbox" />
          <span>С правилами согласен</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <a href="/">Войти!</a>
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