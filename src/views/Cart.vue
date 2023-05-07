<template>
	<div class='cart container'>
        <header>
            <i class='iconfont icon-fanhui' @click="$router.back()"></i>
            <span>购物车</span>
            <span @click='isNavBar' v-text='isNavStatus ? "完成":"编辑"'></span>
        </header>
        <section>
            <div class='cart-title'>
                <van-checkbox  @click='checkAllFn' :value="isCheckedAll"></van-checkbox>
                <span>商品</span>
            </div>
            <ul>
                <li v-for='(item,index) in list' :key='index'>
                    <div class='check'>
                        <van-checkbox @click='checkItem(index)' v-model="item.checked"></van-checkbox>
                    </div>
                    <h2>
                        <img :src="item.goods_imgUrl" alt="">
                    </h2>
                    <div class='goods'>
                        <div class='goods-title'>
                            <span>{{item.goods_name}}</span>
                            <i class='iconfont icon-lajitong' @click='delGoodsFn(item.id)'></i>
                        </div>
                        <div class='goods-price'>¥{{item.goods_price}}</div>
                        <van-stepper @change='changeNum($event,item)' v-model="item.goods_num" integer />
                    </div>
                </li>
            </ul>
        </section>
        <footer>
            <div class='radio'>
				<!-- value收集到的是选中和未选中的值 -->
                <van-checkbox @click='checkAllFn' :value="isCheckedAll"></van-checkbox>
            </div>
            <div class='total' v-show='!isNavStatus'>
                <div>
                    共有
                    <span class='total-active'>{{total.num}}</span>
                    件商品
                </div>
                <div>
                    <span>总计：</span>
                    <span class='total-active'>¥{{total.price.toFixed(2)}} + 0茶币</span>
                </div>
            </div>
			<div class='order' v-if='isNavStatus' @click='delGoodsFn'>删除</div>
            <div class='order' @click='goOrder' v-else>去结算</div>
        </footer>
	</div>
</template>

<script>
import {mapState,mapMutations,mapGetters,mapActions} from 'vuex'
import {Toast} from 'vant'
import http from '@/common/api/request.js'
export default {
    name: "Cart",
    data () {
        return {
			isNavStatus:false,
            checked:true,
        }
    },
	created(){
	    this.getData();
	},
	computed:{
	 ...mapState({
	     list:state=>state.cart.list,
		 selectList:state=>state.cart.selectList
	 }) ,
	 ...mapGetters(['isCheckedAll','total']),
	 goodsList(){
	     return this.selectList.map(id=>{
	         return this.list.find(v=>v.id == id);
	     })
	 }
	},
	 methods:{
		...mapMutations(['cartList','checkItem','initOrder']),
		...mapActions(['checkAllFn','delGoodsFn']),
	goOrder(){
	    
	    if( !this.selectList.length ){
	        Toast('请至少选择一件商品');
	        return;
	    }
		let newList = [];
		this.list.forEach(item=>{
		    this.selectList.filter(v=>{
		        if( v == item.id ){
		            newList.push( item );
		        }
		    })
		})
		//生成一个订单
		http.$axios({
			url:'/api/addOrder',
		    method:'post',
		    headers:{
		        token:true
		    },
		    data:{
		        arr:newList
		    }
		}).then(res=>{
		    if( !res.success ) return;
			//订单号
			this.initOrder(res.data);
		    //跳转订单页面
		    this.$router.push({
		        path:'/order',
		        query:{
		            detail:JSON.stringify( this.selectList ),
					goodsList:JSON.stringify( this.goodsList )
		        }
		    });
			console.log(this.goodsList)
		})
	},
	async getData(){
		let res = await http.$axios({
			url:'/api/selectCart',
			method:'post',
			headers:{
				token:true
			},
		})		
		res.data.forEach(v=>{
			v['checked']=true;
			
		})	
		
		this.cartList(res.data);
	},
	isNavBar(){
		this.isNavStatus = !this.isNavStatus;
	},
		//value 是修改后的数量
		//item.id 是购物车商品的id
		changeNum(value,item){
			http.$axios({
				url:'/api/updateNum',
				method:'post',
				headers:{
					token:true
				},
				data:{
					id:item.id,
					num:value
				}
			})
		}
	}
};
</script>
<style scoped lang="scss">
header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 1.173333rem;
    color:#fff;
    background-color: #b0352f;
    i{
        padding:0 0.4rem;
        font-size:0.586666rem;
    }
    span{
        padding:0 0.4rem;
        font-size:0.426666rem;
    }
}
section{
    background-color: #f5f5f5;
    .cart-title{
        display: flex;
        padding:0.533333rem;
        span{
            padding:0 0.4rem;
            font-weight: 500;
            font-size:0.48rem;
        }
    }
    ul{
        display: flex;
        flex-direction: column;
        li{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding:0.16rem 0.533333rem;
            margin:0.213333rem 0;
            background-color: #fff;
            .check{
                padding-right:0.373333rem;
            }
            .goods{
                display: flex;
                flex-direction: column;
                padding-left: .4rem;
                font-size:0.32rem;
                .goods-title{
                    display: flex;
                    i{
                        font-size:0.586666rem;
                    }
                }
                .goods-price{
                    padding:0.08rem 0;
                    color:#b0352f;
                }
                ::v-deep .van-stepper{
                    text-align: right;
                }
            }
            img{
                width: 1.973333rem;
                height: 1.973333rem;
            }
        }
    }
}
footer{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 1.28rem;
    border-top:0.053333rem solid #ccc;
    .radio{
        padding:0 0.4rem;
    }
    .total{
        flex:1;
        font-size:0.32rem;
        .total-active{
            color:#b0352f;
        }
    }
    .order{
        width: 3.2rem;
        line-height: 1.28rem;
        color:#fff;
        text-align: center;
        font-size: 0.426666rem;
        background-color: #b0352f;
    }
}
</style>