<template>
	<view class="content">
		<view class="success-icon">
			<uni-icons type="checkbox-filled" color="#fa436a" size="80"></uni-icons>
		</view>
		<text class="tit">
			支付成功
		</text>
		<view class="action-btns">
			<navigator class="btn" url="../order/order?index=0">查看订单</navigator>
			<navigator class="btn plain" url="../home/home">返回首页</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.content{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		.success-icon{
			margin-top: 100rpx;
		}
		.tit{
			font-size: 38rpx;
			color: #303133;
		}
		.action-btns{
			padding-top: 100rpx;
			.btn{
				margin-top: 30rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				width: 600rpx;
				height: 80rpx;
				font-size: 32rpx;
				color: #fff;
				background-color: #fa436a;
				border-radius: 10rpx;
			}
			.plain{
				background: #fff;
				color: #303133;
				border: 2rpx solid #ccc;
			}
		}
	}

</style>
