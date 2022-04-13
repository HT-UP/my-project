<template>
	<div id="login">
		<div class="login-box">
			<div class="title">××管理系统</div>
			<div class="login-form">
				<el-form ref="loginForm" :model="loginForm" label-width="" :rules="loginRules">
					<el-form-item label="" prop="username">
						<el-input v-model.trim="loginForm.username" placeholder="请输入账号" prefix-icon="el-icon-user" clearable @keyup.enter.native="login('loginForm')"></el-input>
					</el-form-item>
					<el-form-item label="" prop="password">
						<el-input v-model.trim="loginForm.password" placeholder="请输入密码" prefix-icon="el-icon-lock" clearable show-password @keyup.enter.native="login('loginForm')"></el-input>
					</el-form-item>

					<el-form-item>
						<el-button class="login-btn" type="primary" :loading="loginLoading" @click="login">登 录</el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script>
	import store from '@/store';
	import { login } from '@/request/api';
	
	export default {
		data() {
			var validateName = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请输入账号'));
				} else {
					callback();
				}
			};

			var validatePass = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请输入密码'));
				} else {
					if(!(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/).test(value)) {
						callback(new Error('密码长度应为8到16位，且由数字和字母组成'));
					} else {
						callback();
					}
				}
			};

			return {
				loginForm: {
					username: '',
					password: ''
				},

				loginRules: {
					username: [{
						validator: validateName,
						trigger: 'blur'
					}],
					password: [{
						validator: validatePass,
						trigger: 'blur'
					}]
				},
				
				loginLoading: false
			}
		},
		methods: {
			//登录
			login() {
				this.$refs['loginForm'].validate(async(valid) => {
					if(valid) {
						this.loginLoading = true;
						try {
							let params = {
								username: this.loginForm.username,
								password: this.loginForm.password
							}
							let res = await login(params);
							
							store.commit('getToken', res.data);
							localStorage.setItem('userName', this.loginForm.username);
							this.$message.success('登录成功');
							this.$router.replace('/home');
						} catch(error) {
							console.log(error);
						} finally {
							this.loginLoading = false;
						}
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
		},
		mounted() {

		}
	}
</script>

<style lang="scss">
	#login {
		width: 100%;
		height: 100%;
		position: relative;
		background-image: url(../assets/imgs/login-bg.png);
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
		.login-box {
			width: 420px;
			height: 360px;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			background: #fff;
			border-radius: 5px;
			.title {
				font-size: 24px;
				font-weight: bold;
				text-align: center;
				margin: 30px 0;
			}
			.login-form {
				width: 320px;
				margin: 0 auto;
			}
			.login-btn{
				width: 100%;
				margin-top: 50px;
			}
		}
	}
</style>