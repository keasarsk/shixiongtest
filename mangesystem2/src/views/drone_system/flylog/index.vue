<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="无人机编号" prop="droneNumber">
        <el-input v-model="queryParams.droneNumber" placeholder="请输入无人机编号" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="是否飞行" prop="inAir">
        <el-input v-model="queryParams.inAir" placeholder="请输入是否飞行" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="经度" prop="lat">
        <el-input v-model="queryParams.lat" placeholder="请输入经度" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="纬度" prop="lng">
        <el-input v-model="queryParams.lng" placeholder="请输入纬度" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="电池容量" prop="battery">
        <el-input v-model="queryParams.battery" placeholder="请输入电池容量" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="飞行模式" prop="flightMode">
        <el-input v-model="queryParams.flightMode" placeholder="请输入飞行模式" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="是否上电" prop="isArmed">
        <el-input v-model="queryParams.isArmed" placeholder="请输入是否上电" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="执行时间" prop="datetime">
        <el-date-picker clearable v-model="queryParams.datetime" type="date" value-format="yyyy-MM-dd"
          placeholder="请选择执行时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd"
          v-hasPermi="['drone_system:flylog:add']">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="success" plain icon="el-icon-edit" size="mini" :disabled="single" @click="handleUpdate"
          v-hasPermi="['drone_system:flylog:edit']">修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple" @click="handleDelete"
          v-hasPermi="['drone_system:flylog:remove']">删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport"
          v-hasPermi="['drone_system:flylog:export']">导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="flylogList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="编号" align="center" prop="id" show-overflow-tooltip />
      <el-table-column label="无人机编号" align="center" prop="droneNumber" />
      <el-table-column label="是否飞行" align="center" prop="inAir" />
      <el-table-column label="经度" align="center" prop="lat" />
      <el-table-column label="纬度" align="center" prop="lng" />
      <el-table-column label="电池容量" align="center" prop="battery" />
      <el-table-column label="飞行模式" align="center" prop="flightMode" />
      <el-table-column label="是否上电" align="center" prop="isArmed" />
      <el-table-column label="执行时间" align="center" prop="datetime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.datetime, '{y}-{m}-{d} {h}:{m}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)"
            v-hasPermi="['drone_system:flylog:edit']">修改</el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)"
            v-hasPermi="['drone_system:flylog:remove']">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getList" />

    <!-- 添加或修改飞行日志对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="无人机编号" prop="droneNumber">
          <el-input v-model="form.droneNumber" placeholder="请输入无人机编号" />
        </el-form-item>
        <el-form-item label="是否飞行" prop="inAir">
          <el-input v-model="form.inAir" placeholder="请输入是否飞行" />
        </el-form-item>
        <el-form-item label="经度" prop="lat">
          <el-input v-model="form.lat" placeholder="请输入经度" />
        </el-form-item>
        <el-form-item label="纬度" prop="lng">
          <el-input v-model="form.lng" placeholder="请输入纬度" />
        </el-form-item>
        <el-form-item label="电池容量" prop="battery">
          <el-input v-model="form.battery" placeholder="请输入电池容量" />
        </el-form-item>
        <el-form-item label="飞行模式" prop="flightMode">
          <el-input v-model="form.flightMode" placeholder="请输入飞行模式" />
        </el-form-item>
        <el-form-item label="是否上电" prop="isArmed">
          <el-input v-model="form.isArmed" placeholder="请输入是否上电" />
        </el-form-item>
        <el-form-item label="执行时间" prop="datetime">
          <el-date-picker clearable v-model="form.datetime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="请选择执行时间">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listFlylog, getFlylog, delFlylog, addFlylog, updateFlylog } from "@/api/drone_system/flylog";

export default {
  name: "Flylog",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 飞行日志表格数据
      flylogList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        droneNumber: null,
        inAir: null,
        lat: null,
        lng: null,
        battery: null,
        flightMode: null,
        isArmed: null,
        datetime: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        droneNumber: [
          { required: true, message: "无人机编号不能为空", trigger: "blur" }
        ],
        inAir: [
          { required: true, message: "是否飞行不能为空", trigger: "blur" }
        ],
        lat: [
          { required: true, message: "经度不能为空", trigger: "blur" }
        ],
        lng: [
          { required: true, message: "纬度不能为空", trigger: "blur" }
        ],
        battery: [
          { required: true, message: "电池容量不能为空", trigger: "blur" }
        ],
        flightMode: [
          { required: true, message: "飞行模式不能为空", trigger: "blur" }
        ],
        isArmed: [
          { required: true, message: "是否上电不能为空", trigger: "blur" }
        ],
        datetime: [
          { required: true, message: "执行时间不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询飞行日志列表 */
    getList() {
      this.loading = true;
      listFlylog(this.queryParams).then(response => {
        this.flylogList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        droneNumber: null,
        inAir: null,
        lat: null,
        lng: null,
        battery: null,
        flightMode: null,
        isArmed: null,
        datetime: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加飞行日志";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getFlylog(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改飞行日志";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateFlylog(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addFlylog(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$modal.confirm('是否确认删除飞行日志编号为"' + ids + '"的数据项？').then(function () {
        return delFlylog(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => { });
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('drone_system/flylog/export', {
        ...this.queryParams
      }, `flylog_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
