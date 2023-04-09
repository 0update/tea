<template>
	<div class='cart container'>
        <header>
            <i class='iconfont icon-fanhui'></i>
            <span>购物车</span>
            <span>编辑</span>
        </header>
        <section>
            <div class='cart-title'>
                <van-checkbox v-model="checked"></van-checkbox>
                <span>商品</span>
            </div>
            <ul>
                <li>
                    <div class='check'>
                        <van-checkbox v-model="checked"></van-checkbox>
                    </div>
                    <h2>
                        <img src="../../public/images/like.jpeg" alt="">
                    </h2>
                    <div class='goods'>
                        <div class='goods-title'>
                            <span>盒装  武夷山原产地 全芽灰芽花香金骏眉 3號150g </span>
                            <i class='iconfont icon-lajitong'></i>
                        </div>
                        <div class='goods-price'>¥128.00</div>
                        <van-stepper v-model="value" integer />
                    </div>
                </li>
            </ul>
        </section>
        <footer>
            <div class='radio'>
                <van-checkbox v-model="checked"></van-checkbox>
            </div>
            <div class='total'>
                <div>
                    共有
                    <span class='total-active'>1</span>
                    件商品
                </div>
                <div>
                    <span>总计：</span>
                    <span class='total-active'>¥128.00 + 0茶币</span>
                </div>
            </div>
            <div class='order'>去结算</div>
        </footer>
	</div>
</template>

<script>
export default {
    name: "Cart",
    data () {
        return {
            checked:true
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