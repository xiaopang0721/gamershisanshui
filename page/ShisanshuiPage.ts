/**
* 十三水-HUD
*/
module gameshisanshui.page {
	export class ShisanshuiPage extends game.gui.base.Page {
		private _viewUI: ui.nqp.game_ui.shisanshui.ShiSanShui_HUDUI;
		private _player: any;
		private _leastTmep: any = [1, 5, 20, 50];
		private _needMoney: any = [20, 100, 400, 1000];
		private _sssMgr: ShisanshuiMgr;
		private _isRoomcardType: boolean = false;

		constructor(v: Game, onOpenFunc?: Function, onCloseFunc?: Function) {
			super(v, onOpenFunc, onCloseFunc);
			this._asset = [
				Path_game_shisanshui.atlas_game_ui + "shisanshui.atlas",
				PathGameTongyong.atlas_game_ui_tongyong + "general.atlas",
				PathGameTongyong.atlas_game_ui_tongyong + "touxiang.atlas",
				PathGameTongyong.atlas_game_ui_tongyong + "hud.atlas",
				PathGameTongyong.atlas_game_ui_tongyong + "dating.atlas",
				PathGameTongyong.atlas_game_ui_tongyong + "logo.atlas",
			];
			this._isNeedDuang = false;
		}

		// 页面初始化函数
		protected init(): void {
			this._viewUI = this.createView('game_ui.shisanshui.ShiSanShui_HUDUI', ["game_ui.tongyong.HudUI"]);
			this.addChild(this._viewUI);
			this._game.playMusic(Path.music + "shisanshui/13s_bgm.mp3");
			this._sssMgr = new ShisanshuiMgr(this._game);

			for (let index = 0; index < this._viewUI.box_right.numChildren; index++) {
				this._viewUI.box_right._childs[index].visible = false;
			}
		}

		/**数据*/
		set dataSource(v: any) {
			this._dataSource = v;
			this._isRoomcardType = this._dataSource == PageDef.TYPE_CARD;
		}

		// 页面打开时执行函数
		protected onOpen(): void {
			super.onOpen();

			this.initPlayerInfo()
			this._viewUI.box_normal.visible = !this._isRoomcardType;
			this._viewUI.box_roomcard.visible = this._isRoomcardType;
			(this._viewUI.view_hud as TongyongHudNqpPage).onOpen(this._game, ShisanshuiPageDef.GAME_NAME, this._isRoomcardType);
			if (this._isRoomcardType) {
				for (let index = 0; index < this._viewUI.box_roomcard.numChildren; index++) {
					this._viewUI.box_right._childs[index].visible = true;
					Laya.Tween.from(this._viewUI.box_right._childs[index], {
						right: -300
					}, 200 + index * 100, Laya.Ease.linearNone);
				}
			} else {
				for (let index = 0; index < this._viewUI.box_right.numChildren; index++) {
					this._viewUI.box_right._childs[index].visible = true;
					Laya.Tween.from(this._viewUI.box_right._childs[index], {
						right: -300
					}, 200 + index * 100, Laya.Ease.linearNone);
				}
			}

			this._viewUI.img_room0.on(LEvent.CLICK, this, this.onBtnClickWithTween);
			this._viewUI.img_room1.on(LEvent.CLICK, this, this.onBtnClickWithTween);
			this._viewUI.img_room2.on(LEvent.CLICK, this, this.onBtnClickWithTween);
			this._viewUI.img_room3.on(LEvent.CLICK, this, this.onBtnClickWithTween);
			this._viewUI.img_room_create.on(LEvent.CLICK, this, this.onBtnClickWithTween);
			this._viewUI.img_room_join.on(LEvent.CLICK, this, this.onBtnClickWithTween);
		}

