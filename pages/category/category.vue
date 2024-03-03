<template>
	<view class="cate-container">
		 <cc-beautyCate :category-list="categoryData" @itemClick="navToList"></cc-beautyCate>
	</view>
</template>

<script setup>
	import {useCategoryStore} from '../../stores/useCategory'
	import {storeToRefs} from 'pinia'
	import {ref,onMounted} from 'vue'
	const categoryStore=useCategoryStore()
	const {categoryData}=storeToRefs(categoryStore)
	
	onMounted(async()=>{
		//获取一级二级三级分类数据
		await categoryStore.fetchCategoryData()
	})
	const navToList=(item)=>{
		uni.showModal({
			title: '温馨提示',
			content: '点击条目携带信息 = ' + JSON.stringify(item)
			})
	}
</script>

<style lang="scss">
.cate-container{
	width: 100%;
}
</style>
