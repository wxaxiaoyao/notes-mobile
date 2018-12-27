
<template>
	<view class="uni-list">
		<view class="search-container">
			<uni-icon type="search"></uni-icon>
			<input class="search-input" @input="searchInput" placeholder="请输入用户名" />
		</view>

		<view class="uni-list-cell-divider"></view>
		<label v-for="(x, i) in contacts" :key="x.id" 
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
					<checkbox></checkbox>
				</view>
			</view>
		</label>
	</view>
</template>

<script>
import component from "../component.js";


export default {
	mixins:[component],

	data() {
		return {
			contacts: [],
		}
	},

	methods: {
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
			const index = this.app._.findIndex(this.__data__.selected, o => o.id == x.id);
			if (index < 0) {
				this.__data__.selected.push(x);
			} else {
				this.__data__.selected.splice(index, 1);
			}
		},
	},

	async mounted() {
		this.__data__.selected = this.__data__.selected || [];
		if (this.__data__.contacts) {
			this.__data__.contacts = await this.api.contacts.get().then(res => res.data || []);
		}
		this.contacts = this.__data__.contacts;
	}
}
</script>

<style>
</style>
