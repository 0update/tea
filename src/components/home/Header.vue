<template>
	<header>
		<h1>
			<img src="@/assets/images/log.png" alt="">
		</h1>
		<div class='search' @click="goSearch">
			<div>
				<i class='iconfont icon-fangdajing'></i>
			</div>
			<span>搜您喜欢的...</span>
		</div>
		<div class='kefu'>
			<i class='iconfont icon-kefu'></i>
		</div>
	</header>
</template>
<script>
	export default{
		methods:{
			goSearch(){
				this.$router.push('/search')
			}
		}
	}
</script>
<style scoped>
/* header{
	display: flex;
	justify-content: space-around;
	align-items: center;
	width: 100%;
	height: 1.6rem;
	background-color: #b0352f;
}
header h1{
	width: 1.75rem;
	height: 1.2rem;
	align-items: center;
	
}
header h1 img{
	width: 1.8rem;
	height: 1rem;
}
.search{
		display: flex;
		align-items: center;
		flex: 1;
		padding:0.16rem 0.266666rem;
		background-color: #FFFFFF;
		border-radius: 0.64rem;
		i{
			padding-right: 0.16rem;
			color:#666;
			font-size:0.48rem;
		}
		span{
			color:#666;
			font-size:0.373333rem;
		}
	}
.search i {
	padding:0 0.16rem;
	color:#ccc;
}
.search span{
	font-size:0.373333rem;
	color:#ccc;
}

.kefu i{
	font-size:0.9rem;
	color:#fff;
}
 */
header {
    width: 100%;
    height: 1.173333rem;
    background-color: #b0352f;
    display: flex;
}
header h1 img{
	width: 1.8rem;
	height: 1rem;
}
header .kefu {
    height: 100%;
    width: 1.173333rem;
}
header .search {
    flex: 1;
    display: flex;
    height: .8rem;
    border-radius: .426667rem;
    background-color: #fff;
    margin-top: .186667rem;
}
.kefu {
    text-align: center;
    line-height: 1.173333rem;
}
.kefu i {
    font-size: .64rem;
    font-weight: 400;
    color: #fff;
}
.search{
	display: flex;
	align-items: center;
	background-color: #FFFFFF;
	border-radius: 0.64rem;
}
.search span{
		font-size: 0.4rem;
		color: #ccc;
		padding-bottom: 0.09rem;
	}
.search div {
    height: 100%;
    width: .8rem;
    text-align: center;
    line-height: .7rem;
}
.search div i {
    font-size: 0.533333rem;
    color: #ccc;
}
.search input {
    flex: 1;
    width: 100%;
    height: 100%;
    border-top-right-radius: .426667rem;
    border-bottom-right-radius: .426667rem;
    border: none;
    font-size: .346667rem;
    outline: none;
}
.search input::-webkit-input-placeholder {
    font-size: .346667rem;
}
</style>