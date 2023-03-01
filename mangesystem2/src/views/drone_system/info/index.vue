<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="无人机编号" prop="droneNumer">
        <el-input v-model="queryParams.droneNumer" placeholder="请输入无人机编号" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="轴距" prop="droneWheelbase">
        <el-input v-model="queryParams.droneWheelbase" placeholder="请输入轴距" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="最大起飞重量kg" prop="takeoffWeight">
        <el-input v-model="queryParams.takeoffWeight" placeholder="请输入最大起飞重量" clearable
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="最大任务载荷kg" prop="missionWeight">
        <el-input v-model="queryParams.missionWeight" placeholder="请输入最大任务载荷" clearable
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="最大飞行速度m/s" prop="flySpeed">
        <el-input v-model="queryParams.flySpeed" placeholder="请输入最大飞行速度m/s" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="最大飞行高度m" prop="flyHeight">
        <el-input v-model="queryParams.flyHeight" placeholder="请输入最大飞行高度m" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="电池mah" prop="droneBattery">
        <el-input v-model="queryParams.droneBattery" placeholder="请输入电池mah" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="续航时间min" prop="droneEndurance">
        <el-input v-model="queryParams.droneEndurance" placeholder="请输入续航时间min" clearable
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="制造商" prop="droneManuf">
        <el-input v-model="queryParams.droneManuf" placeholder="请输入制造商" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd"
          v-hasPermi="['drone_system:info:add']">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="success" plain icon="el-icon-edit" size="mini" :disabled="single" @click="handleUpdate"
          v-hasPermi="['drone_system:info:edit']">修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple" @click="handleDelete"
          v-hasPermi="['drone_system:info:remove']">删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport"
          v-hasPermi="['drone_system:info:export']">导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="infoList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="编号" align="center" prop="id" show-overflow-tooltip />
      <el-table-column label="无人机编号" align="center" prop="droneNumer" />
      <el-table-column label="无人机类型" align="center" prop="droneType" />
      <el-table-column label="轴距" align="center" prop="droneWheelbase" />
      <el-table-column label="最大起飞重量kg" align="center" prop="takeoffWeight" />
      <el-table-column label="最大任务载荷kg" align="center" prop="missionWeight" />
      <el-table-column label="最大飞行速度m/s" align="center" prop="flySpeed" />
      <el-table-column label="最大飞行高度m" align="center" prop="flyHeight" />
      <el-table-column label="是否损坏" align="center" prop="droneStatus" />
      <el-table-column label="电池mah" align="center" prop="droneBattery" />
      <el-table-column label="续航时间min" align="center" prop="droneEndurance" />
      <el-table-column label="制造商" align="center" prop="droneManuf" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)"
            v-hasPermi="['drone_system:info:edit']">修改</el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)"
            v-hasPermi="['drone_system:info:remove']">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getList" />

    <!-- 添加或修改无人机管理对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="150px">
        <el-form-item label="无人机编号" prop="droneNumer">
          <el-input v-model="form.droneNumer" placeholder="请输入无人机编号" />
        </el-form-item>
        <el-form-item label="无人机类型" prop="droneType">
          <el-input v-model="form.droneType" placeholder="请输入无人机类型" />
        </el-form-item>
        <el-form-item label="轴距" prop="droneWheelbase">
          <el-input v-model="form.droneWheelbase" placeholder="请输入轴距" />
        </el-form-item>
        <el-form-item label="最大起飞重量" prop="takeoffWeight">
          <el-input v-model="form.takeoffWeight" placeholder="请输入最大起飞重量" />
        </el-form-item>
        <el-form-item label="最大任务载荷" prop="missionWeight">
          <el-input v-model="form.missionWeight" placeholder="请输入最大任务载荷" />
        </el-form-item>
        <el-form-item label="最大飞行速度m/s" prop="flySpeed">
          <el-input v-model="form.flySpeed" placeholder="请输入最大飞行速度m/s" />
        </el-form-item>
        <el-form-item label="最大飞行高度m" prop="flyHeight">
          <el-input v-model="form.flyHeight" placeholder="请输入最大飞行高度m" />
        </el-form-item>
        <el-form-item label="是否损坏" prop="droneStatus">
          <el-input v-model="form.droneStatus" placeholder="请输入无人机是否损坏" />
        </el-form-item>
        <el-form-item label="电池mah" prop="droneBattery">
          <el-input v-model="form.droneBattery" placeholder="请输入电池mah" />
        </el-form-item>
        <el-form-item label="续航时间min" prop="droneEndurance">
          <el-input v-model="form.droneEndurance" placeholder="请输入续航时间min" />
        </el-form-item>
        <el-form-item label="制造商" prop="droneManuf">
          <el-input v-model="form.droneManuf" placeholder="请输入制造商" />
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
import { listInfo, getInfo, delInfo, addInfo, updateInfo } from "@/api/drone_system/info";

export default {
  name: "Info",
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
      // 无人机管理表格数据
      infoList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        droneNumer: null,
        droneType: null,
        droneWheelbase: null,
        takeoffWeight: null,
        missionWeight: null,
        flySpeed: null,
        flyHeight: null,
        droneStatus: null,
        droneBattery: null,
        droneEndurance: null,
        droneManuf: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        droneNumer: [
          { required: true, message: "无人机编号不能为空", trigger: "blur" }
        ],
        droneType: [
          { required: true, message: "无人机类型不能为空", trigger: "blur" }
        ],
        droneWheelbase: [
          { required: true, message: "轴距不能为空", trigger: "blur" }
        ],
        takeoffWeight: [
          { required: true, message: "最大起飞重量不能为空", trigger: "blur" }
        ],
        missionWeight: [
          { required: true, message: "最大任务载荷不能为空", trigger: "blur" }
        ],
        flySpeed: [
          { required: true, message: "最大飞行速度m/s不能为空", trigger: "blur" }
        ],
        flyHeight: [
          { required: true, message: "最大飞行高度m不能为空", trigger: "blur" }
        ],
        droneStatus: [
          { required: true, message: "是否损坏不能为空", trigger: "blur" }
        ],
        droneBattery: [
          { required: true, message: "电池mah不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询无人机管理列表 */
    getList() {
      this.loading = true;
      listInfo(this.queryParams).then(response => {
        this.infoList = response.rows;
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
        droneNumer: null,
        droneType: null,
        droneWheelbase: null,
        takeoffWeight: null,
        missionWeight: null,
        flySpeed: null,
        flyHeight: null,
        droneStatus: null,
        droneBattery: null,
        droneEndurance: null,
        droneManuf: null,
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
      this.title = "添加无人机管理";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getInfo(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改无人机管理";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateInfo(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addInfo(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除无人机管理编号为"' + ids + '"的数据项？').then(function () {
        return delInfo(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => { });
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('drone_system/info/export', {
        ...this.queryParams
      }, `info_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
