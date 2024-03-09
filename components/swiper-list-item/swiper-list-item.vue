<!-- 在这个文件对每个tab对应的列表进行渲染 -->
<template>
	<view class="content">
		<!--  :enable-back-to-top="currentIndex===tabIndex" 在微信小程序上可以多加这一句，因为默认是允许点击返回顶部的，但是这个页面有多个scroll-view，会全部返回顶部，所以需要控制是当前index才允许点击返回顶部 -->
		<!-- 如果当前页已经加载过数据或者当前切换到的tab是当前页，才展示当前页数据（懒加载） -->
		<z-paging v-if="firstLoaded || isCurrentPage" ref="paging" v-model="dataList" @query="queryList" :fixed="false" >
			<!-- 如果希望其他view跟着页面滚动，可以放在z-paging标签内 -->
			<view class="item" v-for="(item,index) in dataList" :key="index">
				<view class="item-header">
					<text>{{item.createTime}}</text>
					<view class="item-tag">
						<text v-if="item.orderStatus===0">待支付</text>
						<text v-else-if="item.orderStatus===1">待发货</text>
					</view>
				</view>
				<view class="item-goods">
					<view class="item-goods-list" v-for="(goods,goodsIndex) in item.orderItemList" :key="goodsIndex">
	                	<image :src="goods.thumbImg" />
						<view class="item-goods-desc" v-if="item.orderItemList.length===1">
							<text>{{goods.skuName}}</text>
							<text class="goods-num">{{goods.skuNum}}</text>
							<text class="goods-price">{{goods.skuPrice}}</text>						
						</view> 
					</view>
				</view>	
				<view class="item-pay-desc">
					共
					<text class="pay-num">{{item.orderItemList.length}}</text>
					件商品 实付款
					<text class="pay-price">{{item.totalAmount}}</text>
				</view>
				<view class="item-line"></view>
				<view class="item-footer">
					<button v-if="item.orderStatus===0" class="action-btn">取消订单</button>
					<button @click="goToPay(item.totalAmount,item.orderNo)" v-if="item.orderStatus===0" class="action-btn pay">立即支付</button>
					<button class="action-btn" @click="goToOrderDetail(item)">详情</button>
				</view>
			</view>
		</z-paging>
	</view>
</template>

<script>
	import {useOrderStore} from '../../stores/useOrder'
	const orderStore=useOrderStore()
	export default {
		data() {
			return {
				// v-model绑定的这个变量不要在分页请求结束中自己赋值！！！
				dataList: [],
				// 当前组件是否已经加载过了
				firstLoaded: false,
				// 是否滚动到当前页
				isCurrentPage: false
			}
		},
		props:{
			// 当前组件的index，也就是当前组件是swiper中的第几个
			tabIndex: {
				type: Number,
				default: function(){
					return 0
				}
			},
			// 当前swiper切换到第几个index
			currentIndex: {
				type: Number,
				default: function(){
					return 0
				}
			}
		},
		watch: {
			currentIndex: {
				handler(newVal) {
					if(newVal === this.tabIndex){
						// 懒加载，当滑动到当前的item时，才去加载
						if(!this.firstLoaded){
							// 这里需要延迟渲染z-paging的原因是为了避免在一些平台上立即渲染可能引发的底层报错问题
							this.$nextTick(() => {
								setTimeout(() => {
									this.isCurrentPage = true;
								}, 100);
							})
						}
					}
				},
				immediate: true
			},
		},
		methods: {
			// 接收父组件传过来的刷新列表要求
			reload() {
				this.$nextTick(() => {
					// 刷新列表数据(如果不希望列表pageNo被重置可以用refresh代替reload方法)
					this.$refs.paging && this.$refs.paging.reload();	
				})
			},
			queryList(pageNo, pageSize) {
				// 组件加载时会自动触发此方法，因此默认页面加载时会自动触发，无需手动调用
				// 这里的pageNo和pageSize会自动计算好，直接传给服务器即可
				// 模拟请求服务器获取分页数据，请替换成自己的网络请求
				const params = {
					page: pageNo,
					limit: pageSize,
				}
				switch(this.tabIndex){
					case 0:params.orderStatus=-1;break;
					case 1:params.orderStatus=0;break;
					case 2:params.orderStatus=1;break;
					case 3:params.orderStatus=2;break;
					case 4:params.orderStatus=3;break;
				}
				orderStore.fetchOrderList(params).then(res => {
					//将请求的结果数组传递给z-paging
					this.$refs.paging.complete(res.data.list);
					this.firstLoaded = true;
				}).catch(res => {
					// 如果请求失败写this.$refs.paging.complete(false);
					// 注意，每次都需要在catch中写这句话很麻烦，z-paging提供了方案可以全局统一处理
					// 在底层的网络请求抛出异常时，写uni.$emit('z-paging-error-emit');即可
					this.$refs.paging.complete(false);
				})
			},
			goToOrderDetail(orderData){
				uni.navigateTo({
					url:'/pages/order/orderDetail',
					success:(res)=>{
						//通过eventChannel发送事件向被打开页面传递数据
						res.eventChannel.emit('emitOrderData',{orderData})
					}
				})
			},
			goToPay(count,orderNo){
				uni.navigateTo({
					url:`/pages/pay/pay?count=${count}&orderNo=${orderNo}`
				})
			}
		}
	}
