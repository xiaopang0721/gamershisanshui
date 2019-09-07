/**
* name 十三水-剧情
*/
module gameshisanshui.story {
	const enum MAP_STATUS {
        MAP_STATE_NONE = 0,			//初始化
        MAP_STATE_CARDROOM_CREATED = 1,  	//房间创建后
        MAP_STATE_CARDROOM_WAIT = 2,		//房卡等人中
        MAP_STATE_SHUFFLE = 3,  	//洗牌中
        MAP_STATE_DEAL = 4,			//准备发牌
        MAP_STATE_DEAL_END = 5,		//发牌结束
        MAP_STATE_PLAYING = 6,		//准备出牌
        MAP_STATE_COMPARE = 7, 	    //准备比牌
        MAP_STATE_QUANLEIDA = 8,    //全垒打
        MAP_STATE_SPECIAL = 9,      //特殊牌翻牌
        MAP_STATE_SETTLE = 10,		//准备结算
        MAP_STATE_WAIT = 11,		//等待下一局
        MAP_STATE_END = 12,			//结束
    }
	export class ShisanshuiStory extends gamecomponent.story.StoryNormalBase {
		private _sssMgr: ShisanshuiMgr;
		private _cardsTemp: any = [];
		private _sssMapInfo: ShisanshuiMapInfo;

		constructor(v: Game, mapid: string, maplv: number) {
			super(v, mapid, maplv);
			this.init();
		}

		init() {
			if (!this._sssMgr) {
				this._sssMgr = new ShisanshuiMgr(this._game);
			}
			this._game.sceneObjectMgr.on(SceneObjectMgr.EVENT_LOAD_MAP, this, this.onIntoNewMap);
			this._game.sceneObjectMgr.on(SceneObjectMgr.EVENT_MAPINFO_CHANGE, this, this.onMapInfoChange);
			this._game.sceneObjectMgr.on(MapInfo.EVENT_STATUS_CHECK, this, this.onUpdateState);
			this.onIntoNewMap();
			super.init();
		}

		get sssMgr() {
			return this._sssMgr;
		}

		set mapLv(lv: number) {
			this.maplv = lv;
		}

		get mapLv() {
			return this.maplv;
		}

		private onIntoNewMap(info?: MapAssetInfo): void {
			if (!info) return;

			this.onMapInfoChange();
			this._game.uiRoot.closeAll();
			this._game.uiRoot.HUD.open(ShisanshuiPageDef.PAGE_SSS_MAP);
		}

		private onMapInfoChange(): void {
			let mapinfo = this._game.sceneObjectMgr.mapInfo;
			this._sssMapInfo = mapinfo as ShisanshuiMapInfo;
			if (mapinfo) {
				this.onUpdateState();
				this.onUpdateCardInfo();
			} else {
				this._sssMgr.unitOffline = this._offlineUnit;
			}
		}

		private onUpdateState(): void {
			let mapinfo: MapInfo = this._game.sceneObjectMgr.mapInfo;
			let mainUnit: Unit = this._game.sceneObjectMgr.mainUnit;
			if (!mapinfo) return;
			if (!mainUnit) return;
			let statue = mapinfo.GetMapState();
			switch (statue) {
				case MAP_STATUS.MAP_STATE_DEAL://发牌
					this.updateCardsCount();
					let handle = new Handler(this, this._sssMgr.createObj);
					this._sssMgr.Init(this._cardsTemp, handle);
					this._sssMgr.sort();
					this._sssMgr.fapai();
					break;
			}
		}

		//断线重连,重发下牌
		private onUpdateCardInfo(): void {
			let mapinfo: MapInfo = this._game.sceneObjectMgr.mapInfo;
			let mainUnit: Unit = this._game.sceneObjectMgr.mainUnit;
			if (!mapinfo) return;
			if (!mainUnit) return;
			let statue = mapinfo.GetMapState();
			if (statue >= MAP_STATUS.MAP_STATE_SHUFFLE && statue <= MAP_STATUS.MAP_STATE_WAIT) {
				this._sssMgr.isReLogin = true;
				if (statue > MAP_STATUS.MAP_STATE_DEAL && !this._sssMgr.isReDealCard) {
					this._sssMgr.isReDealCard = true;
					this.updateCardsCount();
					let handle = new Handler(this, this._sssMgr.createObj);
					this._sssMgr.Init(this._cardsTemp, handle);
					this._sssMgr.sort();
					this._sssMgr.refapai();
				}
			}
		}

		//算下在场几个人来定牌数
		private updateCardsCount(): void {
			let card = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
			this._cardsTemp = [];
			let maxCount = 4;
			for (let index = 1; index < maxCount + 1; index++) {
				let unit = this._game.sceneObjectMgr.getUnitByIdx(index)
				if (unit) {
					this._cardsTemp = this._cardsTemp.concat(card);
				}
			}
		}

		createofflineUnit() {
			//创建假的地图和精灵
			let unitOffline = new UnitOffline(this._game.sceneObjectMgr);
			if (this._game.sceneObjectMgr.mainPlayer) {
				unitOffline.SetStr(UnitField.UNIT_STR_NAME, this._game.sceneObjectMgr.mainPlayer.playerInfo.nickname);
				unitOffline.SetStr(UnitField.UNIT_STR_HEAD_IMG, this._game.sceneObjectMgr.mainPlayer.playerInfo.headimg);
				unitOffline.SetDouble(UnitField.UNIT_INT_MONEY, this._game.sceneObjectMgr.mainPlayer.playerInfo.money);
				unitOffline.SetUInt32(UnitField.UNIT_INT_QI_FU_END_TIME, this._game.sceneObjectMgr.mainPlayer.playerInfo.qifu_endtime);
				unitOffline.SetUInt32(UnitField.UNIT_INT_QI_FU_TYPE, this._game.sceneObjectMgr.mainPlayer.playerInfo.qifu_type);
				unitOffline.SetUInt32(UnitField.UNIT_INT_VIP_LEVEL, this._game.sceneObjectMgr.mainPlayer.playerInfo.vip_level);
			}
			unitOffline.SetUInt16(UnitField.UNIT_INT_UINT16, 0, 1);

			this._offlineUnit = unitOffline;
		}

		enterMap() {
			//各种判断
			if (this.mapinfo) return false;
			if (!this.maplv) {
				this.maplv = this._last_maplv;
			}
			this._game.network.call_match_game(this._mapid, this.maplv)
			return true;
		}

		leavelMap() {
			//各种判断
			this._game.network.call_leave_game();
			return true;
		}

		clear() {
			super.clear();
			this._game.sceneObjectMgr.off(SceneObjectMgr.EVENT_LOAD_MAP, this, this.onIntoNewMap);
			this._game.sceneObjectMgr.off(SceneObjectMgr.EVENT_MAPINFO_CHANGE, this, this.onMapInfoChange);
			this._game.sceneObjectMgr.off(MapInfo.EVENT_STATUS_CHECK, this, this.onUpdateState);
			if (this._sssMgr) {
				this._sssMgr.clear();
				this._sssMgr = null;
			}
			this._sssMapInfo = null;
		}
	}
}