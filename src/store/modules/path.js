import {INIT_DATA} from './mutations-types.js'
export default{
	state:{
		list:[]
	},
	mutations:{
		[INIT_DATA]( state , arrPath ){
		    state.list = arrPath;
		}
	}
}
		