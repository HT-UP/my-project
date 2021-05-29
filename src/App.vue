<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<style lang="scss">
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
	}
	/*滚动条的宽度*/
	.el-table__body-wrapper::-webkit-scrollbar {
		width: 8px;
		height: 8px;
	}
	/*滚动条的滑块*/
	.el-table__body-wrapper::-webkit-scrollbar-thumb {
		background-color: #999;
		border-radius: 3px;
	}
</style>