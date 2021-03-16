<template>
  <InputGroup @keyup.native.enter="handleEnter">
    <slot name="prepend"></slot>
    <i-input
      v-model.trim="currentValue"
      :placeholder="placeholder"
      :size="size"
      clearable
    ></i-input>
    <i-button type="primary" icon="search" @click="onClick"></i-button>
  </InputGroup>
</template>

<script>
export default {
  components: {},
  props: {
    value: {
      type: [String, Number],
      default: '',
    },
    placeholder: {
      type: String,
      default: '请输入搜索关键词...',
    },
    size: {
      default: 'default',
    },
  },
  data() {
    return {
      currentValue: this.value,
      searchList: [],
      suggestionModeData: [],
    };
  },
  mounted() {},
  methods: {
    onClick() {
      this.$emit('on-click');
      this.$emit('on-search');
    },
    handleEnter() {
      this.$emit('on-enter', this.currentValue);
      this.$emit('on-search');
    },
  },
  computed: {},
  watch: {
    currentValue(val) {
      this.$emit('input', val);
    },
    value: function(val) {
      this.currentValue = val;
    },
  },
};
</script>
