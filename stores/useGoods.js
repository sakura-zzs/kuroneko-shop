import {defineStore} from 'pinia'
import {getGoodsList} from '../services/goods'
export const useGoodsStore=defineStore('goodsStore',{
	state:()=>{
		return{
			goodsList:[]
		}
	},
	actions:{
		async fetchGoodsList(pageNum=1,limit=10,query){
			const res=await getGoodsList(pageNum,limit,query)
			this.goodsList=res
		}
	}
})