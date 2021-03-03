<template>
  <div class="m-breadcrumb">
    <Breadcrumb>
      <BreadcrumbItem
        v-for="(item, index) in levelList"
        :key="item.name"
        :to="index !== levelList.length - 1 ? { name: item.name } : undefined"
        >{{ item.meta.title }}</BreadcrumbItem
      >
    </Breadcrumb>
  </div>
</template>

<script>

export default {
  components: {},
  props: {},
  data() {
    return {
      levelList: null,
    };
  },
  watch: {
    $route(route) {
      if (route.path.startsWith('/redirect/')) {
        return;
      }
      this.getBreadcrumb();
    },
  },
  created() {
    this.getBreadcrumb();
  },
  methods: {
    getBreadcrumb() {
      // only show routes with meta.title
      let matched = this.$route.matched.filter(item => item.meta && item.meta.title);
      const first = matched[0];

      if (!this.isDashboard(first)) {
        matched = [{ name: 'dashboard', meta: { title: '首页' } }].concat(matched);
      }

      this.levelList = matched.filter(
        item => item.meta && item.meta.title && item.meta.breadcrumb !== false,
      );
    },
    isDashboard(route) {
      const name = route && route.name;
      if (!name) {
        return false;
      }
      return name.trim().toLocaleLowerCase() === 'dashboard';
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
