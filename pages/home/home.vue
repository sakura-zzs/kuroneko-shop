<template>
	<view class="main-container">
		<uni-nav-bar left-icon="scan" right-icon="chat" title="标题">
			<view class="input-view">
				<uni-icons class="input-uni-icon" type="search" size="18" color="#999" />
				<input confirm-type="search" class="nav-bar-input" type="text" placeholder="输入搜索关键词"
					@focus="search" />
			</view>
		</uni-nav-bar>
		<view class="uni-margin-wrap">
			<swiper class="swiper" circular :indicator-dots="indicatorDots" :interval="interval" :duration="duration">
				<swiper-item v-for="item in swiperBanner" :key="item">
					<image class="swiper-item-image" :src="item" />
				</swiper-item>
			</swiper>
		</view>
		<kuro-swiper :swiperList="swiperList" @clickItem="clickItem"/>
		<view class="ad-1">
			<image src="https://lilishop-oss.oss-cn-beijing.aliyuncs.com/1313246c16f6471e8e751355a675fbfb.gif"></image>
		</view>
		<view class="hot-goods" @click="gotoHotList">
			<image src="../../static/temp/h1.png"/>
			<view class="title-box">
				<text class="title">畅销商品</text>
				<text class="title1">Popular Goods</text>
			</view>
			<uni-icons type="right"></uni-icons>
		</view>
		<kuro-list :hotGoodsList="hotGoodsList" @itemClick="gotoGoodsDetail"/>
	</view>
</template>

<script setup>
	import {useHomeStore} from '../../stores/useHome'
	import {storeToRefs} from 'pinia'
	import {ref,onMounted}from 'vue'
	const homeStore=useHomeStore()
	const {homeData}=storeToRefs(homeStore)
	const indicatorDots=ref(true)
	const interval=ref(2000)
	const duration=ref(500)
	const swiperBanner=ref(['http://39.98.123.211/tingshu/banner2.jpg', 'http://39.98.123.211/tingshu/banner2.jpg'])
	const swiperList=ref([])
	const hotGoodsList=ref([])
    const clickItem=(item)=>{
		uni.navigateTo({
			url:`/pages/goods/goods?category1Id=${item.id}`
		})
	}
	onMounted(async()=>{
		await homeStore.fetchHomeData()
		const {categoryList,productSkuList}=homeData.value
		swiperList.value=[...categoryList]
		hotGoodsList.value=[...productSkuList]
	})
	//关键词搜索
	const search=()=>{
		uni.navigateTo({
			url:'/pages/goods/goods'
		})
	}
	const gotoHotList=()=>{
		//按销量
		uni.navigateTo({
			url:`/pages/goods/goods?order=1`
		})
	}
	const gotoGoodsDetail=(item)=>{
		uni.navigateTo({
			url:`/pages/goodsDetail/goodsDetail?id=${item.id}`
		})
	}
</script>

<style lang="scss">
	$nav-height: 30px;

	.main-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.input-view {
		/* #ifndef APP-PLUS-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		// width: 500rpx;
		flex: 1;
		background-color: #f8f8f8;
		height: $nav-height;
		border-radius: 15px;
		padding: 0 15px;
		flex-wrap: nowrap;
		margin: 7px 0;
		line-height: $nav-height;
	}

	.input-uni-icon {
		line-height: $nav-height;
	}

	.nav-bar-input {
		height: $nav-height;
		line-height: $nav-height;
		/* #ifdef APP-PLUS-NVUE */
		width: 370rpx;
		/* #endif */
		padding: 0 5px;
		font-size: 12px;
		background-color: #f8f8f8;
	}

	.uni-margin-wrap {
		width: 100%;
	}

	.swiper {
		height: 300rpx;
		padding: 20rpx;
	}

	.swiper-item {
		display: block;
		height: 300rpx;
		line-height: 300rpx;
		text-align: center;
		:global(.swiper-item-image) {
			width: 100%!important;
			height: 100%!important;
			border-radius: 10rpx!important;
		}
	}

	.ad-1{
		width: 100%;
		height: 210rpx;
		padding: 10rpx 0;
		image{
			width: 100%!important;
			height: 100%!important;
			border-radius:0!important;
		}
	}
	.hot-goods{
		display: flex;
		align-items: center;
		height: 140rpx;
		padding: 6rpx 30rpx 8rpx;
		image{
			width: 80rpx;
			height: 80rpx;
			margin-right: 20rpx;
		}
		.title-box{
			flex: 1;
			display: flex;
			flex-direction: column;
			.title{
				font-size: 34rpx;
			}
			.title1{
				font-size: 24rpx;
				color: #909399;
			}
		}
	}
</style>