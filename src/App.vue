<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<style lang="scss">
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
	}
	
	html,
	body {
		width: 100%;
		height: 100%;
	}
	
	#app {
		height: 100%;
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
</style>