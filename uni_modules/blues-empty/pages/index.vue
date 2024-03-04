<template>
	<view class="h100">
		<blues-empty v-for="item in  list"   :img="item.img"  :text="item.name"  />
	</view>
</template>
<script>
	export default {
		data() {
			return {
				list:[
					{
						name:'暂无收藏信息',
						img:'empty'
					},{
						name:'暂无网络信息',
						img:'network'
					},{
						name:'购物车为空',
						img:'vehicle'
					} ,{
						name:'加载失败',
						img:'load'
					} ,{
						name:'无权限',
						img:'qx'
					} ,{
						name:'正在加载中 ',
						img:'loading'
					} ,{
						name:'暂无信息 ',
						img:'msg'
					} ,{
						name:'信息已发送',
						img:'msgs'
					} ,{
						name:'收藏夹为空',
						img:'favorite'
					} ,{
						name:'正在开发中',
						img:'kaifa'
					},{
						name:'暂无历史记录',
						img:'record'
					},{
						name:'暂无日程安排',
						img:'date'
					}
				]
			}
		},
	}
</script>

<style lang="scss">
	.h100{
		height:100vh;
	}
</style>
