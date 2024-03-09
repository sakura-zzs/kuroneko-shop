import {defineStore} from 'pinia'
import {sendAddCartRequest,getCartList,deleteGoods,updateGoodsChecked,updateAllGoodsChecked,clearGoods} from '../services/cart'

export const useCartStore=defineStore('cartStore',{
	state:()=>{
		return{
			cartList:[]
		}
	},
	actions:{
		async addCart(query){
			const code=await sendAddCartRequest(query)
			if(code==200) return true
			return false
		},
		async fetchCartList(){
			this.cartList=await getCartList()
		},
		async deleteCart(skuId){
			const code=await deleteGoods(skuId)
			if(code==200) return true
			return false
		},
		async updateCartChecked(params){
			const code=await updateGoodsChecked(params)
			if(code==200) return true
			return false
		},
		async updateAllCartChecked(isChecked){
			const code=await updateAllGoodsChecked(isChecked)
			if(code==200) return true
			return false
		},
		async clearCart(){
			const code=await clearGoods()
			if(code==200) return true
			return false
		},
	}
})