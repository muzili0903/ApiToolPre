<template>
  <div>
    <div class="header">header</div>
    <div class="button-list">
      <div class="button" @click="insertEvent"><span style="color: blue" class="iconfont">&#xe61d;</span> 新增</div>
      <div class="button" @click="getSelectionDetail"><span style="color: black" class="iconfont">&#xe650;</span> 详情</div>
      <div class="button" @click="getEditSelection"><span style="color: darkgray" class="iconfont">&#xe62c;</span> 修改
      </div>
      <div class="button" @click="getRemoveSelection"><span style="color: red" class="iconfont">&#xe60b;</span> 删除</div>
    </div>
    <div class="content">
      <vxe-table
        ref="xTable"
        border
        show-overflow
        height="500"
        row-id="id"
        :data="tableData3"
        :radio-config="{checkRowKey: defaultSelecteRow}">
        <vxe-table-column type="radio" width="60"></vxe-table-column>
        <vxe-table-column field="mark" title="引用标识"></vxe-table-column>
        <vxe-table-column field="sqlType" title="数据库类型"></vxe-table-column>
        <vxe-table-column field="host" title="主机名"></vxe-table-column>
        <vxe-table-column field="user" title="用户名"></vxe-table-column>
        <vxe-table-column field="founder" title="创建人"></vxe-table-column>
        <vxe-table-column field="createTime" title="创建时间"></vxe-table-column>
      </vxe-table>
      <vxe-pager
        background
        size="small"
        :loading="loading3"
        :current-page="tablePage3.currentPage"
        :page-size="tablePage3.pageSize"
        :total="tablePage3.totalResult"
        :page-sizes="[10, 20, 100, {label: '大量数据', value: 1000}, {label: '全量数据', value: -1}]"
        :layouts="['PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes', 'Total']"
        @page-change="handlePageChange3">
      </vxe-pager>
      <vxe-modal v-model="showEdit" :title="selectRow ? '编辑&保存' : '新增&保存'" width="800" min-width="600" min-height="300"
               :loading="submitLoading" resize destroy-on-close>
      <template #default>
        <vxe-form :data="formData" :items="formItems" :rules="formRules" title-align="right" title-width="100"
                  @submit="submitEvent"></vxe-form>
      </template>
    </vxe-modal>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SqlDispose',
  components: {},
  data () {
    return {
      defaultSelecteRow: 10002,
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
        },
        {id: 10002, user: 'Test2', mark: 'Test', sqlType: 'Women', founder: 22, host: 'Guangzhou'},
        {id: 10003, user: 'Test3', mark: 'PM', sqlType: 'Man', founder: 32, host: 'Shanghai'},
        {id: 10004, user: 'Test4', mark: 'Designer', sqlType: 'Women ', age: 23, host: 'vxe-table 从入门到放弃'},
        {id: 10005, user: 'Test5', mark: 'Develop', sqlType: 'Women ', age: 30, host: 'Shanghai'},
        {id: 10006, user: 'Test6', mark: 'Designer', sqlType: 'Women ', age: 21, host: 'vxe-table 从入门到放弃'},
        {id: 10007, user: 'Test7', mark: 'Test', sqlType: 'Man ', age: 29, host: 'vxe-table 从入门到放弃'},
        {id: 10008, user: 'Test8', mark: 'Develop', sqlType: 'Man ', age: 35, host: 'vxe-table 从入门到放弃'},
        {id: 10009, user: 'Test9', mark: 'Test', sqlType: 'Man ', age: 29, host: 'vxe-table 从入门到放弃'},
        {id: 10010, user: 'Test10', mark: 'Develop', sqlType: 'Man ', age: 35, host: 'vxe-table 从入门到放弃'}
      ],
      loading3: false,
      tableData3: [],
      tablePage3: {
        currentPage: 1,
        pageSize: 10,
        totalResult: 0
      },
      submitLoading: false,
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
    this.findList3()
    this.formItems[6].itemRender.options = this.sqlTypeList
    this.formItems[8].itemRender.options = this.encodingList
  },
  methods: {
    findList3 () {
      this.loading3 = true
      setTimeout(() => {
        this.loading3 = false
        this.tablePage3.totalResult = 16
        this.tableData3 = this.tableData
      }, 300)
    },
    handlePageChange3 ({currentPage, pageSize}) {
      this.tablePage3.currentPage = currentPage
      this.tablePage3.pageSize = pageSize
      this.findList3()
    },
    getSelectionDetail () {
      const $table = this.$refs.xTable
      const selectRecords = $table.getRadioRecord()
      this.getEvent(selectRecords)
    },
    getRemoveSelection () {
      const $table = this.$refs.xTable
      const selectRecords = $table.getRadioRecord()
      this.removeEvent(selectRecords)
    },
    getEditSelection () {
      const $table = this.$refs.xTable
      const selectRecords = $table.getRadioRecord()
      this.editEvent(selectRecords)
    },
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
    getEvent (row) {
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
    editEvent (row) {
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
    removeEvent (row) {
      console.log('delete')
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

<style lang="stylus" scoped>
  .header
    height 2.4rem
    background-color pink

  .button-list
    height 0.6rem
    .button
      display: inline-block
      border-radius 0.1rem
      line-height 0.6rem
      text-align center
      float left
      margin-left .2rem
      border .02rem solid red

  .content
    padding-top .2rem
    background blue
    width 100%
</style>
