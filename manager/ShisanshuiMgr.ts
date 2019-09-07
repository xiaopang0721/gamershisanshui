/**
* 十三水-牌 
*/
module gameshisanshui.manager {
	const enum CARD_TYPE {
		CARDS_TYPE_POINTS = 1,	//点数牌
		CARDS_TYPE_WL = 0, //乌龙
		CARDS_TYPE_DZ = 1, //对子
		CARDS_TYPE_LD = 2, //两对
		CARDS_TYPE_ST = 3, //三条
		CARDS_TYPE_SZ = 4, //顺子
		CARDS_TYPE_TH = 5, //同花
		CARDS_TYPE_HL = 6, //葫芦
		CARDS_TYPE_TZ = 7, //铁支
		CARDS_TYPE_THS = 8, //同花顺
		CARDS_TYPE_STH = 9, //三同花
		CARDS_TYPE_SSZ = 10, //三顺子
		CARDS_TYPE_LDB = 11, //六对半
		CARDS_TYPE_WDST = 12, //五对三条
		CARDS_TYPE_STST = 13, //四套三条
		CARDS_TYPE_CYS = 14, //凑一色
		CARDS_TYPE_QX = 15, //全小
		CARDS_TYPE_QD = 16, //全大
		CARDS_TYPE_SFTX = 17, //三分天下
		CARDS_TYPE_STHS = 18, //三同花顺
		CARDS_TYPE_SEHZ = 19, //十二皇族
		CARDS_TYPE_YTL = 20, //一条龙
		CARDS_TYPE_ZZQL = 21, //至尊青龙
	}
	const MIN_CHECKTIME: number = 1000;//最小检测时间间隔(毫秒)

	export class ShisanshuiMgr extends gamecomponent.managers.PlayingCardMgrBase<ShisanshuiData>{
		public isReLogin: boolean;		//是否断线重连，各种判断操作用的
		public cardsTemp: any = [];	//牌数据

		static readonly MAPINFO_OFFLINE: string = "ShisanshuiMgr.MAPINFO_OFFLINE";//假精灵
		static readonly DEAL_CARDS: string = "ShisanshuiMgr.DEAL_CARDS";//发牌结束
		static readonly MIN_CARD_SEATS_COUNT: number = 2; // 房卡模式下最小人数
		static readonly WXSHARE_TITLE = "十三水]房号:{0}";	// 分享标题
		static readonly WXSHARE_DESC = "开好房喽,就等你们一起来玩十三水啦!晚了位置就没了哟~";	// 分享内容

		private _offsetTime: number//剩余检测时间(毫秒)
		private _unitOffline: UnitOffline;//假精灵信息
		private _partPos: any = [];		//分牌过的位置
		private _isReDealCard: boolean = false;
		private _totalUnitCount: number = 4;	// 玩家数量

		constructor(game: Game) {
			super(game);
		}

		get unitOffline() {
			return this._unitOffline;
		}

		set unitOffline(v) {
			this._unitOffline = v;
			this.event(ShisanshuiMgr.MAPINFO_OFFLINE)
		}

		get isReDealCard() {
			return this._isReDealCard;
		}

		set isReDealCard(v) {
			this._isReDealCard = v;
		}

		get totalUnitCount() {
			return this._totalUnitCount;
		}

		set totalUnitCount(v: number) {
			this._totalUnitCount = v;
		}

		//心跳更新
		update(diff: number) {
			if (this._offsetTime > 0) {
				this._offsetTime -= diff;
				return;
			}
			this._offsetTime = MIN_CHECKTIME;
		}

		private getCardValue(card: any): number {
			let cardValue = 0;
			card = card - 1;
			cardValue = card % 13;
			if (cardValue == 0)
				cardValue = 13;
			return cardValue;
		}

