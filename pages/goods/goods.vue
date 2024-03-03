<template>
	<view>
		<uni-nav-bar left-icon="left" title="标题" class="nav-bar" @clickLeft="back" :border="false">
				<uni-search-bar class="search-bar" @confirm="search" :focus="true" v-model="searchValue" 
								 cancelButton="none" @clear="clear" radius="50" bgColor="#e7e7e7b3">
			    </uni-search-bar>
		</uni-nav-bar>
		<!--  proList: 条目数组数据  goProDetail:条目点击事件跳转（实现了点击条目数据传值）-->
		<cc-waterListView :proList="goodsList" @click="goProDetail"></cc-waterListView>
	</view>
</template>

<script setup>
import {ref,onMounted} from 'vue'
import {useGoodsStore} from '../../stores/useGoods'
import {storeToRefs} from 'pinia'
const goodsStore=useGoodsStore()
const {goodsList}=storeToRefs(goodsStore)
const searchValue=ref('')

const clear=()=>{
	searchValue.value=''
}
const back=()=>{
	uni.navigateBack({delta:1})
}
onMounted(async()=>{
	await goodsStore.fetchGoodsList()
})
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
</style>
