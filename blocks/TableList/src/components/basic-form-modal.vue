<template>
  <modal
    ref="modal"
      v-bind="$attrs"
      v-model="currentModal"
      :title="formType === 'add' ? '新建' : '编辑'"
      :mask-closable="false"
        okText="保存"
      loading
      transfer
      @on-ok="submitForm"
    >
    <i-form v-if="currentModal" ref="form" :model="formData" :label-width="90" :rules="rules">
      <FormItem label="姓名" prop="name">
            <i-input v-model="formData.name" placeholder="Enter something..."></i-input>
        </FormItem>
    </i-form>
  </modal>
</template>

<script>
/**
 * 初始化表单
 */
function initFormData() {
  return {
    name: '',
  };
}

export default {
  components: {},
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    formType: {
      type: String,
      default: 'add',
    },
    data: {
      type: Object,
      default() {return {}}
    }
  },
  data() {
    return {
      formData: initFormData(),
      rules: {
        name: [{ required: true, message: '必填', trigger: 'blur' }],
      },
    };
  },
  computed: {
    currentModal:{
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      },
    }
  },
  watch: {
    currentModal(newValue) {
      if (newValue) {
      // 表单内容初始化
      let formData = {};
      if (this.formType === 'add') {
        formData =  initFormData();
      }else {
      formData =  JSON.parse(JSON.stringify(this.data));

      }
      this.formData = formData;
      }
    }
  },
  created() {
  },
  mounted() {},
  methods: {
    /**
     * 校验表单
     */
    validateForm() {
      return this.$refs.form.validate()
    },
    /**
     * 提交表单
     */
    async submitForm() {
      if (!await this.validateForm()) {
        this.$refs.modal.buttonLoading = false;
        return;
      }
      if (this.formType === 'add') {
        // 新增
        this.$Message.success('创建成功');
        this.currentModal = false;
      } else {
      // 更新
        this.$Message.success('更新成功');
        this.currentModal = false;
      }
      // 接口异常时
      // this.$refs.modal.buttonLoading = false;
      this.$emit('on-submited')
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
