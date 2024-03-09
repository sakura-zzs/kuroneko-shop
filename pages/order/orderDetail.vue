<template>
<view class="order-container">
	<view class="order-detail-container">
		<view class="row b-b">
			收货信息
		</view>
		<view class="row">
			<text class="row-title">联系人:</text>
			<text class="row-desc">{{orderDetailData?.receiverName}}</text>
		</view>
		<view class="row">
			<text class="row-title">手机号:</text>
			<text class="row-desc">{{orderDetailData?.receiverPhone}}</text>
		</view>
		<view class="row">
			<text class="row-title">详细地址:</text>
			<text class="row-desc">{{'【'+orderDetailData?.receiverTagName+'】'+orderDetailData?.receiverAddress}}</text>
		</view>
		<view class="goods-info">
			<view class="header">商品信息</view>
			<view class="goods-item" :key="index" v-for="(item,index) in orderDetailData?.orderItemList">
				<image :src="item.thumbImg" />
				<view class="item-desc">
					<view class="title">{{item.skuName}}</view>
					<view class="price-box">
						<text class="price">{{'￥'+item.skuPrice}}</text>
						<text class="number">{{'x '+item.skuNum}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="row b-b">
			订单信息
		</view>
		<view class="row">
			<text class="row-title">订单号:</text>
			<text class="row-desc">{{orderDetailData?.orderNo}}</text>
		</view>
		<view class="row">
			<text class="row-title">下单时间:</text>
			<text class="row-desc">{{orderDetailData?.createTime}}</text>
		</view>
		<view class="row">
			<text class="row-title">订单状态:</text>
			<text class="row-desc">{{orderDetailData?.orderStatus===0?'待支付':'待发货'}}</text>
		</view>
		<view class="extra-info">
			<view class="extra-item">
				<view class="extra-item-tit">商品金额</view>
				<view class="extra-item-desc">{{'￥'+orderDetailData?.totalAmount}}</view>
			</view>
			<view class="extra-item">
				<view class="extra-item-tit">优惠金额</view>
				<view class="extra-item-desc">{{'-￥'+(orderDetailData?.originalTotalAmount-orderDetailData?.totalAmount)}}</view>
			</view>
			<view class="extra-item">
				<view class="extra-item-tit">运费</view>
				<view class="extra-item-desc">免运费</view>
			</view>
			<view class="extra-item">
				<view class="extra-item-tit input-title">备注</view>
				<input class="extra-item-input" :placeholder="orderDetailData?.orderStatus===0?'请填写备注信息':''" :disabled="orderDetailData?.orderStatus==1" type="text"  />
			</view>
			<view class="extra-item">
				<view class="extra-item-tit">应付金额</view>
				<view class="extra-item-desc">{{'￥'+orderDetailData?.totalAmount}}</view>
			</view>
		</view>
	</view>
	<view class="order-detail-footer" v-if="orderDetailData?.orderStatus===0">
		<view class="pay-content">
			<text class="pay-tit">支付金额</text>
			<text class="pay-unit">￥</text>
			<text class="pay-count">{{orderDetailData?.totalAmount}}</text>
		</view>
		<view @click="goToPay(orderDetailData?.totalAmount)" class="pay-btn">
			去支付
		</view>
	</view>
</view>
</template>

<script setup>
import {getCurrentInstance, onMounted,ref} from 'vue'
const orderDetailData=ref(null)
onMounted(()=>{
	//获取事件总线
	const eventChannel=getCurrentInstance().proxy.getOpenerEventChannel()
	eventChannel.on('emitOrderData',({orderData})=>{
		console.log(orderData);
		orderDetailData.value=orderData
	})
})
const goToPay=(count)=>{
	uni.navigateTo({
		url:`/pages/pay/pay?count=${count}`
	})
}
</script>

<style lang="scss" scoped>
	.order-container{
		height: 100%;
		background-color: #f8f8f8;
	}
	.order-detail-container{
		margin-top: 16rpx;
		background: #fff;
		padding-bottom: 2rpx;
		.row{
			display: flex;
			align-items: center;
			position: relative;
			padding: 0 20rpx;
			height: 70rpx;
			background: #fff;
			.row-title{
				width: 150rpx;
				font-size: 30rpx;
				color: #303133;
			}
			.row-desc{
				flex: 1;
				font-size: 30rpx;
				color: #303133;
			}
		}
		.row.b-b{
			border-bottom: 2rpx solid rgba(228, 231, 237, .5);
		}
		.goods-info{
			.header {
			    font-size: 30rpx;
			    color: #606266;
			    margin-left: 24rpx;
			}
			.goods-item{
				display: flex;
				margin: 20rpx 30rpx;
				image{
					flex-shrink: 0;
					display: block;
					width: 140rpx;
					height: 140rpx;
					border-radius: 4rpx;
				}
				.item-desc{
					flex: 1;
					padding-left: 24rpx;
					overflow: hidden;
					.title{
						font-size: 30rpx;
						color: #303133;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						display: block;
					}
					.price-box{
						display: flex;
						align-items: center;
						font-size: 32rpx;
						color: #303133;
						padding-top: 10rpx;
						.price{
							margin-bottom: 4rpx;
						}
						.number{
							font-size: 26rpx;
							color: #606266;
							margin-left: 20rpx;
						}
					}
				}
			}
			
		}
		.extra-info{
			margin-top: 16rpx;
			background: #fff;
			.extra-item{
				display: flex;
				align-items: center;
				padding: 10rpx 30rpx 10rpx 40rpx;
				line-height: 70rpx;
				position: relative;
				.extra-item-tit{
					flex: 1;
					font-size: 26rpx;
					color: #909399;
					margin-right: 10rpx;
				}
				.input-title{
					max-width: 90rpx;
				}
				.extra-item-input{
					flex: 1;
					font-size: 28rpx;
					color: #303133;
				}
				.extra-item-desc{
					font-size: 26rpx;
					color: #303133;
				}
			}
		}
	}
	.order-detail-footer{
		    position: fixed;
		    left: 0;
		    bottom: 0;
		    display: flex;
		    align-items: center;
		    width: 100%;
		    height: 90rpx;
		    justify-content: space-between;
		    font-size: 30rpx;
		    background-color: #fff;
		    z-index: 998;
		    color: #606266;
		    box-shadow: 0 -2rpx 10rpx rgba(0,0,0,.1);
			.pay-content{
				padding-left: 30rpx;
				.pay-unit{
					color: #fa436a;
					margin-left: 8rpx 
				}
				.pay-count{
					font-size: 36rpx;
					color: #fa436a;
				}
			}
			.pay-btn{
				display: flex;
				align-items: center;
				justify-content: center;
				width: 280rpx;
				height: 100%;
				color: #fff;
				font-size: 32rpx;
				background-color: #fa436a;
			}
	}
</style>
