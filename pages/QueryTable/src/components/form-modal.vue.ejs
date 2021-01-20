<template>
  <Modal
    ref="modal"
    v-model="model"
    :mask-closable="false"
    :title="formType === 'add' ? '新建数据' : '编辑数据'"
    ok-text="保存"
    width="630"
    loading
    @on-ok="submitForm"
    v-on="$listeners"
  >
    <Form
      v-if="model"
      ref="form"
      :formType="formType"
      :data="data"
    ></Form>
  </Modal>
</template>

<script>
import Form from './form';
export default {
  components: { Form },
  props: {
    value: Boolean,
    data: Object,
    formType: String,
  },
  data() {
    return {
      model: this.value,
    };
  },
  computed: {},
  watch: {
    value(newValue) {
      this.model = newValue;
    },
    model(newValue) {
      this.$emit('input', newValue);
    },
  },
  created() {},
  mounted() {},
  methods: {
    async submitForm() {
      /*模态框 和 表单*/
      const {modal, form} = this.$refs;
      /*校验表单*/
      if (!(await form.validateForm())) {
        modal.buttonLoading = false;
        return;
      }
      await form
        .submitForm()
        .then(response => {
          this.model = false;
          this.$emit('on-submited', response.data);
        })
        .finally(() => {
          modal.buttonLoading = false;
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>