<template>
  <div>
    <div class="header">header</div>
    <div class="button-list">
      <div class="button"><span style="color: blue" class="iconfont">&#xe61d;</span> 新增</div>
      <div class="button"><span style="color: black" class="iconfont">&#xe650;</span> 详情</div>
      <div class="button" @click="getSelectionDetail"><span style="color: darkgray" class="iconfont">&#xe62c;</span> 修改</div>
      <div class="button"><span style="color: red" class="iconfont">&#xe60b;</span> 删除</div>
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
        {id: 10001, user: 'Test1', mark: 'Develop', sqlType: 'Man', founder: 28, host: 'vxe-table 从入门到放弃'},
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
      }
    }
  },
  created () {
    this.findList3()
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
      console.log($table)
      console.log('selectRecords', selectRecords)
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
