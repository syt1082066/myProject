<template>
	<div class="p-f mall-header" v-if='headerData.isShow'>
		<i class="mall-header-logo"></i>
		<h1 class="mall-header-title">{{headerData.title}}</h1>
		<div class="time">{{headerData.timer}}</div>
	</div>
</template>

<script>
export default {
  name: 'Header',
  props: ['headerData']
}
</script>

<style scoped>
.mall-header{
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	height: 1.4rem;
	background-color: #0f2d3c;
	color: #fff;
	z-index: 999;
}
.mall-header-logo{
	width: 1.08rem;
	height: 1rem;
	position: absolute;
	top:.2rem;
	left: .4rem;
	background: url(../assets/logo.png) center center no-repeat;
	background-size: contain;
}
.mall-header-title{
	font-size: .38rem;
	line-height: 1.4rem;
	text-align: center;
	width: 8rem;
	height: 1.4rem;
	margin-left: 2rem;
	overflow: hidden;
}
.mall-header .time{
	position: absolute;
	top: 0;
	right: .4rem;
	font-size: .36rem;
	color: #fff;
	line-height: 1.4rem;
}
</style>
