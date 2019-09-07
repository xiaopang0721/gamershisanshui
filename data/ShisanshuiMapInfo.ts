/**
* 十三水-地图 
*/
module gameshisanshui.data {
	//十三水牌型
	const cardType = ["乌龙", "对子", "两对", "三条", "顺子", "同花", "葫芦", "铁枝", "同花顺", "三同花", "三顺子", "六对半", "五对三条",
		"四套三条", "凑一色", "全小", "全大", "三分天下", "三同花顺", "十二皇族", "一条龙", "至尊青龙"];
	export class ShisanshuiMapInfo extends gamecomponent.object.MapInfoT<ShisanshuiData> {
		//地图状态变更
		static EVENT_SSS_STATUS_CHECK: string = "ShisanshuiMapInfo.EVENT_SSS_STATUS_CHECK";
		//战斗体更新
		static EVENT_SSS_BATTLE_CHECK: string = "ShisanshuiMapInfo.EVENT_SSS_BATTLE_CHECK";
		//倒计时时间戳更新
		static EVENT_SSS_COUNT_DOWN: string = "ShisanshuiMapInfo.EVENT_SSS_COUNT_DOWN";
		private isFirst: boolean = false;	//只是显示详情空行用的

		constructor(v: SceneObjectMgr) {
			super(v, () => { return new ShisanshuiData() });
		}

		onUpdate(flags: number, mask: UpdateMask, strmask: UpdateMask): void {
			super.onUpdate(flags, mask, strmask);
			let isNew = flags & core.obj.OBJ_OPT_NEW;
			if (isNew || mask.GetBit(MapField.MAP_INT_BATTLE_INDEX)) {
				this._battleInfoMgr.OnUpdate();
				this._sceneObjectMgr.event(ShisanshuiMapInfo.EVENT_SSS_BATTLE_CHECK);
			}
			if (isNew || mask.GetBit(MapField.MAP_INT_MAP_BYTE)) {
				this._sceneObjectMgr.event(ShisanshuiMapInfo.EVENT_SSS_STATUS_CHECK);
			}
			if (isNew || mask.GetBit(MapField.MAP_INT_COUNT_DOWN)) {
				this._sceneObjectMgr.event(ShisanshuiMapInfo.EVENT_SSS_COUNT_DOWN);
			}
		}

		public getBattleInfoToString(): string {
			let str: string = "";
			for (let i = 0; i < this._battleInfoMgr.info.length; i++) {
				let battleInfo = this._battleInfoMgr.info[i] as gamecomponent.object.BattleInfoBase;
				let name = this.GetPlayerNameFromSeat(battleInfo.SeatIndex)
				if (battleInfo.Type == 39) {	//牌型
					let info = this._battleInfoMgr.info[i] as gamecomponent.object.BattleInfoSssCardType;
					let typeStr: string = "";
					for (let index = 0; index < info.typeVal.length; index++) {
						if (typeStr == "") {
							typeStr = cardType[info.typeVal[index] - 1];
						} else {
							typeStr = typeStr + "," + cardType[info.typeVal[index] - 1];
						}
					}
					let newString = name + "的牌型是：" + typeStr;
					if (!this.isFirst) {
						if (str == "") {
							str = newString;
						} else {
							str = str + "#" + "" + "#" + newString;
						}
						this.isFirst = true;
					} else {
						str = str + "#" + newString;
					}
				} else if (battleInfo.Type == 5) {	//明牌
					let info = this._battleInfoMgr.info[i] as gamecomponent.object.BattleInfoMingPai;
					let cardStr: string = "";
					for (let index = 0; index < info.Cards.length; index++) {
						let cardVal = info.Cards[index];
						let card = this.GetCardVal(cardVal);
						if (cardStr == "") {
							cardStr = card + ",";
						} else {
							cardStr = cardStr + card + ",";
						}
						if (index == 2 || index == 7) {
							cardStr = cardStr + "   "
						}
					}
					let newString = name + "的手牌是：" + cardStr;
					str = str + "#" + newString;
				} else if (battleInfo.Type == 11) {	//结算
					let info = this._battleInfoMgr.info[i] as gamecomponent.object.BattleInfoSettle;
					let newString = name + "盈利：" + info.SettleVal;
					str = str + "#" + newString;
					this.isFirst = false;
				}
			}
			return str;
		}

		//通过座位取玩家名字
		private GetPlayerNameFromSeat(index: number): string {
			let name: string;
			let users = this._battleInfoMgr.users;
			name = users[index - 1].name;
			return name
		}

		//根据牌号返回牌
		private GetCardVal(card_val: number): string {
			let cardVal: string = "";
			let valArr = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
			let val = card_val % 13;
			if (val == 0) {
				val = 13;
			}
			cardVal = valArr[val - 1];
			return cardVal;
		}
	}
}