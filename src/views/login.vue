<template>
	<div class="home">
		<HelloWorld msg="Welcome to Your Vue.js App" />
	</div>
</template>

<script>
	import store from '@/store';
	import md5 from 'js-md5';
	// @ is an alias to /src
	import HelloWorld from '@/components/HelloWorld.vue'

	export default {
		name: 'Home',
		components: {
			HelloWorld
		},
		data() {
			return {

			}
		},
		methods: {
			
		},
		mounted() {
			
		},
	}
</script>