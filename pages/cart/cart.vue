<template>
	<view>
		<view class="cart-list">
			<view class="cart-item b-b" v-for="(item,index) in cartList" :key="index">
				<view class="item-image">
					<image :src="item.imgUrl" class="item-img loaded"></image>
					<view class="item-checkbox" @click="choosed(item)">
						<image v-if="item.isChecked" src="../../static/selected.png"></image>
						<image v-else src="../../static/select.png"></image>
					</view>
				</view>
				<view class="item-right">
					<text class="tit">
						{{item.skuName}}
					</text>
					<text class="price">{{'￥'+item.cartPrice*item.skuNum}}</text>
					<uni-number-box min="1" :value="item.skuNum" @change="reCalculate($event,item.skuId,item.skuNum)"></uni-number-box>
				</view>
				<uni-icons @click="deleteGoods(item.skuId)" class="del-item" type="closeempty"></uni-icons>
			</view>
		</view>
		<view class="action-bar">
			<view class="checkbox">
				<image v-if="!getIsSelectAllStatus" @click="isSelectAll" src="../../static/selected.png"></image>
				<image v-else @click="isSelectAll" src="../../static/select.png"></image>
				<view @click="clearCart" :class="{'clear-btn':true,'show':cartList.length!=0&&!getIsSelectAllStatus}">清空</view>
			</view>
			<view class="total-box">
				<text class="price">
					{{'￥'+getTotalPrice}}
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
	import {ref,computed} from 'vue'
	import {onShow,onLoad} from '@dcloudio/uni-app'
	import {useUserStore} from '../../stores/useUser'
	import {useCartStore} from '../../stores/useCart'
	import {storeToRefs} from 'pinia'
	const cartStore=useCartStore()
	const {loginStatus}=storeToRefs(useUserStore())
	const {cartList}=storeToRefs(cartStore)
	const getTotalPrice=computed(()=>{
		let sum=0
		cartList.value.forEach(v=>{
			if(v.isChecked==1) sum+=v.cartPrice*v.skuNum
		})
		return sum
	})
	//记录前一次变化值
	let preV=0
	const reCalculate=async(num,skuId,skuNum)=>{
		//前一次值应为当前商品数（商品数有初始值）
		preV=skuNum
		//相同值不处理
		if(num==preV) return
		//不同，发起加减请求
		const newSkuNum=num-preV
		await cartStore.addCart({skuId,skuNum:newSkuNum})
		//更新
		await cartStore.fetchCartList()	
	}
	onLoad(async()=>{
		await cartStore.fetchCartList()
	})
	onShow(async()=>{
		if(!loginStatus.value) 
		return uni.navigateTo({
			url:'/pages/login/login'
		})
		await cartStore.fetchCartList()
	})
	const deleteGoods=async(id)=>{
		const res=await cartStore.deleteCart(id)
		if(res){
			await cartStore.fetchCartList()
			return uni.showToast({
				title:'删除成功'
			})
		}
		return uni.showToast({
			title:'删除失败'
		})
	}
	const choosed=async(goods)=>{
		const isChecked=goods.isChecked==1?0:1
		const skuId=goods.skuId
		const res=await cartStore.updateCartChecked({skuId,isChecked})
		if(res){
			await cartStore.fetchCartList()
		}
	}
	const getIsSelectAllStatus=computed(()=>cartList.value.find(goods=>goods.isChecked==0))
	const isSelectAll=async()=>{
		const isChecked=getIsSelectAllStatus.value?1:0
		const res=await cartStore.updateAllCartChecked(isChecked)
		if(res){
			await cartStore.fetchCartList()
		}
	}
	const clearCart=async()=>{
		const res=await cartStore.clearCart()
		if(res){
			await cartStore.fetchCartList()
		}
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
