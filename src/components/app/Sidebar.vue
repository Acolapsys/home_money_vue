<template>
  <v-navigation-drawer v-model="drawer" absolute bottom temporary>
    <v-list nav dense>
      <v-list-item-group
        v-model="group"
        active-class="deep-purple--text text--accent-4"
      >
        <router-link
          v-for="link in links"
          :key="link.url"
          tag="list-item"
          active-class="active"
          :to="link.url"
          :exact="link.exact"
        >
          <v-list-item-title>{{ link.title }}</v-list-item-title>
        </router-link>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>

  <!--     
  <ul class="sidenav app-sidenav" :class="{ open: value }">
    <router-link
      v-for="link in links"
      :key="link.url"
      tag="li"
      active-class="active"
      :to="link.url"
      :exact="link.exact"
    >
      <a href="#" class="waves-effect waves-orange pointer">{{ link.title }}</a>
    </router-link>
  </ul> -->
</template>

<script>
export default {
  props: ['value'],
  data: () => ({
    drawer: true,
    group: true,
    links: [
      { title: 'Счет', url: '/', exact: true },
      { title: 'История', url: '/history' },
      { title: 'Планирование', url: '/planning' },
      { title: 'Новая запись', url: '/record' },
      { title: 'Категории', url: '/categories' }
    ]
  }),
  watch: {
    group() {
      this.drawer = false
    }
  }
}
</script>
