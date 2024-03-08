import {BASE_URL}from './config'
class KuronekoRequest{
  BASE_URL
  constructor(BASE_URL){
    this.BASE_URL=BASE_URL
  }
   request(option){
    //携带token
    const token=uni.getStorageSync('token')
	console.log(token);
    return new Promise((resolve,reject)=>{
	  uni.showLoading({
	  	title: '加载中'
	  })
      uni.request({
        // 如果同名属性在展开运算符后，则展开运算符不会覆盖后面的同名属性
        ...option,
        url:this.BASE_URL+option.url,
        header:{...option.header,token},
        success:res=>{
			resolve(res.data)
			uni.hideLoading()
		},
        fail:err=>{
			reject(err)
			uni.hideLoading()
		}
      })
    })
  }
  get(option){
    return this.request({...option,method:'GET'})
  }
  post(option){
    return this.request({...option,method:'POST'})
  }
  put(option){
    return this.request({...option,method:'PUT'})
  }
  delete(option){
    return this.request({...option,method:'DELETE'})
  }
}
export default new KuronekoRequest(BASE_URL)