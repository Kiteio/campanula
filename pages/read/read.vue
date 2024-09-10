<script setup>
	import { ref } from 'vue'
	import { onLoad } from '@dcloudio/uni-app'
	import { read, decodeUrlParams, supportHighlight, code } from '../../static/file'

	let file = ref(null)
	let content = ref(null)
	let script = ref(null)
	
	let markdown = ref(false)
	let highlight = ref(false)

	onLoad((option) => {
		file.value = decodeUrlParams(option)
		if (file.value.type == "file") {
			content.value = read(file.value)
			script.value = code(content.value, file.value.ext)
			
			if (file.value.ext == "md") {
				changeMarkdown()
			} else if (supportHighlight(file.value)) {
				changeHighlight()
			}
		}
	})
	
	function changeMarkdown() {
		markdown.value = !markdown.value
		highlight.value = false
		uni.showToast({
			title: "Markdown 解析已" + (markdown.value ? "开启" : "关闭"),
			icon: "none"
		})
	}
	
	
	function changeHighlight() {
		highlight.value = !highlight.value
		markdown.value = false
		uni.showToast({
			title: "高亮已" + (highlight.value ? "开启" : "关闭"),
			icon: "none"
		})
	}
	
	
	function previewImage () {
		uni.previewImage({
			urls: [file.value.path]
		})
	}
</script>

<template>
	<scroll-view :show-scrollbar="false" scroll-y style="width: 102vw; height: 100vh;">
		<TopAppBar>
			<view v-if="file && file.ext=='md'" @click="changeMarkdown" :class="`elevated outlined center ${markdown ? 'radioOn' : 'radio'}`" style="margin-right: 30rpx;">M</view>
			<view v-if="file && file.type=='file'" @click="changeHighlight" :class="`elevated outlined center ${highlight ? 'radioOn' : 'radio'}`">H</view>
		</TopAppBar>
		
		<view v-if="file" class="content">
			<view class="primary fileName">{{file.name}}</view>
			<mp-html v-if="file.type=='file' && markdown" :content="highlight ? script : content" container-style="word-wrap: break-word; line-height: 30px;" use-anchor selectable markdown />
			<mp-html v-else-if="file.type=='file' && !markdown" :content="highlight ? script : content" container-style="white-space: pre-wrap; word-wrap: break-word;; line-height: 30px;" use-anchor selectable />
			<image v-else-if="file.type=='image'" @click="previewImage" :src="file.path" mode="widthFix" class="outlined image" />
			<video v-else-if="file.type=='video'" :src="file.path" />
		</view>
	</scroll-view>
</template>

<style>
	Page {
		width: 100vw;
		padding-right: 2vw;
	}
	
	.content {
		padding: 40rpx;
		padding-right: calc(40rpx + 2vw);
	}

	.fileName {
		font-size: 40rpx;
		font-weight: bold;
		padding-bottom: 40rpx;
		word-wrap: break-word;
		word-break: break-all;
		white-space: pre-line;
	}

	.image {
		width: 100%;
	}
</style>