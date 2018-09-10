<template>
	<div class="index">
		<Header :headerData='headerData'></Header>
		<div class="header-banner">
			<swiper :options="swiperOption" ref="mySwiper">
			    <swiper-slide v-for="item in slideshow" :key="item.index">
			    	<img :src="item.goodsImg" :alt="item.goodsName">
			    </swiper-slide>
			</swiper>
 		 </div>
		<Search :keyword='keyword' @inputValue='inputValue'></Search>
		<section class="mall-list">
			<ul>
				<li v-for='(item,index) in labelList' v-if='index != "5" && index != "10" && index != "11"'>
					<router-link :to="{name:'list',query:{labelId:item.labelId}}">
						<img :src="item.imageUrl" :onerror='defaultImg' :alt="item.labelName">
						<p>{{item.labelName}}</p>
					</router-link>
				</li>
			</ul>
		</section>
		<Dialog :tipsData='tipsData'></Dialog>
	</div>
</template>

<script>
import COMMON from '../util/common'
import API from '../util/api'
import Header from '../components/Header'
import Search from '../components/Search'
import Dialog from '../components/Dialog'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'index',
  data (){
  	return {
  		keyword: '',
  		labelList: [],
  		slideshow: [],
      defaultImg: 'this.src="' + require('../assets/nothing-bg.png') + '"',
  		headerData: {
  			isShow: true,
	  		title: JSON.parse(COMMON.getStorage('shopData')).shopName || '',
	  		timer: ''
  		},
  		swiperOption: {
	        pagination: {
	          el: '.swiper-pagination'
	        },
            autoplay: true,
      		speed: 1000,
      		loop: true
        },
        tipsData: {
        	msg: '',
        	isShow: false
        }
  	}
  },
  computed: {
	swiper() {
		return this.$refs.mySwiper.swiper;
	}
  },
  components: {
  	Header,
  	Search,
  	Dialog,
  	swiper,
  	swiperSlide
  },
  created (){
    const that = this;
    const shopData = JSON.parse(COMMON.getStorage('shopData'));
    if(!shopData){
      that.$router.replace({name: 'site'})
    }
    setInterval(()=>that.getTime(),1000);
    that.queryLabel();
    that.querySlide();
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
  		that.keyword= msg;
  		that.$router.push({name: 'list', query: {keyword: that.keyword}})
  	},
  	getTime (){
  		this.headerData.timer = COMMON.nowTime('yyyy/MM/dd HH:mm');
  	},
  	queryLabel (){
  		let params = {
  			cityName: JSON.parse(COMMON.getStorage('shopData')).cityName || ''
  		};
  		const that = this;
  		COMMON.getAxios(API.max_query_labels,params,function(res){
  			let {code,data,message} = res
  			if(code == 1){
  				that.labelList = data.labels
  			}else{
  				that.tipsData = {
		        	msg: message,
		        	isShow: true
		        }
		        setTimeout(() => that.tipsData.isShow = false,2000)
  			}
  		});
  	},
  	querySlide (){
  		let params = {
  			type: 1,
  			storeNum: 'cs9'
  		};
  		const that = this;
  		COMMON.getAxios(API.max_slide_show,params,function(res){
  			let {code,data,message} = res
  			if(code == 1){
  				that.slideshow = data.slideshow;
  			}else{
  				that.tipsData = {
		        	msg: message,
		        	isShow: true
		        }
		        setTimeout(() => that.tipsData.isShow = false,2000)
  			}
  		});
  	}
  }
}
</script>

<style scoped>
.header-banner,.header-banner .swiper-container{
  height: 5.25rem;
  margin-top: 1.4rem;
}
.header-banner img{
  width: 100%;
  height: 5.25rem;
}

.mall-list ul li{
	float: left;
	width: 25%;
	padding: .8rem 0 .3rem;
	text-align: center;
}
.mall-list ul li a{
	display: block;
	overflow: hidden;
}
.mall-list ul li img{
	display: block;
	width: 1.8rem;
	height: 1.8rem;
	margin: 0 auto;
	border-radius: 50%;
}
.mall-list ul li p{
	font-size: .55rem;
	line-height: 1.2rem;
}
</style>