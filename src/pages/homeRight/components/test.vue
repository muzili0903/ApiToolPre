<template>
  <div>
    <vxe-toolbar>
      <template #buttons>
        <vxe-button @click="getSelectionEvent">获取选中</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      ref="xTable"
      border
      show-overflow
      :data="tableData">
      <vxe-table-column type="checkbox" width="60"></vxe-table-column>
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column field="age" title="Age" :edit-render="{name: 'input'}"></vxe-table-column>
    </vxe-table>
  </div>
</template>

<script>
export default {
  name: 'test',
  data () {
    return {
      tableData: [
        {id: 10001, name: 'Test1', role: 'Develop', sex: '0', age: 28, address: 'vxe-table 从入门到放弃'},
        {id: 10002, name: 'Test2', role: 'Test', sex: '1', age: 22, address: 'Guangzhou'},
        {id: 10003, name: 'Test3', role: 'PM', sex: '0', age: 32, address: 'Shanghai'},
        {id: 10004, name: 'Test4', role: 'Designer', sex: '1', age: 23, address: 'vxe-table 从入门到放弃'},
        {id: 10005, name: 'Test5', role: 'Develop', sex: '1', age: 30, address: 'Shanghai'},
        {id: 10006, name: 'Test6', role: 'Designer', sex: '1', age: 21, address: 'vxe-table 从入门到放弃'}
      ]
    }
  },
  methods: {
    getSelectionEvent () {
      const $table = this.$refs.xTable
      const selectRecords = $table.getCheckboxRecords()
      console.log(selectRecords)
    }
  }
}
</script>

<style scoped>

</style>
