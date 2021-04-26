<template>
  <div>
    <vxe-toolbar>
      <template #buttons>
        <vxe-button icon="fa fa-plus" @click="insertEvent()">新增</vxe-button>
        <vxe-button icon="fa fa-plus" @click="editEvent()">修改</vxe-button>
        <vxe-button icon="fa fa-plus" @click="getSelectionDetail">删除</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      border
      resizable
      show-overflow
      highlight-hover-row
      ref="xTable"
      height="500"
      :data="tableData"
      @cell-dblclick="cellDBLClickEvent">
      <vxe-table-column type="radio" width="60"></vxe-table-column>
      <vxe-table-column field="sqlType" title="sqlType"></vxe-table-column>
      <vxe-table-column field="encoding" title="encoding"></vxe-table-column>
      <vxe-table-column field="host" title="host"></vxe-table-column>
      <vxe-table-column field="user" title="user" show-overflow></vxe-table-column>
      <vxe-table-column field="founder" title="founder" show-overflow></vxe-table-column>
      <vxe-table-column field="port" title="port" show-overflow></vxe-table-column>
      <vxe-table-column field="dbName" title="dbName" show-overflow></vxe-table-column>
    </vxe-table>

    <vxe-modal v-model="showEdit" :title="selectRow ? '编辑&保存' : '新增&保存'" width="800" min-width="600" min-height="300"
               :loading="submitLoading" resize destroy-on-close>
      <template #default>
        <vxe-form :data="formData" :items="formItems" :rules="formRules" title-align="right" title-width="100"
                  @submit="submitEvent"></vxe-form>
      </template>
    </vxe-modal>
  </div>
</template>

<script>
export default {
  name: 'test',
  data () {
    return {
      submitLoading: false,
      tableData: [
        {
          mark: 'mark',
          sqlType: 'sqlType',
          host: 'host',
          user: 'user',
          founder: 'founder',
          port: 'port',
          dbName: 'dbName',
          encoding: 'encoding'
        }
      ],
      selectRow: null,
      showEdit: false,
      sqlTypeList: [
        {label: 'MySQL', value: '0'},
        {label: 'Oracle', value: '1'},
        {label: 'SqlService', value: '2'}
      ],
      encodingList: [
        {label: 'utf-8', value: 'utf-8'},
        {label: 'gbk', value: 'gbk'}
      ],
      formData: {
        mark: null,
        sqlType: null,
        host: null,
        user: null,
        founder: null,
        port: null,
        dbName: null,
        encoding: null,
        password: null
      },
      formRules: {
        dbName: [
          {required: true, message: '请输入数据库名称'}
        ],
        user: [
          {required: true, message: '请输入用户名'}
        ],
        sqlType: [
          {required: true, message: '请选择数据库类型'}
        ],
        host: [
          {required: true, message: '请输入主机名'},
          {min: 7, max: 15, message: '长度在 7 到 15 个字符'}
        ],
        password: [
          {required: true, message: '请输入密码'}
        ],
        mark: [
          {required: true, message: '请输入引用标识'}
        ]
      },
      formItems: [
        {
          title: 'sql information',
          span: 24,
          titleAlign: 'left',
          titleWidth: 200
        },
        {field: 'host', title: '主机名', span: 12, itemRender: {name: '$input', props: {placeholder: '请输入主机名'}}},
        {field: 'port', title: '端口号', span: 12, itemRender: {name: '$input', props: {placeholder: '请输入端口号'}}},
        {field: 'user', title: '用户名', span: 12, itemRender: {name: '$input', props: {placeholder: '请输入用户名'}}},
        {field: 'password', title: '密码', span: 12, itemRender: {name: '$input', props: {placeholder: '请输入用户名'}}},
        {field: 'dbName', title: '数据库名称', span: 12, itemRender: {name: '$input', props: {placeholder: '请输入数据库名称'}}},
        {field: 'sqlType', title: '数据库类型', span: 12, itemRender: {name: '$select', options: []}},
        {field: 'mark', title: '引用标识', span: 12, itemRender: {name: '$input', props: {placeholder: '请输入标识'}}},
        {field: 'encoding', title: '连接编号', span: 12, itemRender: {name: '$select', options: []}},
        {
          align: 'center',
          span: 24,
          titleAlign: 'left',
          itemRender: {
            name: '$buttons',
            children: [{props: {type: 'submit', content: '提交', status: 'primary'}}, {
              props: {
                type: 'reset',
                content: '重置'
              }
            }]
          }
        }
      ]
    }
  },
  created () {
    this.formItems[6].itemRender.options = this.sqlTypeList
    this.formItems[8].itemRender.options = this.encodingList
  },
  methods: {
    cellDBLClickEvent ({row}) {
      this.editEvent(row)
    },
    insertEvent () {
      this.formData = {
        mark: '',
        sqlType: '',
        host: '',
        user: '',
        founder: '',
        port: '',
        dbName: '',
        encoding: '',
        password: ''
      }
      this.selectRow = null
      this.showEdit = true
    },
    editEvent (row) {
      console.log(row)
      this.formData = {
        mark: row.mark,
        sqlType: row.sqlType,
        host: row.host,
        user: row.user,
        founder: row.founder,
        port: row.port,
        dbName: row.dbName,
        encoding: row.encoding,
        password: row.password
      }
      this.selectRow = row
      this.showEdit = true
    },
    getSelectionDetail () {
      const $table = this.$refs.xTable
      const selectRecords = $table.getRadioRecord()
      console.log($table)
      console.log('selectRecords', selectRecords)
      this.removeEvent(selectRecords)
    },
    removeEvent (row) {
      console.log(row)
      const $table = this.$refs.xTable
      $table.remove(row)
    },
    submitEvent () {
      this.submitLoading = true
      setTimeout(() => {
        const $table = this.$refs.xTable
        this.submitLoading = false
        this.showEdit = false
        if (this.selectRow) {
          Object.assign(this.selectRow, this.formData)
        } else {
          $table.insert(this.formData)
        }
      }, 500)
    }
  }
}
</script>

<style scoped>

</style>
