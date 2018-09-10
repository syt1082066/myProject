import axios from 'axios'
import qs from 'qs'
import md5 from 'md5'
const COMMON = {
	baseUrl: 'https://app.7gyou.com/html/',
	nsecret: md5('Z0vbBS5owfWdI8Ay').substring(7, 23),
	// 获取当前时间
    nowTime: (fmt) => {
        var timer = new Date();
        var o = {
        "M+": timer.getMonth() + 1, //月份 
        "d+": timer.getDate(), //日 
        "H+": timer.getHours(), //小时 
        "m+": timer.getMinutes(), //分 
        "s+": timer.getSeconds(), //秒 
        "q+": Math.floor((timer.getMonth() + 3) / 3), //季度 
        "S": timer.getMilliseconds() //毫秒 
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (timer.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    },
	// 签名算法
    getSign: (parmas) => {
        let arr = [];
        let str = '';
        const obj = {
            timestamp: COMMON.nowTime('yyyy-MM-dd HH:mm:ss')
        };
        Object.assign(obj,parmas);
        for (let i in obj){
          arr.push(i);
        }
        arr.sort();
        for(var j in arr){
            if(obj[arr[j]] !== '' && obj[arr[j]] !== null){
            str += arr[j] + obj[arr[j]];
            }
        }
        obj.sign = md5(COMMON.nsecret+str+COMMON.nsecret).toLowerCase();
        return obj;
    },
	// 封装axios
	getAxios: (url,params,callback)=> {
		return axios({
            method: 'post',
            url: COMMON.baseUrl + url,
            data: qs.stringify(COMMON.getSign(params)),
            responseType: 'json'
        }).then(function (response) {
            callback(response.data)
        }).
        catch (function (error) {
            console.log(error)
        })
	},
     //设置本地存储
    setStorage: (v,k) => {
        return localStorage.setItem(v,k);
    },
    //获取本地存储数据
    getStorage: (v) => {
        if(!v){
            v= null
        }
        return localStorage.getItem(v);
    },
    //移除本地存储数据
    removeStorage: (v) => {
        if(!v){
            v= null
        }
        return localStorage.removeItem(v);
    },
	
}
export default COMMON