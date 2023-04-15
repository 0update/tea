//尝试用拦截器和将axios挂载到prototype上完成axios的二次封装（未完成）
import { Indicator } from 'mint-ui';
import axios from 'axios'
import store from '@/store'
import router from '@/router'
export default{
	
	common:{
		method:'GET',
		data:{},
		params:{},
		headers:{}
	},
	$axios( options={} ){
		
		options.method = options.method || this.common.method;
		options.data = options.data || this.common.data;
		options.params = options.params || this.common.params;	
		options.headers = options.headers || this.common.headers;
		Indicator.open('加载中...');	
		//是否是登录状态
		if( options.headers.token ){
		    options.headers.token = store.state.user.token;
		    if( !options.headers.token ){
		       router.push('/login');
		   }
		}
		//请求并返回 
		return axios(options).then(v=>{
			let data = v.data.data;
			
			return new Promise((res,rej)=>{
				if( !v ) return rej();
				
				setTimeout(()=>{
					Indicator.close();
				},500)
				//把data返回
				console.log(data);
				res( data );
			
			})
		})
		
	}
	
}