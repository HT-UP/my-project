<template>
	<div class="home">
		<img alt="Vue logo" src="../assets/imgs/logo.png" />
		<HelloWorld msg="Welcome to Your Vue.js App" />
		<el-button type="primary" @click="loginOut">退出登录</el-button>
	</div>
</template>

<script>
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
			}
		},
	};
</script>