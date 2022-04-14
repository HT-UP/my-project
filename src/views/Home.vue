<template>
	<div id="home">
		<base-search @search="searchList" @loginOut="loginOut"></base-search>
		
		<div class="table-box">
			<base-table ref="baseTable" :data="tableData" :total="total" :page.sync="searchForm.pageIndex" :size.sync="searchForm.pageSize" @change="getList" v-loading="tableLoading">
				<el-table-column align="center" label="序号" type="index" width="50"></el-table-column>
				<el-table-column align="center" label="公司名称" prop="companyName" show-overflow-tooltip></el-table-column>
				<el-table-column align="center" label="统一社会信用代码" prop="identityId" show-overflow-tooltip></el-table-column>
				<el-table-column align="center" label="添加时间" prop="createTime" show-overflow-tooltip :formatter="timeFormat"></el-table-column>
			</base-table>
		</div>
	</div>
</template>

<script>
	import { getTelList } from '@/request/api';
	// @ is an alias to /src
	import BaseSearch from "@/components/BaseSearch.vue";
	import BaseTable from "@/components/BaseTable.vue";

	export default {
		components: {
			BaseSearch,
			BaseTable
		},
		data() {
			return {
				searchForm: {
					companyName: "",
					pageIndex: 1,
					pageSize: 10
				},
				tableLoading: false,
				tableData: [],
				total: 0
			}
		},
		methods: {
			searchList(data) {
				this.searchForm.pageIndex = 1
				this.searchForm = {
					...this.searchForm,
					...data
				}
				this.getList();
			},
			
			async getList() {
				try {
					this.tableLoading = true;
					let params = {
						companyName: this.searchForm.companyName,
						pageIndex: this.searchForm.pageIndex,
						pageSize: this.searchForm.pageSize
					}

					let res = await getTelList(params);
					this.tableData = res.data.records;
					this.total = res.data.total;
				} catch(error) {

				} finally {
					this.tableLoading = false;
				}
			},
			
			loginOut() {
				this.$confirm('确认退出登录吗？', '提示', {}).then(() => {
					localStorage.clear();
					this.$message.success('已退出登录');
					this.$router.push('/login');
				}).catch(() => {});
			},
			
			//时间格式化
			timeFormat(row, column, cellValue, index) {
				if(cellValue == 0) {
					return '--';
				} else {
					let date = new Date(cellValue),
						y, m, d, h, f, s, str;
					y = date.getFullYear();
					m = date.getMonth() + 1;
					d = date.getDate();
					h = date.getHours();
					f = date.getMinutes();
					s = date.getSeconds();
					str = y + '-' + (m >= 10 ? m : '0' + m) + '-' + (d >= 10 ? d : '0' + d) + ' ' + (h >= 10 ? h : '0' + h) + ':' + (f >= 10 ? f : '0' + f) + ':' + (s >= 10 ? s : '0' + s);
					return str;
				}
			},
		},

		mounted() {
			this.getList();
		}
	};
</script>
<style scoped lang="scss">
	#home{
		padding: 20px;
	}
</style>