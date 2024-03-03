import kuronekoRequest from './index.js'

export const getHomeData=async ()=>{
	const {data}=await kuronekoRequest.get({url:'/api/product/index'})
	return data
}