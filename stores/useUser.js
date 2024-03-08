import {defineStore} from 'pinia'
import {loginForPass,getUserInfo,getVerifyCode,registerForPhone} from '../services/user'
export const useUserStore=defineStore('userStore',{
	state:()=>{
		return{
			loginStatus:false,
			userInfo:null
		}
	},
	actions:{
		async login(data){
			const res=await loginForPass(data)
			if(res){
				this.loginStatus=true
				uni.setStorageSync('token',res)
				const userInfo=await getUserInfo()
				this.userInfo=await getUserInfo()
				uni.setStorageSync('userInfo',userInfo)
				return true
			}
			 return false
		},
		async checkLogin(){
			const token=uni.getStorageSync('token')
			if(token){
				 this.loginStatus=true
				 this.userInfo=await getUserInfo()
			}
		},
		async fetchVerifyCode(phone){
			const res=await getVerifyCode(phone)
			if(res) return true
			return false
		},
		async register(data){
			const res=await registerForPhone(data)
			if(res) return true
			return false
		}
	}
})