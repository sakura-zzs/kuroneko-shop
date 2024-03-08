<template>
    <view class="content">

        <!-- colors：设置颜色 tabList：tabs数组 active：当前选择序列 tabsClick：点击事件 -->
        <view class="nav_top" style="border-bottom: 1upx solid #F8F8F8;margin-top: 10px;">
            <cc-orderTabs :colors="colors" :tabList="tabList" :active="active" @tabsClick="tabsClick"></cc-orderTabs>
        </view>

    </view>

</template>

<script>
    export default {
        components: {

        },
        data() {
            return {
                colors: '#fa436a',
                tabList: [{
                        name: '全部',
                        id: 0
                    }, {
                        name: '待付款',
                        id: 1
                    }, {
                        name: '待收货',
                        id: 2
                    }, {
                        name: '待评价',
                        id: 3
                    },
                    {
                        name: '已取消',
                        id: 4
                    }
                ],
                active: 0,
            }
        },

        methods: {

            tabsClick(item, index) {

                this.active = item.id

            },
        },
		onLoad(option) {
			this.active=option.index
		}
    }
</script>

<style lang="scss" scoped>
    .content {
        display: flex;
        flex-direction: column;

    }
</style>