</script>

<style lang="scss">
	/* 注意:父节点需要固定高度，z-paging的height:100%才会生效 */
	.content {
		height: 100%;
		background-color: #f8f8f8;
	}
	
	.item {
		position: relative;
		display: flex;
		flex-direction: column;
		padding-left: 30rpx;
		background: #fff;
		margin-top: 16rpx
	}
	.item-header{
		display: flex;
		align-items: center;
		height: 80rpx;
		padding-right: 30rpx;
		font-size: 28rpx;
		color: #303133;
		position: relative;
		.item-tag{
			flex: 1;
			text-align: right;
		}
	}
	.item-line {
		
	}
	.item-goods{
		display: flex;
		padding: 20rpx 0;
		box-sizing: border-box;
		position: relative;
		&::before{
			content: '';
			position: absolute;
			top: 0rpx;
			left: 0rpx;
			height: 2rpx;
			width: 100%;
			background-color: #eeeeee;
		}
		.item-goods-list{
			display: flex;
			image{
				width: 120rpx;
				height: 120rpx;
			}
			.item-goods-desc{
				flex: 1;
				display: flex;
				flex-direction: column;
				padding: 0 30rpx 0 24rpx;
				overflow: hidden;
				font-size: 30rpx;
				color: #303133;
				line-height: 1;
				.goods-num{
					font-size: 26rpx;
					color: #909399;
					padding: 10rpx 12rpx;
				}
				.goods-price::before{
					content: "￥";
					font-size: 24rpx;
					margin: 0 2rpx 0 8rpx;
				}
			}
		}
	}
	.item-pay-desc{
		display: flex;
		justify-content: flex-end;
		align-items: baseline;
		padding: 20rpx 30rpx;
		font-size: 26rpx;
		color: #909399;
		.pay-num{
			margin: 0 8rpx;
			color: #303133;
		}
		.pay-price{
			font-size: 32rpx;
			color: #303133;
		}
		.pay-price::before{
			content: "￥";
			font-size: 24rpx;
			margin: 0 2rpx 0 8rpx;
		}
	}
	.item-footer{
		display: flex;
		justify-content: flex-end;
		align-items: center;
		height: 100rpx;
		position: relative;
		padding-right: 30rpx;
		&::before{
			content: '';
			position: absolute;
			top: 0rpx;
			left: 0rpx;
			height: 2rpx;
			width: 100%;
			background-color: #eeeeee;
		}
	}
	.action-btn{
		width: 160rpx;
		height: 60rpx;
		margin: 0;
		margin-left: 24rpx;
		padding: 0;
		text-align: center;
		line-height: 60rpx;
		font-size: 26rpx;
		color: #303133;
		background: #fff;
		border-radius: 200rpx;
	}
	.action-btn::after {
	    border-radius: 200rpx;
	}
	.action-btn.pay::after {
	    border-color: #f7bcc8;
	}
	.action-btn.pay{
		background: #fff9f9;
		color: #fa436a;
	}
</style>
