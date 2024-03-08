# cc-orderTabs

#### 使用方法 
```使用方法	
<!-- colors：设置颜色 tabList：tabs数组 active：当前选择序列 tabsClick：点击事件 -->
<view class="nav_top" style="border-bottom: 1upx solid #F8F8F8;margin-top: 10px;">
	<cc-orderTabs :colors="colors" :tabList="tabList" :active="active" @tabsClick="tabsClick"></cc-orderTabs>
</view>					
```

#### HTML代码实现部分
```html
<template>
	<view class="content">


		<!-- colors：设置颜色 tabList：tabs数组 active：当前选择序列 tabsClick：点击事件 -->
		<view class="nav_top" style="border-bottom: 1upx solid #F8F8F8;margin-top: 10px;">
			<cc-orderTabs :colors="colors" :tabList="tabList" :active="active" @tabsClick="tabsClick"></cc-orderTabs>
		</view>

		<!-- colors：设置颜色 tabList：tabs数组 active：当前选择序列 tabsClick：点击事件 -->
		<view class="nav_top" style="border-bottom: 1upx solid lightgray;margin-top: 160px;">
			<cc-orderTabs colors="orange" :tabList="tabListTwo" :active="activeTwo"
				@tabsClick="tabsClickTwo"></cc-orderTabs>
		</view>


	</view>

</template>

<script>
	export default {
		components: {

		},
		data() {
			return {
				colors: '#fa436a',
				tabList: [{
						name: '待付款',
						id: 0
					}, {
						name: '待发货',
						id: 1
					}, {
						name: '待收货',
						id: 2
					}, {
						name: '待评价',
						id: 3
					},
					{
						name: '已完成',
						id: 4
					}
				],
				active: 0,

				tabListTwo: [{
					name: '食品饮料',
					id: 0
				}, {
					name: '新能源电池',
					id: 1
				}, {
					name: '航空航天',
					id: 2
				}, {
					name: '半导体芯片',
					id: 3
				}],
				activeTwo: 0,
			}
		},


		methods: {

			tabsClick(item, index) {

				this.active = item.id

			},

			tabsClickTwo(item, index) {

				this.activeTwo = item.id

			},

		}
	}
</script>

<style lang="scss" scoped>
	.content {
		display: flex;
		flex-direction: column;

	}
</style>



```