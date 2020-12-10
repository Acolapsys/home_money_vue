<template>
  <nav>
    <v-app-bar color="orange" dark app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <router-link to="/" tag="span" style="cursor: pointer">
        <v-toolbar-title class="text-uppercase">
          <span class="font-weight-light"> {{ date | date("datetime") }}</span>
        </v-toolbar-title>
      </router-link>
      <v-spacer />

      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn class=" orange" v-bind="attrs" v-on="on" text>
            <span>{{ name }}</span>
            <v-icon right>mdi-menu-down</v-icon>
          </v-btn>
        </template>
        <v-list flat>
          <v-list-item router to="/profile" active-class="border">
            <v-icon left>mdi-account</v-icon>
            <v-list-item-title>{{'ProfileTitle' | localize}}</v-list-item-title>
          </v-list-item>
          <v-list-item text @click.stop="logout">
            
              <v-icon left>mdi-exit-to-app</v-icon>
              <v-list-item-title>Exit</v-list-item-title>
           
         
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <div :key="locale">

    <v-navigation-drawer v-model="drawer" app  dark class="orange darken-2" >
      <v-layout column align-center>
        <v-flex class="mt-5">
          <v-avatar size="100">
            <v-img src="@/assets/avatar1.jpg"></v-img>
          </v-avatar>
          <p class="white--text mt-1 subheading text-center">{{ name }}</p>
        </v-flex>
      </v-layout>
      <v-list flat >
        <v-list-item
          v-for="link in links"
          :key="link.title"
          router
          :to="link.url"
          active-class="border"
        >
          <v-list-item-action>
            <v-icon left>{{ link.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ link.title | localize }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    </div>
  </nav>
</template>

<script>
export default {
  data: () => ({
    date: new Date(),
    interval: null,
    drawer: true,
    links: [
      { icon: "mdi-view-dashboard", title: 'Menu_Bill', url: "/", exact: true },
      { icon: "mdi-history", title: 'Menu_History', url: "/history" },
      { icon: "mdi-notebook", title: 'Menu_Planning', url: "/planning" },
      { icon: "mdi-plus-circle", title: 'Menu_Record', url: "/record" },
      { icon: "mdi-view-list", title: 'Menu_Categories', url: "/categories" }
    ]
  }),
  methods: {
    async logout() {
      await this.$store.dispatch("logout");
      this.$router.push("/login?message=logout");
    }
  },
  computed: {
    name() {
      return this.$store.getters.getInfo.name;
    },
    locale() {
      return this.$store.getters.getInfo.locale
    }
  },
  mounted() {
    this.interval = setInterval(() => {
      this.date = new Date();
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  }
};
</script>

<style scoped>
.border {
  border-left: 4px solid #0ba518;
}
</style>
