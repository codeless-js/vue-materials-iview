<template>
  <div class="sidebar-container">
    <logo></logo>
    <div>
      <i-menu ref="menu" class="side-bar-menu" theme="dark" :active-name="activeMenu" width="auto">
        <sidebar-item v-for="route in menuList" :key="route.path" :item="route" />
      </i-menu>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Logo from './logo.vue';
import SidebarItem from './sidebar-item.vue';

export default {
  components: {
    Logo,
    SidebarItem,
  },
  props: {},
  data() {
    return {
    };
  },
  computed: {
    ...mapState({
      permissionRoutes: state => state.permission.routes,
    }),
    activeMenu() {
      const { name, meta } = this.$route;
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return name;
    },
    menuList() {
      return this.getMenuList();
    },
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    getMenuList() {
      const menuList = [];
      this.permissionRoutes.forEach((element) => {
        if (element.name && !element.hidden) {
          const newElement = {
            ...element,
            children: (element.children || []).filter(item => !item.hidden),
          };
          menuList.push(newElement);
        } else {
          const children = (element.children || []).filter(item => !item.hidden);
          menuList.push(...children);
        }
      });
      return menuList;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.sidebar-container {
  border-right: 1px solid #e5e6eb;
  position: relative;
}
</style>
