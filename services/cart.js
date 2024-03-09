import kuronekoRequest from './index'

export const sendAddCartRequest=async({skuId,skuNum})=>{
	const {code}=await kuronekoRequest.get({url:`/api/order/cart/auth/addToCart/${skuId}/${skuNum}`})
	return code
}

export const getCartList=async()=>{
	const {data}=await kuronekoRequest.get({url:'/api/order/cart/auth/cartList'})
	return data
}
export const deleteGoods=async(skuId)=>{
	const {code}=await kuronekoRequest.delete({url:`/api/order/cart/auth/deleteCart/${skuId}`})
	return code
}
export const updateGoodsChecked=async({skuId,isChecked})=>{
	const {code}=await kuronekoRequest.get({url:`/api/order/cart/auth/checkCart/${skuId}/${isChecked}`})
	return code
}
export const updateAllGoodsChecked=async(isChecked)=>{
	const {code}=await kuronekoRequest.get({url:`/api/order/cart/auth/allCheckCart/${isChecked}`})
	return code
}
export const clearGoods=async()=>{
	const {code}=await kuronekoRequest.get({url:'/api/order/cart/auth/clearCart'})
	return code
}