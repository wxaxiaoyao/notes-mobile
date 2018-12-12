<template>
	<view class="user-info-more-container">
		<uni-nav-bar 
			status-bar=true 
			left-icon="back" 
			left-text="更多信息"
			@click-left="back">
		</uni-nav-bar>

		<uni-popup :show="showSexPopup" type="middle" v-on:hidePopup="showSexPopup = false">
			<view class="uni-h4" style="width:100%">性别</view>
			<radio-group @change="sexRadioChange">
				<label class="uni-list-cell uni-list-cell-pd">
					<view>男</view>
					<radio value="男" :checked="user.sex == '男'"></radio>
				</label>
				<label class="uni-list-cell uni-list-cell-pd">
					<view>女</view>
					<view>
						<radio value="女" :checked="user.sex == '女'"></radio>
					</view>
				</label>
			</radio-group>
		</uni-popup>

		<view class="uni-list">
			<view class="uni-list-cell-divider"></view>
			<view @click="showSexPopup = true" class="uni-list-cell" hover-class="uni-list-cell-hover">
				<view class="uni-list-cell-navigate">
					<view>性别</view>
					<view class="uni-text-gray">{{user.sex}}</view>
				</view>
			</view>
			<view @click="clickDescription" class="uni-list-cell" hover-class="uni-list-cell-hover">
				<view class="uni-list-cell-navigate">
					<view style="min-width:max-content">个性签名</view>
					<view class="uni-text-gray uni-ellipsis uni-common-pl">{{user.description}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import queryString from 'query-string';
import component from "../../components/component.js";
import uniNavBar from "../../components/unis/uni-nav-bar.vue";
import uniPopup from '../../components/unis/uni-popup.vue';

export default {
	mixins:[component],

	components: {
		"uni-nav-bar": uniNavBar,
		"uni-popup": uniPopup,
	},

	data() {
		return {
			showSexPopup: false,
		}
	},
	onLoad() {
		this.authenticated();
		this.title = this.user.username;
	},
	methods: {
		async sexRadioChange(e) {
			this.user.sex = e.detail.value;
			const result = await this.api.users.update({sex: this.user.sex, id: this.user.id});
			if (result.isErr()) return uni.showToast({title:"服务器繁忙"});
			this.setUser(this.user);
			this.showSexPopup = false;
		},
		clickDescription() {
			const args = queryString.stringify({
				title:"更改个性签名", 
				key:"description", 
				value: this.user.description,
				type:"textarea",
			}, {encode:false});
			this.go("/pages/user/info-modify?" + args);
		},

		clickLogoutBtn() {
			uni.reLaunch({url:"/pages/login/index"});
			this.setUser();
		}
	}
}
</script>

<style lang="less">
</style>
