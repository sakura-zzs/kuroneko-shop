import {defineStore} from 'pinia'
import {getOrderList} from '../services/order'

export const useOrderStore=defineStore('orderStore',{
	state:()=>{
		return {
			
		}
	},
	actions:{
		fetchOrderList(params){
			return getOrderList(params)
		}
	}
})