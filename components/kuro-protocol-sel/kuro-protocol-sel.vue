<template>
	<view>
		<view class="protocol_box">
			<view class="select" :class="{active: agree}" @click="handleClick"></view>
			我已同意
			<text class="pro_name" v-for="(item,index) in protocolArr" :key="index" @click="onPageJump('/pages/user/protocol')">{{item}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"kuro-protocol-sel",
		data() {
			return {
				agree:false
			}
		},
		props:{
			protocolArr:{
				type:Array,
				default:['《用户注册协议》','《隐私协议》']
			}
		},
		methods:{
			handleClick(){
				this.agree=!this.agree
				this.$emit('protocolClick',this.agree)
			},
			onPageJump(url) {
				uni.navigateTo({
					url: url
				});
			},
		}
	}
</script>

<style lang="scss">
.protocol_box {
			margin-top: 40rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;
			font-size: 28rpx;
			color: #333333;

			.select {
				width: 36rpx;
				height: 36rpx;
				background-image: url("../../static/ic_nor.png");
				background-position: center center;
				background-repeat: no-repeat;
				background-size: 100% auto;
				margin-right: 15rpx;

				&.active {
					background-image: url("../../static/ic_sel.png");
				}
			}

			>text {
				color: #4399fc;
			}
			text:nth-of-type(odd)::after{
				content: '和';
				color: #333333;
			}
		}
</style>