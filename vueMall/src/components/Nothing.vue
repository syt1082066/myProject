<template>
	<div class="nothings" v-if='noData.isShow'>	
		<img src="../assets/nothing-bg.png">
			<span>{{noData.msg}}</span>	
	</div>
</template>

<script>
export default {
  name: 'Nothing',
  props: ['noData']
}
</script>

<style scoped>
.nothings{
	text-align: center;
	padding:0 .6rem;
	overflow: hidden;
}
.nothings img{
	width: 5.25rem;
	height: 5.25rem;
	margin-top: 3.1111rem;
}
.nothings span{
	display: block;
	line-height: 1rem;
	font-size: .6rem;
	color: #212121;
	margin-top: .2rem;
}
.nothings p{
	line-height: 1rem;
	font-size: .5rem;
	color: #a3a3a3;
}
.nothings a{
	display: block;
	border: 1px solid #DDDDDD;
	line-height: 1.2rem;
	width: 5rem;
	background: -webkit-linear-gradient(#fdfdfd, #ebebeb); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(#fdfdfd, #ebebeb); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(#fdfdfd, #ebebeb); /* Firefox 3.6 - 15 */
    background: linear-gradient(#fdfdfd, #ebebeb); /* 标准的语法（必须放在最后） */
	margin: 0 auto;
	margin-top: .6rem;
	border-radius: 8px;
	-webkit-border-radius: 8px;
	font-size: .55rem;
	color: #767676;
}
</style>
