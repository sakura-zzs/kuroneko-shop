<template>
	<view>
		<view class="cart-list">
			<view class="cart-item b-b">
				<view class="item-image">
					<image src="" mode="" class="item-img loaded"></image>
					<view class="item-checkbox">
						<image src="../../static/selected.png"></image>
					</view>
				</view>
				<view class="item-right">
					<text class="tit">
						aa
					</text>
					<text class="price">aa</text>
					<uni-number-box @change="reCalculate($event,1)"></uni-number-box>
				</view>
				<uni-icons class="del-item" type="closeempty"></uni-icons>
			</view>
		</view>
		<view class="action-bar">
			<view class="checkbox">
				<image src="../../static/selected.png"></image>
				<view class="clear-btn show">清空</view>
			</view>
			<view class="total-box">
				<text class="price">
					￥
				</text>
				<text class="discounted">
					已优惠
					<text>0</text>
					元
				</text>
			</view>
			<view class="confirm-btn">
				去结算
			</view>
		</view>
	</view>
</template>

<script setup>
	import {ref} from 'vue'
	
	const totalPrice=ref(null)
	const reCalculate=(num,a)=>{
		console.log(num,a);
	}

</script>

<style lang="scss" scoped>
page{
	background-color: #f8f8f8;
}
.cart-list{
	padding-bottom: 134rpx;
}
.cart-item {
    display: flex;
    position: relative;
    padding: 30rpx 40rpx;
    background: #fff;
    margin: 10rpx 0;
	.item-image{
		width: 230rpx;
		height: 230rpx;
		flex-shrink: 0;
		position: relative;
		background: #f3f3f3;
		border-radius: 8rpx;
		.item-img{
			width: 100%;
			height: 100%;
			transition: .6s;
			opacity: 0;
		}
		.item-img.loaded{
			opacity: 1;
		}
		.item-checkbox{
			position: absolute;
			left: -16rpx;
			top: -16rpx;
			z-index: 8;
			font-size: 44rpx;
			line-height: 1;
			padding: 4rpx;
			background: #fff;
			border-radius: 100rpx;
			color: #fa436a;
			image{
				width: 44rpx;
				height: 44rpx;
			}
		}
	}
	.item-right{
		display: flex;
		flex-direction: column;
		flex: 1;
		overflow: hidden;
		padding-left: 30rpx;
		position: relative;
		.tit{
			font-size: 30rpx;
			color: #303133;
			height: 40rpx;
			line-height: 40rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			display: block;
		}
		.price{
			height: 50rpx;
			line-height: 50rpx;
			font-size: 30rpx;
			color: #303133;
		}
		.uni-numbox {
		    position: absolute;
		    left: 30rpx;
		    bottom: 0;
		    display: flex;
		    justify-content: flex-start;
		    align-items: center;
		    height: 70rpx;
		    background: #f5f5f5;
		}
	}
	.del-item{
		padding: 4rpx 10rpx;
		font-size: 34rpx!important;
		height: 50rpx;
		color: #909399!important;
	}
}
.b-b{
	border-bottom: 2rpx solid rgba(228, 231, 237, .5);
}
.action-bar{
	margin-bottom: 100rpx;
	position: fixed;
	left: 30rpx;
	bottom: 30rpx;
	z-index: 95;
	display: flex;
	align-items: center;
	width: 690rpx;
	height: 100rpx;
	padding: 0 30rpx;
	background: hsla(0, 0%, 100%, .9);
	box-shadow: 0 0 10px 0 rgba(0,0,0,.5);
	border-radius: 16rpx;
	.checkbox{
		height: 52rpx;
		position: relative;
		image{
			position: absolute;
			z-index: 8;
			width: 52rpx;
			height: 52rpx;
		}
		.clear-btn{
			position: absolute;
			left: 26rpx;
			top: 0;
			z-index: 4;
			width: 0;
			height: 52rpx;
			line-height: 52rpx;
			padding-left: 38rpx;
			font-size: 28rpx;
			color: #fff;
			background: #c0c4cc;
			border-radius: 0 100rpx 100rpx 0;
			opacity: 0;
			transition: .2s;
		}
		.show{
			opacity: 1;
			width: 120rpx
		}
	}
	.total-box{
		flex: 1;
		display: flex;
		flex-direction: column;
		text-align: right;
		padding-right: 40rpx;
		.price{
			font-size: 32rpx;
			color: #303133;
		}
		.discounted{
			font-size: 24rpx;
			color: #909399;
			text{
				color: #303133;
			}
		}
	}
	.confirm-btn{
		padding: 0 38rpx;
		margin: 0;
		border-radius: 200rpx;
		height: 76rpx;
		line-height: 76rpx;
		font-size: 30rpx;
		background: #fa436a;
		box-shadow: 2rpx 4rpx 10rpx rgba(217,60,93,.72);
		color: #fff;
	}
}
</style>
