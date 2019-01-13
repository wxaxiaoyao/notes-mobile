
<template>
	<view>
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
			<view @longpress="longpress(x, $event)" @click="clickEditNote(x)" v-for="(x, i) in notes" :key="i" class="uni-list-cell" hover-class="uni-list-cell-hover">
				<view class="uni-flex uni-column uni-flex-item uni-list-cell-pd">
					<view class="uni-inline-item" style="justify-content: space-between">
						<view class="uni-title">
							{{x.title || x.datestr}}
						</view>
						<view>
						</view>
					</view>
					<view class="uni-text">
						{{x.text}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
						//<tags-index :__data__="{tags: x.tags, size:'small', inverted:true}"></tags-index>
import moment from "moment";
import component from "../../components/component.js";
import uniNavBar from "../../components/unis/uni-nav-bar.vue";

export default {
	mixins:[component],

	components: {
		"uni-nav-bar": uniNavBar,
	},

	data: function() {
		return {
			notes:[],
			noteContextStyle: {
				display:"none",
				left: "0px",
				top:"0px",
			}
		}
	},

	async onLoad() {
		await this.loadDatas();
	},

	methods: {
		longpress(x, e) {
			this.note = x;
			this.noteContextStyle.display = "block";
			this.noteContextStyle.left = e.touches[0].pageX + 10;
			this.noteContextStyle.top = e.touches[0].pageY - 40;
			console.log(x);
			console.log(JSON.stringify(e));
		},
		async clickDeleteNote() {
			if (!this.note) return;
			await this.api.notes.destroy({id:this.note.id});
			const index = this.app._.findIndex(this.notes, o => o.id == this.note.id);
			this.notes.splice(index, 1);
			this.noteContextStyle.display = "none";
			this.note = null;
		},
		clickEditNote(x) {
			this.go("/pages/note/upsert", x);
		},
		clickNewBtn() {
			return this.go("/pages/note/upsert", {});
		},

		async loadDatas() {
			const result = await this.api.notes.get();
			this.notes = result.data || [];

			this.app._.each(this.notes, o => o.datestr = moment(o.updatedAt).format("YYYY-MM-DD"));
			return;
		},
	}

}
</script>

<style>
.note-context-container {
	position:fixed;
	z-index:10;
}
</style>
