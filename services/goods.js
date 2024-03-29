import kuronekoRequest from './index'

export const getGoodsList=async(pageNum,limit,query)=>{
	let url=`/api/product/${pageNum}/${limit}`
	if(query?.keyword) url=`${url}?keyword=${query.keyword}`
	if(query?.brandId) url=`${url}?brandId=${query.brandId}`
	if(query?.category1Id) url=`${url}?category1Id=${query.category1Id}`
	if(query?.category2Id) url=`${url}?category2Id=${query.category2Id}`
	if(query?.category3Id) url=`${url}?category3Id=${query.category3Id}`
	if(query?.order) url=`${url}?order=${query.order}`
	const {data}=await kuronekoRequest.get({url})
	return data.list
}
export const getBrandList=async()=>{
	const {data}=await kuronekoRequest.get({url:'/api/product/brand/findAll'})
	return data
}
export const getGoodsDetail=async(id)=>{
	const {data}=await kuronekoRequest.get({url:`/api/product/item/${id}`})
	return data
}