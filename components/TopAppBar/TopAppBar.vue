<script>
	export default {
		name: "TopAppBar",
		data() {
			return {
				statusBarHeight: 40
			}
		},
		mounted() {
			this.statusBarHeight = uni.getWindowInfo().statusBarHeight
		}
	}
</script>

<template>
	<view class="elevated groundGlass box">
		<view class="statusBar" />
		<view class="topAppBar">
			<slot></slot>
		</view>
	</view>
	<view class="block" />
</template>

<style>
	.box {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		height: v-bind(statusBarHeight + 50 + "px");
		z-index: 10;
	}
	
	.statusBar {
		height: v-bind(statusBarHeight + "px");
	}
	
	.topAppBar {
		height: 50px;
		display: flex;
		align-items: center;
		padding: 0 30rpx;
	}
	
	.block {
		height: v-bind(statusBarHeight + 50 + "px");
	}
</style>