<template>
  <div class="m-container m-view--list">
    <div>
      <i-button type="primary" @click="showAddModal">创建</i-button>
    </div>
    <div>
      <i-table
        class="no-outside-border"
        stripe
        :columns="columns"
        :data="tableData"
        no-data-text="暂无数据，请先创建"
      />
    </div>
    <!--分页-->
    <!-- <div class="m-page">
      <Page
        class="f-fr"
        size="small"
        :current="pageInfo.page"
        :page-size="pageInfo.pageSize"
        :total="pageInfo.total"
        @on-change="onPageChange"
        show-total
      ></Page>
    </div> -->
    <!--表单弹框-->
    <FormModal
      v-model="modals.basicForm"
      :formType="modals.basicFormType"
      :data="currentRow"
      @on-submited="getTableData"
    ></FormModal>
  </div>
</template>

<script>
import response from './index.json';
import FormModal from './form-modal.vue';

export default {
  components: {
    FormModal,
  },
  props: {},
  data() {
    return {
      tableData: [],
      /* 分页信息 */
      pageInfo: {
        page: 1,
        pageSize: 20,
        total: 0,
      },
      modals: {
        basicForm: false,
        basicFormType: 'add',
      },
      currentRow: {},
      // 表格结构
      columns: [
        {
          type: 'index',
          width: 50,
        },
        {
          title: '姓名',
          key: 'name',
        },
        {
          title: '年纪',
          key: 'age',
        },
        {
          title: '地址',
          key: 'address',
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          render: (h, { row }) => (
            <div class="table_action">
              <span
                class="clickable--primary"
                onClick={() => {
                  this.showEditRow(row);
                }}
              >
                编辑
              </span>
              <span
                class="clickable--error"
                onClick={() => {
                  this.confirmDeleteRow(row);
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
    this.getTableData();
  },
  mounted() {},
  methods: {
    /**
     * 获取表格数据
     */
    getTableData() {
      this.tableData = response.data;
    },
    /**
     * 切换页面
     * @param {Number} page  当前选中页
     */
    onPageChange(page) {
      this.pageInfo.page = page;
      this.getTableData();
    },
    /**
     * 搜索
     */
    onSearch() {
      this.pageInfo.page = 1;
      this.getTableData();
    },
    /**
     * 显示新建弹框
     */
    showAddModal() {
      this.modals.basicFormType = 'add';
      this.modals.basicForm = true;
    },
    /**
     * 显示编辑弹框
     */
    showEditRow(row) {
      this.currentRow = row;
      this.modals.basicFormType = 'edit';
      this.modals.basicForm = true;
    },
    /**
     * 删除二次确认弹框
     */
    confirmDeleteRow({ id }) {
      this.$Modal.confirm({
        title: '删除',
        content: '确定删除此数据吗？',
        okType: 'error',
        onOk: () => {
          this.deleteRow({ id });
        },
      });
    },
    /**
     * 删除
     */
    deleteRow() {
      // 删除接口
      this.getTableData();
      this.$Message.success('删除成功');
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
