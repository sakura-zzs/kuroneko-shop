<template>
	<view>
		<uni-nav-bar left-icon="left" title="标题" class="nav-bar" @clickLeft="back" :border="false">
				<uni-search-bar class="search-bar" @confirm="search" :focus="true" v-model="searchValue" 
								 cancelButton="none" @clear="clear" radius="50" bgColor="#e7e7e7b3">
			    </uni-search-bar>
		</uni-nav-bar>
		    <zero-filter-bar style="overflow: hidden;" ref="zeroFilterBar" :dataList="filterList" :needSticky='false'  @filter='handleFilterItem' @extraClick='showDrawer()'></zero-filter-bar>
		    <!-- 右侧按钮可结合uni-drawer抽屉使用 -->
		    <uni-drawer ref="showRight" mode="right" width="320">
				<view class="brand-list">
					<view class="brand brand-header"><text>品牌</text></view>
					<view :class="['brand','brand-item',{'active':brandActive===index}]" v-for="(item,index) in brandList" :key="item.id" @click="selectBrand(index,item.id)">
						<text>{{item.name}}</text>
					</view>
				</view>
		    </uni-drawer>
		<!--  proList: 条目数组数据  goProDetail:条目点击事件跳转（实现了点击条目数据传值）-->
		<cc-waterListView :proList="goodsList" @click="goProDetail"></cc-waterListView>
		<blues-empty v-if="!goodsList.length" img="empty"  text="无搜索记录" imgSize="200" />
	</view>
</template>

<script setup>
import {ref,onMounted} from 'vue'
import {useGoodsStore} from '../../stores/useGoods'
import {storeToRefs} from 'pinia'
import {onLoad} from '@dcloudio/uni-app'
const goodsStore=useGoodsStore()
const {goodsList,brandList}=storeToRefs(goodsStore)
const searchValue=ref('')
const filterList=ref([{id:0,name:'销量'},{id:1,name:'价格',sort:true}])
//抽屉
const showRight=ref(null)
//品牌索引
const brandActive=ref(-1)
const clear=()=>{
	searchValue.value=''
}
const back=()=>{
	uni.navigateBack({delta:1})
}
onLoad(async(option)=>{
	const {category1Id,category3Id,order}=option
	if(category1Id)
	await goodsStore.fetchGoodsList(1,10,{category1Id})
	else if(category3Id) await goodsStore.fetchGoodsList(1,10,{category3Id})
	else if(order) await goodsStore.fetchGoodsList(1,10,{order})
	else
	await goodsStore.fetchGoodsList()
})
const search=async()=>{
	const keyword=searchValue.value.trim()
	if(keyword) await goodsStore.fetchGoodsList(1,10,{keyword})
}
const handleFilterItem=async(index,desc,item)=>{
	//desc:true为降序，false为升序
	console.log(index,desc,item)
	//按销量排序
	if(index===0)
	await goodsStore.fetchGoodsList(1,10,{order:1})
	//价格升序
	else if(index===1&&desc)
	await goodsStore.fetchGoodsList(1,10,{order:2})
	else if(index===1&&!desc)
	//价格降序
	await goodsStore.fetchGoodsList(1,10,{order:3})
}
//点击右侧图标显示品牌筛选抽屉
const showDrawer=async()=>{
	showRight.value.open()
	await goodsStore.fetchBrandList()
}
//点击品牌筛选
const selectBrand=async(index,brandId)=>{
	brandActive.value=index
	await goodsStore.fetchGoodsList(1,10,{brandId})
}
</script>

<style lang="scss">
	.nav-bar{
		display: flex;
	}
	.search-bar{
		display: flex;
		align-items: center;
		width:500rpx;
	}
	.brand-list{
		.brand{
			display: flex;
			align-items: center;
			box-sizing: border-box;
			border-bottom: 1rpx solid #ccc;
			font-size: 36rpx;
			text{
				margin-left: 36rpx;
			}
		}
		.brand-header{
			height: 80rpx;
			background-color: rgb(248, 248, 248);
			font-weight: 500;
		}
		.brand-item{
			height: 100rpx;
			color: #7d7d7d;
		}
	}
	.active{
		color: #000!important;
	}
</style>
