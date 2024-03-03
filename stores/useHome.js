import {defineStore} from 'pinia'
import {getHomeData} from '../services/home'
export const useHomeStore=defineStore('homeStore',{
	state:()=>{
		return{
			homeData:[]
		}
	},
	actions:{
		async fetchHomeData(){
			const res=await getHomeData()
			this.homeData=res
		}
	}
})