<template>
  <div class="home">	
	<div class='headers'>
		<div class='headers-main'>
			<Header></Header>
			<ly-tab
				v-model="selectedId"
				:items="items"
				:options="options"
				@change='changeTab'
			>
			</ly-tab>			
		</div>
	</div>
	<section ref='wrapper'>
		<!-- div的高度要比section高才能滚动起来 -->
		<div>
			<div 
				v-for='(item,index) in newData'
				:key='index'
			>
				<Swiper 
					v-if='item.type=="swiperList"'
					:swiperList='item.data'
				></Swiper>
				
				<Icons 
					v-if='item.type=="iconsList"'
					:iconsList='item.data'
				></Icons>
				
				
				<Recommend 
					v-if='item.type=="recommendList"'
					:recommendList='item.data'
				></Recommend>
				
				<Ad 
					v-if='item.type=="adList"'
					:adList='item.data'
				></Ad>
				
				<Like 
					v-if='item.type=="likeList"'
					:likeList='item.data'
				></Like>
				
			</div>
		</div>
	</section>
	<Tabbar></Tabbar> 
  </div>
</template>

<script>
import Header from '@/components/home/Header.vue'
import Swiper from '@/components/home/Swiper.vue'
import Icons from '@/components/home/Icons.vue'
import Recommend from '@/components/home/Recommend.vue'
import Like from '@/components/home/Like.vue'
import Ad from '@/components/home/Ad.vue'
import Tabbar from '@/components/common/Tabbar.vue'
import BetterScroll from 'better-scroll'
import http from '@/common/api/request.js'

export default {
  name: "Home",
  data () {
	return {
		selectedId: 0,
		items: [],
		newData:[],
		oBetterScroll:'',
		tBetterScroll:'',
		options: {
		  activeColor: '#b0352f'
		}
	 }
  },
  components:{
	Header,
	Swiper,
	Icons,
	Recommend,
	Like,
	Ad,
	Tabbar
  },
  created(){
	this.getData();
  },
  mounted(){
	
  },
  methods:{
	
	async getData(){
		let res = await http.$axios({
			url:'/api/index_list/0/data/1',
		});
		this.items = Object.freeze(res.topBar);
		this.newData = Object.freeze(res.data);
		
		//当dom都加载完毕了再去执行
		this.$nextTick(()=>{
			this.oBetterScroll = new BetterScroll(this.$refs.wrapper, {
			  movable: true,
			  zoom: true,
			  click:true
			})
		})
	},
	async addData( index ){
		// index通过index的值判断ly-tab的导航栏位置,请求不同的url,从而用条件判断显示相应的内容
		let res = await http.$axios({
			url:'/api/index_list/'+index+'/data/1'
		});
		
		if(  res.constructor !=Array ){
			// 如果是res.data.data 是数组则返回ly-tab首页的数据
			this.newData = res.data;
		}else{
			this.newData = res;
		}
		this.$nextTick(()=>{
			this.tBetterScroll = new BetterScroll(this.$refs.wrapper, {
			  movable: true,
			  zoom: true,
			  click:true
			})
		})
	},
	changeTab(item,index){
		this.addData(index)//methods中的对象都会给vue管理，通过this可以找到
	}
  }

};
</script>

<style scoped>
/* .home{
	display: flex;
	flex-direction: column;
	width: 100vw;
	height: 100vh;
	overflow: hidden;
}
.headers{
	width: 100%;
	height: 2.88rem;
}
.headers-main{
	position: fixed;
	left:0;
	top:0;
} */
/* section{
	flex:1;
	overflow: hidden;
} */
/* ::v-deep .ly-tabbar{
	box-shadow:none;
	border-bottom:none;
} */
.home {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
.headers {
  width: 100%;
  height: 2.346667rem;
}
::v-deep .ly-tab {
  height: 1.173333rem!important;
  top: 1.173333rem;
  border-bottom: 0;
  box-shadow: none;
  background-color: #fff;
}
::v-deep .ly-tab-list {
  padding: .32rem .266667rem;
}
.ly-tab /deep/ .ly-tabbar {
  border-bottom: 0;
  box-shadow: none;
}
.ly-tab /deep/ .ly-tab-item {
  font-size: .4rem;
}
.sec_content {
  background-color: #f5f5f5;
  flex: 1;
  overflow: hidden;
}
.headers-main {
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
}
.chaju {
  margin-top: .4rem;
}
.chaju img {
  display: block;
  width: 100%;
}
.chaju .chaju-home {
  background: #fff;
  padding: 0.4rem 0.4rem 0.4rem 0;
}
.chaju .chaju-home ul {
  display: flex;
}
.chaju .chaju-home ul li {
  float: left;
  width: 3.5rem;
  margin-left: 0.4rem;
  text-align: center;
}
.chaju-produce img {
    display: block;
    width: 100%;
}
.chaju-produce .name {
  padding: .213333rem 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.4rem;
  color: #333;
}
.chaju-produce .price {
  color: #b0352f;
  height: 0.5rem;
  line-height: 0.5rem;
}
.chaju-produce .price span {
  font-size: 0.32rem;
}
.chaju-produce .price b {
  font-size: 0.5rem;
}
.chaju-more {
  position: relative;
  background: #f3f3f3;
}
.see-more {
  background: #f3f3f3;
  position: relative;
  width: 3.5rem;
  height: 3.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.see-more div {
  text-align: center;
  font-size: 0.32rem;
}
.see-more div:first-child {
  width: 50%;
  border-bottom: 1px solid #ccc;
  color: #999;
  padding-bottom: 0.1rem;
  margin-bottom: 0.1rem;
}
.see-more::after {
  content: "";
  position: absolute;
  margin: .133333rem;
  border: 1px solid #e4e4e4;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>