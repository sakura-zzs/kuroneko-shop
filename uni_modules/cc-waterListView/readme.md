# cc-waterListView


#### 使用方法 
```使用方法
<!--  proList: 条目数组数据  goProDetail:条目点击事件跳转（实现了点击条目数据传值）-->
<cc-waterListView :proList="projectList" @click="goProDetail"></cc-waterListView>
				
```

#### HTML代码实现部分
```html

<template>
	<view class="content">


		<!--  proList: 条目数组数据  goProDetail:条目点击事件跳转（实现了点击条目数据传值）-->
		<cc-waterListView :proList="projectList" @click="goProDetail"></cc-waterListView>


	</view>
</template>


<script>
	export default {

		data() {
			return {


				// 列表数组
				projectList: []
			}
		},
		mounted() {

			this.requestData();
		},
		methods: {
			// 列表条目点击事件
			goProDetail(item) {

				console.log("条目数据 = " + JSON.stringify(item));
				uni.showModal({
					title: '选择条目',
					content: '选择条目数据 = ' + JSON.stringify(item)
				})
			},


			requestData() {

				// 模拟请求参数设置
				let reqData = {

					'area': '',
					"pageSize": 10,
					"pageNo": this.curPageNum
				}
				// 模拟请求接口
				this.totalNum = 39;
				this.projectList = [];
				let imgArr = [
					'https://images.pexels.com/photos/7214784/pexels-photo-7214784.jpeg?auto=compress&cs=tinysrgb&w=800',
					'https://cdn.pixabay.com/photo/2014/07/08/14/14/resolution-387446_1280.jpg',
					'https://images.pexels.com/photos/5202162/pexels-photo-5202162.jpeg?auto=compress&cs=tinysrgb&w=800',
					'https://images.pexels.com/photos/4967533/pexels-photo-4967533.jpeg?auto=compress&cs=tinysrgb&w=800',
					'https://images.pexels.com/photos/8679339/pexels-photo-8679339.jpeg?auto=compress&cs=tinysrgb&w=800',
					'https://images.pexels.com/photos/209339/pexels-photo-209339.jpeg?auto=compress&cs=tinysrgb&w=800'
				]

				let nameArr = ['冰糖心苹果 红富士大果出售 应季水果 繁荣种植园', '农鲜洛川红富士苹果16枚，单果160g,新鲜饱满水分充足', '甜醉了 烟台苹果栖霞红富士新鲜水...',
					'惠寻 山东烟台红富士苹果12枚 果径...'
				]
				for (let i = 0; i < 20; i++) {

					this.projectList.push({
						'proImg': imgArr[i % 6],
						'proName': nameArr[i % 4],
						'proDetail': '我是产品详情' + i,
						'proPrice': 60 + 6 * i + '元',
						'status': (i % 3 == 0) ? '618' : '',
						'id': i + ''
					});
				}
			}
		}
	}
</script>


<style>
	page {

		background-color: #f7f7f7;
	}

	.content {
		display: flex;
		flex-direction: column;

	}

	.mui-content-padded {
		margin: 0px 14px;
		/* background-color: #ffffff; */
	}
</style>


```
