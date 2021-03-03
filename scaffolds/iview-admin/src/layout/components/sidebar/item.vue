<template>
  <div >
      <icon v-if="iconType || iconCustom" class="menu-icon" :type="iconType" :custom="iconCustom" />
      <span class="menu-title">{{ title }}</span>
    </div>
</template>

<script>

export default {
  name: 'MenuItem',
  props: {
    iconType: {
      type: String,
      default: undefined,
    },
    iconCustom: {
      type: String,
      default: undefined,
    },
    title: {
      type: String,
      default: '',
    },
  },
  computed: {
  },
};
</script>
<style scope lang="scss">
.menu-icon {
  display: inline-block;
  font-size: 16px;
  width: 16px;
  text-align: center;
  color: #90a4ae;
}
.menu-title {
  margin-left: 10px;
}
</style>
