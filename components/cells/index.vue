
<template>
	<view class="uni-list">
		<view class="uni-list-cell">
			<slot></slot>
		</view>
	</view>
</template>

<script>
import component from "../component.js";

export default {
	mixins:[component],
}
</script>
