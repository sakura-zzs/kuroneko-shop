<template>
	<view class="pay-container">
		<view class="price-box">
			<text class="price-tit">支付金额</text>
			<text class="price">{{count}}</text>
		</view>
		<view class="pay-type">
			<view class="pay-item b-b">
				<view class="pay-icon">
					<image src="../../static/wx-pay.png" />
				</view>
				<view class="pay-desc">
					<text class="pay-tit">微信支付</text>
					<text class="pay-ex">推荐使用微信支付</text>
				</view>
				<radio @click="choosePayType(0)" color="#fa436a" :checked="isWxPay" />
			</view>
			<view class="pay-item b-b">
				<view class="pay-icon">
					<image src="../../static/ali-pay.png" />
				</view>
				<view class="pay-desc">
					<text class="pay-tit">支付宝支付</text>
				</view>
				<radio @click="choosePayType(1)" color="#fa436a" :checked="isAliPay" />
			</view>
			<view class="pay-item">
				<view class="pay-icon">
					<image src="../../static/wallet-pay.png" />
				</view>
				<view class="pay-desc">
					<text class="pay-tit">预存款支付</text>
					<text class="pay-ex">可用余额￥181.9</text>
				</view>
				<radio @click="choosePayType(2)" color="#fa436a" :checked="isWalletPay" />
			</view>
		</view>
		<view class="pay-btn">确认支付</view>
	</view>
</template>

<script setup>
	import {onLoad} from '@dcloudio/uni-app'
	import {ref} from 'vue'
	const isWxPay=ref(false)
	const isAliPay=ref(true)
	const isWalletPay=ref(false)
	const count=ref(null)
	onLoad((option)=>{
		count.value=option.count
	})
	const choosePayType=(type)=>{
		switch(type){
			case 0://微信支付
			isWxPay.value=true
			isAliPay.value=false
			isWalletPay.value=false
			break
			case 1://支付宝支付
			isAliPay.value=true
			isWxPay.value=false
			isWalletPay.value=false
			break
			case 2://钱包支付
			isWalletPay.value=true
			isWxPay.value=false
			isAliPay.value=false
			break
		}
	}
</script>

<style lang="scss">
	.pay-container{
	}
	.price-box{
		background-color: #fff;
		height: 264rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 28rpx;
		color: #909399;
		.price{
			font-size: 50rpx;
			color: #303133;
			margin-top: 12rpx;
			&::before{
				content: "￥";
				font-size: 40rpx;
			}
		}
	}
	.pay-type{
		margin-top: 20rpx;
		background-color: #fff;
		padding-left: 60rpx;
		.pay-item{
			box-sizing: border-box;
			height: 120rpx;
			padding: 20rpx 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-right: 60rpx;
			font-size: 30rpx;
			.pay-icon{
				width: 100rpx;
				image{
					width: 52rpx;
					height: 52rpx;
				}
			}
			.pay-desc{
				flex: 1;
				display: flex;
				flex-direction: column;
				font-size: 24rpx;
				color: #909399;
				.pay-tit{
					font-size: 32rpx;
					color: #303133;
					margin-bottom: 4rpx;
				}
				
			}
			
		}
	}
	.b-b{
		border-bottom: 2rpx solid rgba(228, 231, 237, .5);
	}
	.pay-btn{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 630rpx;
		height: 80rpx;
		margin: 80rpx auto 30rpx;
		font-size: 32rpx;
		color: #fff;
		background-color: #fa436a;
		border-radius: 10rpx;
		box-shadow: 2rpx 4rpx 10rpx rgba(219,63,96,.4);
	}
</style>
