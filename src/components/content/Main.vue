<template>
  <div>
    <el-dialog title="编辑用户" :visible="dialogVisble">
      <el-form>
        <el-form-item label="姓名">
          <el-input autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select placeholder="请选择性别" v-model="男">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="电话">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisble = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisble = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisble: true
    }
  }
}
</script>

<style>

</style>