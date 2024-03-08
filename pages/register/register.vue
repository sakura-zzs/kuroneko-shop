<template>
	<view class="page">

		<view class="title">注册/忘记密码</view>
		<view class="input_box"><input type="text" v-model="phone" placeholder="请输入手机号或邮箱" /></view>
		<view class="input_box">
			<input type="number" v-model="code" placeholder="请输入验证码" />
			<button @click="getCode">{{codeText}}</button>
		</view>
		<view class="input_box"><input password v-model="password" placeholder="6-18位不含特殊字符的数字、字母组合" /></view>
		<view class="input_box"><input password v-model="confirmPassword" placeholder="请确认密码" /></view>
		<view class="input_box"><input type="text" v-model="nickName" placeholder="请输入昵称" @confirm="onSubmit" />
		</view>
		<kuro-protocol-sel @protocolClick="protocolClick"></kuro-protocol-sel>
		<view class="btn_box"><button @click="onSubmit">注册</button></view>
	</view>
</template>

<script>

import {useUserStore} from '../../stores/useUser'
const userStore=useUserStore()
	var clear;
	const phoneRegular=/^(13|14|15|18|17)[0-9]{9}$/
	//使用正向预查(?=pattern)
	const passReg=/^(?=.*[0-9])(?=.*[a-zA-Z])[0-9a-zA-Z]{6,18}/
	const emailReg=/^\w+@\w+(\.\w+)+$/
	export default {
		data() {
			return {
				//手机号/邮箱账号
				phone: '',
				// 密码
				password: '',
				//验证码
				code: '',
				//确认密码
				confirmPassword: '',
				// 昵称
				nickName: "",
				//验证码
				codeText: '获取验证码',
				//验证码已发
				readonly: false,
				//用户协议
				agree: false,
			};
		},
		//第一次加载
		onLoad(e) {},
		//页面显示
		onShow() {},
		//方法
		methods: {
			//获取验证码
			async getCode() {
				if (this.readonly) {
					uni.showToast({
						title: '验证码已发送',
						icon: 'none'
					});
					return;
				}
				if (!this.phone) {
					uni.showToast({
						title: '请输入手机号/邮箱号',
						icon: 'none'
					});
					return;
				}
				if (!phoneRegular.test(this.phone)&&!emailReg.test(this.phone)) {
					uni.showToast({
						title: '请输入正确的手机号/邮箱号',
						icon: 'none'
					});
					return;
				}
				await userStore.fetchVerifyCode(this.phone)
				this.getCodeState();
			},
			//验证码按钮文字状态
			getCodeState() {
				const _this = this;
				this.readonly = true;
				this.codeText = '60S后重新获取';
				var s = 60;
				clear = setInterval(() => {
					s--;
					_this.codeText = s + 'S后重新获取';
					if (s <= 0) {
						clearInterval(clear);
						_this.codeText = '获取验证码';
						_this.readonly = false;
					}
				}, 1000);
			},
			async onSubmit() {
				if (!this.agree) {
					uni.showToast({
						title: '请先同意《用户协议》和《隐私协议》',
						icon: 'none'
					});
					return;
				}
				if (!this.phone) {
					uni.showToast({
						title: '请输入手机号/邮箱号',
						icon: 'none'
					});
					return;
				}
				if (!phoneRegular.test(this.phone)&&!emailReg.test(this.phone)) {
					uni.showToast({
						title: '请输入正确的手机号/邮箱号',
						icon: 'none'
					});
					return;
				}
				if (!this.code) {
					uni.showToast({
						title: '请输入验证码',
						icon: 'none'
					});
					return;
				}
				if (!this.password) {
					uni.showToast({
						title: '请输入密码',
						icon: 'none'
					});
					return;
				}
				if(!passReg.test(this.password)){
					return uni.showToast({
						title:'请输入6-18位且至少有一个数字和字母'
					})
				}
				if (!this.confirmPassword) {
					uni.showToast({
						title: '请输入确认密码',
						icon: 'none'
					});
					return;
				}
				if (this.confirmPassword != this.password) {
					uni.showToast({
						title: '两次密码不一致',
						icon: 'none'
					});
					return;
				}
				if (!this.nickName.trim().length) {
					uni.showToast({
						title: '请输入昵称',
						icon: 'none'
					});
					return;
				}
				let httpData = {
					username: this.phone,
					password: this.password,
					nickName:this.nickName,
					code: this.code
				};
				const res= await userStore.register(httpData)
				if(res) {
					uni.showToast({
							title: '注册成功',
							icon: 'success'
						})
					uni.navigateTo({
						url:'/pages/login/login'
					})
				}else{
					uni.showToast({
							title: '注册失败',
							icon: 'error'
						})
				}
			},
			protocolClick(agree){
				this.agree=agree
			},
			//页面隐藏
			onHide() {},
			//页面卸载
			onUnload() {},
			//页面下来刷新
			onPullDownRefresh() {},
			//页面上拉触底
			onReachBottom() {},

		},
	}
</script>
<style lang="scss" scoped>
	// @import '@/style/mixin.scss';

	.page {
		background-color: #FFF;
		padding: 0 56rpx;
		min-height: 100vh;

		.title {
			padding: 28rpx 0 20rpx 0;
			font-size: 52rpx;
			color: #333333;
		}

		.input_box {
			display: flex;
			justify-content: space-between;
			height: 100rpx;
			padding-top: 20rpx;
			border-bottom: 1rpx solid #eeeeee;

			input {
				flex: 1;
				height: 80rpx;
				line-height: 80rpx;
				font-size: 30rpx;
			}

			button {
				height: 78rpx;
				line-height: 78rpx;
				font-size: 30rpx;
				color: #000;

				&:active {
					background-color: transparent;
				}
			}
		}

		.btn_box {
			margin-top: 40rpx;

			button {
				font-size: 32rpx;
				color: #fff;
				height: 100rpx;
				line-height: 100rpx;
				border-radius: 8rpx;
				background-color: #fa436a;
			}
		}
	}
</style>