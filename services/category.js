import kuronekoRequest from './index.js'

export const getCategoryData=async ()=>{
	const {data}=await kuronekoRequest.get({url:'/api/product/category/findCategoryTree'})
	return data
}