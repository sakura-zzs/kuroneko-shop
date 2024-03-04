# zero-filter-bar

## 使用方法
**符合`easycom`组件模式,使用uni_modules导入直接使用即可 **

## 参数说明


|参数			|类型	|默认值		|说明																							|
|---			|---	|---		|---																							|
|dataList		|Array	|[]			|传入数组， 数组元素中必须包含字段:id，name；其次sort为是否需要排序按钮，传入true默认为desc降序	|
|defaultColor	|String	|#333333	|默认字体颜色																					|
|selectColor	|String	|#409EFF	|选中项颜色																						|
|backgroundColor|String	|'#FFFFFF'	|背景颜色																						|
|extraBtn		|Boolean|true		|是否展示右侧按钮																				|
|extraText		|String	|'筛选'		|右侧固定按钮文字																				|
|extraIcon		|String	|'bars'		|右侧固定图标																					|
|width			|Number	|0			|子元素宽度, 值为0时width=auto																	|
|autoJustify	|Boolean|true		|是否启用自动平均分布，当子元素宽度总和小于屏幕宽度时有效										|
|needSticky		|Boolean|true		|是否启用吸顶																					|
|fixedHolder		|Boolean|true		|吸顶时占位盒子																				|
|offsetTop		|Number	|0			|启用吸顶时自定义距离顶部的距离,默认rpx															|

**dataList示例：**
```js
// sort不传默认为false
// sort传入true默认为降序 desc
list:[
{
	id: 0,
	name: '综合',
},
{
	id: 1,
	name: '价格',
	sort: true
},
{
	id: 2,
	name: '年龄',
	sort: true
},
{
	id: 3,
	name: '经验',
	sort: true
},
{
	id: 4,
	name: '不要排序',
	sort: false
},
]
```

**emits**

|参数		|返回值	|
|---		|---	|
|filter		|（index,desc,item）; desc：true为降序，false为升序	|
|extraClick	| true		|

**refs 扩展**

```
用于获取 scrollTop
this.$refs.zeroFilterBar.scrollTop
用于高亮 extra 右侧按钮
this.$refs.zeroFilterBar.setCurrentExtraOn()
```

## 使用示例
```html
<template>
    <view>
  	<zero-filter-bar  ref="zeroFilterBar" :dataList="filterList"  @filter='handleFilterItem' @extraClick='showDrawer()'></zero-filter-bar>
	<!-- 右侧按钮可结合uni-drawer抽屉使用 -->
	<uni-drawer ref="showRight" mode="right" width="320">
		<scroll-view style="height: 100%;" scroll-y="true">
	           <view class="footer">
			   自定义筛选条件
			   </view>
				<view class="footer">
					<button size="mini" class="btn btn_reset" type="primary">重置</button>
					<button size="mini" class="btn" type="primary" @click="handleFilterExtra()">确定</button>
				</view>
			</view>
		</scroll-view>
	</uni-drawer>
    </view>
</template>


<script>
	export default {
		data() {
			return {
				filterList: [
					{
						id: 0,
						name: '综合',
					},
					{
						id: 1,
						name: '价格',
						sort: true
					},
					{
						id: 2,
						name: '年龄',
						sort: true
					},
					{
						id: 3,
						name: '经验',
						sort: true
					},
					{
						id: 4,
						name: '不要排序',
						sort: false
					},
					{
						id: 5,
						name: '最后一项',
						sort: false
					}
				],
				// 如果顶部还有内容，且需要吸顶效果，可以传入needSticky
				needSticky:false
			}
		},
		onLoad() {

		},

		methods: {
			handleFilterItem(index,desc,item){
				console.log(index,desc,item)
			},
			
			handleFilterExtra() {
				// 确认自定义筛选事件后，高亮右侧按钮
				this.$refs.zeroFilterBar.setCurrentExtraOn()
				this.closeDrawer();
			},
			showDrawer() {
				this.$refs.showRight.open();
			},
			closeDrawer() {
				this.$refs.showRight.close();
			},
			onPageScroll(e) {
				let top =this.$refs.zeroFilterBar.scrollTop
				this.needSticky= e.scrollTop > top
			},
		}
	}
</script>

<style lang="scss" scoped>

</style>

```

插件预览:
![code](https://img.jszero.cn/mweb/we_code.jpg)