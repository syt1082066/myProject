<template>
	<div class="list">
		<Header :headerData='headerData'></Header>
		<Search :keyword='keyword' @inputValue='inputValue'></Search>
		<section class="list-container" v-if='goodList.length'>
			<ul>
				<li v-for='item in goodList'>
					<router-link :to="{name:'detail',params:{goodsId:item.goodsId}}">
						<img :src="item.goodsImg"  :onerror='defaultImg' :alt="item.goodsName" class="fl">
						<h3>{{item.goodsName}}</h3>
						<div class="desc">{{item.goodsDesc}}</div>
						<div class="price"><span>{{item.integral}}</span>奇豆</div>
					</router-link>
				</li>
			</ul>
		</section>
		<div class="t-c" v-if='isShow' v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="1"><span>{{isLoading?'正在加载中...':'加载完啦~~~'}}</span></div>
		<Dialog :tipsData='tipsData'></Dialog>
		<Nothing :noData='noData' v-if='noData.isShow'></Nothing>
	</div>
</template>

<script>
import COMMON from '../util/common'
import API from '../util/api'
import Header from '../components/Header'
import Search from '../components/Search'
import Dialog from '../components/Dialog'
import Nothing from '../components/Nothing'
export default {
  name: 'list',
  data (){
  	return {
  		keyword: this.$route.query.keyword ||'',
  		pageNum: 0,
  		isLoading: true,
  		defaultImg: 'this.src="' + require('../assets/nothing-bg.png') + '"',
  		goodList: [],
  		headerData: {
  			isShow: true,
	  		title: JSON.parse(COMMON.getStorage('shopData')).shopName || '',
	  		timer: ''
  		},
        tipsData: {
        	msg: '',
        	isShow: false
        },
  		noData: {
  			isShow: false,
  			msg: ''
  		},
  		busy: false,
  		isShow: true
  	}
  },
  components: {
  	Header,
  	Search,
  	Dialog,
  	Nothing
  },
  created (){
  	setInterval(()=>this.getTime(),1000);
  },
  methods: {
  	inputValue (msg){
  		const that = this;
  		if(!msg.replace(/\s/g,'')){
  			that.tipsData = {
	        	msg: '搜索内容不能为空',
	        	isShow: true
	        }
	        setTimeout(() => that.tipsData.isShow = false,2000);
	        return false
  		}
  		that.goodList = [];
  		that.keyword = msg;
  		that.pageNum = 0;
  		that.pageNum++;
  		that.queryGoods();
  	},
  	getTime (){
  		this.headerData.timer = COMMON.nowTime('yyyy/MM/dd HH:mm');
  	},
  	queryGoods (){
  		const that = this;
  		let params = {
  			labelId: that.$route.query.labelId || '',
			cityName: JSON.parse(COMMON.getStorage('shopData')).cityName || '',
			pageNum: that.pageNum,
			keyword: that.keyword,
			pageSize: 12,
			jd: JSON.parse(COMMON.getStorage('shopData')).jd,
			wd: JSON.parse(COMMON.getStorage('shopData')).wd
  		};
  		COMMON.getAxios(API.max_query_goods,params,function(res){
  			let {code,data,message} = res
  			if(code == 1){
				that.goodList = that.goodList.concat(data.goodsList);
  				if(data.goodsList.length == 0 && that.pageNum == 1){
  					that.noData = {
			        	msg: '神马也没有搜出来',
			        	isShow: true
			        }
			        that.isShow = false
  				}
  				if(that.pageNum < data.totalPage){
  					that.busy = false;
  					that.isLoading = true;
  				}else{
  					that.busy = true;
  					that.isLoading = false;
  				}
  				
  			}else{
  				that.tipsData = {
		        	msg: message,
		        	isShow: true
		        }
		        setTimeout(() => that.tipsData.isShow = false,2000)
  			}
  		});
  	},
  	loadMore (){
  		const that = this;
  		that.busy = true;
        that.pageNum ++;
        let speed = 1000
        if(that.pageNum == 1){
        	speed = 1
        }
      setTimeout(() => {
        //这里请求接口去拿数据，实际应该是调用一个请求数据的方法
        that.queryGoods();
      }, speed);
  	}
  }
}
</script>

<style scoped>
.search{
	margin-top: 1.4rem;
}
.list-container {
	padding: 1rem 0 0 0;
	overflow: hidden;
	background-color: #FFFFFF;
	border-bottom: 1px solid #c6c6c6;
}

.list-container li {
	width: 50%;
	text-align: center;
	float: left;
	overflow: hidden;
	padding: .28rem .26rem;
	text-align: left;
	border-top: 1px solid #c6c6c6;
	animation: scale .5s;
	-webkit-animation: scale .5s;
}
@-webkit-keyframes scale{
	0%{
		-webkit-transform: scale(0);
		transform: scale(0);
	}
	100%{
		-webkit-transform: scale(1);
		transform: scale(1);
	}
}
@keyframes scale{
	0%{
		-webkit-transform: scale(0);
		transform: scale(0);
	}
	100%{
		-webkit-transform: scale(1);
		transform: scale(1);
	}
}
.list-container li:nth-child(1){
	border-top: 1px solid #FFFFFF;
}
.list-container li:nth-child(2){
	border-top: 1px solid #FFFFFF;
}
.list-container li img {
	width: 3.222rem;
	height: 3.222rem;
	margin-right: .26rem;
}

.list-container li h3 {
	height: 1rem;
	font-size: .5rem;
	color: #212121;
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
}

.list-container li .desc {
	line-height: .7rem;
	height: 1.4rem;
	font-size: .4rem;
	color: #8e8e8e;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	word-break: break-all;
	overflow: hidden;
}

.list-container li .price {
	height: .7rem;
	font-size: .4rem;
	color: #949191;
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
	line-height: .7rem;
}

.list-container li .price span {
	color: #fd295d;
	font-size: .5rem;
	padding-right: .2rem;
}

.pagination {
	padding: .8rem 0;
	overflow: hidden;
	text-align: center;
}

.pagination-now {
	display: inline-block;
	vertical-align: middle;
	font-size: .5rem;
	color: #212121;
	margin-right: .3rem;
}

.pagination-now span {
	padding: 0 6px;
}
.pagination-now +.pagination-box{
	width: 70%;
	
    padding: 0 ;
}
.pagination-now +.pagination-box span.back{
	float: left;
}
.pagination-box {
	width: 100%;
    display: inline-block;
    vertical-align: middle;
    line-height: 1.2rem;
    padding: 0 1.65rem;
}

.pagination-box span {
	float: left;
	width: 1.8056rem;
	line-height: 1rem;
	overflow: hidden;
	background-color: #dedede;
	border: 1px solid #cecece;
	color: #626262;
	font-size: .5rem;
	margin-right: .305rem;
	border-radius: 5px;
	-webkit-border-radius: 5px;
	margin-top: .15rem;
}

.pagination-box span.active {
	background-color: #f7cdd7;
	border: 1px solid #fc3f6d;
	color: #fd285d;
}

.pagination-box span.back {
	background-color: #d3dbec;
	border: 1px solid #597dc8;
	color: #466ec3;
	float: right;
}

.pagination-box span.topay {
	width: 5rem;
	background-color: #fd295d;
	border: 1px solid #fd295d;
	line-height: 1.2rem;
	color: #FFFFFF;
	float: none;
	display: inline-block;
	vertical-align: middle;
	margin-top: 0;
	margin-right: -1.8056rem;
}
</style>