<template>
  <nav>
    <v-app-bar color="orange" dark app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <router-link to="/" tag="span" style="cursor: pointer">
        <v-toolbar-title class="text-uppercase">
          <span class="font-weight-light" v-text="'12.12.12'" ></span>
        </v-toolbar-title>
      </router-link>
      <v-spacer />
      

       <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn class=" orange" v-bind="attrs" v-on="on" text>
              
              <span>USER NAME</span>
              <v-icon right>mdi-menu-down</v-icon>
            </v-btn>
          </template>
          <v-list flat>
            <v-list-item v-for="(link) in links" :key="link.title" router :to="link.url" active-class="border">
              <v-icon left>{{link.icon}}</v-icon>
              <v-list-item-title>{{ link.title }}</v-list-item-title>
              
            </v-list-item>
          </v-list>
       </v-menu>

       <v-btn text>
        <span>Exit</span>
        <v-icon right>mdi-exit-to-app</v-icon>
      </v-btn>
       </v-app-bar>

      <v-navigation-drawer v-model="drawer" app dark class="orange darken-2">
        <v-list flat >
          <v-list-item v-for="(link) in links" :key="link.title" router :to="link.url" active-class="border">

            <v-list-item-action>
              <v-icon left>{{link.icon}}</v-icon>

            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ link.title }}</v-list-item-title>
            </v-list-item-content>
              
              
              
            </v-list-item>

        </v-list>

      </v-navigation-drawer>
      <!-- <v-toolbar-items class="hidden-sm-and-down">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn class=" orange black--text" v-bind="attrs" v-on="on" text>
              USER NAME
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(item, index) in items" :key="index">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar-items> -->
   
  </nav>
</template>

<script>
export default {
  data: () => ({
    drawer: true,
    links: [
      { icon: "mdi-folder", title: 'Счет', url: '/', exact: true },
      { icon: "mdi-folder", title: 'История', url: '/history' },
      { icon: "mdi-folder", title: 'Планирование', url: '/planning' },
      { icon: "mdi-eye", title: 'Новая запись', url: '/record' },
      { icon: "mdi-folder", title: 'Категории', url: '/categories' }
    ]
  }),
  methods: {
    logout() {
      this.$router.push("/login?message=logout");
    }
  }
};
</script>

<style scoped>
.border {
    border-left: 4px solid #0ba518;
}
</style>
