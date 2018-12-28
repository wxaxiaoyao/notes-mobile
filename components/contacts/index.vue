
<template>
	<view class="uni-list">
		<view class="search-container">
			<uni-icon type="search"></uni-icon>
			<input v-model="searchValue" class="search-input" placeholder="请输入用户名" />
		</view>

		<view class="uni-list-cell-divider"></view>
		<label v-for="(x, i) in contacts" :key="x.id" 
			v-show="isShow(x)"
			@click="clickContact(x)" 
			class="uni-list-cell" 
			hover-class="uni-list-cell-hover">
			<view class="uni-media-list">
				<view class="uni-media-list-logo">
					<image :src="x.user.portrait"></image>
				</view>
				<view class="uni-media-list-body">
					<view class="uni-media-list-text-top">{{x.alias || x.user.nickname || x.user.username}}</view>
					<view class="uni-media-list-text-bottom uni-ellipsis">{{x.user.username}}</view>
				</view>
				<view class="uni-flex uni-center">
					<checkbox :checked="isSelected(x)"></checkbox>
				</view>
			</view>
		</label>
	</view>
</template>

<script>
import component from "../component.js";
import uniIcon from "../unis/uni-icon.vue";


export default {
	mixins:[component],

	components: {
		"uni-icon":uniIcon,
	},

	data() {
		return {
			searchValue:"",
			contacts: [],
		}
	},

	methods: {
		isShow(x) {
			if (x.alias && x.alias.indexOf(this.searchValue) >=0) return true;
			if (x.user.nickname && x.user.nickname.indexOf(this.searchValue) >= 0) return true;
			if (x.user.username.indexOf(this.searchValue) >= 0) return true;
			return false;
		},
		isSelected(x) {
			const index = this.app._.findIndex(this.__data__.selected, id => id == x.id);
			return index < 0 ? false : true;
		},
		searchInput(e) {
			const _ = this.app._;
			const value = e.detail.value;

			const isShow = (x) => {
				if (x.alias && x.alias.indexOf(value) >=0) return true;
				if (x.user.nickname && x.user.nickname.indexOf(value) >= 0) return true;
				if (x.user.username.indexOf(value) >= 0) return true;
				return false;
			}

			clearTimeout(this.timer);
			this.timer = setTimeout(() => {
				this.contacts = _.filter(this.__data__.contacts, isShow);
			}, 300);
		},

		clickContact(x) {
			const index = this.app._.findIndex(this.__data__.selected, id => id == x.id);
			if (index < 0) {
				this.__data__.selected.push(x.id);
			} else {
				this.__data__.selected.splice(index, 1);
			}
		},
	},

	mounted() {
		this.__data__.selected = this.__data__.selected || [];
		this.contacts = this.app.storage.get("contacts") || [];
	},
}
</script>

<style lang="less">
.search-container {
	display: flex;
	padding:10px 15px;

	input {
		flex:1;
		margin: 0px 8px;
	}
}
</style>
