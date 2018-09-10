<template>
	<div class="search">
		<div class="search-box">
		<span @click='searchEvent()'></span>
		<input type="search" name="search-goods" placeholder="输入商品名称" v-model='inputValue' @keyup.enter='searchEvent()'>
		</div>
	</div>
</template>

<script>
export default {
  name: 'Search',
  props: ['keyword'],
  data (){
  	return {
  		inputValue: this.keyword || ''
  	}
  },
  methods: {
  	searchEvent (){
  		this.$emit('inputValue',this.inputValue)
  	}
  }
}
</script>

<style scoped>
.search{
	padding: .35rem 0;
	background-color: #fd2b5a;
}
.search-box{
	overflow: hidden;
	width: 10.5rem;
	margin: 0 auto;
	border-radius: 5px;
	-webkit-border-radius: 5px;
	background-color: #fff;
}
.search-box span{
	float: left;
	width: 1rem;
	height: 1rem;
	background: url(../assets/icon-search.png) center center no-repeat;
	background-size: 62.5%;
}
.search-box input{
	float: left;
	width: 9.5rem;
	height: 1rem;
	font-size: .5rem;
	line-height: 1.2rem;
	border: 0;
    outline: none;
    background-color: transparent;
}
</style>
