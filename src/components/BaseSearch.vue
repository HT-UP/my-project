<template>
	<div id="base-search">
		<el-form :inline="true" size="small" :model="searchForm" @submit.native.prevent>
			<el-form-item label="公司名称">
				<el-input v-model="searchForm.companyName" placeholder="请输入公司名称" clearable></el-input>
			</el-form-item>

			<el-form-item>
				<el-button type="primary" @click="handleSearch">查询</el-button>
				<el-button @click="handleReset">重置</el-button>
			</el-form-item>

			<el-form-item class="form-right">
				<el-button type="danger" size="small" @click="loginOut">退出登录</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				searchForm: {
					companyName: ""
				}

			};
		},
		methods: {
			handleSearch() {
				this.$emit("search", this.searchForm);
			},
			handleReset() {
				this.searchForm = {
					companyName: ""
				}
				this.$emit("search", this.searchForm);
			},
			loginOut() {
				this.$emit("loginOut");
			}
		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	#base-search {
		.form-right{
			float: right;
			margin-right: 0;
		}
	}
</style>