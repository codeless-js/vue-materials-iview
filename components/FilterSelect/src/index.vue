<template>
  <i-select
    v-bind="$attrs"
    filterable
    :remote="remote"
    :remote-method="remoteMethod"
    :loading="loading"
    v-on="$listeners"
  >
    <i-option v-for="item in optionList" :value="item[valueKey]" :key="item.value">{{
      item[labelKey]
    }}</i-option>
  </i-select>
</template>

<script>
export default {
  components: {},
  props: {
    filterApi: Function,
    isPage: { type: Boolean, default: true }, //是否分页
    valueKey: {
      type: String,
      default: 'value',
    },
    labelKey: {
      type: String,
      default: 'label',
    },
    apiParams: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      loading: false,
      optionList: [],
    };
  },
  computed: {
    remote() {
      return this.isPage;
    },
  },
  watch: {},
  created() {
    this.remoteMethod();
  },
  mounted() {},
  methods: {
    remoteMethod(query = '') {
      this.loading = true;
      this.filterApi &&
        this.filterApi({
          productId: this.$productId,
          searchKey: query,
          pageSize: 20,
          pageNum: 1,
          ...this.apiParams,
        })
          .then(response => {
            if (this.isPage) {
              this.optionList = response.data.items || [];
            } else {
              this.optionList = response.data || [];
            }
          })
          .finally(() => {
            this.loading = false;
          });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>
