import kuronekoRequest from './index'

	
export const loginForPass=async({username,password})=>{
	const {code,data}= await kuronekoRequest.post({url:'/api/user/userInfo/login',data:{username,password}})
	if(code===200){
		return data
	}else{
		return false
	}
}

export const getUserInfo=async()=>{
	const {data}=await kuronekoRequest.get({url:'/api/user/userInfo/auth/getCurrentUserInfo'})
	return data
}

export const getVerifyCode=async(phone)=>{
	const {code}=await kuronekoRequest.get({url:`/api/user/sms/sendCode/${phone}`})
	
	if(code==200) return true
	return false
}
export const registerForPhone=async({username,password,nickName,code})=>{
	const {code:res}=await kuronekoRequest.post({url:'/api/user/userInfo/register',data:{username,password,nickName,code}})
	if(res==200) return true
	return false
}