Vue.component("http-request-conds-tbody", {
	props: ["v-cond-groups"],
	data: function () {
		let groups = this.vCondGroups
		if (groups == null) {
			groups = []
		}
		return {
			groups: groups,
			components: window.REQUEST_COND_COMPONENTS
		}
	},
	methods: {
		addGroup: function () {
			let that = this
			teaweb.popup("/servers/server/settings/conds/addGroupPopup", {
				height: "30em",
				callback: function (resp) {
					that.groups.push(resp.data.group)
				}
			})
		},
		updateGroup: function (groupIndex, group) {
			window.UPDATING_COND_GROUP = group
			let that = this
			teaweb.popup("/servers/server/settings/conds/addGroupPopup", {
				height: "30em",
				callback: function (resp) {
					Vue.set(that.groups, groupIndex, resp.data.group)
				}
			})
		},
		removeGroup: function (groupIndex) {
			let that = this
			teaweb.confirm("确定要删除这一组条件吗？", function () {
				that.groups.$remove(groupIndex)
			})
		},
		typeName: function (cond) {
			let c = this.components.$find(function (k, v) {
				return v.type == cond.type
			})
			if (c != null) {
				return c.name;
			}
			return cond.param + " " + cond.operator
		}
	},
	template: `<tbody>
		<tr>
			<td>匹配条件</td>
			<td>
				<input type="hidden" name="condGroupsJSON" :value="JSON.stringify(groups)"/>
				<div class="margin"></div>
				<div v-if="groups.length > 0">
					<table class="ui table">
						<tr v-for="(group, groupIndex) in groups">
							<td style="background: white">
								<var v-for="(cond, index) in group.conds" style="font-style: normal;display: inline-block; margin-bottom:0.5em">
									<span class="ui label tiny">
										<var v-if="cond.type.length == 0" style="font-style: normal">{{cond.param}} <var>{{cond.operator}}</var></var>
										<var v-if="cond.type.length > 0" style="font-style: normal">{{typeName(cond)}}: </var>
										{{cond.value}}
									</span>
									
									<var v-if="index < group.conds.length - 1"> {{group.connector}} &nbsp;</var>
								</var>
							</td>
							<td style="width: 5em; background: white">
								<a href="" title="修改" @click.prevent="updateGroup(groupIndex, group)"><i class="icon pencil small"></i></a> <a href="" title="删除" @click.prevent="removeGroup(groupIndex)"><i class="icon remove"></i></a>
							</td>
						</tr>
					</table>
					<div class="ui divider"></div>
				</div>
				
				<div>
					<button class="ui button tiny" type="button" @click.prevent="addGroup()">+</button>
				</div>
			</td>
		</tr>
	</tbody>`
})