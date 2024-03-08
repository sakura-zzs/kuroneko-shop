<template>
	<view class="center">
		<view class="bg center">
			<view class="bg-radius"></view>
			<view class="logo" @click="goLogin" :hover-class="!loginStatus ? 'logo-hover' : ''">
				<image class="logo-img" :src="loginStatus ? userInfo?.avatar :avatarUrl"></image>
				<view class="logo-title">
					<text class="uer-name">{{userInfo?.nickName?userInfo?.nickName:'游客'}}</text>
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
			<view class="center-nav-content">
				<view class="center-nav-item" @click="goOrder(index)" v-for="(nav,index) in navs" :key="index">
					<text class="center-nav-item-icon"> {{ nav.icon  }}  </text>
					<text class="center-nav-item-text">{{nav.text}}</text>
				</view>
			</view>
		</view>
		<view class="center-list">
			<view class="center-list-item border-bottom">
				<uni-icons class="list-icon" color="#5eba8f" type="paperplane-filled"/>
				<text class="list-text">浏览历史</text>
			</view>
			<view class="center-list-item border-bottom">
				<uni-icons class="list-icon color-1" type="wallet-filled"/>
				<text class="list-text">我的钱包</text>
				<view class="list-hint">
					<text>您的会员还有3天过期</text>
				</view>
				<uni-icons class="navigat-arrow" type="right" />
			</view>
			<view @click="goLocation" class="center-list-item">
				<uni-icons  class="list-icon color-2" type="location-filled"/>
				<text class="list-text">地址管理</text>
				<uni-icons class="navigat-arrow" type="right" />
			</view>
			<view class="center-list-item border-bottom">
				<uni-icons class="list-icon color-3" type="redo-filled"/>
				<text class="list-text">分享</text>
				<view class="list-hint">
					<text>邀请好友赢10万大礼</text>
				</view>
				<uni-icons class="navigat-arrow" type="right" />
			</view>
			<view class="center-list-item">
				<uni-icons class="list-icon color-4" type="chat-filled"/>
				<text class="list-text">晒单</text>
				<view class="list-hint">
					<text>晒单抢红包</text>
				</view>
				<uni-icons class="navigat-arrow" type="right" />
			</view>
			<view @click="goStar" class="center-list-item">
				<uni-icons class="list-icon color-5" type="star-filled"/>
				<text class="list-text">我的收藏</text>
				<uni-icons class="navigat-arrow" type="right" />
			</view>
			<view @click="goSet" class="center-list-item">
				<uni-icons class="list-icon color-6" type="gear-filled"/>
				<text class="list-text">设置</text>
				<uni-icons class="navigat-arrow" type="right" />
			</view>
		</view>
		</view>
	</view>
</template>

<script setup>
	import {useUserStore} from '../../stores/useUser'
	import {storeToRefs} from 'pinia'
	import {ref} from 'vue'
	import {onLoad} from '@dcloudio/uni-app'
	const userStore=useUserStore()
	const {loginStatus,userInfo}=storeToRefs(userStore)
	const avatarUrl=ref('../../static/missing-face.png')
	const count=ref([{
						num:181.9,
						text:'余额'
					},
					{
						num:0,
						text:'优惠券'
					},
					{
						num:66,
						text:'积分'
					}])
    const navs=ref([{
						icon:"\u{e601}",
						text:'全部订单'
					},
					{
						icon:"\u{e602}",
						text:'待付款'
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
						text:'已取消'
					}])
	const goLogin=()=>{
		if (!loginStatus.value) {
			return uni.navigateTo({
				url:'../login/login'
			})
		}
	}
		
	const goOrder=(index)=>{
		if(!loginStatus.value) return goLogin()
		uni.navigateTo({
			url:`../order/order?index=${index}`
		})
	}
	const goLocation=()=>{
		if(!loginStatus.value) return goLogin()
		uni.navigateTo({
			url:'../location/location'
		})
	}
		
	const goStar=()=>{
		if(!loginStatus.value) return goLogin()
		uni.navigateTo({
			url:'../star/star'
		})
	}
		
	const goSet=()=>{
		if(!loginStatus.value) return goLogin()
		uni.navigateTo({
			url:'../set/set'
		})
	}
	onLoad(()=>{
		
	})
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
	
	
	.center {
		flex-direction: column;
	}
	$head-color:#fff;
	$white-color:#fff;
	$main-color:#333;
	$radius:10rpx;
	$border-color:#efefef;
	$color-1: #e07472;
	$color-2: #5fcda2;
	$color-3: #9789f7;
	$color-4: #ee883b;
	$color-5:#54b4ef;
	$color-6:#e07472;
	$list-item-height:100rpx;
	$list-margin:20rpx;
	$width:100%;
	$head-height:550rpx;
	$head-width:120vw;
	$margin-left:-60vw;
	.bg{
		width:100vw;
		height:435rpx;
		overflow: hidden;
		position: relative;
		box-sizing: border-box;
		background-color: #cd3b33;
		
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
			display: flex;
			align-items: center;
			height: $list-item-height;
			width: 100%;
			box-sizing: border-box;
			padding: 0rpx 20rpx;
			border-bottom: 1rpx solid rgba(204, 204, 204, .3);
			
			.list-icon {
				width: 56rpx!important;
				font-size: 38rpx!important;
			}
			.color-1{
				color:$color-1!important;
			}
			.color-2{
				color:$color-2!important;
			}
			.color-3{
				color:$color-3!important;
			}
			.color-4{
				color:$color-4!important;
			}
			.color-5{
				color:$color-4!important;
			}
			.color-6{
				color:$color-4!important;
			}
			
			.list-text {
				height: $list-item-height;
				line-height: $list-item-height;
				font-size: 32rpx;
				color: #555;
				flex: 1;
				text-align: left;
			}
			.list-hint{
				font-size: 13px;
				color: #909399;
			}
			.navigat-arrow {
				color: #606266;
				margin-left: 20rpx;
			}
		}
	}
	.center-nav{
		background-color: #FFFFFF;
		padding-top:1rpx ;
		margin:20rpx auto $list-margin;
		width:$width;
		flex-direction: column;
		border-radius: $radius;
	
		.center-nav-content{
			display: flex;
			align-items: center;
		    padding: 28rpx 0;
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
	}
	.bg-gray{
		background:#f4f4f4;
		// height:calc(100vh - 435rpx);
		padding: 0 30rpx;
	}
</style>