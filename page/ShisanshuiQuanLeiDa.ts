/**
* 十三水-全垒打
*/
module gameshisanshui.page {
    export class ShisanshuiQuanLeiDa extends game.gui.base.Page {
        private _viewUI: ui.nqp.game_ui.shisanshui.QuanLeiDaUI;

        constructor(v: Game, onOpenFunc?: Function, onCloseFunc?: Function) {
            super(v, onOpenFunc, onCloseFunc);
            this._isNeedBlack = false;
            this._isClickBlack = false;
            this._asset = [
                Path_game_shisanshui.atlas_game_ui + "shisanshui.atlas",
                
            ];
        }

        // 页面初始化函数
        protected init(): void {
            this._viewUI = this.createView('game_ui.shisanshui.QuanLeiDaUI');
            this.addChild(this._viewUI);
        }

        // 页面打开时执行函数
        protected onOpen(): void {
            super.onOpen();

            this._viewUI.ani1.on(LEvent.COMPLETE, this, this.close);
        }

        public close(): void {
            if (this._viewUI) {
                this._viewUI.ani1.off(LEvent.COMPLETE, this, this.close);
            }

            super.close();
        }
    }
}