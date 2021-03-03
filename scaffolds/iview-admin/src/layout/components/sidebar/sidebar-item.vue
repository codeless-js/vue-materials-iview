<template>
  <div class="menu-wrapper">
    <Submenu v-if="item.children && item.children.length" ref="subMenu" :name="item.name">
      <template slot="title">
        <item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title" />
      </template>
      <SidebarItem v-for="child in item.children" :key="child.path" :item="child" />
    </Submenu>
    <template v-else>
      <router-link class="menu-a" v-if="item.meta" :to="{ name: item.name }">
        <menu-item :name="item.name">
          <item :icon-type="item.meta.icon" :title="item.meta.title" />
        </menu-item>
      </router-link>
    </template>
  </div>
</template>

<script>
import Item from './item.vue';

export default {
  name: 'SidebarItem',
  components: {
    Item,
  },
  props: {
    // route object
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.menu-a {
  color: #757575;
}
</style>
