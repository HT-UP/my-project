<template>
	<div id="base-table">
		<el-table :data="data" border :height="height" :header-row-style="headerRowStyle" :header-cell-style="headerRowStyle">
			<slot></slot>
		</el-table>
		<div class="page-con" v-if="showPage">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10, 20, 30, 40, 50]" :page-size="size" background layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			data: {
				type: Array,
				default: () => [],
			},
			height: {
				type: String,
				default: null,
			},
			total: {
				type: Number,
				default: 0,
			},
			showPage: {
				type: Boolean,
				default: true,
			},
			page: {
				type: Number,
				default: 1,
			},
			size: {
				type: Number,
				default: 10,
			}
		},
		data() {
			return {
				headerRowStyle: {
					background: '#f5f7fa'
				},
			}
		},
		methods: {
			handleSizeChange(val) {
				this.$emit("update:size", val);
				this.$emit('change');
			},
			handleCurrentChange(val) {
				this.$emit("update:page", val);
				this.$emit('change');
			}
		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	#base-table {
		.page-con{
			text-align: right;
			margin-top: 20px;
		}
	}
</style>