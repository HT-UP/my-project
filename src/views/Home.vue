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
		name: "Home",
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
			
			getCount(){
				getTelephoneCount({}).then(res => {
					if(res.status == 1) {
						
					} else {
						this.$message.error(res.errorMsg);
					}
    			}).catch(err => {
    				console.log(err);
				});
			},
			
			getTableData(){
				let params = {
					pageIndex: 0,
					pageSize: 10
				}
				getTelephoneData(params).then(res => {
					if(res.status == 1) {
						
					} else {
						this.$message.error(res.errorMsg);
					}
    			}).catch(err => {
    				console.log(err);
				});
			}
		},
		
		mounted() {
			this.getCount();
			this.getTableData();
		}
	};
</script>