/**
* 十三水-规则
*/
module gameshisanshui.page {
	const enum TYPE_INDEX {
		TYPE_WANFA_JIESHAO = 0,
		TYPE_CARD_TYPE = 1,
		TYPE_DAXIAO = 2,
	}
	export class ShisanshuiRulePage extends game.gui.base.Page {
		private _viewUI: ui.nqp.game_ui.shisanshui.ShiSanShui_GuiZeUI;

		constructor(v: Game, onOpenFunc?: Function, onCloseFunc?: Function) {
			super(v, onOpenFunc, onCloseFunc);
			this._isNeedBlack = true;
			this._isClickBlack = true;
			this._asset = [
				Path_game_shisanshui.atlas_game_ui + "shisanshui.atlas",
				PathGameTongyong.atlas_game_ui_tongyong+ "hud.atlas",
			];
		}

		// 页面初始化函数
		protected init(): void {
			this._viewUI = this.createView('game_ui.shisanshui.ShiSanShui_GuiZeUI');
			this.addChild(this._viewUI);
			
		}

		// 页面打开时执行函数
		protected onOpen(): void {
			super.onOpen();
			this._viewUI.btn_tab.selectHandler = Handler.create(this, this.selectHandler, null, false);
			if (this.dataSource) {
				this._viewUI.btn_tab.selectedIndex = this.dataSource;
			}
			else {
				this._viewUI.btn_tab.selectedIndex = TYPE_INDEX.TYPE_WANFA_JIESHAO;
			}

			this._viewUI.panel_rule.vScrollBarSkin = "";
			this._viewUI.panel_rule.vScrollBar.autoHide = true;
			this._viewUI.panel_rule.vScrollBar.elasticDistance = 100;

			this._viewUI.panel_type.vScrollBarSkin = "";
			this._viewUI.panel_type.vScrollBar.autoHide = true;
			this._viewUI.panel_type.vScrollBar.elasticDistance = 100;

			this._viewUI.panel_daxiao.vScrollBarSkin = "";
			this._viewUI.panel_daxiao.vScrollBar.autoHide = true;
			this._viewUI.panel_daxiao.vScrollBar.elasticDistance = 100;
		}

		private selectHandler(index:number): void {
			this._viewUI.panel_rule.visible = this._viewUI.btn_tab.selectedIndex == TYPE_INDEX.TYPE_WANFA_JIESHAO;
			this._viewUI.panel_type.visible = this._viewUI.btn_tab.selectedIndex == TYPE_INDEX.TYPE_CARD_TYPE;
			this._viewUI.panel_daxiao.visible = this._viewUI.btn_tab.selectedIndex == TYPE_INDEX.TYPE_DAXIAO;
		}

		public close(): void {
			if (this._viewUI) {
				this._viewUI.btn_tab.selectedIndex = -1;
			}

			super.close();
		}
	}
}