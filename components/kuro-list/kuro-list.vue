<template>
		<view class="waterfall-list">
				<view class="card" v-for="item in hotGoodsList" :key="item">
					<!-- :style="{height:imageHeight + 'px'}" -->
					<image class="cover_img" :src="item.thumbImg"/>
					<view class="title">
						<text>{{item.skuName}}</text>
					</view>
					<view class="price">
						<text>￥</text>
						<text>{{item.salePrice}}</text>
					</view>
			</view>
		</view>
</template>
<script>
	export default {
		name:"kuro-list",
		data() {
			return {
				imageHeight: 300
			}
		},
		props:{
			hotGoodsList:{
				type:Array,
				default:()=>[]
			}
		},
		methods: {
			setImageHeight: function() {//图片高度
				var _this = this;
				const query = uni.createSelectorQuery().in(this);
				query.select('.cover_img').boundingClientRect(data => {
					_this.imageHeight = data.width * 9 / 16;
				}).exec();
			}


		}
	}
</script>
<style>
	.waterfall-list {
		display: flex;
		flex-wrap: wrap;
		padding: 0 28rpx;
		background: #fff;
	}

	.waterfall-list .card {
		display: flex;
		flex-direction: column;
		width: 48%;
		padding-bottom: 38rpx;
		border-radius: 10rpx;
	}
	.waterfall-list .card:nth-child(2n+1){
		margin-right: 4%;
	}
	.waterfall-list .card>image {
		width: 350rpx;
		/* height:auto; */
		min-height: 350rpx;
		max-height: 400rpx;

		border-radius: 10rpx;
	}

	.waterfall-list .card>.title {
		width: 350rpx;
		font-size: 32rpx;
		margin-top: 5rpx;
	}

	.waterfall-list .card>.title>text {
		color: #303133;
		font-size: 28rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		display: block;
	}

	.waterfall-list .card>.price {
		width: 350rpx;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 30rpx;
	}

	.waterfall-list .card>.price>text:nth-child(1) {
		width: 350rpx;
		height: 80rpx;
		font-size: 28rpx;
		color: red;
	}

	.waterfall-list .card>.price>text:nth-child(2) {
		width: 350rpx;
		height: 80rpx;
		font-size: 36rpx;
		color: red;
		font-weight: 600;
		margin-right: 10rpx;
	}
</style>