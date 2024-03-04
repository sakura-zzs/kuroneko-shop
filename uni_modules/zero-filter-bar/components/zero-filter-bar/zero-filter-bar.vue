<template>
	<view class="container">
		<view class="tabbar" :class="[needSticky ? 'sticky' : '']" :style="{ background: backgroundColor, top: needSticky ? offsetTop + 'rpx' : 0 }">
			<scroll-view class="scroll_view" scroll-x="true" :scroll-left="scrollLeft" :scroll-into-view="`item${current}`" :scroll-with-animation="true">
				<view
					class="item"
					:id="`item${index}`"
					:style="{ width: itemWidth ? itemWidth + 'px' : 'auto' }"
					v-for="(item, index) in dataList"
					:key="index"
					@click.stop="handleClick(item, index)"
				>
					<view :class="{'active':current===index}" :style="{ color: current == index ? selectColor : defaultColor }">{{ item.name }}</view>
					<view class="sort" v-if="item.sort">
						<uni-icons class="arrow arrow_top" :color="current == index && !desc ? selectColor : defaultColor" type="top" size="14"></uni-icons>
						<uni-icons class="arrow arrow_bottom" :color="current == index && desc ? selectColor : defaultColor" type="bottom" size="14"></uni-icons>
					</view>
				</view>
			</scroll-view>
			<view v-if="extraBtn" class="extra" @click="extraClick" :style="{ background: backgroundColor, color: currentExtra ? selectColor : defaultColor }">
				{{ extraText || '' }}
				<uni-icons v-if="extraIcon" class="icon" :color="currentExtra ? selectColor : defaultColor" :type="extraIcon" size="16"></uni-icons>
			</view>
		</view>
		<!-- 占位用，使用fixed时生成一个盒子占位 -->
		<view class="temp" v-if="needSticky && fixedHolder" style="height: 80rpx"></view>
	</view>
</template>

<script>
export default {
	name: 'zero-filter-bar',
	emits: ['filter', 'extraClick'],
	props: {
		// 传入数组， 数组元素中必须包含字段，id，name； sort为是否需要排序按钮，dragDown下拉选项
		dataList: {
			type: Array,
			default: []
		},
		// 默认字体颜色
		defaultColor: {
			type: String,
			default: '#333333'
		},
		// 选中项颜色
		selectColor: {
			type: String,
			default: '#409EFF'
		},
		// 背景颜色
		backgroundColor: {
			type: String,
			default: '#FFFFFF'
		},
		// 是否展示右侧按钮
		extraBtn: {
			type: Boolean,
			default: true
		},
		// 右侧固定按钮文字
		extraText: {
			type: [String, Boolean],
			default: '筛选'
		},
		// 右侧固定图标
		extraIcon: {
			type: [String, Boolean],
			default: 'bars'
		},
		// 子元素宽度
		width: {
			type: Number,
			default: 0
		},
		// 是否启用自动平均分布，当子元素宽度总和小于屏幕宽度时使用
		autoJustify: {
			type: Boolean,
			default: true
		},
		// 是否启用吸顶
		needSticky: {
			type: Boolean,
			default: true
		},
		offsetTop: {
			type: Number,
			default: 0
		},
		// 吸顶时占位盒子
		fixedHolder: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			current: 0,
			desc: true,
			scrollWidth: 0, // 导航区宽度
			scrollLeft: 0, // 横向滚动条位置
			itemWidth: this.width,
			isFixedTop: false,
			currentExtra: false
		};
	},
	mounted() {
		this.getScrollW();
	},
	methods: {
		setCurrentExtraOn() {
			this.currentExtra = true;
			this.current = -1;
			this.scrollLeft = 0;
		},
		getScrollW() {
			const query = uni.createSelectorQuery().in(this);
			query
				.select('.scroll_view')
				.boundingClientRect(data => {
					// 拿到 scroll-view 组件宽度
					this.scrollWidth = data.width;
					this.scrollTop = data.top;
				})
				.exec();

			query
				.selectAll('.item')
				.boundingClientRect(data => {
					let dataLen = data.length;
					let totalW = 0;
					for (let i = 0; i < dataLen; i++) {
						//  scroll-view 子元素组件距离左边栏的距离
						this.dataList[i].left = data[i].left;
						//  scroll-view 子元素组件宽度
						this.dataList[i].width = data[i].width;
						totalW += this.dataList[i].width;
					}
					// console.log('totalW', totalW);
					if (this.autoJustify && totalW < this.scrollWidth) {
						this.itemWidth = this.scrollWidth / this.dataList.length;
					}
				})
				.exec();
		},

		handleClick(item, index) {
			// console.log('click', item, index);
			if (index == this.current) {
				if (item.sort) {
					this.desc = !this.desc;
				}
			} else {
				this.desc = true;
			}
			this.current = index;
			this.scrollLeft = item.left - this.scrollWidth / 2 + item.width / 2;
			// 返回index ，desc：是否降序
			this.$emit('filter', index, this.desc, item);
		},
		extraClick() {
			this.$emit('extraClick', true);
		}
	}
};
</script>

<style lang="scss" scoped>
.container {
}
.sticky {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 1;
}
.tabbar {
	display: flex;
	flex-flow: row nowrap;
	font-size: 32rpx;
	line-height: 80rpx;
	// padding: 20rpx 0;
	.scroll_view {
		white-space: nowrap;
		justify-content: space-around;
		.item {
			box-sizing: border-box;
			display: inline-flex;
			flex-flow: row nowrap;
			align-items: center;
			padding: 0 20rpx;
			justify-content: center;
		}
		.sort {
			display: inline-flex;
			flex-direction: column;
			.arrow {
				margin-left: 5rpx;
				line-height: 8px;
			}
			.arrow_top {
			}
		}
	}
	.extra {
		box-shadow: -8rpx 0 10rpx -8rpx #cccccc;
		// min-width: 60rpx;
		padding: 0 20rpx;
		text-align: center;
		white-space: nowrap;
		.icon {
		}
		&:active {
			filter: brightness(0.8);
		}
	}
}
.uni-drawer--right {
	overflow: hidden;
	border-top-left-radius: 20rpx;
	border-top-right-radius: 20rpx;
}
.active{
	border-bottom: 4rpx solid red;
}
</style>
