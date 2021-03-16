<template>
  <div class="batch-handler-wrap">
    <div class="left">
      <template v-if="!currentBatchStatus">
        <slot name="normal"></slot>
        <template v-if="batch">
          <i v-show="$slots.normal" class="split-line"></i>
          <i-button @click="showBatchBtn">批量操作</i-button>
        </template>
      </template>
      <template v-else>
        <slot name="batch"></slot>
        <i class="split-line"></i>
        <i-button @click="cancelBatchBtn">取消</i-button>
      </template>
    </div>
    <div v-if="$slots.searchAddition" class="search-addition-wrap">
      <slot name="searchAddition"></slot>
    </div>
    <div v-if="$slots.search" class="right">
      <slot name="search"></slot>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  model: {
    prop: 'batchStatus',
    event: 'on-batch-change',
  },
  props: {
    batchStatus: {
      type: Boolean,
      default: false,
    },
    batch: {
      type: Boolean,
      default: false,
    },
  },
  data: function() {
    return {
      currentBatchStatus: this.batchStatus,
    };
  },
  computed: {},
  watch: {
    batchStatus(newValue) {
      this.currentBatchStatus = newValue;
    },
  },
  created: function() {},
  mounted: function() {},
  methods: {
    /**
     * 显示批量操作
     */
    showBatchBtn: function() {
      this.currentBatchStatus = true;
      this.$emit('on-batch-change', true);
      this.$Message.success('请点击列表进行批量操作');
    },
    /**
     * 取消批量操作
     */
    cancelBatchBtn: function() {
      this.currentBatchStatus = false;
      this.$emit('on-batch-change', false);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.batch-handler-wrap {
  height: 53px;
  border-bottom: 1px solid #e8e8e8;
  display: flex;
  .left {
    margin: 10px 0 10px 20px;
    flex: 1 1 auto;
  }
  /deep/ .left > *:not(:last-child) {
    margin-right: 8px;
  }
  .search-addition-wrap {
    flex: 0 0 auto;
    padding: 10px;
    border-left: 1px solid #e8e8e8;
    > *:not(:last-child) {
      margin-right: 5px;
    }
  }
  .right {
    display: flex;
    padding: 10px;
    flex: 0 0 auto;
    border-left: 1px solid #e8e8e8;
  }
}
</style>
