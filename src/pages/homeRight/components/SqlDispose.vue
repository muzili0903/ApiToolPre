<template>
  <div>
    <div class="header">header</div>
    <div class="button-list">
      <div class="button" @click="insertEvent"><span style="color: blue" class="iconfont">&#xe61d;</span> 新增</div>
      <div class="button" @click="getSelectionDetail"><span style="color: black" class="iconfont">&#xe650;</span> 详情
      </div>
      <div class="button" @click="getEditSelection"><span style="color: darkgray" class="iconfont">&#xe62c;</span> 修改
      </div>
      <div class="button" @click="getRemoveSelection"><span style="color: red" class="iconfont">&#xe60b;</span> 删除</div>
      <div class="button" @click="getLinkSelection"><span style="color: red" class="iconfont">&#xe61e;</span> 连接测试</div>
    </div>
    <div class="content">
      <vxe-table
        ref="xTable"
        border
        show-overflow
        height="500"
        row-id="id"
        :data="tableData3"
        :radio-config="{checkRowKey: defaultSelecteRow}"
        @cell-dblclick="cellDBLClickEvent">
        <vxe-table-column type="radio" width="60"></vxe-table-column>
        <vxe-table-column field="mark" title="引用标识"></vxe-table-column>
        <vxe-table-column field="sqlType" title="数据库类型"></vxe-table-column>
        <vxe-table-column field="host" title="主机名"></vxe-table-column>
        <vxe-table-column field="user" title="用户名"></vxe-table-column>
        <vxe-table-column field="founder" title="创建人"></vxe-table-column>
        <vxe-table-column field="create_time" title="创建时间"></vxe-table-column>
        <vxe-table-column field="linkTest" title="连接情况"></vxe-table-column>
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
      <div v-show="this.showEdit">
        <vxe-modal v-model="showEdit" :title="selectRow ? '编辑&保存' : '新增&保存'" width="800" min-width="600"
                   min-height="300"
                   :loading="submitLoading" resize destroy-on-close>
          <template #default>
            <vxe-form :data="formData" :items="formItems" :rules="formRules" title-align="right" title-width="100"
                      @submit="submitEvent"></vxe-form>
          </template>
        </vxe-modal>
      </div>
      <div v-show="this.showDetail">
        <vxe-modal v-model="showDetail" title="查看详情" width="600" height="400" :mask="false" :lock-view="false" resize>
          <template #default>
            <vxe-table
              border="inner"
              auto-resize
              show-overflow
              highlight-hover-row
              height="auto"
              :show-header="false"
              :sync-resize="showDetail"
              :data="detailData">
              <vxe-table-column field="label" width="40%"></vxe-table-column>
              <vxe-table-column field="value"></vxe-table-column>
            </vxe-table>
          </template>
        </vxe-modal>
      </div>
      <dialog-bar v-model="dialog.sendVal" :type="this.dialog.type" :title="this.dialog.title"
                  :content="this.dialog.content" @confirm="insertAgain"></dialog-bar>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {mapState} from 'vuex'
import dialogBar from 'common/Dialog'

