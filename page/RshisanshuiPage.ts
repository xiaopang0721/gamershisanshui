/**
* 十三水-HUD
*/
module gamershisanshui.page {
	export class RshisanshuiPage extends game.gui.base.Page {
		private _viewUI: ui.nqp.game_ui.shisanshui.ShiSanShui_HUDUI;
		private _player: any;
		private _leastTmep: any = [1, 5, 20, 50];
		private _needMoney: any = [20, 100, 400, 1000];
		private _sssMgr: ShisanshuiMgr;

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

		}

		// 页面打开时执行函数
		protected onOpen(): void {
			super.onOpen();
			(this._viewUI.view_hud as TongyongHudNqpPage).onOpen(this._game, RshisanshuiPageDef.GAME_NAME, true, true);
			for (let index = 0; index < this._viewUI.box_roomcard.numChildren; index++) {
				this._viewUI.box_roomcard._childs[index].visible = true;
				Laya.Tween.from(this._viewUI.box_roomcard._childs[index], {
					right: -300
				}, 200 + index * 100, Laya.Ease.linearNone);
			}

			this._viewUI.img_room_create.on(LEvent.CLICK, this, this.onBtnClickWithTween);
			this._viewUI.img_room_join.on(LEvent.CLICK, this, this.onBtnClickWithTween);
		}

		protected onBtnTweenEnd(e: LEvent, target: any): void {
			this._player = this._game.sceneObjectMgr.mainPlayer;
			if (!this._player) return;
			switch (target) {
				case this._viewUI.img_room_create:
					this._game.uiRoot.general.open(RshisanshuiPageDef.PAGE_SSS_CREATE_CARDROOM);
					break;
				case this._viewUI.img_room_join:
					this._game.uiRoot.general.open(RshisanshuiPageDef.PAGE_SSS_JOIN_CARDROOM);
					break;
				default:
					break;
			}
		}

		private showTipsBox(limit: number) {
			TongyongPageDef.ins.alertRecharge(StringU.substitute("老板，您的金币少于{0}哦~\n补充点金币去大杀四方吧~", limit), () => {
				this._game.uiRoot.general.open(DatingPageDef.PAGE_CHONGZHI);
			}, () => {
			}, false, TongyongPageDef.TIPS_SKIN_STR["cz"]);
		}

		public close(): void {
			if (this._viewUI) {
				this._viewUI.img_room_create.off(LEvent.CLICK, this, this.onBtnClickWithTween);
				this._viewUI.img_room_join.off(LEvent.CLICK, this, this.onBtnClickWithTween);
			}
			this._game.stopMusic();

			super.close();
		}
	}
}