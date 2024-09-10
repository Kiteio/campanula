<script setup>
	import {chooseFile, encodeUrlParams} from '../../static/file'

	async function openFile() {
		const file = await chooseFile()
		if (["doc", "docx", "xsl", "xslx", "ppt", "pptx", "pdf"].includes(file.ext)) {
			uni.openDocument({
				filePath: file.path
			})
		} else {
			uni.navigateTo({
				url: `/pages/read/read?${encodeUrlParams(file)}`
			})
		}
		
	}
</script>

<template>
	<view class="fillScreen center">
		<view class="brand">
			<view class="primary appName">风铃</view>
			<view class="primary version">v 1.0.0</view>
			<view class="poem">羁鸟恋旧林 池鱼思故渊</view>
		</view>

		<view @click="openFile" class="elevated outlined button">从消息中打开文件</view>
	</view>
</template>

<style>
	.brand {
		margin-bottom: 35%;
	}

	.appName {
		font-size: 70rpx;
		font-weight: bold;
		text-align: end;
	}

	.version {
		font-size: 24rpx;
		font-weight: bold;
		text-align: end;
	}

	.poem {
		font-weight: 600;
		margin-top: 10rpx;
		text-align: end;
	}
</style>