		protected onBtnTweenEnd(e: LEvent, target: any): void {
			this._player = this._game.sceneObjectMgr.mainPlayer;
			if (!this._player) return;
			if (this.chkPlayerIsGuest()) return;
			switch (target) {
				case this._viewUI.img_room0:
					if (this._player.playerInfo.money < this._needMoney[0]) {
						this.showTipsBox(this._needMoney[0]);
						return;
					}
					this._game.sceneObjectMgr.intoStory(ShisanshuiPageDef.GAME_NAME, Web_operation_fields.GAME_ROOM_CONFIG_SHISANSHUI_1.toString());
					break;
				case this._viewUI.img_room1:
					if (this._player.playerInfo.money < this._needMoney[1]) {
						this.showTipsBox(this._needMoney[1]);
						return;
					}
					this._game.sceneObjectMgr.intoStory(ShisanshuiPageDef.GAME_NAME, Web_operation_fields.GAME_ROOM_CONFIG_SHISANSHUI_2.toString());
					break;
				case this._viewUI.img_room2:
					if (this._player.playerInfo.money < this._needMoney[2]) {
						this.showTipsBox(this._needMoney[2]);
						return;
					}
					this._game.sceneObjectMgr.intoStory(ShisanshuiPageDef.GAME_NAME, Web_operation_fields.GAME_ROOM_CONFIG_SHISANSHUI_3.toString());
					break;
				case this._viewUI.img_room3:
					if (this._player.playerInfo.money < this._needMoney[3]) {
						this.showTipsBox(this._needMoney[3]);
						return;
					}
					this._game.sceneObjectMgr.intoStory(ShisanshuiPageDef.GAME_NAME, Web_operation_fields.GAME_ROOM_CONFIG_SHISANSHUI_4.toString());
					break;
				case this._viewUI.img_room_create:
					this._game.uiRoot.general.open(ShisanshuiPageDef.PAGE_SSS_CREATE_CARDROOM);
					break;
				case this._viewUI.img_room_join:
					this._game.uiRoot.general.open(ShisanshuiPageDef.PAGE_SSS_JOIN_CARDROOM);
					break;
				default:
					break;
			}
		}

		private showTipsBox(limit: number) {
			TongyongPageDef.ins.alertRecharge(StringU.substitute("老板，您的金币少于{0}哦~\n补充点金币去大杀四方吧~", limit), () => {
				this._game.uiRoot.general.open(DatingPageDef.PAGE_CHONGZHI);
			}, () => {
			}, true, TongyongPageDef.TIPS_SKIN_STR['cz']);
		}

		private chkPlayerIsGuest(): boolean {
			let result: boolean = false;
			if (this._player.playerInfo.isguest) {
				TongyongPageDef.ins.alertRecharge("您选择了游客模式登录游戏，由于该模式下的游戏数据(包括付费数据)在删除游戏、更换设备后将被清空!对此造成的损失，本平台将不承担任何责任。为了您的虚拟财产安全,我们强烈建议您使用微信登录和账号登录游戏!", () => {
					this._game.uiRoot.general.open(DatingPageDef.PAGE_BINDPHONE, (page) => {
						page.dataSource = 3;//绑定手机类型
					})
				}, () => {
				}, false, TongyongPageDef.TIPS_SKIN_STR['qw']);
				result = true;
			}
			return result;
		}

		private initPlayerInfo(): void {
			for (let index = 0; index < 4; index++) {
				this._viewUI["lab_least" + index].text = "底分: " + this._leastTmep[index];
				this._viewUI["lab_money" + index].text = "准入: " + this._needMoney[index];
			}
		}

		public close(): void {
			if (this._viewUI) {
				this._viewUI.img_room0.off(LEvent.CLICK, this, this.onBtnClickWithTween);
				this._viewUI.img_room1.off(LEvent.CLICK, this, this.onBtnClickWithTween);
				this._viewUI.img_room2.off(LEvent.CLICK, this, this.onBtnClickWithTween);
				this._viewUI.img_room3.off(LEvent.CLICK, this, this.onBtnClickWithTween);
				this._viewUI.img_room_create.off(LEvent.CLICK, this, this.onBtnClickWithTween);
				this._viewUI.img_room_join.off(LEvent.CLICK, this, this.onBtnClickWithTween);
			}
			this._game.stopMusic();

			super.close();
		}
	}
}