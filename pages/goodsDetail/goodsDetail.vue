<template>
	<view>
		<swiper class="swiper" circular :indicator-dots="true">
				<swiper-item v-for="(item,index) in goodsDetail?.sliderUrlList" :key="index">
					<image :src="item" class="swiper-image"></image>
				</swiper-item>
		</swiper>
		<view class="goods-info">
			<view class="title">{{getSkuName}}</view>
			<view class="price">
				<text class="sale-price">￥{{goodsDetail?.productSku.salePrice}}</text>
				<text class="old-price">￥{{goodsDetail?.productSku.marketPrice}}</text>
			</view>
			<view class="info-footer">
				<text>销量：{{goodsDetail?.productSku.saleNum}}</text>
				<text>库存：{{goodsDetail?.productSku.stockNum}}</text>
			</view>
		</view>
		<view class="share-info">
			<uni-icons type="gift-filled" color="#fa436a"/>
			<text>该商品分享可领49减10红包</text>
			<uni-icons type="help" color="#9fa2ad"/>
		</view>
		<view class="select-info">
			<view class="select-type select-item" @click="handleShowSku">
				<text class="buy-tit tit">购买类型</text>
				<text class="buy-type type">{{getSkuSpec}}</text>
				<uni-icons type="right" color="#888"/>
			</view>
			<view class="discount select-item">
				<text class="discount-tit tit">优惠券</text>
				<text class="discount-type type">领取优惠券</text>
			</view>
			<view class="promotion select-item">
				<text class="promotion-tit tit">促销活动</text>
				<view class="promotion-type type">
					<text>新人首单送20元无门槛代金券</text>
					<text>订单满50减10</text>
					<text>订单满100减30</text>
					<text>单笔购买满两件免邮费</text>
				</view>
			</view>
			<view class="service select-item">
				<view class="service-tit tit">服务</view>
				<view class="service-type type">
					<text>7天无理由退换货 · </text>
					<text>假一赔十</text>
				</view>
			</view>
		</view>
		<view class="comment-info">
			<view class="comment-header">
				<text class="comment-tit">评价</text>
				<text class="comment-count">(648)</text>
				<text class="good-rate">好评率 100%</text>
				<uni-icons class="comment-icon" type="right" color="#888"/>
			</view>
			<view class="comment-container">
				<view class="left"><image src="../../static/missing-face.png"></image></view>
				<view class="right">
					<text class="nickName">Xie ge</text>
					<text class="comment-content">
						商品收到了，10块钱三件，很好吃，拌混凝土加99号意大利面，味道让我飞起来了，孩子很喜欢
					</text>
					<view class="buy-info">
						<text class="buy-goods-type">购买类型: 白色 + 8G</text>
						<text class="buy-time">2020 10-29 23:17</text>
					</view> 
				</view>
			</view>
		</view>
		<view class="goods-detail">
			<view class="detail-desc">
				<text>图文详情</text>
			</view>
			<view class="detail-image" v-for="item in goodsDetail?.detailsImageUrlList" :key="item">
				<image :src="item" mode="aspectFit"/>
			</view>
		</view>
		<wu-sku :selectSkuIndex="selectSkuIndex" v-model="skuShow" :data="skus" :themeColor="[226, 35, 26]"
			btnConfirmText="加入购物车" notSelectSku="请选择完整的商品信息" @skuChange="skuChange" @confirm="skuConfirm" @numChange="numChange"></wu-sku>
		<uni-goods-nav :options="options" :fill="true" :button-group="buttonGroup" @click="onClick"
						@buttonClick="buttonClick" />	
	</view>
</template>

<script setup>
	import {onLoad} from '@dcloudio/uni-app'
	import {useGoodsStore} from '../../stores/useGoods'
	import {ref,computed} from 'vue'
	const goodsStore=useGoodsStore()
	const goodsDetail=ref(null)
	//是否展开sku商品选择器
	const skuShow=ref(false)
	//商品选择器默认选择skus下标
	const selectSkuIndex=ref(0)
	//默认选择规格
	// const skuSpec=ref('')
	//提取默认选择规格
	const getSkuSpec=computed(()=>{
		let skuSpec=goodsDetail.value?.productSku.skuSpec||''
		//提取规格信息
		skuSpec=skuSpec.split(',').map(e=>e.split(':')).map(e=>({[e[0]]:e[1]})).reduce((pre,cur)=>({...pre,...cur}))
		skuSpec=Object.values(skuSpec).join(' + ')
		return skuSpec
	})
	//提取默认选择规格对应的商品名
	const getSkuName=computed(()=>{	
		return goodsDetail.value?.product.name+' '+getSkuSpec.value
	})
	onLoad(async(option)=>{
		const {id}=option
		if(id){
            goodsDetail.value= await goodsStore.fetchGoodsDetail(id)
			//获取商品选择相关的所有商品数据，以合成商品选择器所需的不同规格商品的价格、库存、图片、属性
			const ids=Object.values(goodsDetail.value.skuSpecValueMap)
			const promises=ids.map(e=>goodsStore.fetchGoodsDetail(e))
			const skuData=await Promise.all(promises)
			skus.value=skuData.map((e,index)=>{
				const id=e.productSku.id
				const price=e.productSku.salePrice
				const stock=e.productSku.stockNum
				const skuSpec=e.productSku.skuSpec
				const thumbImg=e.productSku.thumbImg
				//合成规格键值对
				const sku_attrs=skuSpec.split(',').map(e=>e.split(':')).map((e,i)=>{
				if(e[i]==='颜色') return {[e[0]]:{
					name:e[1],
					img:thumbImg
				}}
				return {[e[0]]:e[1]}
				}).reduce((pre,cur)=>({...pre,...cur}))
				return {id,price,stock,sku_attrs,index}
			})
		}
	})
	//商品选择器数据源
	const skus=ref([])
	/*
	** skus数据结构
	* stock 已选规格库存
	* price 已选择规格价格
	* id 已选择商品id
	* sku_attrs 已选规格键值对，包含name 已选规格名、img 规格对应图
	*/ 
