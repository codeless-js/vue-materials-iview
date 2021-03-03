<template>
  <div class="m-container m-view--list">
    <div style="border-bottom: 1px solid #e8e8e8; padding: 10px;">
      <Button type="primary" @click="showAddDemo">创建示例</Button>
    </div>
    <div>
      <i-table
        class="no-outside-border"
        stripe
        :columns="demoColumns"
        :data="demoList"
        no-data-text="暂无数据，请先创建示例"
      />
    </div>
    <!--分页-->
    <div class="m-page">
      <Page
        class="f-fr"
        size="small"
        :current="pageInfo.page"
        :page-size="pageInfo.pageSize"
        :total="pageInfo.total"
        @on-change="onPageChange"
        show-total
      ></Page>
    </div>
    <!--新建示例-->
    <Modal
      ref="demoModal"
      v-model="modal.demo"
      :title="modal.demoType === 'add' ? '新建示例' : '编辑示例'"
      :mask-closable="false"
      loading
      transfer
      @on-ok="submitForm"
    >
      <DemoForm
        ref="demoForm"
        v-if="modal.demo"
        :data="currentDemo"
        :formType="modal.demoType"
      ></DemoForm>
    </Modal>
  </div>
</template>

<script>
/* 接口 */
import { getDemoList, deleteDemo } from '@/api/demo';

export default {
  components: {
    DemoForm: () => import('@/components/demo/demo-form.vue'),
  },
  props: {},
  data() {
    return {
      demoList: [],
      /* 过滤 */
      filter: {
        keyword: '',
      },
      /* 分页信息 */
      pageInfo: {
        page: 1,
        pageSize: 20,
        total: 0,
      },
      modal: {
        demo: false,
        demoType: 'add',
      },
      currentDemo: {},
      // 表格结构
      demoColumns: [
        {
          type: 'index',
          width: 50,
        },
        {
          title: '示例名',
          key: 'name',
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          render: (h, { row }) => (
              <div class="table_action">
                <span
                  class="clickable"
                  onClick={() => {
                    this.showEditDemo(row);
                  }}
                >
                  编辑
                </span>
                <span
                  class="clickable--error"
                  onClick={() => {
                    this.confirmDeleteDemo(row.id);
                  }}
                >
                  删除
                </span>
              </div>
          ),
        },
      ],
    };
  },
  computed: {},
  watch: {},
  created() {
    this.getDemoList();
  },
  mounted() {},
  methods: {
    /**
     * 获取示例列表
     */
    getDemoList() {
      getDemoList({
        projectId: this.$projectId,
        keyword: this.filter.keyword,
        page: this.pageInfo.page,
        pageSize: this.pageInfo.pageSize,
      }).then((response) => {
        this.demoList = response.data.items || [];
        // 更新分页信息
        this.pageInfo.total = response.data.pageInfo.total;
        this.pageInfo.page = response.data.pageInfo.page;
      });
    },
    /**
     * 切换页面
     * @param {Number} page  当前选中页
     */
    onPageChange(page) {
      this.pageInfo.page = page;
      this.getDemoList();
    },
    /**
     * 搜索
     */
    onSearch() {
      this.pageInfo.page = 1;
      this.getDemoList();
    },
    /**
     * 显示新建弹框
     */
    showAddDemo() {
      this.modal.demoType = 'add';
      this.modal.demo = true;
    },
    /**
     * 显示编辑弹框
     */
    showEditDemo(data) {
      this.currentDemo = data;
      this.modal.demoType = 'edit';
      this.modal.demo = true;
    },
    /**
     * 删除二次确认弹框
     */
    confirmDeleteDemo(id) {
      this.$Modal.confirm({
        title: '删除',
        content: '确定删除此示例吗？',
        okType: 'error',
        onOk: () => {
          this.deleteDemo(id);
        },
      });
    },
    /**
     * 删除
     */
    deleteDemo(id) {
      deleteDemo({
        id,
      }).then(() => {
        this.getDemoList();
        this.$Message.success('删除成功');
      });
    },
    /**
     * 提交表单
     */
    async submitForm() {
      /* 模态框 */
      const { demoModal } = this.$refs;
      /* 表单 */
      const { demoForm } = this.$refs;
      /* 校验表单 */
      if (!(await demoForm.validateForm())) {
        demoModal.buttonLoading = false;
        return;
      }
      demoForm
        .submitForm()
        .then(() => {
          // 返回结果处理
          this.modal.demo = false;
          this.getDemoList();
        })
        .catch(() => {
          demoModal.buttonLoading = false;
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
