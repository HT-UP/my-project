<template>
	<div id="login">
		<div class="login-box">
			<div class="title">订户管理系统</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Login',
		data() {
			return {

			}
		},
		methods: {

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
			.title{
				font-size: 24px;
				font-weight: bold;
				text-align: center;
				margin: 30px 0;
			}
		}
	}
</style>