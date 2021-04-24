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
        height="500"
        row-id="id"
        :data="tableData3"
        :radio-config="{checkRowKey: defaultSelecteRow}">
        <vxe-table-column type="radio" width="60"></vxe-table-column>
        <vxe-table-column field="role" title="引用标识"></vxe-table-column>
        <vxe-table-column field="age" title="数据库类型"></vxe-table-column>
        <vxe-table-column field="id" title="主机名"></vxe-table-column>
        <vxe-table-column field="name" title="用户名"></vxe-table-column>
        <vxe-table-column field="address" title="创建人" show-overflow></vxe-table-column>
        <vxe-table-column field="sex" title="创建时间"></vxe-table-column>
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
        {id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃'},
        {id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou'},
        {id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai'},
        {id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 23, address: 'vxe-table 从入门到放弃'},
        {id: 10005, name: 'Test5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai'},
        {id: 10006, name: 'Test6', role: 'Designer', sex: 'Women ', age: 21, address: 'vxe-table 从入门到放弃'},
        {id: 10007, name: 'Test7', role: 'Test', sex: 'Man ', age: 29, address: 'vxe-table 从入门到放弃'},
        {id: 10008, name: 'Test8', role: 'Develop', sex: 'Man ', age: 35, address: 'vxe-table 从入门到放弃'},
        {id: 10009, name: 'Test9', role: 'Test', sex: 'Man ', age: 29, address: 'vxe-table 从入门到放弃'},
        {id: 10010, name: 'Test10', role: 'Develop', sex: 'Man ', age: 35, address: 'vxe-table 从入门到放弃'}
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
