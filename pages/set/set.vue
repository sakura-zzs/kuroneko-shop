<template>
	<view class="set-container">
		<set-list :list="list"></set-list>
	</view>
</template>

<script>
	export default {
data() {
	return {
	    list: [{
	            name: "个人资料",
	            url:""
	        },
	        {
	            name: "收货地址",
	            url:""
	        },
	        {
	            name: "实名认证",
	            url:""
	        },
	        {
	            name: "消息推送",
	            url:""
	        },
	        {
	            name: "清除缓存",
	            url:""
	        },
	        {
	            name: "关于APP",
	            url:""
	        },
	        {
	            name: "检查更新",
	            url:""
	        },
	    ]
	}
},
	}
</script>

<style lang="scss">
.set-container{
	background-color: #f8f8f8;
	height: 100vh;
}
</style>
