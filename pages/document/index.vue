
<template>
	<view class="full-height">
		<uni-nav-bar status-bar=true 
			left-icon="back" 
			left-text="返回" 
			@click-left="back" 
			title="文档"
			right-icon="plusempty"
		    @click-right="clickNewBtn">
		</uni-nav-bar>

		<view class="uni-list">
			<view @click="clickDocument(x, $event)" v-for="(x, i) in documents" :key="x.id" class="uni-list-cell" hover-class="uni-list-cell-hover">
				<view class="document-container">
					<view class="uni-title uni-ellipsis">
						{{x.filename}}
					</view>
					<view class="uni-text-small x-text-ellipsis">
						{{x.text}}
					</view>
					<view class="document-footer">
						<view>
							<scroll-view scroll-x style="white-space:nowrap">
								<uni-tag inverted=true  v-for="tag in x.tags" :key="x.id + '-' + tag.id"  :text="tag.tagname"></uni-tag>
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
			documents:[],
		}
	},

	async onLoad() {
		await this.loadDatas();
	},

	async onShow() {
		const {action, document={}} = this.getBackArgs() || {};
		if (!document.id) return;

		const index = this.app._.findIndex(this.documents, o => o.id == document.id);
		if (action == "delete") {
			if (index < 0) return;
			this.documents.splice(index, 1);
		} else {
			this.format(document);
			if (index < 0) this.documents.push(document);
			else this.documents.splice(index, 1, document);
		}

		this.setBackArgs(this.currentPageUrl, {});
	},

	methods: {
		format(x) {
			const text = x.text || "";
			x.formatUpdatedAt =  moment(x.updatedAt).fromNow();
			x.tags = [];
		},
		clickDocument(x, e) {
			this.go("/pages/document/upsert", x);
			//this.go("/pages/document/show", x);
		},
		clickNewBtn() {
			return this.go("/pages/document/upsert", {});
		},
		async loadDatas() {
			const result = await this.api.documents.get();
			this.documents = result.data || [];
			this.app._.each(this.documents, o => this.format(o));
			return;
		},
	}

}
</script>

<style>
.uni-tag+.uni-tag {
	margin-left:2px;
}
.document-context-container {
	position:fixed;
	z-index:10;
}
.document-container {
	display: flex;
	flex: 1;
	width: 100%;
	flex-direction: column;
	box-sizing: border-box;
	padding: 22upx 30upx;
}
.document-footer {
	display:flex;
	justify-content: space-between;
	align-items: center;
	padding:5px 0px;
}
</style>
