import {defineStore} from 'pinia'
import {getGoodsList,getBrandList,getGoodsDetail} from '../services/goods'
export const useGoodsStore=defineStore('goodsStore',{
	state:()=>{
		return{
			goodsList:[],
			brandList:[]
		}
	},
	actions:{
		async fetchGoodsList(pageNum=1,limit=10,query){
			const res=await getGoodsList(pageNum,limit,query)
			this.goodsList=res
		},
		async fetchBrandList(){
			const res=await getBrandList()
			this.brandList=res
		},
		async fetchGoodsDetail(id){
			const res=await getGoodsDetail(id)
			return res
		}
	}
})