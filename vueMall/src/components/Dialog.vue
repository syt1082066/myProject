<template>
	<div class="dialog" v-if='tipsData.isShow'>{{tipsData.msg}}</div>
</template>

<script>
export default {
  name: 'Dialog',
  props: ['tipsData']
}
</script>

<style scoped>
.dialog{
	position: fixed;
	width: 12rem;
	height: 2rem;
	border-radius: 5px;
	top:50%;
	left:50%;
	margin-top: -1rem;
	margin-left: -6rem;
	background: rgba(0,0,0,.6);
	font-size: .65rem;
	line-height: 2rem;
	color: #fff;
	text-align: center;
}
</style>
