/**
* 十三水-拼牌界面
*/
module gameshisanshui.page {
    export class ShisanshuiSpecial extends game.gui.base.Page {
        private _viewUI: ui.nqp.game_ui.shisanshui.TipsUI;
        private _mapInfo: ShisanshuiMapInfo;
        private _cards: any = [];   //当前拼牌界面的牌

        constructor(v: Game, onOpenFunc?: Function, onCloseFunc?: Function) {
            super(v, onOpenFunc, onCloseFunc);
            this._isNeedBlack = true;
            this._isClickBlack = false;
            this._asset = [
                Path_game_shisanshui.atlas_game_ui + "shisanshui.atlas",
                Path_game_shisanshui.atlas_game_ui + "shisanshui/effect/paixing.atlas",
                PathGameTongyong.atlas_game_ui_tongyong+ "hud.atlas",
            ];
        }

        // 页面初始化函数
        protected init(): void {
            this._viewUI = this.createView('game_ui.shisanshui.TipsUI');
            this.addChild(this._viewUI);
        }

        // 页面打开时执行函数
        protected onOpen(): void {
            super.onOpen();

            let mapInfo = this._game.sceneObjectMgr.mapInfo;
            if (mapInfo) {
                this._mapInfo = mapInfo as ShisanshuiMapInfo;
                this.updateBattledInfo();
            }
            this._viewUI.btn_cancle.on(LEvent.CLICK, this, this.onBtnClickWithTween);
            this._viewUI.btn_enter.on(LEvent.CLICK, this, this.onBtnClickWithTween);
        }

        protected onBtnTweenEnd(e: LEvent, target: any): void {
            switch (target) {
                case this._viewUI.btn_enter:
                    let str = JSON.stringify(this._cards);
                    this._game.network.call_shisanshui_playing(str, 1);
                    break;
                case this._viewUI.btn_cancle:
                    this._game.network.call_sss_cancel_special();
                    this.close();
                    break;
                default:
                    break;
            }
        }

        //战斗日志
        private updateBattledInfo(): void {
            let mainUnit = this._game.sceneObjectMgr.mainUnit;
            if (!mainUnit) return;
            let battleInfoMgr = this._mapInfo.battleInfoMgr;
            let mainIdx = mainUnit.GetIndex();
            if (mainIdx == 0) return;
            for (let i = 0; i < battleInfoMgr.info.length; i++) {
                let battleInfo = battleInfoMgr.info[i] as gamecomponent.object.BattleInfoBase;
                if (battleInfo.Type == 3) {
                    let info = battleInfoMgr.info[i] as gamecomponent.object.BattleInfoPlayCard<data.ShisanshuiData>;
                    let idx = info.SeatIndex;
                    if (idx == mainIdx) {
                        for (let index = 0; index < info.Cards.length; index++) {
                            let card = info.Cards[index];
                            this._cards.push(card.GetVal());
                        }
                        if (info.CardType > 0) {
                            this._viewUI.img_type.skin = Path_game_shisanshui.ui_shisanshui + "effect/paixing/tu_paix" + info.CardType + ".png";
                        }
                    }
                }
            }
        }

        public close(): void {
            if (this._viewUI) {
                this._viewUI.btn_cancle.off(LEvent.CLICK, this, this.onBtnClickWithTween);
                this._viewUI.btn_enter.off(LEvent.CLICK, this, this.onBtnClickWithTween);
            }
            this._mapInfo = null;

            super.close();
        }
    }
}