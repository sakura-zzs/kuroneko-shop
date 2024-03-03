import {defineStore} from 'pinia'
import {getCategoryData} from '../services/category'

export const useCategoryStore=defineStore('categoryStore',{
	state:()=>{
		return{
			categoryData:[]
		}
	},
	actions:{
		async fetchCategoryData(){
			const res=await getCategoryData()
			this.categoryData=res
		}
	}
})