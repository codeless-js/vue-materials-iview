<template>
  <div class="sidebar-logo-container">
    <router-link class="sidebar-logo-link" to="/">
      <img v-if="logo" :src="logo" class="sidebar-logo" />
      <h1 class="sidebar-title">vue-admin</h1>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'SidebarLogo',
  props: {
  },
  data() {
    return {};
  },
  computed: {
    logo() {
      return '/static/img/logo.png';
    },
  },
};
</script>

<style lang="scss" scoped>
.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 84px;
  line-height: 84px;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      height: 32px;
      width: 35.5px;
      vertical-align: middle;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0 0 0 12px;
      font-weight: 400;
      font-size: 16px;
      color: #fff;
      text-align: left;
      vertical-align: middle !important;
      p {
        line-height: 20px;
        margin: 0;
      }
    }
  }

}
</style>
