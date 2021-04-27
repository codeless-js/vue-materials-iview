<template>
  <i-select
    v-bind="$attrs"
    :filterable="filterable"
    :remote="remote"
    :remote-method="remoteMethod"
    :loading="loading"
    v-on="$listeners"
  >
    <slot name="option-prepend"></slot>
    <i-option
      v-for="item in optionList"
      :value="item[valueKey]"
      :key="item.value"
      :label="item[labelKey]"
    >
      <slot v-bind:option="item">
        <span>{{ item[labelKey] }}</span>
      </slot>
    <slot name="option-append"></slot>
    </i-option>
  </i-select>
</template>

<script>
import isEqual from 'lodash/isEqual';
export default {
  components: {},
  props: {
    filterable: {
      type: Boolean,
      default: true,
    },
    filterApi: Function,
    isPage: { type: Boolean, default: true }, //是否分页
    remote: { type: Boolean, default: true }, //是否远程搜索
    valueKey: {
      type: String,
      default: 'value',
    },
    labelKey: {
      type: String,
      default: 'label',
    },
    queryKey: {
      type: String,
      default: 'searchKey',
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
  computed: {},
  watch: {
    apiParams(newValue, oldValue) {
      if (isEqual(newValue, oldValue)) return;
      this.remoteMethod();
    },
  },
  created() {
    this.remoteMethod();
  },
  mounted() {},
  methods: {
    remoteMethod(query = '') {
      this.loading = true;
      this.filterApi &&
        this.filterApi({
          projectId: this.$projectId,
          [this.queryKey]: query,
          pageSize: 20,
          pageNum: 1,
          ...this.apiParams,
        })
          .then((response) => {
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
