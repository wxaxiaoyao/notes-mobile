
<template>
	<view class="navigations-index-container">
		<uni-status-bar></uni-status-bar>
		<view class="nav-bar-container">
			<view class="title">NOTE</view>
			<view class="btns">
				<!--uni-icon @click="showPlusMenu = true" type="plusempty" size=30></uni-icon-->
			</view>
		</view>
		<view class="plus-menu-container" v-if="showPlusMenu">
			<view class="menu-container">
				<view @click="clickAddContact" class="uni-title">添加朋友</view>
			</view>
		</view>
	</view>
</template>

<script>
import uniStatusBar from "../unis/uni-status-bar.vue";
import uniNavBar from "../unis/uni-nav-bar.vue";
import uniIcon from "../unis/uni-icon.vue";
import component from "../component.js";

export default {
	mixins:[component],
	components: {
		"uni-nav-bar": uniNavBar,
		"uni-icon":uniIcon,
		"uni-status-bar": uniStatusBar,
	},

	data: function() {
		return {
			showPlusMenu: false,
		}
	},

	methods: {
		clickAddContact() {
			this.showPlusMenu = false;
		}
	},

	mounted() {
	}
}
</script>

<style lang="less">
.navigation-index-container {
	position:relative;
}
.nav-bar-container {
	display: flex;
	justify-content: space-between;
	background-color: #FFFFFF;
	overflow: hidden;

	view {
		line-height:44px;
	}

	.title {
		padding:0 12px;
	}

	.btns {
		padding:0 12px;
	}
}
.nav-bar-container.fixed {
	position: fixed;
	z-index: 998;
}
.plus-menu-container {
	position: relative;
	width: 100%;

	.menu-container {
		background-color: #FFFFFF;
		position: absolute;
		z-index:10;
		right:20px;
		top: 0px;
		width:150px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
}
</style>
