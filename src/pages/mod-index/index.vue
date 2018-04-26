<template>
  <div id="index">
    首页页面

    <el-row :gutter="20">
      <el-col :span="8">
        <div class="col-test">第一列</div>
      </el-col>  
      <el-col :span="8">
        <div class="col-test">第二列</div>
      </el-col> 
      <el-col :span="8">
        <div class="col-test">第三列</div>
      </el-col> 
    </el-row>

  </div>
</template>

<script>
export default {
  name: 'index'
};
</script>

<style scoped>
  .col-test {
    background-color: #bbb;
  }
</style>
