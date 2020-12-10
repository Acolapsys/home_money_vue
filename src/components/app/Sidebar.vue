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
</template>

<script>
import loclizeFilter from '@/filters/localize.filter'
export default {
  props: ['value'],
  data: () => ({
    drawer: true,
    group: true,
    links: [
      { title: localizeFilter('Menu_Bill'), url: '/', exact: true },
      { title: localizeFilter('Menu_History'), url: '/history' },
      { title: localizeFilter('Menu_Planning'), url: '/planning' },
      { title: localizeFilter('Menu_Record'), url: '/record' },
      { title: localizeFilter('Menu_Categories'), url: '/categories' }
    ]
  }),
  watch: {
    group() {
      this.drawer = false
    }
  }
}
</script>