export default {
  name: 'SqlDispose',
  components: {dialogBar},
  data () {
    return {
      defaultSelecteRow: 10002,
      tableData2: [],
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
      showDetail: false,
      detailData: [],
      sqlTypeList: [
        {label: 'MySQL', value: 'MySQL'},
        {label: 'Oracle', value: 'Oracle'},
        {label: 'SqlService', value: 'SqlService'}
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
      ],
      dialog: {
        sendVal: false,
        content: '',
        title: '温馨提示',
        type: 'confirm'
      }
    }
  },
  created () {
    this.findList3()
    this.formItems[6].itemRender.options = this.sqlTypeList
    this.formItems[8].itemRender.options = this.encodingList
  },
  computed: {
    ...mapState({
      userName: 'userName'
    })
  },
  // 生命周期函数 页面挂载后执行 getSqlInfo 获取数据库配置数据
  mounted () {
    this.getSqlInfo()
    this.getSqlInfoAllNum()
  },
  methods: {
    findList3 () {
      this.loading3 = true
      setTimeout(() => {
        this.loading3 = false
        this.tableDataMap(this.tableData2)
        this.tableData3 = this.tableData2
      }, 300)
    },
    handlePageChange3 ({currentPage, pageSize}) {
      this.tablePage3.currentPage = currentPage
      this.tablePage3.pageSize = pageSize
      this.tableData2 = []
      this.getSqlInfo()
      this.findList3()
    },
    getSelectionDetail () {
      const $table = this.$refs.xTable
      const selectRecords = $table.getRadioRecord()
      this.getDetailEvent(selectRecords)
    },
    getRemoveSelection () {
      const $table = this.$refs.xTable
      const selectRecords = $table.getRadioRecord()
      this.removeSqlInfo(selectRecords)
    },
    getEditSelection () {
      const $table = this.$refs.xTable
      const selectRecords = $table.getRadioRecord()
      this.editEvent(selectRecords)
    },
    getLinkSelection () {
      // TODD 获取到sql配置的id
      const $table = this.$refs.xTable
      const selectRecords = $table.getRadioRecord()
      this.testSqlInfo(selectRecords['id'])
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
    submitEvent () {
      this.submitLoading = true
      setTimeout(() => {
        // const $table = this.$refs.xTable
        this.submitLoading = false
        this.showEdit = false
        if (this.selectRow) {
          const id = this.selectRow['id']
          this.updateSqlInfo(this.formData, id)
          // Object.assign(this.selectRow, this.formData)
        } else {
          this.insertSqlInfo(this.formData)
          // $table.insert(this.formData)
        }
      }, 500)
    },
    closeEvent () {
      console.log('ccccccc')
      this.submitLoading = true
      setTimeout(() => {
        this.submitLoading = false
        this.showDetail = false
      }, 500)
    },
    getDetailEvent (row) {
      const showField = {
        mark: '标识',
        sqlType: '数据库类型',
        host: '主机名',
        user: '用户名',
        founder: '创建人',
        port: '端口号',
        dbName: '数据库名称',
        encoding: '连接编码',
        password: '密码',
        linkTest: '连接情况'
      }
      this.detailData = ['mark', 'sqlType', 'host', 'user', 'founder', 'port', 'dbName', 'encoding', 'password', 'linkTest'].map(field => {
        return {label: showField[field], value: row[field]}
      })
      this.showDetail = true
    },
    cellDBLClickEvent ({row}) {
      this.getDetailEvent(row)
    },
    getSqlInfo () {
      let formData = new FormData()
      formData.append('currentPage', this.tablePage3.currentPage)
      formData.append('pageSize', this.tablePage3.pageSize)
      axios({
        method: 'post',
        url: '/api/sqlDispose/disposeData',
        data: formData
      }).then(this.getSqlInfoSucc)
    },
    getSqlInfoSucc (res) {
      res = res.data
      if (res.code === 0 && res.data) {
        const data = res.data
        for (let i = 0; i < data.length; i++) {
          const dic = {}
          const dic1 = data[i]['fields']
          dic['id'] = data[i]['pk']
          for (let key in dic1) {
            dic[key] = dic1[key]
          }
          this.tableData2.push(dic)
        }
      }
    },
    getSqlInfoAllNum () {
      axios({
        method: 'post',
        url: '/api/sqlDispose/disposeAll'
      }).then(this.getSqlInfoAllNumSucc)
    },
    getSqlInfoAllNumSucc (res) {
      res = res.data
      if (res.code === 0 && res.data) {
        this.tablePage3.totalResult = res.data.total
      }
    },
    insertSqlInfo (data) {
      let formData = new FormData()
      for (let keys in data) {
        formData.append(keys, data[keys])
      }
      formData.append('founder', this.userName)
      axios({
        method: 'post',
        url: '/api/sqlDispose/insertSql',
        data: formData
      }).then(this.insertSqlInfoSucc)
    },
    insertSqlInfoSucc (res) {
      res = res.data
      if (res.code === 0) {
        this.$router.go(0)
      } else {
        this.dialog.sendVal = true
        this.dialog.content = res.msg
        console.log(this.formData)
        // this.insertAgain()
        // this.insertSqlInfo(this.formData)
      }
    },
    tableDataMap (data) {
      for (let i = 0; i < data.length; i++) {
        const val = data[i]['linkTest']
        data[i]['create_time'] = data[i]['create_time'].replace('T', ' ').split('.')[0]
        if (val === 0) {
          data[i]['linkTest'] = '失败'
        } else if (val === 1) {
          data[i]['linkTest'] = '成功'
        } else {
          data[i]['linkTest'] = '未测试'
        }
      }
    },
    updateSqlInfo (data, id) {
      let formData = new FormData()
      for (let keys in data) {
        formData.append(keys, data[keys])
      }
      formData.append('update_person', this.userName)
      formData.append('id', id)
      axios({
        method: 'post',
        url: '/api/sqlDispose/updateSql',
        data: formData
      }).then(this.updateSqlInfoSucc)
    },
    updateSqlInfoSucc (res) {
      res = res.data
      if (res.code === 0) {
        this.$router.go(0)
        Object.assign(this.selectRow, this.formData)
      }
    },
    removeSqlInfo (row) {
      console.log(row)
      let formData = new FormData()
      formData.append('update_person', this.userName)
      formData.append('id', row['id'])
      axios({
        method: 'post',
        url: '/api/sqlDispose/deleteSql',
        data: formData
      }).then(this.deleteSqlInfoSucc)
    },
    deleteSqlInfoSucc (res) {
      res = res.data
      if (res.code === 0) {
        this.$router.go(0)
      }
    },
    insertAgain () {
      this.editEvent(this.formData)
      this.selectRow = null
    },
    testSqlInfo (id) {
      let formData = new FormData()
      formData.append('id', id)
      axios({
        method: 'post',
        url: '/api/sqlDispose/linkTest',
        data: formData
      }).then(this.linkSqlInfoSucc)
    },
    linkSqlInfoSucc (res) {
      res = res.data
      if (res.code === 0) {
        this.$router.go(0)
      }
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
