import {defineStore} from 'pinia'
import {getOrderList,payForAliPay} from '../services/order'

export const useOrderStore=defineStore('orderStore',{
	state:()=>{
		return {
			
		}
	},
	actions:{
		fetchOrderList(params){
			return getOrderList(params)
		},
		async sendAliPayRequest(orderNo){
			await payForAliPay(orderNo)
		}
	}
})