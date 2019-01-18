
<template>
	<view>
		<uni-nav-bar status-bar=true 
			left-icon="back" 
			left-text="返回" 
			right-icon="more-filled"
			@click-right="isShowMoreMenu = !isShowMoreMenu"
			@click-left="back(note)">
		</uni-nav-bar>
		<view v-if="isShowMoreMenu" class="more-menu-container" :style="{top: (navBarHeight + 6) + 'px'}">
			<view class="uni-list">
				<view @click="clickEditBtn" class="uni-list-cell" hover-class="uni-list-cell-hover">
					<view class="uni-list-cell-navigate">
						编辑
					</view>
				</view>
				<view @click="clickShareBtn" class="uni-list-cell" hover-class="uni-list-cell-hover">
					<view class="uni-list-cell-navigate">
						分享
					</view>
				</view>
			</view>
		</view>
		<view class="note-container">
			<view class="note-title">
				{{note.title || note.datestr}}
			</view>
			<view class="note-tags">
			</view>
			<view class="note-text">
				{{note.text}}
			</view>
		</view>
	</view>
</template>

<script>
import component from "../../components/component.js";
import uniNavBar from "../../components/unis/uni-nav-bar.vue";
import uniTag from "../../components/unis/uni-tag.vue";
import uniIcon from "../../components/unis/uni-icon.vue";

export default {
	mixins:[component],

	components: {
		"uni-nav-bar": uniNavBar,
		"uni-tag": uniTag,
		"uni-icon": uniIcon,
	},

	data: function() {
		return {
			note:{},
			isShowMoreMenu: false,
		}
	},
	
	async onLoad() {
		this.note = this.getPageArgs();
	},

	onShow() {
		//this.note = this.getBackArgs() || this.note;
	},

	methods: {
		clickEditBtn() {
			this.isShowMoreMenu = false;
		},
		clickShareBtn() {
			this.isShowMoreMenu = false;
		},
	},
}
</script>

<style>
.uni-tag {
	margin-left:2px;
}
.nav-bar-right-container {
	position: relative;
}
.more-icon {
	display: flex;
	align-items:center;
	height: 100%;
}
.more-menu-container {
	position: fixed;
	z-index:100;
	right: 4px;
	/*padding:10px;*/
	/*background-color: dimgrey;*/
	background-color: #FFF;
	width:80px;
}
</style>
