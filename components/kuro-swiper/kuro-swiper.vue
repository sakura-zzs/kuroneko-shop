<template>
	<view class="" style="position: relative;">
		<swiper
			class="cate-swiper"
			:indicator-dots="swiperDots"
			:autoplay="autoplay"
			:indicator-color="swiperColor"
			:circular="circular"
			:interval="interval"
			:duration="duration"
			:indicator-active-color="swiperActiveColor"
			@change="swiperChange"
		>
			<swiper-item style="width: 100%;height: 360rpx;">
				<view class="cate-swiper-item">
					<view class="swiper-item-view" v-for="(item, index) in swiperList" :key="index" v-show="index<10"  @click="clickItem(item)">
						<image class="swiper-img" :src="item.imageUrl"/>
						<text>{{ item.name }}</text>
					</view>
				</view>
			</swiper-item>
			<block v-if="swiperList.length > 10">
				<swiper-item style="width: 100%;height: 360rpx;">
					<view class="cate-swiper-item">
						<view class="swiper-item-view" v-for="(item, index) in swiperList" :key="index" v-show="index > 9 && index < 20" @click="clickItem(item)">
							<image class="swiper-img" :src="item.imageUrl"/>
							<text>{{ item.text }}</text>
						</view>
					</view>
				</swiper-item>
			</block>
		</swiper>
		<view class="dots" v-if="customize == true && swiperDots == false">
			<block v-for="(item, index) in swiperList" :key="index" v-if="index < 2 && swiperList.length > 10">
				<view
					class="dot"
					:class="[index == swiperCurrent ? 'active' : '']"
					:style="[index == swiperCurrent ? { background: swiperActiveColor } : { background: swiperColor }]"
				></view>
			</block>
		</view>
	</view>
</template>

<script setup>
import {ref,defineProps} from 'vue'
const props=defineProps({
	// 面板指示点
	swiperDots: {
		type: Boolean,
		default: false
	},
	// 指示点颜色
	swiperColor: {
		type: String,
		default: '#999999'
	},
	// 选中指示点颜色
	swiperActiveColor: {
		type: String,
		default: '#FFCC00'
	},
	// 是否自动切换
	autoplay: {
		type: Boolean,
		default: false
	},
	// 自动切换时长
	interval: {
		type: Number,
		default: 5000
	},
	// 滑动动画时长
	duration:{
		type: Number,
		default: 500
	},
	// 是否采用衔接滑动
	circular: {
		type: Boolean,
		default: false
	},
	// 滑动块视图容器
	swiperList: {
		type: Array,
		default: ()=>[]
	},
	// 是否开启自定义指示点
	customize: {
		type: Boolean,
		default: true
	}
	
})
const swiperCurrent=ref(0)
const swiperChange=(e)=>{
	swiperCurrent.value=e.detail.current
}
const emits=defineEmits(['clickItem'])
const clickItem=(item)=>{
	emits('clickItem',item)
}
</script>

<style>
.cate-swiper {
	width: 100%;
	height: 370rpx;
	padding-top: 20rpx;
}
.cate-swiper-item {
	display: flex;
	flex-wrap: wrap;
}
.swiper-item-view {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 20%;
	height: 170rpx;
	font-size: 26rpx;
}
.swiper-img {
	width: 88rpx!important;
	height: 88rpx!important;
	margin-bottom: 14rpx;
	border-radius: 50%!important;
	opacity: .7;
	box-shadow: 4rpx 4rpx 20rpx rgba(250,67,106,.3);
}
/* 轮播圆点样式修改 */
.dots {
	position: absolute;
	left: 0;
	right: 0;
	bottom: 20rpx;
	display: flex;
	justify-content: center;
}
.dots .dot {
	margin: 0 5rpx;
	width: 40rpx;
	height: 6rpx;
	border-radius: 20%;
	transition: all 0.6s;
}
.dots .dot.active {
	width: 40rpx;
}
</style>
