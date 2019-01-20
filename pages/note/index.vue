
<template>
	<view @click="noteContextStyle.display = 'none'" class="full-height">
		<uni-nav-bar status-bar=true 
			left-icon="back" 
			left-text="返回" 
			@click-left="back" 
			title="手记"
			right-icon="plusempty"
		    @click-right="clickNewBtn">
		</uni-nav-bar>

		<view class="note-context-container" :style="{left: noteContextStyle.left + 'px', top: noteContextStyle.top + 'px', display: noteContextStyle.display}">
			<view @click="clickDeleteNote">
				删除
			</view>
		</view>

		<view class="uni-list">
			<view @longpress="longpress(x, $event)" @click="clickNote(x, $event)" v-for="(x, i) in notes" :key="x.id" class="uni-list-cell" hover-class="uni-list-cell-hover">
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
								<uni-tag inverted=true  v-for="tag in x.classifyTags" :key="x.id + '-' + tag.id"  :text="tag.tagname"></uni-tag>
							</scroll-view>
						</view>
						<text>{{ x.formatUpdatedAt}}</text>
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
			noteContextStyle: {
				display:"none",
				left: 0,
				top: 0,
			}
		}
	},

	async onLoad() {
		await this.loadDatas();
	},

	async onShow() {
		const note = this.getBackArgs() || {};
		if (!note.id) return;
		this.format(note);

		const index = this.app._.findIndex(this.notes, o => o.id == note.id);
		if (index < 0) this.notes.push(note);
		else this.notes.splice(index, 1, note);
		this.setBackArgs(this.currentPageUrl, {});
	},

	methods: {
		format(x) {
			const text = x.text || "";
			x.formatTitle = text.split("\n")[0];
			x.formatText = text.replace(/[\t ]+/g, " ").split("\n").slice(1).join(" ");
			x.formatUpdatedAt =  moment(x.updatedAt).fromNow();
		},
		longpress(x, e) {
			this.note = x;
			this.noteContextStyle.display = "block";
			this.noteContextStyle.left = e.touches[0].pageX + 10;
			this.noteContextStyle.top = e.touches[0].pageY - 40;
		},
		async clickDeleteNote() {
			if (!this.note) return;
			await this.api.notes.destroy({id:this.note.id});
			const index = this.app._.findIndex(this.notes, o => o.id == this.note.id);
			this.notes.splice(index, 1);
			this.noteContextStyle.display = "none";
			this.note = null;
		},
		clickNote(x, e) {
			this.subPageType = "update";
			if (this.noteContextStyle.display != "none") return;
			this.go("/pages/note/upsert", x);
			//this.go("/pages/note/show", x);
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
