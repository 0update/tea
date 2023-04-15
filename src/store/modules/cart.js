import {
	CART_LIST,
	CHECK_ALL,
	UN_CHECK_ALL,
	CHECK_ITEM
} from './mutations-types.js'
import http from '@/common/api/request.js'
import {Toast,Dialog} from 'vant'
export default{
    state:{
		//购物车的数据条数，购物车有多少条list就有多少条
        list:[],
		selectList:[],		
    },
    getters:{
		isCheckedAll( state ){
			// console.log('state.list.length',state.list.length)			
			// console.log('state.selectList.length',state.selectList.length)
			// console.log(state.list.length == state.selectList.length)
		    return state.list.length == state.selectList.length;
		},
		total( state ){
		    let total = {
		        num:0,
		        price:0
		    }
		    state.list.forEach(v=>{
		        if( v.checked ){
		            total.num += parseInt(v.goods_num);
		            total.price += v.goods_price * v.goods_num;
		        }
		    })
		    return total;
		}
	},
	//mutations的数据变化会导致getters的数据变化，getters就会重新执行
    mutations:{
		[CART_LIST]( state, cartArr){
            state.list = cartArr;
			state.selectList = state.list.map(v=>{
			    return v.id;
			})
			
        },
		//全选
		[CHECK_ALL]( state ){
		    state.selectList = state.list.map(v=>{
		        v.checked = true;
		        return v.id;
		    })
		},
		//全不选
		[UN_CHECK_ALL]( state ){
		    state.list.forEach(v=>{
		        v.checked = false;
		    })
		    state.selectList = [];			
		},
		//单选
		[CHECK_ITEM]( state ,index ){
		    let id = state.list[index].id;
			// console.log(index)
			// console.log('state.list[index].id',state.list[index].id,state.selectList)
		    let i = state.selectList.indexOf(id);
		    //能在selectList找到对应的id，就删除
		    if( i > -1){
		        return state.selectList.splice(i,1);
		    }
		    //如果之前没有选中，就给selectList添加一个id进去
		    state.selectList.push( id );
		},
		//删除
		delGoods( state ){
		    state.list = state.list.filter(v=>{
				//将找不到的返回,也就是没被选中的，然后重新渲染
				return state.selectList.indexOf( v.id ) == -1
		    })
		}
    },
    actions:{
		checkAllFn({commit,getters}){
			// console.log(context)
			// console.log('1',getters.isCheckedAll)
			getters.isCheckedAll ? commit('unCheckAll') : commit('checkAll');
		},
		//删除操作
		delGoodsFn({commit,state},id){
		    //如果没有选中，则提示信息
		    if( state.selectList.length == 0 ){
		        Toast('请选择商品');
		    }
		    
		    let arrCart = [];
		    Dialog.confirm({
		      message: '确定要删除这些商品吗？',
		    }).then(() => {
		        
		        if( typeof id =='number' ){
		        //单个删除
		            arrCart = [id];
		            let index = state.list.findIndex(v=>{
		                return v.id == id 
		            })
		            state.list.splice(index,1);
		        }else{
		        //多选删除
				arrCart = state.selectList;
				commit('delGoods');
		        }
		        http.$axios({
		        	url:'/api/deleteCart',
		            method:'post',
		            data:{
		               arrId:arrCart
		            }
		        }).then(res=>{
		            console.log( res );
		        })
		    })
		}
	}
}