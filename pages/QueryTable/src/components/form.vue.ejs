<template>
  <div>
    <i-form ref="form" :model="formData" :label-width="90" :rules="rules">
      <FormItem label="场景名:" prop="name">
        <i-input v-model="formData.name" placeholder="请输入场景名" />
      </FormItem>
    </i-form>
  </div>
</template>

<script>
// 接口
// import { addScene, updateScene } from '@/api/scene';
/**
 * 初始化表单
 */
function initFormData () {
  return {
    name: '',
  };
};

export default {
  components: {},
  props: {
    formType: {
      type: String,
      default: 'add',
    },
    data: Object,
  },
  data: function() {
    // 表单内容初始化
    let formData = {};
    if (this.formType === 'add') {
      formData = initFormData();
    } else {
      formData = JSON.parse(JSON.stringify(this.data));
    }
    return {
      formData: formData,
      /* 模块列表 */
      moduleList: [],
      rules: {
        name: [{ required: true, message: '场景名不能为空' }],
        number: { pattern: /^\d*$/, message: '需为整数' },
        apiList: [{ type: 'array', required: true, message: '不能为空', trigger: 'blur' }],
      },
    };
  },
  computed: {},
  watch: {},
  created: function() {},
  mounted: function() {},
  methods: {
    /**
     * 校验表单
     */
    validateForm() {
      return this.$refs.form.validate();
    },
    /**
     * 提交表单
     */
    submitForm() {
      if (this.formType === 'add') {
        // 新增
        return addScene({
          name: this.formData.name,
          level: this.formData.level,
        }).then((response) => {
          this.$Message.success('创建成功');
          return response;
        });
      } else {
        // 更新
        return updateScene({
          id: this.formData.id,
          name: this.formData.name,
          level: this.formData.level,
        }).then((response) => {
          this.$Message.success('更新成功');
          return response;
        });
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>