		//找出一堆牌里N张一样的牌
		private findSomeCards(cards: any, count: number): any {
			let temp = [];
			if (cards.length < count) return temp;
			for (let i = 0; i < cards.length - 1; i++) {
				temp = [];
				let val = this.getCardValue(cards[i]);
				for (let k = 0; k < cards.length; k++) {
					if (this.getCardValue(cards[k]) == val) {
						temp.push(cards[k]);
					}
				}
				if (temp.length >= count) break;
			}
			if (temp.length >= count) {
				for (let i = 0; i < temp.length; i++) {
					for (let k = 0; k < cards.length; k++) {
						if (temp[i] == cards[k]) {
							cards.splice(k, 1);
							break;
						}
					}
				}
			} else {
				temp = [];
			}
			return temp;
		}

		//从手牌里找所有2张以上
		private findDuiZi(cards: any): any {
			let temp = [];
			if (cards.length < 2) return temp;
			let flag: boolean = true;
			while (flag) {
				let temp1 = this.findSomeCards(cards, 2);
				if (temp1.length >= 2) {
					temp.push(temp1)
				} else {
					flag = false;
				}
			}
			return temp;
		}

		//从手牌里找出所有3张以上
		private findSanZhang(cards: any): any {
			let temp = [];
			if (cards.length < 3) return temp;
			let flag: boolean = true;
			while (flag) {
				let temp1 = this.findSomeCards(cards, 3);
				if (temp1.length >= 3) {
					temp.push(temp1)
				} else {
					flag = false;
				}
			}
			return temp;
		}

		//从手牌里找出所有4张
		private findTieZhi(cards: any): any {
			let temp = [];
			if (cards.length < 4) return temp;
			let flag: boolean = true;
			while (flag) {
				let temp1 = this.findSomeCards(cards, 4);
				if (temp1.length == 4) {
					temp.push(temp1)
				} else {
					flag = false;
				}
			}
			return temp;
		}

		//复制数组，1复制到2
		copyTalbe(temp1: any, temp2: any): void {
			for (let i = 0; i < temp1.length; i++) {
				temp2[i] = temp1[i];
			}
		}

		// 是否对子
		private isDouble(cards: any): boolean {
			if (cards.length != 3 && cards.length != 5) return false;
			let copyCards = [];
			this.copyTalbe(cards, copyCards);
			let temp = this.findDuiZi(copyCards);
			//只能有一个对
			if (temp.length != 1) return false;
			//还必须是对子
			if (temp[0].length != 2) return false;
			return true;
		}

		//是否两对
		private isTwoDouble(cards: any): boolean {
			if (cards.length != 5) return false;
			let copyCards = [];
			this.copyTalbe(cards, copyCards);
			let temp = this.findDuiZi(copyCards);
			if (temp.length != 2) return false;
			//两对肯定会有一张单张
			if (copyCards.length != 1) return false;
			return true;
		}

		//是否三条
		private isSanTiao(cards: any): boolean {
			if (cards.length != 3 && cards.length != 5) return false;
			let copyCards = [];
			this.copyTalbe(cards, copyCards);
			let temp = this.findSanZhang(copyCards);
			//只有一个3张
			if (temp.length != 1) return false;
			if (temp[0].length != 3) return false;
			//如果有剩下的，不能是对子
			if (copyCards.length > 0) {
				if (this.getCardValue(copyCards[0]) == this.getCardValue(copyCards[1])) return false;
			}
			return true;
		}

		//是否同花
		private isTongHua(cards: any): boolean {
			let length = cards.length;
			if (length != 5) return false;
			let color1 = Math.floor((cards[0] - 1) / 13);
			for (let i = 1; i < length; i++) {
				let color2 = Math.floor((cards[i] - 1) / 13);
				if (color1 != color2)
					return false;
			}
			return true;
		}

