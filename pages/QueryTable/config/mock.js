module.exports = {
  dataSchema: [
    {
      title: '名称',
      field: 'name',
    },
    {
      title: '描述',
      field: 'description',
    },
    {
      title: '发布时间',
      field: 'date',
    },
  ],
  formSchema: [
    {
      title: '名称',
      field: 'name',
      component: 'Input',
      componentProps: [
        {
          key:'placeholder',
          value: '请输入',
        },
      ] ,
      rules:[
        {
          required: true,
          message: '名称不能为空',
          trigger: 'blur'
        },
        {
          required: false,
          message: 'xxxx',
          trigger: ''
        }
      ]
    },
    {
      title: '描述',
      field: 'description',
      component: 'Input',
      componentProps: [
        {
          key:'type',
          value: 'textarea',
          colon: false,
        },
        {
          key:'rows',
          value: '3',
          colon: true,
        },
        {
          key:'placeholder',
          value: '请输入',
          colon: false,
        },
      ] ,
    },
  ],
};
