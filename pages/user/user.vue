<template>
	<view class="center">
		<view class="bg center">
			<view class="bg-radius"></view>
			<view class="logo" @click="goLogin" :hover-class="!login ? 'logo-hover' : ''">
				<image class="logo-img" :src="login ? uerInfo.avatarUrl :avatarUrl"></image>
				<view class="logo-title">
					<text class="uer-name">Lisa</text>
				</view>
				<view class="count">
					<view class="count-item" v-for="(c,index) in count">
						<text class="count-item-num">{{c.num}}</text>
						<text class="count-item-text">{{c.text}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="bg-gray center">
		<view class="center-nav margin-top">
			<view class="center-nav-title">
				<text>我的订单</text>
			</view>
			<view class="center-nav-content">
				<view class="center-nav-item" v-for="(nav,index) in navs">
					<text class="center-nav-item-icon"> {{ nav.icon  }}  </text>
					<text class="center-nav-item-text">{{nav.text}}</text>
				</view>
			</view>
		</view>
		<view class="center-list">
			<view class="center-list-item border-bottom">
				<text class="list-icon color-1">&#xe60e;</text>
				<text class="list-text">帐号管理</text>
				<text class="navigat-arrow">&#xe65e;</text>
			</view>
			<view class="center-list-item">
				<text class="list-icon color-2">&#xe60b;</text>
				<text class="list-text">新消息通知</text>
				<text class="navigat-arrow">&#xe65e;</text>
			</view>
		</view>
		<view class="center-list">
			<view class="center-list-item border-bottom">
				<text class="list-icon color-3">&#xe60c;</text>
				<text class="list-text">帮助与反馈</text>
				<text class="navigat-arrow">&#xe65e;</text>
			</view>
			<view class="center-list-item">
				<text class="list-icon color-4">&#xe60c;</text>
				<text class="list-text">服务条款及隐私</text>
				<text class="navigat-arrow">&#xe65e;</text>
			</view>
		</view>
		<view class="center-list">
			<view class="center-list-item">
				<text class="list-icon color-1">&#xe60d;</text>
				<text class="list-text">关于应用</text>
				<text class="navigat-arrow">&#xe65e;</text>
			</view>
		</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				login: false,
				avatarUrl: "../../static/girl.jpg",
				uerInfo: {},
				count:[
					{
						num:5,
						text:'我的收藏'
					},
					{
						num:7,
						text:'我的足迹'
					},
					{
						num:1,
						text:'优惠券'
					}
				],	
				navs:[
					{
						icon:"\u{e602}",
						text:'待付款'
					},
					{
						icon:"\u{e601}",
						text:'待发货'
					},
					{
						icon:"\u{e603}",
						text:'待收货'
					},
					{
						icon:"\u{e604}",
						text:'待评价'
					},
					{
						icon:'\u{e60a}',  //原代码：&#xe60a;
						text:'退款'
					}
				]
			}
		},
		methods: {
			goLogin() {
				if (!this.login) {
					console.log("点击前往登录")
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@font-face {
		font-family: texticons;
		font-weight: normal;
		font-style: normal;
		src: url('https://at.alicdn.com/t/c/font_4218190_6debofuo8gh.ttf?t=1701960489041') format('truetype');
	}
	
	page,
	view {
		display: flex;
	}
	
	page {
		background-color: #cd3b33;
	}
	
	.center {
		width: 100%;
		flex-direction: column;
	}
	$head-color:#fff;
	$white-color:#fff;
	$main-color:#333;
	$radius:0rpx;
	$border-color:#efefef;
	$color-1: #007aff;
	$color-2: #4cd964;
	$color-3: #f0ad4e;
	$color-4: #dd524d;
	$list-item-height:100rpx;
	$list-margin:20rpx;
	$width:100vw;
	$head-height:550rpx;
	$head-width:120vw;
	$margin-left:-60vw;
	.bg{
		width:100vw;
		height:435rpx;
		overflow: hidden;
		position: relative;
		box-sizing: border-box;
		
		.bg-radius{
			background-color: $head-color;
			border-top-left-radius:50%;
			border-top-right-radius:50%;
			width: $head-width;
			height:$head-height;
			box-sizing: border-box;
			position: absolute;
			left:50%;
			margin-left:$margin-left;
			top:150rpx;
			z-index: 8;
		}
		.logo {
			background-color: transparent;
			border-top-left-radius:50%;
			border-top-right-radius:50%;
			width: 100vw;
			box-sizing: border-box;
			flex-direction:column;
			align-items: center;
			position: absolute;
			left:0;
			top:70rpx;
			z-index: 9;
			
			.logo-img {
				width: 140rpx;
				height: 140rpx;
				border-radius: 50%;
				border: solid 10rpx #efefef;
			}
			
			.logo-title {
				height: 150rpx;
				flex: 1;
				align-items: center;
				justify-content: space-between;
				flex-direction: row;
				
				.uer-name {
					height: 60rpx;
					line-height: 60rpx;
					font-size: 34rpx;
					color: #333;
				}
			}
			
			.count{
				margin:30rpx auto 0rpx;
				width: $width;
				.count-item{
					flex-direction: column;
					flex:1;
					text-align: center;
					
					.count-item-num{
						color:$main-color;
						font-size:36rpx;
						font-weight: 500;
					}
					.count-item-text{
						color:$main-color;
						font-size:28rpx;
						font-weight: 400;
						margin-top: 10rpx;
					}
				}
			}
		}
	}
	.center-list {
		background-color: #FFFFFF;
		margin:0 auto $list-margin;
		width: $width;
		flex-direction: column;
		border-radius: $radius;
	
		.center-list-item {
			height: $list-item-height;
			width: 100%;
			box-sizing: border-box;
			flex-direction: row;
			padding: 0rpx 20rpx;
			
			.list-icon {
				width: 40rpx;
				height: $list-item-height;
				line-height: $list-item-height;
				font-size: 45rpx;
				color: #4cd964;
				text-align: center;
				font-family: texticons;
				margin-right: 20rpx;
			}
			.color-1{
				color:$color-1;
			}
			.color-2{
				color:$color-2;
			}
			.color-3{
				color:$color-3;
			}
			.color-4{
				color:$color-4;
			}
			
			.list-text {
				height: $list-item-height;
				line-height: $list-item-height;
				font-size: 32rpx;
				color: #555;
				flex: 1;
				text-align: left;
			}
			
			.navigat-arrow {
				height: $list-item-height;
				line-height: $list-item-height;
				width: 40rpx;
				font-size: 30rpx;
				color: #999;
				text-align: right;
				font-family: texticons;
			}
		}
		.border-bottom {
			border-bottom-width: 1rpx;
			border-color: $border-color;
			border-bottom-style: solid;
		}
	}
	.center-nav{
		background-color: #FFFFFF;
		padding-top:1rpx ;
		margin:20rpx auto $list-margin;
		width:$width;
		flex-direction: column;
		border-radius: $radius;
		
		.center-nav-title{
			padding:25rpx 30rpx;
			font-size:34rpx;
			color:#333;
			font-weight: 400;
			border-bottom: solid 1rpx $border-color;
		}
		.center-nav-content{
			height: 180rpx;
			display: flex;
			align-items: center;
			.center-nav-item{
				flex-direction: column;
				flex:1;
				text-align: center;
				
				.center-nav-item-icon{
					color:#333;
					font-size:48rpx;
					font-weight: 500;
					font-family: texticons;
				}
				.center-nav-item-text{
					color:#666;
					font-size:30rpx;
					font-weight: 400;
					margin-top: 15rpx;
				}
			}
		}
	}
	.margin-top{
		margin-top: 20rpx;
		min-height: 230rpx;
	}
	.bg-gray{
		background:#f4f4f4;
		height:calc(100vh - 435rpx);
	}
</style>