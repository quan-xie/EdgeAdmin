Vue.component("http-cache-config-box", {
	props: ["v-cache-config", "v-cache-policies", "v-is-location"],
	data: function () {
		let cacheConfig = this.vCacheConfig
		if (cacheConfig == null) {
			cacheConfig = {
				isPrior: false,
				isOn: false,
				cachePolicyId: 0
			}
		}
		return {
			cacheConfig: cacheConfig
		}
	},
	methods: {
		changePolicyId: function () {
			this.cacheConfig.cachePolicyId = parseInt(this.cacheConfig.cachePolicyId)
		}
	},
	template: `<div>
	<input type="hidden" name="cacheJSON" :value="JSON.stringify(cacheConfig)"/>
	<table class="ui table definition selectable">
		<prior-checkbox :v-config="cacheConfig" v-if="vIsLocation"></prior-checkbox>
		<tbody v-show="!vIsLocation || cacheConfig.isPrior">
			<tr>
				<td class="title">是否开启缓存</td>
				<td>
					<div class="ui checkbox">
						<input type="checkbox" v-model="cacheConfig.isOn"/>
						<label></label>
					</div>
				</td>
			</tr>
		</tbody>
		<tbody v-show="(!vIsLocation || cacheConfig.isPrior) && cacheConfig.isOn">
			<tr>
				<td class="title">选择缓存策略</td>
				<td>
					<span class="disabled" v-if="vCachePolicies.length == 0">暂时没有可选的缓存策略</span>
					<div v-if="vCachePolicies.length > 0">
						<select class="ui dropdown auto-width" v-model="cacheConfig.cachePolicyId" @change="changePolicyId">
							<option value="0">[不使用缓存策略]</option>
							<option v-for="policy in vCachePolicies" :value="policy.id">{{policy.name}}</option>
						</select>
					</div>
				</td>
			</tr>
		</tbody>
	</table>
	<div class="margin"></div>
</div>`
})