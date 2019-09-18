/**
* 房卡类型游戏结算页面
*/
module gamershisanshui.page {
    export class RshisanshuiRoomSettlePage extends game.gui.base.Page {
        private _viewUI: ui.nqp.game_ui.shisanshui.JieSuan_FangKaUI;
        private _isGameEnd: boolean = false;  //是否结束

        constructor(v: Game, onOpenFunc?: Function, onCloseFunc?: Function) {
            super(v, onOpenFunc, onCloseFunc);
            this._isNeedBlack = true;
            this._isClickBlack = false;
            this._asset = [
                PathGameTongyong.atlas_game_ui_tongyong+ "general.atlas",
            ];
        }

        // 页面初始化函数
        protected init(): void {
            this._viewUI = this.createView('game_ui.shisanshui.JieSuan_FangKaUI');
            this.addChild(this._viewUI);
        }

        // 页面打开时执行函数
        protected onOpen(): void {
            super.onOpen();
            this._viewUI.list_settle.itemRender = this.createChildren("game_ui.tongyong.JieSuanRender3UI",ListRecordItem);
            this._viewUI.list_settle.renderHandler = new Handler(this, this.renderHandler);
            this._viewUI.list_settle.dataSource = this.dataSource[2];
            this._isGameEnd = (Number(this.dataSource[0])) == Number(this.dataSource[1]);
            this.setGameEndBtnState(this._isGameEnd);
        }

        //按钮点击
        protected onBtnTweenEnd(e: LEvent, target: any) {
            switch (target) {                
				case this._viewUI.btn_create_room:
                    this._game.uiRoot.general.open(ShisanshuiPageDef.PAGE_SSS_CREATE_CARDROOM);
                    this.close();
					break;
                case this._viewUI.btn_back_hud:
                    this._game.sceneObjectMgr.leaveStory(true);
					break;
                default:
                    break;
            }
        }

        // 设置最后结束时的按纽状态
        private setGameEndBtnState(isEventOn) {
            this._viewUI.lab_xinxi.visible = !this._isGameEnd;
            this._viewUI.btn_create_room.visible = this._isGameEnd;
            this._viewUI.btn_back_hud.visible = this._isGameEnd;
            if (isEventOn) {
                this._viewUI.btn_create_room.on(LEvent.CLICK, this, this.onBtnClickWithTween);
			    this._viewUI.btn_back_hud.on(LEvent.CLICK, this, this.onBtnClickWithTween);
            } else {
                this._viewUI.btn_create_room.off(LEvent.CLICK, this, this.onBtnClickWithTween);
			    this._viewUI.btn_back_hud.off(LEvent.CLICK, this, this.onBtnClickWithTween);
            }
        }

        private renderHandler(cell: ListRecordItem, index: number) {
            if (cell) {
                cell.setData(this._game, cell.dataSource);
            }
        }

        protected onBlackSpriteClick() {
            if (!this._isGameEnd) return;
            super.onBlackSpriteClick();
        }

        //倒计时
        private _endTime = this._game.sync.serverTimeBys + 5;
        deltaUpdate(): void {
            let curTime = this._game.sync.serverTimeBys;
            let time = Math.floor(this._endTime - curTime) + 1;
            if (time > 0) {                
                let str = time + "S后开始第" + (this.dataSource[0] + 1) + "局，本轮共" + this.dataSource[1] + "局";
                this._viewUI.lab_xinxi.text = str;
            } else {
                // 最后一局不自动关闭
                if (!this._isGameEnd) 
                    this.close();
            }
        }

        public close(): void {
            this.setGameEndBtnState(false);
            super.close();
        }
    }

    class ListRecordItem extends ui.nqp.game_ui.tongyong.JieSuanRender3UI {
        private _game: Game;
        private _data: any;
        setData(game: Game, data: any) {
            this._game = game;
            this._data = data;
            this.img_bg.visible = this._data.isMain;
            this.lab_name.text = this._data.name;
            this.lab_point.text = this._data.score.toString();
            this.lbl_totalpoint.text = this._data.totalPoint.toString();
            this.lab_name.color = this._data.isMain ? "#cc90ff" : "#ffffff";
            this.lab_point.color = parseFloat(this._data.score) >= 0 ? "#069e00" : "#ff0000";
            this.lbl_totalpoint.color = parseFloat(this._data.totalPoint) >= 0 ? "#069e00" : "#ff0000";
            for (let i = 0; i < 13; i++) {
                this["img_card" + i].skin = PathGameTongyong.ui_tongyong_pai + this._data.cardtype[i] + ".png";
            }
        }

        destroy() {
            super.destroy();
        }
    }
}