<template>
	<div class="site">
		<div class="site bg-f p-f">
		<div class="site-group t-c">
			<h2>店名设置</h2>
		</div>
		<div class="site-group">
			<label>店名：</label>
			<input type="text" class="box shopName" placeholder="请输入门店名称"  @keyup="keyUpSearch()" v-model='shopName' id="tipinput">
			<button type="button" class="getLng" @click='getPoi()'>获取经纬度</button>
		</div>
		<div class="site-group">
			<label>经度：</label>
			<input type="text" class="box adLng" placeholder="请输入位置经度" v-model='jd'>
		</div>
		<div class="site-group">
			<label>纬度：</label>
			<input type="text" class="box adLat" placeholder="请输入位置纬度" v-model='wd'>
		</div>
		<div class="site-group">
			<label>城市：</label>
			<input type="text" class="box cityName" value="" placeholder="请输入所在城市" v-model='cityName'>
		</div>
		<div class="site-group t-c">
			<button type="button" class="sure-btn" @click='toSave()'>保存</button>
			<button type="button" class="clear-btn" @click='toClear()'>清除</button>
		</div>
	</div>
	<Dialog :tipsData='tipsData'></Dialog>
	</div>
</template>

<script>
import COMMON from '../util/common'
import Dialog from '../components/Dialog'
export default {
  name: 'site',
  data (){
  	return {
  		shopName: '',
  		jd: '',
  		wd: '',
  		cityName: '',
  		poi: [],
  		tipsData: {
  			msg: '',
	        isShow: false
  		}
  	}
  },
  components: {
  	Dialog
  },
  mounted (){
  	this.getInfo();
  },
  methods: {
  	keyUpSearch (){
  		const that = this;
  		that.poi = [];
		var autoOptions = {
	        input: "tipinput"
	    };
	    var auto = new AMap.Autocomplete(autoOptions);
	    var placeSearch = new AMap.PlaceSearch({
	        map: AMap
	    });  //构造地点查询类
	    AMap.event.addListener(auto, "select", select);//注册监听，当选中某条记录时会触发
	    function select(e) {
	        that.poi = e.poi;
	    }
  	},
  	getPoi (){
  		const that = this;
  		if(!that.shopName.replace(/\s/g,'')){
  			that.tipsData = {
	        	msg: '店名不能为空',
	        	isShow: true
	        }
	        setTimeout(() => that.tipsData.isShow = false,2000);
	        return false
  		}
  		if(!that.poi.location){
  			that.tipsData = {
	        	msg: '获取经纬度失败，请手动填写',
	        	isShow: true
	        }
	        setTimeout(() => that.tipsData.isShow = false,2000);
	        that.jd = '';
  			that.wd = '';
	        return false
  		}
  		that.jd = that.poi.location.lng;
  		that.wd = that.poi.location.lat;
  		that.shopName = that.poi.name;
  	},
  	toSave (){
  		const that = this;
  		if(!that.shopName.replace(/\s/g,'')){
  			that.tipsData = {
	        	msg: '店名不能为空',
	        	isShow: true
	        }
	        setTimeout(() => that.tipsData.isShow = false,2000);
	        return false
  		}
  		if(!that.jd){
  			that.tipsData = {
	        	msg: '经度不能为空',
	        	isShow: true
	        }
	        setTimeout(() => that.tipsData.isShow = false,2000);
	        return false
  		}
  		if(!that.wd){
  			that.tipsData = {
	        	msg: '纬度不能为空',
	        	isShow: true
	        }
	        setTimeout(() => that.tipsData.isShow = false,2000);
	        return false
  		}
  		if(!that.cityName.replace(/\s/g,'')){
  			that.tipsData = {
	        	msg: '城市名不能为空',
	        	isShow: true
	        }
	        setTimeout(() => that.tipsData.isShow = false,2000);
	        return false
  		}
  		let obj = {
  			shopName: that.shopName,
  			jd: that.jd,
  			wd: that.wd,
  			cityName: that.cityName
  		}
  		COMMON.setStorage('shopData',JSON.stringify(obj));
  		that.tipsData = {
        	msg: '保存成功，3s后返回首页',
        	isShow: true
        }
        setTimeout(() => {
        	that.tipsData.isShow = false;
        	that.$router.push({name: 'index'})
        },3000);
  	},
  	toClear (){
  		const that = this;
  		that.shopName = '';
  		that.jd = '';
  		that.wd = '';
  		that.cityName = '';
  		that.poi = [];
  		COMMON.removeStorage('shopData');
  	},
  	getInfo (){
  		const that = this;
  		const shopData = JSON.parse(COMMON.getStorage('shopData'));
  		if(shopData){
	  		that.shopName = shopData.shopName;
	  		that.jd = shopData.jd;
	  		that.wd = shopData.wd;
	  		that.cityName = shopData.cityName;
	  		that.poi = {
	  			name: shopData.shopName,
	  			location: {
	  				lng: shopData.jd,
	  				lat: shopData.wd
	  			}
	  		};
  		}
  	}
  }
}
</script>

<style>
.site {
	width: 12rem;
	height: 11rem;
	left: 50%;
	top: 50%;
	margin-left: -6rem;
	margin-top: -5.5rem;
	padding: .3rem .6rem;
	border-radius: 5px;
	-webkit-border-radius: 5px;
	box-sizing: border-box;
}

.site h2 {
	font-size: .55rem;
	color: #212121;
}

.site-group {
	padding: .305rem 0;
	overflow: hidden;
	position: relative;
	box-sizing: border-box;
}

.site-group label {
	width: 2.5rem;
	line-height: 1rem;
	font-size: .55rem;
	color: #212121;
}

.site-group .box {
	width: 8.9rem;
	line-height: 1rem;
	font-size: .5rem;
	color: #212121;
}

.sure-btn {
	width: 3rem;
	border: 0;
	line-height: 1rem;
	border-radius: 5px;
	-webkit-border-radius: 5px;
	background-color: #3e8f3e;
	font-size: .55rem;
	color: #FFFFFF;
}

.clear-btn {
	width: 3rem;
	border: 0;
	outline: 0;
	line-height: 1rem;
	border-radius: 5px;
	-webkit-border-radius: 5px;
	background-color: #b92c28;
	font-size: .55rem;
	color: #FFFFFF;
	margin-left: .305rem;
}

#container {
	width: 10px;
	height: 10px;
	display: none;
}

.getLng {
	width: 3rem;
	height: 1rem;
	position: absolute;
	top: 50%;
	margin-top: -.5rem;
	right: 0;
	line-height: 1rem;
	font-size: .5rem;
	color: #6b6b6b;
	border: 1px solid #DDDDDD;
	cursor: pointer;
	border-radius: 5px;
}
</style>