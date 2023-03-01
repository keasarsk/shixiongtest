<template>
    <el-dropdown trigger="click" @command="handleNotice">
        <div>
            <svg-icon class-name="size-icon" icon-class="notice" />
        </div>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="item of noticeList" :key="item.value" :command="item.value">
                <el-tag :type="item.type" size="small">{{ item.name }}</el-tag> {{ item.value }} </el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</template>

<script>
import { listNotice } from "@/api/system/notice";
export default {
    data() {
        return {
            tagType: "info",
            noticeList: [],
            queryParams: {
                pageNum: 1,
                pageSize: 10,
                noticeTitle: undefined,
                createBy: undefined,
                status: undefined
            },
            sizeOptions: [
            ]
        }
    },
    created() {
        this.getList();
    },
    computed: {
        size() {
            return this.$store.getters.size
        }
    },
    methods: {
        /** 查询公告列表 */
        getList() {
            listNotice(this.queryParams).then(response => {
                for (let item of response.rows) {
                    let typeVo = this.getType(item.noticeType)
                    let type = typeVo.split(":")[0]
                    let name = typeVo.split(":")[1]
                    this.noticeList.push({
                        key: item.noticeId,
                        value: item.noticeTitle,
                        type: type,
                        name: name
                    })
                }
            });
        },
        getType(noticeType) {
            // 根据noticeType返回不同的标签
            if (noticeType == 3) {
                return "info:信息"
            } else if (noticeType == 2) {
                return "success:公告"
            } else if (noticeType == 1) {
                return "warning:通知"
            } else if (noticeType == 4) {
                return "danger:紧急"
            }


        },
        handleNotice() {
            this.refreshView()
            this.$message({
                message: '跳转通知页面成功',
                type: 'success'
            })
        },
        refreshView() {
            // In order to make the cached page re-rendered
            this.$store.dispatch('tagsView/delAllCachedViews', this.$route)

            const { fullPath } = this.$route

            this.$nextTick(() => {
                this.$router.push({
                    path: '/system/notice'
                })
            })
        }
    }

}
</script>
<style scoped>
.item {
    margin-top: 10px;
}
</style>
