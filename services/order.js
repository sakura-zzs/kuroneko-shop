import kuronekoRequest from './index'

export const getOrderList=({page,limit,orderStatus})=>{
	if(orderStatus===-1){
		 return  kuronekoRequest.get({url:`/api/order/orderInfo/auth/${page}/${limit}`}).catch(err=>console.log(err))
	}else{
		return kuronekoRequest.get({url:`/api/order/orderInfo/auth/${page}/${limit}?orderStatus=${orderStatus}`})
	}
}