<template>
  <div class="navbar">
    <Breadcrumb class="f-ib m-breadcrumb"></Breadcrumb>
    <div class="f-ib m-info ">
      <Dropdown trigger="click" placement="bottom-end">
        <div class="f-csp u-nav_user_name">
          <img class="avatar" :src="avatar + '&s=60'" width="30px" height="30px" />
          <Icon class="arrow" type="md-arrow-dropdown"></Icon>
        </div>
        <DropdownMenu slot="list" style="min-width: 0;">
          <DropdownItem class="c-error" @click.native="logout">注销</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Breadcrumb from './breadcrumb.vue';

export default {
  components: {
    Breadcrumb,
  },
  props: {},
  data() {
    return {
      profileModal: false,
    };
  },
  computed: {
    ...mapGetters(['avatar']),
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    logout() {
      this.$store.dispatch('user/logout').then(() => {
        this.$Message.success('注销成功');
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.navbar {
    height: 100%;
  background: #fff;
  border-bottom: 1px solid #e5e6eb;
}
.m-breadcrumb {
  line-height: 60px;
  margin-left: 10px;
}
/*用户头像*/
.m-info {
  width:84px;
  border-left: 1px solid #e5e6eb;
  line-height: 60px;
  float: right;
  /* 用户名 */
  .u-nav_user_name {
    width: 53px;
    height: 59px;
    margin-left: 15px;
    .avatar {
      position: relative;
      top: 10px;
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
    .arrow {
      color: #90a4ae;
      margin-left: 5px;
    }
  }
}
</style>
