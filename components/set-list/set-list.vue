<template>
	<view class="home-list">
		<block v-for="(item,index) in list" :key="index">
			<view class="home-list-item" hover-class="home-list-hover" @click="clickevent(item)">
				<view class="home-list-item-left">
					<view class="home-list-item-text">{{item.name}}</view>
					<view class="item-desc" v-if="item.name=='检查更新'"><text>当前版本 1.0.0</text></view>
				</view>
				<view @click="openPushMEssage" v-if="item.name=='消息推送'" class="home-list-item-right"><switch :checked="checked" /></view>
				<view  v-else class="home-list-item-right icon iconfont icon-icon-right"></view>
			</view>
		</block>
		<view class="exit-button" @click="logout">退出登陆</view>
	</view>
</template>

<script>
	import {useUserStore} from '../../stores/useUser'
	export default {
		data(){
			return {
				checked:true
			}
		},
		props: {
			list: Array
		},
		methods: {
			clickevent(item) {
				if (item.name == "清除缓存") {
					uni.showModal({
						title: '提示',
						content: '是否要清空缓存？',
						confirmText:"立刻清除",
						success: function(res) {
							if (res.confirm) {
								console.log('用户点击确定');
								uni.clearStorage()
								uni.showToast({
									title:"清除成功"
								})
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				}else if(item.name=='消息推送') return
				else{
					uni.showToast({
						title:`跳转到${item.name}`
					})
				}
				if (item.url) {
					uni.navigateTo({
						url: item.url
					})
				}
			},
			openPushMEssage(){
				this.checked=!this.checked
				if(this.checked) uni.showToast({
					title:'开启消息推送',
					icon:'none'
				})
				else uni.showToast({
					title:'关闭消息推送',
					icon:'none'
				})
			},
			logout(){
				uni.showModal({
					content: '确定要退出么',
					success: function (res) {
						if (res.confirm) {
							const userStore=useUserStore()
							userStore.$reset()
							uni.clearStorageSync()
							uni.navigateBack({delta:1})
							uni.showToast({
								title:'退出登录',
								icon:'success'
							})
						} 
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import url("iconfont.css");

	.home-list {
		display: flex;
		flex-direction: column;

		.home-list-item {
			display: flex;
			justify-content: space-between;
			padding: 20rpx;
			border-bottom: 1px solid #f6f6f6;
			margin-top: 16rpx;
			background-color: #fff;

			.home-list-item-left {
				display: flex;
				align-items: center;
				flex: 1;

				.home-list-item-text {
					margin-left: 20rpx;
					font-size: 15px;
					color: #303133;
				}

				.home-list-item-icon {
					font-size: 40rpx;
				}
				.item-desc{
					flex: 1;
					text-align: right;
					font-size: 28rpx;
					color: #909399;
				}
			}

			.home-list-item-right {
				display: flex;
				align-items: center;
				color: #B8B8B8;
				margin-left: 10rpx;
			}
		}

		.home-list-hover {
			background-color: #eee;
		}

		.exit-button {
			display: flex;
			    align-items: baseline;
			    padding: 10px 15px;
			    line-height: 30px;
			    position: relative;
			    background: #fff;
			    justify-content: center;
				color: #fa436a;
				margin-top: 40rpx;
		}
	}
</style>