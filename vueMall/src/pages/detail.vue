<template>
	<div class="detail">
		<Header :headerData='headerData'></Header>
		<section class="main">
			<!--banner区域-->
			<section class="detail-container">
				<div class="swiper-wrapper t-c"> 
			        <div class="swiper-slide">   
			            <img :src="goodsInfo.goodsImgs" :onerror='defaultImg'>   
			        </div>    
			    </div>
		    </section>
		    
		    <!--内容区域-->
			<section class="detail-box bg-f">
				<h3>{{goodsInfo.goodsName}}<span class="distance p-a" v-if="goodsInfo.voucherShopRange">&gt;{{goodsInfo.voucherShopRange}}km</span></h3>
				<div class="detail-bd">
					<div class="price fl">
						<i class="icon"></i>
						<span id="integral">{{goodsInfo.integral}}</span>奇豆
					</div>
					<div class="rule fr">	
					</div>
				</div>
				<div class="detail-fd">{{goodsInfo.voucherShopAddress}}</div>
			</section>
			
			<!--商品介绍-->
			<section class="detail-introduction bg-f">
				<h3>商品介绍</h3>
				<div class="detail-introduction-bd" id="goodsDesc" v-html='goodsInfo.goodsDesc'></div>
			</section>
			<!--兑换规则-->
			<section class="detail-introduction bg-f">
				<h3>兑换规则</h3>
				<div class="detail-introduction-bd" id="goodsRule" v-html='goodsInfo.goodsRule'></div>
			</section>
			
			<!--兑换流程-->
			<section class="detail-introduction bg-f">
				<h3>兑换流程</h3>
				<div class="detail-introduction-bd" id="goodsFlow" v-html='goodsInfo.goodsFlow'></div>
			</section>
			
			<!--重要提示-->
			<section class="detail-introduction bg-f">
				<h3>重要提示</h3>
				<div class="detail-introduction-bd" id="tips" v-html='goodsInfo.tips'></div>
			</section>
			<!--分页-->
		</section>
	</div>
</template>

<script>
import COMMON from '../util/common'
import API from '../util/api'
import Header from '../components/Header'
export default {
  name: 'detail',
  data (){
  	return {
  		goodsInfo: {},
  		defaultImg: 'this.src="' + require('../assets/nothing-bg.png') + '"',
  		headerData: {
  			isShow: true,
	  		title: JSON.parse(COMMON.getStorage('shopData')).shopName || '',
	  		timer: ''
  		}
  	}
  },
  components: {
  	Header
  },
  created (){
  	setInterval(()=>this.getTime(),1000);
  	this.goodsDetail()
  },
  methods: {
  	getTime (){
  		this.headerData.timer = COMMON.nowTime('yyyy/MM/dd HH:mm');
  	},
  	goodsDetail () {
  		let params = {
  			goodsId: this.$route.params.goodsId || '',
			jd: 118.785956,
			wd: 32.03982
  		};
  		const that = this;
  		COMMON.getAxios(API.max_query_good_details,params,function(res){
  			let {code,data,message} = res
  			if(code == 1){
  				that.goodsInfo = data.goodsInfo
  			}
  		});
  	}
  }
}
</script>

<style>
.main{
	margin-top: 1.4rem;
}
.banner-container,.fbanner-container {
	position: relative;
	height: 5.25rem;
	max-width: 1080px;
	overflow: hidden;
}
.banner-container img,.fbanner-container img{
	width: 100%;
	height: 5.25rem;
}
.detail-container {
	position: relative;
	overflow: hidden;
	border-bottom: 1px solid #d7d7d7;
}
.detail-container img{
	width: 100%;
}
.banner-container .swiper-pagination,.fbanner-container .swiper-pagination {
	display: none !important;
}

.banner-container a,.fbanner-container a {
	display: block;
}
.detail-container .swiper-pagination{
	width: 1.528rem;
	height: 1.528rem;
	line-height: 1.528rem;
	border-radius: 50%;
	-webkit-border-radius: 50%;
	right: 0.305rem;
	bottom: .305rem;
	left: initial;
	background-color: rgba(0,0,0,.2);
	color: #FFFFFF;
}

.detail-box {
	margin-top: 0.305rem;
	overflow: hidden;
	border-bottom: 1px solid #d7d7d7;
	border-top: 1px solid #d7d7d7;
}

.detail-box h3 {
	line-height: 2.15rem;
	padding: 0 .65rem;
	border-bottom: 1px solid #EEEEEE;
	font-size: .55rem;
	color: #2c2c2c;
	height: 2.15rem;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
	padding-right: 2rem;
	position: relative;
}
.detail-box h3 span{
	color: #999999;
	font-size: .4rem;
	right: .4rem;
	top: 0;
}
.detail-bd {
	padding: 0 .65rem;
	font-size: .55rem;
	color: #2c2c2c;
	line-height: 1.82rem;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
}

.detail-bd .price {
	color: #515151;
}

.detail-bd .price i {
	width: 0.833rem;
	height: 0.833rem;
	/*background: url(../assets/icon-detail-g-icon.png) center center no-repeat;*/
	background-size: 83.333%;
	display: inline-block;
	vertical-align: middle;
	margin-top: -5px;
}

.detail-bd .price span {
	color: #fd295d;
	font-size: .6rem;
	padding-right: .2rem;
}

.detail-bd .rule {
	color: #2c2c2c;
	font-size: .55rem;
}

.detail-bd .rule i {
	width: 0.833rem;
	height: 0.833rem;
	/*background: url(../assets/icon-detail-tip-icon.png) center center no-repeat;*/
	background-size: 83.333%;
	display: inline-block;
	vertical-align: middle;
	margin-top: -5px;
}
.detail-fd {
	padding: 0 .65rem;
	font-size: .55rem;
	color: #515151;
	line-height: 1.82rem;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
		border-top: 1px solid #EEEEEE;
	
}
.detail-fd i{
	width: .8333rem;
	height: .8333rem;
	display: inline-block;
	vertical-align: middle;
	/*background: url(../assets/address_icon.png) center center no-repeat;*/
	background-size: 83.33%;
}

.detail-introduction {
	padding: 0 .65rem;
	margin-top: 0.305rem;
	overflow: hidden;
	border-bottom: 1px solid #d7d7d7;
	border-top: 1px solid #d7d7d7;
}

.detail-introduction h3 {
	line-height: 1.5rem;
	border-bottom: 1px solid #EEEEEE;
	font-size: .55rem;
	color: #2c2c2c;
	height: 1.5rem;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
	position: relative;
	padding-left: .305rem;
}

.detail-introduction h3:after {
	content: '';
	position: absolute;
	width: 8px;
	height: 0.7rem;
	border-radius: 8px;
	-webkit-border-radius: 8px;
	background-color: #fb3663;
	left: 0;
	top: 50%;
	margin-top: -0.35rem;
	z-index: 1;
}

.detail-introduction-bd {
	padding: .25rem 0;
	overflow: hidden;
}

.detail-introduction-bd p {
	color: #515151;
}
.pagination-box span.disable-to{
	background-color: #dedede;
    border: 1px solid #cecece;
    color: #626262;
}
</style>