const handleShowSku=async()=>{
	if(goodsDetail.value){
		skuShow.value=true
	}
}
//选择规格,规格信息改变更新商品详情数据
const skuChange=async(e)=>{
	//更新数据,与之前相同不更新
	if(e.id&&goodsDetail.value.productSku.id!==e.id) {
		//记录选择
		selectSkuIndex.value=e.index
		//更新数据
		goodsDetail.value=await goodsStore.fetchGoodsDetail(e.id)
	}
}
//计算价格
const numChange=(count)=>{
	console.log(count);
}
//加入购物车
const skuConfirm=(e)=>{
	console.log(e);
	//验证登录
}
//底部导航配置
const options= [{
			icon: 'home',
			text: '首页'
		},
		{
			icon: 'cart',
			text: '购物车',
			info: 0
		}, 
		{
			icon: 'heart-filled',
			text: '收藏',
			infoBackgroundColor:'#007aff',
			infoColor:"red"
		}]
const buttonGroup=[{
	      text: '加入购物车',
	      backgroundColor: '#ff0000',
	      color: '#fff'
	    },
	    {
	      text: '立即购买',
	      backgroundColor: '#ffa200',
	      color: '#fff'
	    }
	    ]
		//底部导航栏左侧按钮点击
const onClick=({index})=>{
	if(index===0) uni.navigateBack({delta:1})
	//检测登录态
	//1，点击购物车
	uni.navigateTo({
		url:'/pages/register/register'
	})
	//2
}
//底部导航右侧编辑
const buttonClick=({index})=>{
	//检测登录态
	uni.navigateTo({
		url:'/pages/login/login',
		events:{
			//监听被打开页面通过EventChannel发出的事件
			loginSuccess(){
				uni.showToast({
				    title: '登录成功',
				    icon: 'none'
				})
			}
		}
	})
	//0
	//1
}
</script>

<style lang="scss">
	.swiper,.swiper-item{
		height: 700rpx;
	}
.swiper-image{
	width: 100%;
	height: 100%;
}
.goods-info{
	padding: 20rpx 30rpx;
	.title{
		font-size: 32rpx;
		color: #303133;
	}
	.price{
		display: flex;
		align-items: center;
		height: 64rpx;
		padding: 10rpx 0;
		font-size: 26rpx;
		color: #fa436a;
	}
	.sale-price{
		font-size: 34rpx;
	}
	.old-price{
		margin: 0 12rpx;
		color: #909399;
		text-decoration: line-through;
	}
	.info-footer{
		display: flex;
		align-items: center;
		height: 50rpx;
		font-size: 24rpx;
		color: #909399;
		text{
			flex: 1;
		}
	}
}
.share-info{
	display: flex;
	align-items: center;
	color: #606266;
	background: #f8f8f8;
	padding: 12rpx 30rpx;
	text{
		font-size: 28rpx;
		margin-left: 10rpx;
	}
}
.select-info{
	font-size: 26rpx;
	color: #606266;
	.select-item{
		display: flex;
		align-items: center;
		padding: 10px 15px;
	}
	.tit{
		width: 140rpx;
	}
	.type{
		flex: 1;
		color: #303133;
	}
}
.comment-info{
	display: flex;
	flex-direction: column;
    padding: 20rpx 30rpx;
    margin-top: 16rpx;
	.comment-header{
		display: flex;
		align-items: center;
		height: 70rpx;
		font-size: 26rpx;
		color: #909399;
		.comment-tit{
			font-size: 15px;
			color: #303133;
			margin-right: 2px;			
		}
		.good-rate{
			flex: 1;
			text-align: right;
		}
		.comment-icon{
			margin-left: 10rpx;
		}
	}
	.comment-container{
		display: flex;
		padding: 20rpx 0;
	    .left{
			image{
				width: 80rpx;
				height: 80rpx;
			}
		}
		.right{
			flex: 1;
			display: flex;
			flex-direction: column;
			font-size: 28rpx;
			color: #606266;
			padding-left: 26rpx;
			.comment-content{
				font-size: 28rpx;
				color: #303133;
				margin: 20rpx 0;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				text-overflow: ellipsis;
				overflow: hidden;
			}
		}
		.buy-info{
			display: flex;
			justify-content: space-between;
			font-size: 24rpx;
			color: #909399;
		}
	}
}
.goods-detail{
	margin-top: 16rpx;
	.detail-desc{
		display: flex;
		justify-content: center;
		align-items: center;
		height: 80rpx;
		font-size: 30rpx;
		color: #303133;
		position: relative;
		text{
			padding: 0 20rpx;
			position: relative;
			// 设置背景遮住伪元素
			background-color: #fff;
			z-index: 1;
		}
		&::after{
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translateX(-50%);
			width: 300rpx;
			height: 0;
			content: "";
			border-bottom: 2rpx solid #ccc;
		}
	}
	.detail-image{
		image{
			width: 100%;
		}
	}
}
.uni-goods-nav{
	position: sticky;
	bottom: 0;
}
</style>
