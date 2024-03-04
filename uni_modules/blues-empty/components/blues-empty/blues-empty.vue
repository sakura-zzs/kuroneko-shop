<template>
	<view :class="['blues-empty']" :style="Bg+Height">
		<image :style="ImgSize" :src="Img" mode="aspectFit"></image>
		<view class="text">{{text}}</view>
		<view class="slot" v-if="$slots.default"> <slot></slot> </view>
	</view>
</template>

<script>
	export default {
		name:'oEmpty',
		// #ifdef MP-WEIXIN
		options:{ virtualHost:true },
		// #endif
		props:{
			// img：缺省图片,可选值 error network search，支持传入图片URL，图片仅支持jpg/png/svg三种格式
			// imgSize：缺省图尺寸,
			// text：描述文字,
			// bg：背景色
            // height：组件占位最小高度，实际高度看是否被内容撑开
			img:{
				type:String,
				default:'e'
			},
			imgSize:{
				type:[String,Number],
				default:'320'
			},
			text:{
				type:String,
				default:'暂无数据'
			},
			bg:{
				type:String,
				default:'#fff'
			},
            height:{
                type:String,
                default:'480rpx'
            }
		},
		data() {
			return {
				list:[
					{
						name:'暂无收藏信息',
						img:'empty'
					},{
						name:'暂无网络信息',
						img:'network'
					},{
						name:'购物车为空',
						img:'vehicle'
					} ,{
						name:'加载失败',
						img:'load'
					} ,{
						name:'无权限',
						img:'qx'
					} ,{
						name:'正在加载中 ',
						img:'loading'
					} ,{
						name:'暂无信息 ',
						img:'msg'
					} ,{
						name:'信息已发送',
						img:'msgs'
					} ,{
						name:'收藏夹为空',
						img:'favorite'
					} ,{
						name:'正在开发中',
						img:'kaifa'
					},{
						name:'暂无历史记录',
						img:'record'
					},{
						name:'暂无日程安排',
						img:'date'
					}
				]
				
			}
		},
		methods: {
			
		},
		computed: {
			Bg(){ return `backgroundColor:${this.bg};`},
            Height(){
				if(['rpx','px','rem','em','vw','vh','%'].includes(this.height)) return `minHeight:${this.height}`
				else return `minHeight:${this.height}rpx`
			},
			Img(){
				console.log(this.img)
				if(this.list.some(el=>{
				return el.img == this.img
				})) return`/uni_modules/blues-empty/static/${this.img}.svg`
				else if (this.img.endsWith('.jpg') || this.img.endsWith('.png') || this.img.endsWith('.svg')) return this.img;
				else return `/uni_modules/blues-empty/static/empty.svg`	
			},
			ImgSize(){
				if(['rpx','px','rem','em','vw','%'].includes(this.imgSize)) return `width:${this.imgSize};height:${this.imgSize};`
				else return `width:${this.imgSize}rpx;height:${this.imgSize}rpx;`
			}
		},
	}
</script>

<style lang="scss">
	.blues-empty{
		// min-height:350rpx;
		display: flex;
		flex-direction: column;
		padding: 64rpx 0!important;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
	}
	.center{text-align: center;}
	.text{
		color:#969798;
		padding: 20rpx 0;
	}
	.slot{
		padding-top: 20rpx;
	}
</style>
