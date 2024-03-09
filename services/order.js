import kuronekoRequest from './index'

export const getOrderList=({page,limit,orderStatus})=>{
	if(orderStatus===-1){
		 return  kuronekoRequest.get({url:`/api/order/orderInfo/auth/${page}/${limit}`}).catch(err=>console.log(err))
	}else{
		return kuronekoRequest.get({url:`/api/order/orderInfo/auth/${page}/${limit}?orderStatus=${orderStatus}`})
	}
}

export const payForAliPay= async (orderNo)=>{
	const res=await kuronekoRequest.get({url:`/api/order/alipay/submitAlipay/${orderNo}`})
	console.log(res);
}