		//是否顺子
		private isShunZi(cards: any): boolean {
			if (cards.length != 5) return false;
			// //去掉同花
			// if (this.isTongHua(cards)) return false;
			let val = this.getCardValue(cards[0]);
			for (let i = 1; i < cards.length; i++) {
				if (this.getCardValue(cards[i]) + 1 == val) {
					val = this.getCardValue(cards[i]);
				} else {
					//有个特殊的顺子，12345
					if (this.getCardValue(cards[0]) == 13 && this.getCardValue(cards[1]) == 4 && this.getCardValue(cards[2]) == 3
						&& this.getCardValue(cards[3]) == 2 && this.getCardValue(cards[4]) == 1) {
						return true
					} else {
						return false;
					}
				}
			}
			return true;
		}

		//是否葫芦
		private isHuLu(cards: any): boolean {
			if (cards.length != 5) return false;
			let copyCards = [];
			this.copyTalbe(cards, copyCards);
			let temp = this.findDuiZi(copyCards);
			//2个2张以上的
			if (temp.length != 2) return false;
			//不能剩下单张
			if (copyCards.length > 0) return false;
			return true;
		}

		//是否铁支
		private isTieZhi(cards: any): boolean {
			if (cards.length != 5) return false;
			let copyCards = [];
			this.copyTalbe(cards, copyCards);
			let temp = this.findTieZhi(copyCards);
			if (temp.length != 1) return false;
			return true;
		}

		//是否同花顺
		private isTongHuaShun(cards: any): boolean {
			if (cards.length != 5) return false;
			if (this.isTongHua(cards) && this.isShunZi(cards)) return true;
			return false;
		}

		//对牌进行排序
		private sortCards(cards: any[]): void {
			if (!cards) return;
			cards.sort((a: number, b: number) => {
				return this.getCardValue(b) - this.getCardValue(a);
			});
		}

		//检查牌型
		public checkCardsType(cards: any): number {
			this.sortCards(cards);
			let type: number;
			if (this.isDouble(cards)) {
				type = CARD_TYPE.CARDS_TYPE_DZ;
			} else if (this.isTwoDouble(cards)) {
				type = CARD_TYPE.CARDS_TYPE_LD;
			} else if (this.isSanTiao(cards)) {
				type = CARD_TYPE.CARDS_TYPE_ST;
			} else if (this.isTongHuaShun(cards)) {
				type = CARD_TYPE.CARDS_TYPE_THS;
			} else if (this.isTongHua(cards)) {
				type = CARD_TYPE.CARDS_TYPE_TH;
			} else if (this.isShunZi(cards)) {
				type = CARD_TYPE.CARDS_TYPE_SZ;
			} else if (this.isHuLu(cards)) {
				type = CARD_TYPE.CARDS_TYPE_HL;
			} else if (this.isTieZhi(cards)) {
				type = CARD_TYPE.CARDS_TYPE_TZ;
			}
			else {
				type = CARD_TYPE.CARDS_TYPE_WL;
			}
			return type;
		}

		createObj(u: Unit) {
			let card = this._game.sceneObjectMgr.createOfflineObject(SceneRoot.CARD_MARK, ShisanshuiData) as ShisanshuiData;
			card.pos = new Vector2(640, 360);
			return card;
		}

		sort() {
			let cards = this._cards;
			let max = 4;
			let mainUnit: Unit = this._game.sceneObjectMgr.mainUnit;
			let idx = mainUnit.GetIndex();
			let count = 0;
			for (let index = 0; index < max; index++) {
				let posIdx = (idx + index) % max == 0 ? max : (idx + index) % max;
				let unit = this._game.sceneObjectMgr.getUnitByIdx(posIdx);
				if (unit) {
					for (let i = 0; i < 13; i++) {
						let card = cards[count * 13 + i] as ShisanshuiData;
						if (card) {
							card.myOwner(idx, posIdx, i);
							card.index = i;
							card.sortScore = -i;
						}
					}
					count++;
				}
			}
		}

