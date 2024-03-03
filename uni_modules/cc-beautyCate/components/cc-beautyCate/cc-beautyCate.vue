<template>
	<view>
		<view class="category-list">
			<!-- 左侧分类导航 -->
			<scroll-view scroll-y="true" class="left">
				<view class="row" v-for="(category, index) in categoryList" :key="category.id" :class="[category.id == showCategoryIndex ? 'on' : '']"
				 @click="showCategory(category.id)">
					<view class="text">
						<view class="block"></view>
						{{ category.name }}
					</view>
				</view>
			</scroll-view>
			<!-- 右侧子导航 -->
			<scroll-view scroll-y="true" class="right">
				<view class="category" v-for="(category, index) in categoryList" :key="index" v-show="category.id == showCategoryIndex">
					<view v-for="(box, i) in category.children" :key="i">
						<view style="text-align: center">
							<text style="color: gainsboro">—</text>
							<text style="color: #000000;margin-right: 8px;margin-left: 8px">{{ box.name }}</text>
							<text style="color: gainsboro">—</text>
						</view>
						<view class="list" v-if="box.children.length>0" >
							<view class="box" v-for="(item, i1) in box.children" :key="i1">
								<image  @click="toCategory(item)" :src="item.imageUrl" lazy-load="https://taobao.xianmxkj.com/logo.png"></image>
								<view class="text">{{ item.name }}</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>
<script>
	//高德SDK
	export default {
		
		props: {
		
			categoryList: {
				type: Array,
				default () {
					return []
				}
			}
		
		
		},
		data() {
			return {
				showCategoryIndex: 1,
				headerPosition: 'fixed',
        	};
		},
		
		onPageScroll(e) {
			//兼容iOS端下拉时顶部漂移
			if (e.scrollTop >= 0) {
				this.headerPosition = 'fixed';
			} else {
				this.headerPosition = 'absolute';
			}
		},
		methods: {
			//分类切换显示
			showCategory(index) {
				this.showCategoryIndex = index;
			},
			toCategory(item) {
				
				this.$emit("itemClick",item);
			}
		}
	};
</script>
<style lang="scss">
	

	.category-list {
		width: 100%;
		background-color: #fff;
		display: flex;
		

		.left,
		.right {
			// 修复不能置顶问题
			/* 	#ifdef H5 */
			top:90upx;
			/* #endif */
			/* 	#ifndef H5 */
			top:0upx;
			/* #endif */

			bottom: 0upx;
		}

		.left {
			position: fixed;
			width: 24%;
			left: 0upx;
			background-color: #f2f2f2;

			.row {
				width: 100%;
				height: 90upx;
				display: flex;
				align-items: center;

				.text {
					width: 100%;
					position: relative;
					font-size: 28upx;
					display: flex;
					justify-content: center;
					color: #3c3c3c;

					.block {
						position: absolute;
						width: 0upx;
						left: 0;
					}
				}

				&.on {
					height: 100upx;
					background-color: #fff;

					.text {
						font-size: 30upx;
						font-weight: 600;
						color: #2d2d2d;

						.block {
							width: 10upx;
							height: 80%;
							top: 10%;
							background-color: #f06c7a;
						}
					}
				}
			}
		}

		.right {
			margin-left: 24%;
			width: 76%;
			left: 24%;

			.category {
				width: 94%;
				padding: 20upx 3%;

				.banner {
					width: 100%;
					height: 24.262vw;
					border-radius: 10upx;
					overflow: hidden;
					box-shadow: 0upx 5upx 20upx rgba(0, 0, 0, 0.3);

					image {
						width: 100%;
						height: 24.262vw;
					}
				}

				.list {
					margin-top: 40upx;
					width: 100%;
					display: flex;
					flex-wrap: wrap;

					.box {
						width: calc(65.44vw / 3);
						margin-bottom: 30upx;
						display: flex;
						justify-content: center;
						align-items: center;
						flex-wrap: wrap;

						image {
							width: 60%;
							height: calc(71.44vw / 3 * 0.6);
						}

						.text {
							margin-top: 5upx;
							width: 100%;
							display: flex;
							justify-content: center;
							font-size: 26upx;
						}
					}
				}
			}
		}
	}
</style>

