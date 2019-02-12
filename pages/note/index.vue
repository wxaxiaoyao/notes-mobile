
<template>
	<view class="full-height">
		<uni-nav-bar status-bar=true 
			left-icon="back" 
			left-text="返回" 
			@click-left="back" 
			title="手记"
			right-icon="plusempty"
		    @click-right="clickNewBtn">
		</uni-nav-bar>
		<view class="uni-list">
			<view @click="clickTag" class="uni-list-cell" hover-class="uni-list-cell-hover">
				<view class="uni-list-cell-navigate">
					标签
				</view>
			</view>

			<view @click="clickNote(x, $event)" v-for="(x, i) in notes" :key="x.id" class="uni-list-cell" hover-class="uni-list-cell-hover">
				<view class="note-container">
					<view class="uni-title uni-ellipsis">
						{{x.formatTitle}}
					</view>
					<view class="uni-text-small x-text-ellipsis">
						{{x.formatText}}
					</view>
					<view class="note-footer">
						<view>
							<scroll-view scroll-x style="white-space:nowrap">
								<uni-tag inverted=true  v-for="tag in x.tags" :key="x.id + '-' + tag.id"  :text="tag.tagname"></uni-tag>
							</scroll-view>
						</view>
						<text>{{x.formatUpdatedAt}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import moment from "moment";
import component from "../../components/component.js";
import uniNavBar from "../../components/unis/uni-nav-bar.vue";
import uniTag from "../../components/unis/uni-tag.vue";

moment.locale("zh-cn");

export default {
	mixins:[component],

	components: {
		"uni-nav-bar": uniNavBar,
		"uni-tag": uniTag,
	},

	data: function() {
		return {
			notes:[],
		}
	},

	async onLoad() {
		await this.loadDatas();
	},

	async onShow() {
		const {note = {},action} = this.getBackArgs() || {};
		if (!note.id) return;
		const index = this.app._.findIndex(this.notes, o => o.id == note.id);

		if (action == "delete") {
			if (index < 0) return;
			this.notes.splice(index, 1);
		} else {
			this.format(note);
			if (index < 0) this.notes.push(note);
			else this.notes.splice(index, 1, note);
		}

		this.setBackArgs(this.currentPageUrl, {});
	},

	methods: {
		format(x) {
			const text = x.text || "";
			x.formatTitle = text.split("\n")[0];
			x.formatText = text.split("\n").slice(1).join(" ");
			x.formatUpdatedAt =  moment(x.updatedAt).fromNow();
		},
		clickTag() {
			return this.go("/pages/tag/index", {classify:this.app.consts.CLASSIFY_TAG_NOTE});
		},
		clickNote(x, e) {
			this.subPageType = "update";
			this.go("/pages/note/upsert", x);
		},
		clickNewBtn() {
			this.subPageType = "create";
			return this.go("/pages/note/upsert", {});
		},

		async loadDatas() {
			const result = await this.api.notes.get();
			this.notes = result.data || [];

			this.app._.each(this.notes, o => this.format(o));
			return;
		},
	}

}
</script>

<style>
.uni-tag+.uni-tag {
	margin-left:2px;
}
.note-context-container {
	position:fixed;
	z-index:10;
}
.note-container {
	display: flex;
	flex: 1;
	width: 100%;
	flex-direction: column;
	box-sizing: border-box;
	padding: 22upx 30upx;
}
.note-footer {
	display:flex;
	justify-content: space-between;
	align-items: center;
	padding:5px 0px;
}
</style>