		//发牌
		fapai() {
			let count = 0;
			let cardIndex = 0;
			for (let index = 0; index < 13; index++) {
				for (let i = 0; i < this._cards.length / 13; i++) {
					let card = this._cards[index + i * 13];
					if (card) {
						//播音效
						Laya.timer.once(15 * count, this, () => {
							this._game.playSound(PathGameTongyong.music_tongyong + "fapai.mp3", false);
							card.fapai();
							cardIndex++;
							if (cardIndex == this._cards.length)
								this.event(ShisanshuiMgr.DEAL_CARDS)
						});
						count++;
					}
				}
			}
		}

		//重连发牌
		refapai() {
			for (let i = 0; i < this._cards.length; i++) {
				let card = this._cards[i];
				card.refapai();
			}
		}

		//出牌
		playingCard(pos: number) {
			for (let i = 0; i < this._cards.length; i++) {
				let card = this._cards[i];
				if (card._ownerIdx == pos) {
					card.playingcard();
				}
			}
		}

		//给牌赋值
		showCards(cards: any, pos: number) {
			let mainIdx = this._game.sceneObjectMgr.mainUnit.GetIndex();
			if (mainIdx == 0) return;
			for (let index = 0; index < cards.length; index++) {
				for (let i = 0; i < this._cards.length; i++) {
					let card = this._cards[i];
					if (card._ownerIdx == pos && card._cardIndex == index) {
						card.Init(cards[index]);
					}
				}
			}
		}

		//翻牌
		compare(index: number, dun: number) {
			let mainIdx = this._game.sceneObjectMgr.mainUnit.GetIndex();
			if (mainIdx == 0) return;
			for (let i = 0; i < this._cards.length; i++) {
				let card = this._cards[i];
				if (dun == 1) {
					if (card.index < 3 && card._ownerIdx == index) {
						card.fanpai();
					}
				} else if (dun == 2 && card._ownerIdx == index) {
					if (card.index < 8) {
						card.fanpai();
					}
				} else if (dun == 3 && card._ownerIdx == index) {
					card.fanpai();
				}
			}
		}

		//加一张牌
		addCard(val: number, create_fun: Handler, ownerIdx: number, cardIdx: number): void {
			let mainIdx = this._game.sceneObjectMgr.mainUnit.GetIndex();
			if (mainIdx == 0) return;
			let card: ShisanshuiData;
			card = create_fun.run();
			this.cardsTemp.push(card);
			card.Init(val);
			card._isPinPai = true;
			card.myOwner(mainIdx, ownerIdx, cardIdx);
		}

		playCard() {
			for (let i = 0; i < this.cardsTemp.length; i++) {
				let card = this.cardsTemp[i];
				card.sortScore = -i - 13;
				card.index = i;
				card._isTouch = false;
				card.toggleEnable = true;
				card.pinpai();
			}
		}

		//选择牌型
		xuanpai(cards: any, type: number) {
			for (let i = 0; i < cards.length; i++) {
				let card = cards[i];
				card.sortScore = -type * 5 - i - 13;
				card.index = i;
				card._cardType = type;
				card.xuanpai();
			}
		}

		//隐藏自己的牌
		setCardVisible(show: boolean): void {
			let mainUnit: Unit = this._game.sceneObjectMgr.mainUnit;
			if (!mainUnit) return;
			let mainIdx = mainUnit.GetIndex();
			if (mainIdx == 0) return;
			for (let i = 0; i < this._cards.length; i++) {
				let card = this._cards[i] as ShisanshuiData;
				if (card._ownerIdx == mainIdx) {
					card.visible = show;
				}
			}
		}

		// 清理指定玩家卡牌对象
		clearCardObject(): void {
			this._game.sceneObjectMgr.ForEachObject((obj: any) => {
				if (obj instanceof ShisanshuiData) {
					if (obj._isPinPai) {
						this._game.sceneObjectMgr.clearOfflineObject(obj);
					}
				}
			})
		}

		//重置数据
		resetData(): void {
			this.cardsTemp = [];
			this._partPos = [];		//分牌过的位置
			this._isReDealCard = false;
			this._totalUnitCount = 4;	// 玩家数量
		}
	}
}