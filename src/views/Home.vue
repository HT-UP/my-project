<template>
	<div class="home">
		<img alt="Vue logo" src="../assets/imgs/logo.png" />
		<HelloWorld msg="Welcome to Your Vue.js App" />
		<el-button type="primary" @click="loginOut">退出登录</el-button>
	</div>
</template>

<script>
	import { getTelephoneCount, getTelephoneData } from '@/request/api';
	// @ is an alias to /src
	import HelloWorld from "@/components/HelloWorld.vue";

	export default {
		components: {
			HelloWorld,
		},
		data() {
			return {

			}
		},
		methods: {
			loginOut() {
				this.$confirm('确认退出登录吗？', '提示', {}).then(() => {
					localStorage.clear();
					this.$message.success('已退出登录');
					this.$router.push('/login');

					//					let params = {
					//						token: localStorage.getItem('Authorization')
					//					}
					//					this.$postAjax('/subscriber/logout', params, '', res => {
					//						if(res.status == 1) {
					//							localStorage.clear();
					//							this.$message.success('已退出登录');
					//							this.$router.push('/login');
					//						} else {
					//							this.$message.error(res.errorMsg);
					//						}
					//					}, (code, msg) => {
					//						this.$message.error(msg);
					//					})
				}).catch(() => {});
			},

			async getCount() {
				try {
					let res = await getTelephoneCount();
					console.log(res);
				} catch(error) {

				} finally {

				}
			},

			async getTableData() {
				try {
					let params = {
						pageIndex: 1,
						pageSize: 10
					}

					let res = await getTelephoneData(params);
					console.log(res);
				} catch(error) {

				} finally {

				}
			}
		},

		mounted() {
			this.getCount();
			this.getTableData();
		}
	};
</script>