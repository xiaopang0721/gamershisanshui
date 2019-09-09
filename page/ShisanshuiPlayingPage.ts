/**
* 十三水-拼牌界面
*/
module gameshisanshui.page {
    export class ShisanshuiPlayingPage extends game.gui.base.Page {
        private _viewUI: ui.nqp.game_ui.shisanshui.PaiXingTiShiUI;
        private _sssMgr: ShisanshuiMgr;
        private _sssStory: any;
        private _mapInfo: ShisanshuiMapInfo;
        private _playCardsTemp: any = []; //要出的牌
        private _cards: any = [];   //当前拼牌界面的牌
        private _chooseCards: any = []; //已选中的牌
        private _touDunCards: any = []; //头墩的牌
        private _zhongDunCards: any = [];   //中墩的牌
        private _weiDunCards: any = []; //尾墩的牌
        private _duiZiTemp: any = [];   //对子集合
        private _duiziNum: number = 0;  //第几个对子
        private _liangDuiNum: number = 0;   //两对的顺序,10位数是第一个对子，个位数是第二个对子
        private _sanTiaoTemp: any = []; //三条集合
        private _sanTiaoNum: number = 0;    //第几个三条
        private _shunZiTemp: any = [];  //顺子集合
        private _shunZiNum: number = 0; //第几个顺子
        private _tongHuaTemp: any = []; //同花集合
        private _tongHuaNum: number = 0;    //第几个同花
        private _huLunNum: number = 0;  //葫芦，10位数是三条，个位数是对子
        private _tieZhiTemp: any = [];  //铁支集合
        private _tieZhiNum: number = 0; //第几个铁支
        private _tongHuaShunTemp: any = []; //同花顺集合
        private _tongHuaShunNum: number = 0;    //第几个同花顺
        private _battleInfoIdx: number = 0; //战斗日志长度
        private _simpleCards: any = []; //简易牌型集合
        private _typeTemp: any = ["乌龙", "对子", "两对", "三条", "顺子", "同花", "葫芦", "铁支", "同花顺",];    //所有牌型
        private _exchangeCard: ShisanshuiData; //要换的那张牌
        private _countDown: number; //倒计时时间

        constructor(v: Game, onOpenFunc?: Function, onCloseFunc?: Function) {
            super(v, onOpenFunc, onCloseFunc);
            this._isNeedBlack = true;
            this._isClickBlack = false;
            this._asset = [
                Path_game_shisanshui.atlas_game_ui + "shisanshui.atlas",
                PathGameTongyong.atlas_game_ui_tongyong+ "hud.atlas",
            ];
        }

        // 页面初始化函数
        protected init(): void {
            this._viewUI = this.createView('game_ui.shisanshui.PaiXingTiShiUI');
            this.addChild(this._viewUI);
            if (!this._sssMgr) {
                if (this._game.sceneObjectMgr.story instanceof ShisanshuiStory) {
                    this._sssStory = this._game.sceneObjectMgr.story as ShisanshuiStory;
                } else if (this._game.sceneObjectMgr.story instanceof ShisanshuiCardRoomStory) {
                    this._sssStory = this._game.sceneObjectMgr.story as ShisanshuiCardRoomStory;
                }
                this._sssMgr = this._sssStory.sssMgr;
            }
        }

        // 页面打开时执行函数
        protected onOpen(): void {
            super.onOpen();

            let mapInfo = this._game.sceneObjectMgr.mapInfo;
            if (mapInfo) {
                this._mapInfo = mapInfo as ShisanshuiMapInfo;
                this._countDown = this._mapInfo.GetCountDown();
                this.updateBattledInfo();
            }
            this._game.network.addHanlder(Protocols.SMSG_OPERATION_FAILED, this, this.onOptHandler);
            this._game.mainScene.on(SceneOperator.AVATAR_MOUSE_CLICK_HIT, this, this.onClickCards);
            this._viewUI.btn_play.on(LEvent.CLICK, this, this.onBtnClickWithTween);
            this._viewUI.box_toudun.on(LEvent.CLICK, this, this.onBtnClick);
            this._viewUI.box_zhongdun.on(LEvent.CLICK, this, this.onBtnClick);
            this._viewUI.box_weidun.on(LEvent.CLICK, this, this.onBtnClick);
            this._viewUI.btn_reset0.on(LEvent.CLICK, this, this.onBtnClick);
            this._viewUI.btn_reset1.on(LEvent.CLICK, this, this.onBtnClick);
            this._viewUI.btn_reset2.on(LEvent.CLICK, this, this.onBtnClick);
            for (let i = 0; i < 8; i++) {
                this._viewUI["btn_type" + i].on(LEvent.CLICK, this, this.onBtnClickWithTween);
                if (i <= 4) {
                    this._viewUI["view_type" + i].on(LEvent.CLICK, this, this.onClickSimpleCard, [i]);
                }
            }
            this.updateBtnUI();
            this.getRecommendCards();
            if (this._simpleCards.length == 0) {
                this.updateViewUI();
            }
        }

        //更新UI
        private updateViewUI(): void {
            for (let i = 0; i < 5; i++) {
                if (i < this._simpleCards.length) {
                    this._viewUI["view_type" + i].visible = true;
                    //按钮名字
                    let str1 = this._typeTemp[this._simpleCards[i].tou_type];
                    let str2 = this._typeTemp[this._simpleCards[i].zhong_type];
                    let str3 = this._typeTemp[this._simpleCards[i].wei_type];
                    this._viewUI["view_type" + i].btn_choose.label = str1 + "      " + str2 + "      " + str3;
                    this._viewUI["view_type" + i].img_choose.visible = false;
                } else {
                    this._viewUI["view_type" + i].visible = false;
                    this._viewUI["view_type" + i].img_choose.visible = false;
                }
            }
        }

        //更新按钮状态
        private updateBtnUI(): void {
            this.findCardType();
            this.findShunZi();
            this.findTongHua();
            this.findTongHuaShun();
            this._viewUI.btn_type0.disabled = this._duiZiTemp.length > 0 ? false : true;
            this._viewUI.btn_type1.disabled = this._duiZiTemp.length > 1 ? false : true;
            this._viewUI.btn_type2.disabled = this._sanTiaoTemp.length > 0 ? false : true;
            this._viewUI.btn_type3.disabled = this._shunZiTemp.length > 0 ? false : true;
            this._viewUI.btn_type4.disabled = this._tongHuaTemp.length > 0 ? false : true;
            this._viewUI.btn_type5.disabled = this._sanTiaoTemp.length > 0 && this._duiZiTemp.length > 0 ? false : true;
            this._viewUI.btn_type6.disabled = this._tieZhiTemp.length > 0 ? false : true;
            this._viewUI.btn_type7.disabled = this._tongHuaShunTemp.length > 0 ? false : true;
        }

        //操作倒计时
        deltaUpdate(): void {
            if (!(this._game.sceneObjectMgr.mapInfo instanceof ShisanshuiMapInfo)) return;
            if (!this._viewUI) return;
            let curTime = this._game.sync.serverTimeBys;
            let time = Math.floor(this._countDown - curTime);
            if (time > 0) {
                this._viewUI.img_time.visible = true;
                this._viewUI.img_time.txt_time.text = time.toString();
                if (time == 3 && !this._viewUI.img_time.ani1.isPlaying) {
                    this._viewUI.img_time.ani1.play(1, true);
                }

            } else {
                this._viewUI.img_time.visible = false;
                this._viewUI.img_time.ani1.gotoAndStop(24);
            }
        }

        protected onBtnTweenEnd(e: LEvent, target: any): void {
            switch (target) {
                case this._viewUI.btn_play: //出牌
                    let lengthTou = this._touDunCards.length;
                    let lengthZhong = this._zhongDunCards.length;
                    let lengthWei = this._weiDunCards.length;
                    if (lengthTou == 3 && lengthZhong == 5 && lengthWei == 5) {
                        this._playCardsTemp = [];
                        for (let i = 0; i < this._touDunCards.length; i++) {
                            this._playCardsTemp.push(this._touDunCards[i].GetVal());
                        }
                        for (let i = 0; i < this._zhongDunCards.length; i++) {
                            this._playCardsTemp.push(this._zhongDunCards[i].GetVal());
                        }
                        for (let i = 0; i < this._weiDunCards.length; i++) {
                            this._playCardsTemp.push(this._weiDunCards[i].GetVal());
                        }
                        if (this._playCardsTemp.length != 13 && this._playCardsTemp.length != 0) return;
                        let str = this._playCardsTemp.length > 0 ? JSON.stringify(this._playCardsTemp) : "";
                        this._game.network.call_shisanshui_playing(str, 0);
                    } else {
                        this._game.showTips("请选择完整的牌型，再出牌！");
                        return;
                    }
                    break;
                case this._viewUI.btn_type0:    //对子
                    this.findCardType();
                    if (this._duiZiTemp.length == 0) return;
                    let val = this._duiziNum;
                    this.resetData();
                    this.resetCardsPos();
                    val = val < this._duiZiTemp.length ? val + 1 : 1;
                    this._duiziNum = val;
                    for (let i = 0; i < this._duiZiTemp[val - 1].length; i++) {
                        for (let k = 0; k < this._sssMgr.cardsTemp.length; k++) {
                            if (this._duiZiTemp[val - 1][i].GetVal() == this._sssMgr.cardsTemp[k].GetVal()) {
                                let card = this._sssMgr.cardsTemp[k];
                                card.toggle = true;
                                this._chooseCards.push(card);
                            }
                        }
                    }
                    this.sortCards(this._chooseCards);
                    break;
                case this._viewUI.btn_type1:    //两对
                    this.findCardType();
                    if (this._duiZiTemp.length < 2) return;
                    let val1 = Math.floor(this._liangDuiNum / 10);
                    let val2 = this._liangDuiNum % 10;
                    if (val1 == 0) {
                        val1 = 1;
                        val2 = 2;
                    } else {
                        if (val2 >= this._duiZiTemp.length) {
                            val1 = val1 + 1;
                            val2 = val1 + 1;
                        } else {
                            val2 = val2 + 1;
                        }
                    }
                    if (val1 >= this._duiZiTemp.length) {
                        val1 = 1;
                        val2 = 2;
                    };
                    this.resetData();
                    this.resetCardsPos();
                    this._liangDuiNum = val1 * 10 + val2;
                    for (let i = 0; i < this._duiZiTemp.length; i++) {
                        if (i == val1 - 1 || i == val2 - 1) {
                            for (let k = 0; k < this._duiZiTemp[i].length; k++) {
                                for (let n = 0; n < this._sssMgr.cardsTemp.length; n++) {
                                    if (this._duiZiTemp[i][k].GetVal() == this._sssMgr.cardsTemp[n].GetVal()) {
                                        let card = this._sssMgr.cardsTemp[n];
                                        card.toggle = true;
                                        this._chooseCards.push(card);
                                    }
                                }
                            }
                        }
                    }
                    this.sortCards(this._chooseCards);
                    break;
                case this._viewUI.btn_type2:    //三条
                    this.findCardType();
                    if (this._sanTiaoTemp.length == 0) return;
                    let stVal = this._sanTiaoNum;
                    this.resetData();
                    this.resetCardsPos();
                    stVal = stVal < this._sanTiaoTemp.length ? stVal + 1 : 1;
                    this._sanTiaoNum = stVal;
                    for (let i = 0; i < this._sanTiaoTemp[stVal - 1].length; i++) {
                        for (let k = 0; k < this._sssMgr.cardsTemp.length; k++) {
                            if (this._sanTiaoTemp[stVal - 1][i].GetVal() == this._sssMgr.cardsTemp[k].GetVal()) {
                                let card = this._sssMgr.cardsTemp[k];
                                card.toggle = true;
                                this._chooseCards.push(card);
                            }
                        }
                    }
                    this.sortCards(this._chooseCards);
                    break;
                case this._viewUI.btn_type3:    //顺子
                    this.findShunZi();
                    if (this._shunZiTemp.length == 0) return;
                    let szVal = this._shunZiNum;
                    this.resetData();
                    this.resetCardsPos();
                    szVal = szVal < this._shunZiTemp.length ? szVal + 1 : 1;
                    this._shunZiNum = szVal;
                    for (let k = 0; k < this._shunZiTemp[szVal - 1].length; k++) {
                        let card = this._sssMgr.cardsTemp[this._shunZiTemp[szVal - 1][k]];
                        card.toggle = true;
                        this._chooseCards.push(card);
                    }
                    this.sortCards(this._chooseCards);
                    break;
                case this._viewUI.btn_type4:    //同花
                    this.findTongHua();
                    if (this._tongHuaTemp.length == 0) return;
                    let thVal = this._tongHuaNum;
                    this.resetData();
                    this.resetCardsPos();
                    thVal = thVal < this._tongHuaTemp.length ? thVal + 1 : 1;
                    this._tongHuaNum = thVal;
                    for (let k = 0; k < this._tongHuaTemp[thVal - 1].length; k++) {
                        let card = this._sssMgr.cardsTemp[this._tongHuaTemp[thVal - 1][k]];
                        card.toggle = true;
                        this._chooseCards.push(card);
                    }
                    this.sortCards(this._chooseCards);
                    break;
                case this._viewUI.btn_type5:    //葫芦
                    this.findCardType();
                    if (this._duiZiTemp.length < 1 || this._sanTiaoTemp.length < 1) return;
                    let hlval1 = Math.floor(this._huLunNum / 10);
                    let hlval2 = this._huLunNum % 10;
                    if (hlval1 == 0) {  //第一次点击葫芦，选中第一对和第一个三条
                        hlval1 = 1;
                        hlval2 = 1;
                    } else {
                        if (hlval2 >= this._duiZiTemp.length) { //对子到了最后一个了，那就显示下一个三条和第一个对子
                            hlval1 = hlval1 + 1;
                            hlval2 = 1;
                        } else {
                            hlval2 = hlval2 + 1;    //下一个对子
                        }
                    }
                    if (hlval1 > this._sanTiaoTemp.length) {    //超出最后一个三条，就变成第一个三条
                        hlval1 = 1;
                    }
                    if (hlval2 > this._duiZiTemp.length) {      //超出最后一个对子，就取第一个对子
                        hlval2 = 1;
                    }
                    this.resetData();
                    this.resetCardsPos();
                    this._huLunNum = hlval1 * 10 + hlval2;
                    for (let i = 0; i < this._sanTiaoTemp[hlval1 - 1].length; i++) {
                        for (let k = 0; k < this._sssMgr.cardsTemp.length; k++) {
                            if (this._sanTiaoTemp[hlval1 - 1][i].GetVal() == this._sssMgr.cardsTemp[k].GetVal()) {
                                let card = this._sssMgr.cardsTemp[k];
                                card.toggle = true;
                                this._chooseCards.push(card);
                            }
                        }
                    }
                    for (let i = 0; i < this._duiZiTemp[hlval2 - 1].length; i++) {
                        for (let k = 0; k < this._sssMgr.cardsTemp.length; k++) {
                            if (this._duiZiTemp[hlval2 - 1][i].GetVal() == this._sssMgr.cardsTemp[k].GetVal()) {
                                let card = this._sssMgr.cardsTemp[k];
                                card.toggle = true;
                                this._chooseCards.push(card);
                            }
                        }
                    }
                    this.sortCards(this._chooseCards);
                    break;
                case this._viewUI.btn_type6:    //铁枝
                    this.findCardType();
                    if (this._tieZhiTemp.length == 0) return;
                    let tzVal = this._tieZhiNum;
                    this.resetData();
                    this.resetCardsPos();
                    tzVal = tzVal < this._tieZhiTemp.length ? tzVal + 1 : 1;
                    this._tieZhiNum = tzVal;
                    for (let i = 0; i < this._tieZhiTemp[tzVal - 1].length; i++) {
                        for (let k = 0; k < this._sssMgr.cardsTemp.length; k++) {
                            if (this._tieZhiTemp[tzVal - 1][i].GetVal() == this._sssMgr.cardsTemp[k].GetVal()) {
                                let card = this._sssMgr.cardsTemp[k];
                                card.toggle = true;
                                this._chooseCards.push(card);
                            }
                        }
                    }
                    this.sortCards(this._chooseCards);
                    break;
                case this._viewUI.btn_type7:    //同花顺
                    this.findTongHuaShun();
                    if (this._tongHuaShunTemp.length == 0) return;
                    let thsVal = this._tongHuaShunNum;
                    this.resetData();
                    this.resetCardsPos();
                    thsVal = thsVal < this._tongHuaShunTemp.length ? thsVal + 1 : 1;
                    this._tongHuaShunNum = thsVal;
                    for (let k = 0; k < this._tongHuaShunTemp[thsVal - 1].length; k++) {
                        let card = this._sssMgr.cardsTemp[this._tongHuaShunTemp[thsVal - 1][k]];
                        card.toggle = true;
                        this._chooseCards.push(card);
                    }
                    this.sortCards(this._chooseCards);
                    break;
                default:
                    break;
            }
        }

        protected onBtnClick(e: LEvent): void {
            switch (e.currentTarget) {
                case this._viewUI.box_toudun:
                    if (this._chooseCards.length == 0) {
                        this._game.showTips("请先选牌！");
                        return;
                    } else if (this._chooseCards.length != 3) {
                        this._game.showTips("牌数错误！");
                        return;
                    }
                    if (this._touDunCards.length > 0) {
                        this._game.showTips("已选完牌了！");
                        return;
                    }
                    for (let i = 0; i < this._chooseCards.length; i++) {
                        this._chooseCards[i].toggle = false;
                        this._touDunCards.push(this._chooseCards[i]);
                        let index = this._sssMgr.cardsTemp.indexOf(this._chooseCards[i]);
                        this._sssMgr.cardsTemp.splice(index, 1);
                    }
                    this._sssMgr.xuanpai(this._chooseCards, 1);
                    this._sssMgr.playCard();
                    this._chooseCards = [];
                    this._playCardsTemp = [];
                    this._viewUI.box_toudun.mouseEnabled = false;
                    this.updateBtnUI();
                    break;
                case this._viewUI.box_zhongdun:
                    if (this._chooseCards.length == 0) {
                        this._game.showTips("请先选牌！");
                        return;
                    } else if (this._chooseCards.length != 5) {
                        this._game.showTips("牌数错误！");
                        return;
                    }
                    if (this._zhongDunCards.length > 0) {
                        this._game.showTips("已选完牌了！");
                        return;
                    }
                    for (let i = 0; i < this._chooseCards.length; i++) {
                        this._chooseCards[i].toggle = false;
                        this._zhongDunCards.push(this._chooseCards[i]);
                        let index = this._sssMgr.cardsTemp.indexOf(this._chooseCards[i]);
                        this._sssMgr.cardsTemp.splice(index, 1);
                    }
                    this._sssMgr.xuanpai(this._chooseCards, 2);
                    this._sssMgr.playCard();
                    this._chooseCards = [];
                    this._playCardsTemp = [];
                    this._viewUI.box_zhongdun.mouseEnabled = false;
                    this.updateBtnUI();
                    break;
                case this._viewUI.box_weidun:
                    if (this._chooseCards.length == 0) {
                        this._game.showTips("请先选牌！");
                        return;
                    } else if (this._chooseCards.length != 5) {
                        this._game.showTips("牌数错误！");
                        return;
                    }
                    if (this._weiDunCards.length > 0) {
                        this._game.showTips("已选完牌了！");
                        return;
                    }
                    for (let i = 0; i < this._chooseCards.length; i++) {
                        this._chooseCards[i].toggle = false;
                        this._weiDunCards.push(this._chooseCards[i]);
                        let index = this._sssMgr.cardsTemp.indexOf(this._chooseCards[i]);
                        this._sssMgr.cardsTemp.splice(index, 1);
                    }
                    this._sssMgr.xuanpai(this._chooseCards, 3);
                    this._sssMgr.playCard();
                    this._chooseCards = [];
                    this._playCardsTemp = [];
                    this._viewUI.box_weidun.mouseEnabled = false;
                    this.updateBtnUI();
                    break;
                case this._viewUI.btn_reset0:
                    this._sssMgr.cardsTemp = this._sssMgr.cardsTemp.concat(this._touDunCards);
                    this.sortCards(this._sssMgr.cardsTemp);
                    this.resetCardsPos();
                    this._sssMgr.playCard();
                    this._touDunCards = [];
                    this._chooseCards = [];
                    this._viewUI.box_toudun.mouseEnabled = true;
                    this.updateBtnUI();
                    break;
                case this._viewUI.btn_reset1:
                    this._sssMgr.cardsTemp = this._sssMgr.cardsTemp.concat(this._zhongDunCards);
                    this.sortCards(this._sssMgr.cardsTemp);
                    this.resetCardsPos();
                    this._sssMgr.playCard();
                    this._zhongDunCards = [];
                    this._chooseCards = [];;
                    this._viewUI.box_zhongdun.mouseEnabled = true;
                    this.updateBtnUI();
                    break;
                case this._viewUI.btn_reset2:
                    this._sssMgr.cardsTemp = this._sssMgr.cardsTemp.concat(this._weiDunCards);
                    this.sortCards(this._sssMgr.cardsTemp);
                    this.resetCardsPos();
                    this._sssMgr.playCard();
                    this._weiDunCards = [];
                    this._chooseCards = [];
                    this._viewUI.box_weidun.mouseEnabled = true;
                    this.updateBtnUI();
                    break;
                default:
                    break;
            }
        }

        //简易牌型
        protected onClickSimpleCard(index: number, e: LEvent): void {
            //改变下选中状态
            for (let i = 0; i < 5; i++) {
                if (i == index) {
                    this._viewUI["view_type" + i].img_choose.visible = true;
                } else {
                    this._viewUI["view_type" + i].img_choose.visible = false;
                }
            }
            this.resetCardsPos();
            this.resetCards();
            let allCardsInfo = this._simpleCards[index];
            //找出头墩的牌，从管理器里去匹配找到
            for (let i = 0; i < allCardsInfo.touDun.length; i++) {
                for (let k = 0; k < this._sssMgr.cardsTemp.length; k++) {
                    if (allCardsInfo.touDun[i] == this._sssMgr.cardsTemp[k].GetVal()) {
                        //找到之后，放到头墩里，并从管理器中移除
                        this._touDunCards.push(this._sssMgr.cardsTemp[k]);
                        this._sssMgr.cardsTemp.splice(k, 1);
                        break;
                    }
                }
            }
            //找出中墩的牌，从管理器里去匹配找到
            for (let i = 0; i < allCardsInfo.zhongDun.length; i++) {
                for (let k = 0; k < this._sssMgr.cardsTemp.length; k++) {
                    if (allCardsInfo.zhongDun[i] == this._sssMgr.cardsTemp[k].GetVal()) {
                        //找到之后，放到头墩里，并从管理器中移除
                        this._zhongDunCards.push(this._sssMgr.cardsTemp[k]);
                        this._sssMgr.cardsTemp.splice(k, 1);
                        break;
                    }
                }
            }
            //找出尾墩的牌，从管理器里去匹配找到
            for (let i = 0; i < allCardsInfo.weiDun.length; i++) {
                for (let k = 0; k < this._sssMgr.cardsTemp.length; k++) {
                    if (allCardsInfo.weiDun[i] == this._sssMgr.cardsTemp[k].GetVal()) {
                        //找到之后，放到头墩里，并从管理器中移除
                        this._weiDunCards.push(this._sssMgr.cardsTemp[k]);
                        this._sssMgr.cardsTemp.splice(k, 1);
                        break;
                    }
                }
            }
            //移动牌，并变下牌型按钮
            this._sssMgr.xuanpai(this._touDunCards, 1);
            this._sssMgr.xuanpai(this._zhongDunCards, 2);
            this._sssMgr.xuanpai(this._weiDunCards, 3);
            this._sssMgr.playCard();
            this._chooseCards = [];
            this._playCardsTemp = [];
            this._viewUI.box_toudun.mouseEnabled = false;
            this._viewUI.box_zhongdun.mouseEnabled = false;
            this._viewUI.box_weidun.mouseEnabled = false;
            this.updateBtnUI();
        }

        //把牌清下
        private resetCards() {
            //头墩有牌的话
            if (this._touDunCards.length > 0) {
                this._sssMgr.cardsTemp = this._sssMgr.cardsTemp.concat(this._touDunCards);
                this._touDunCards = [];
            }
            //中墩有牌的话
            if (this._zhongDunCards.length > 0) {
                this._sssMgr.cardsTemp = this._sssMgr.cardsTemp.concat(this._zhongDunCards);
                this._zhongDunCards = [];
            }
            //尾墩有牌的话
            if (this._weiDunCards.length > 0) {
                this._sssMgr.cardsTemp = this._sssMgr.cardsTemp.concat(this._weiDunCards);
                this._weiDunCards = [];
            }
            //重新排序
            this.sortCards(this._sssMgr.cardsTemp);
        }

        private onOptHandler(optcode: number, msg: any) {
            if (msg.type == Operation_Fields.OPRATE_PLAYING)
                switch (msg.reason) {
                    case Operation_Fields.OPRATE_PLAYING_DAO_SHUI:
                        this._game.showTips("倒水，请重新选择！")
                        break;
                    default:
                        break;
                }
        }

        //点牌
        private onClickCards(hitAvatar: any): void {
            let card = hitAvatar.card;  //点中的那张牌 
            let isExchange: boolean;    //是否要换牌
            if (card.toggle) {
                if (this._exchangeCard) { //根据所选这张牌在哪个位置来判断是换牌还是选牌
                    if (this._touDunCards.indexOf(this._exchangeCard) >= 0) {
                        if (this._touDunCards.indexOf(card) >= 0) { //同一排的牌
                            return;
                        } else {
                            //不同排的牌，对换
                            this._exchangeCard.toggle = false;
                            card.toggle = false;
                            this._exchangeCard.exchangeCard(card);
                            this._exchangeCard = null;
                            return;
                        }
                    } else if (this._zhongDunCards.indexOf(this._exchangeCard) >= 0) {
                        if (this._zhongDunCards.indexOf(card) >= 0) { //同一排的牌
                            return;
                        } else {
                            //不同排的牌，对换
                            this._exchangeCard.toggle = false;
                            card.toggle = false;
                            this._exchangeCard.exchangeCard(card);
                            this._exchangeCard = null;
                            return;
                        }
                    } else if (this._weiDunCards.indexOf(this._exchangeCard) >= 0) {
                        if (this._weiDunCards.indexOf(card) >= 0) { //同一排的牌
                            return;
                        } else {
                            //不同排的牌，对换
                            this._exchangeCard.toggle = false;
                            card.toggle = false;
                            this._exchangeCard.exchangeCard(card);
                            this._exchangeCard = null;
                            return;
                        }
                    } else if (this._sssMgr.cardsTemp.indexOf(this._exchangeCard) >= 0) {
                        if (this._sssMgr.cardsTemp.indexOf(card) < 0) {
                            //不同排的牌，对换
                            this._exchangeCard.toggle = false;
                            card.toggle = false;
                            this._exchangeCard.exchangeCard(card);
                            this._chooseCards = [];
                            this._exchangeCard = null;
                            return;
                        } else {
                            this._exchangeCard = null;
                            this._chooseCards.push(card);
                            this.sortCards(this._chooseCards);
                        }
                    }
                } else {
                    this._exchangeCard = card;
                    if (this._sssMgr.cardsTemp.indexOf(card) >= 0) {   //要对换的牌，在基础牌里
                        this._chooseCards.push(card);
                        this.sortCards(this._chooseCards);
                        if (this._chooseCards.length > 1) { //如果都是从基础牌里抽取的，那就把要对换的牌清掉
                            this._exchangeCard = null;
                        }
                    } else {
                        if (this._chooseCards.length > 1) {
                            this._exchangeCard = null;
                            return;
                        }
                    }
                }
                card.toggle = true;
            } else {
                this._exchangeCard = null;
                if (this._sssMgr.cardsTemp.indexOf(card) >= 0) {   //哪里的牌
                    let index = this._chooseCards.indexOf(card);
                    this._chooseCards.splice(index, 1);
                    if (this._chooseCards.length == 1) { //就剩一张的话，变成可以对换
                        this._exchangeCard = this._chooseCards[0];
                    }
                }
            }
        }

        setBattleInfoIdx(val: number): void {
            this._battleInfoIdx = val;
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
                if (battleInfo.Type == 3 && i > this._battleInfoIdx) {
                    this._battleInfoIdx = i;
                    let info = battleInfoMgr.info[i] as gamecomponent.object.BattleInfoPlayCard<data.ShisanshuiData>;
                    let idx = info.SeatIndex;
                    if (idx == mainIdx) {
                        for (let index = 0; index < info.Cards.length; index++) {
                            let card = info.Cards[index];
                            this._cards.push(card);
                        }
                        if (info.CardType > 0) {
                            if (!this._game.uiRoot.general.isOpened(ShisanshuiPageDef.PAGE_SSS_SPECIAL)) {
                                this._game.uiRoot.general.open(ShisanshuiPageDef.PAGE_SSS_SPECIAL)
                            }
                        }
                        this.creatCards();
                    }
                }
            }
        }

        //获取推荐牌型
        private getRecommendCards(): void {
            // 找推荐牌型
            let allCards = [];
            for (let i = 0; i < this._sssMgr.cardsTemp.length; i++) {
                allCards.push(this._sssMgr.cardsTemp[i].GetVal());
            }
            //必须是13张牌
            if (allCards.length != 13) return;
            let data = { 'cards': JSON.stringify(allCards) };
            let url = WebConfig.ai_url +  "/shisanshui/pingpai";
            utils.Request.sendA(url, data, Handler.create(this, (value: any) => {
                if (value && value.success == 0) {
                    let cards = value.cards;
                    let tou_cards = [];
                    let zhong_cards = [];
                    let wei_cards = [];
                    for (let index = 0; index < cards.length; index++) {
                        let card = cards[index];
                        if (index <= 2) {
                            tou_cards.push(card);
                        } else if (index <= 7) {
                            zhong_cards.push(card);
                        } else {
                            wei_cards.push(card);
                        }
                    }
                    let obj = {
                        touDun: tou_cards,
                        zhongDun: zhong_cards,
                        weiDun: wei_cards,
                        tou_type: this._sssMgr.checkCardsType(tou_cards),
                        zhong_type: this._sssMgr.checkCardsType(zhong_cards),
                        wei_type: this._sssMgr.checkCardsType(wei_cards),
                    }
                    this._simpleCards.push(obj);
                    this.updateViewUI();
                }
            }))
        }

        private creatCards(): void {
            let mainUnit = this._game.sceneObjectMgr.mainUnit;
            if (!mainUnit) return;
            for (let i = 0; i < this._cards.length; i++) {
                let handle = Handler.create(this, this._sssMgr.createObj);
                this._sssMgr.addCard(this._cards[i].GetVal(), handle, mainUnit.GetIndex(), i);
            }
            this._sssMgr.playCard();
        }

        //对牌进行排序
        private sortCards(cards: any[]): void {
            if (!cards) return;
            cards.sort((a: gamecomponent.object.PlayingPuKeCard, b: gamecomponent.object.PlayingPuKeCard) => {
                return a.Compare(b, true);
            });
        }

        //把牌的位置还原回去
        private resetCardsPos(): void {
            for (let i = 0; i < this._sssMgr.cardsTemp.length; i++) {
                let card = this._sssMgr.cardsTemp[i]
                if (card.toggle) {
                    card.toggle = false;
                    let index = this._chooseCards.indexOf(card);
                    if (index >= 0) {
                        this._chooseCards.splice(index, 1);
                    }
                }
            }
        }

        //复制数组，1复制到2
        private copyTalbe(temp1: any, temp2: any): void {
            for (let i = 0; i < temp1.length; i++) {
                temp2[i] = temp1[i];
            }
        }

        //找出一堆牌里N张一样的牌
        private findSomeCards(cards: any, count: number): any {
            let temp = [];
            if (cards.length < count) return temp;
            for (let i = 0; i < cards.length - 1; i++) {
                temp = [];
                let val = cards[i].GetCardVal();
                for (let k = 0; k < cards.length; k++) {
                    if (cards[k].GetCardVal() == val) {
                        temp.push(cards[k]);
                    }
                }
                if (temp.length >= count) break;
            }
            if (temp.length >= count) {
                for (let i = 0; i < temp.length; i++) {
                    for (let k = 0; k < cards.length; k++) {
                        if (temp[i].GetVal() == cards[k].GetVal()) {
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

        //找牌型
        private findCardType(): void {
            let cards = [];
            this.copyTalbe(this._sssMgr.cardsTemp, cards);
            this.findTieZhi(cards);
            this.findSanTiao(cards);
            this.findDuiZi(cards);
        }

        //找对子
        private findDuiZi(cards: any): void {
            this._duiZiTemp = [];
            if (cards.length < 2) return;
            let flag: boolean = true;
            while (flag) {
                let temp1 = this.findSomeCards(cards, 2);
                if (temp1.length >= 2) {
                    this._duiZiTemp.push(temp1)
                } else {
                    flag = false;
                }
            }
        }

        //找三条
        private findSanTiao(cards: any): void {
            this._sanTiaoTemp = [];
            if (cards.length < 3) return;
            let flag: boolean = true;
            while (flag) {
                let temp1 = this.findSomeCards(cards, 3);
                if (temp1.length >= 3) {
                    this._sanTiaoTemp.push(temp1)
                } else {
                    flag = false;
                }
            }
        }

        //找铁支
        private findTieZhi(cards: any): void {
            this._tieZhiTemp = [];
            if (cards.length < 4) return;
            let flag: boolean = true;
            while (flag) {
                let temp1 = this.findSomeCards(cards, 4);
                if (temp1.length >= 4) {
                    this._tieZhiTemp.push(temp1)
                } else {
                    flag = false;
                }
            }
        }

        //找下顺子
        private findShunZi(): void {
            this._shunZiTemp = [];
            if (this._sssMgr.cardsTemp.length < 5) return;
            for (let i = 0; i < this._sssMgr.cardsTemp.length - 4; i++) {
                let val = this._sssMgr.cardsTemp[i].GetCardVal();
                let temp = [i];
                let count = 1;
                for (let k = i + 1; k < this._sssMgr.cardsTemp.length; k++) {
                    if (this._sssMgr.cardsTemp[k].GetCardVal() + 1 == val) {
                        val = this._sssMgr.cardsTemp[k].GetCardVal();
                        count = count + 1;
                        temp.push(k);
                        if (count == 5) {
                            break;
                        }
                    }
                }
                if (count == 5) {
                    this._shunZiTemp.push(temp);
                }
            }
            //还有个特殊的A,2,3,4,5
            let length = this._sssMgr.cardsTemp.length;
            let val1 = this._sssMgr.cardsTemp[0].GetCardVal();
            let val2 = this._sssMgr.cardsTemp[length - 1].GetCardVal();
            let val3 = val2;
            if (val1 == 13 && val2 == 1) {
                let temp = [0, length - 1];
                let count = 2;
                for (let i = length - 2; i > 0; i--) {
                    if (this._sssMgr.cardsTemp[i].GetCardVal() - 1 == val3) {
                        val3 = this._sssMgr.cardsTemp[i].GetCardVal();
                        count = count + 1;
                        temp.push(i);
                        if (count == 5) {
                            break;
                        }
                    }
                }
                if (count == 5) {
                    this._shunZiTemp.push(temp);
                }
            }
        }

        //找下同花
        private findTongHua(): void {
            this._tongHuaTemp = [];
            if (this._sssMgr.cardsTemp.length < 5) return;
            for (let i = 0; i < this._sssMgr.cardsTemp.length - 4; i++) {
                let color = this._sssMgr.cardsTemp[i].GetCardColor();
                let temp = [i];
                let count = 1;
                for (let k = i + 1; k < this._sssMgr.cardsTemp.length; k++) {
                    if (this._sssMgr.cardsTemp[k].GetCardColor() == color) {
                        count = count + 1;
                        temp.push(k);
                        if (count == 5) {
                            break;
                        }
                    }
                }
                if (count == 5) {
                    this._tongHuaTemp.push(temp);
                }
            }
        }

        //找下同花顺
        private findTongHuaShun(): void {
            this._tongHuaShunTemp = [];
            if (this._sssMgr.cardsTemp.length < 5) return;
            for (let i = 0; i < this._sssMgr.cardsTemp.length - 4; i++) {
                let val = this._sssMgr.cardsTemp[i].GetCardVal();
                let color = this._sssMgr.cardsTemp[i].GetCardColor();
                let temp = [i];
                let count = 1;
                for (let k = i + 1; k < this._sssMgr.cardsTemp.length; k++) {
                    if (this._sssMgr.cardsTemp[k].GetCardColor() == color && this._sssMgr.cardsTemp[k].GetCardVal() + 1 == val) {
                        val = this._sssMgr.cardsTemp[k].GetCardVal();
                        count = count + 1;
                        temp.push(k);
                        if (count == 5) {
                            break;
                        }
                    }
                }
                if (count == 5) {
                    this._tongHuaShunTemp.push(temp);
                }
            }
            //还有个特殊的A,2,3,4,5
            for (let i = 0; i < 4; i++) {
                let fVal = this._sssMgr.cardsTemp[i].GetCardVal();
                let val = this._sssMgr.cardsTemp[i].GetVal();
                let color = this._sssMgr.cardsTemp[i].GetCardColor();
                let length = this._sssMgr.cardsTemp.length;
                if (fVal == 13) {
                    let temp = [i];
                    let count = 1;
                    for (let k = length - 1; k >= 0; k--) {
                        if (this._sssMgr.cardsTemp[k].GetVal() - 1 == val && this._sssMgr.cardsTemp[k].GetCardColor() == color) {
                            val = this._sssMgr.cardsTemp[k].GetVal();
                            count = count + 1;
                            temp.push(k);
                            if (count == 5) {
                                break;
                            }
                        }
                    }
                    if (count == 5) {
                        this._tongHuaShunTemp.push(temp);
                    }
                }
            }
        }

        private resetData(): void {
            this._duiziNum = 0;
            this._liangDuiNum = 0;
            this._sanTiaoNum = 0;
            this._shunZiNum = 0;
            this._tongHuaNum = 0;
            this._huLunNum = 0;
            this._tieZhiNum = 0;
            this._tongHuaShunNum = 0;
        }

        public close(): void {
            if (this._viewUI) {
                this._viewUI.btn_play.off(LEvent.CLICK, this, this.onBtnClickWithTween);
                this._viewUI.box_toudun.off(LEvent.CLICK, this, this.onBtnClick);
                this._viewUI.box_zhongdun.off(LEvent.CLICK, this, this.onBtnClick);
                this._viewUI.box_weidun.off(LEvent.CLICK, this, this.onBtnClick);
                this._viewUI.btn_reset0.off(LEvent.CLICK, this, this.onBtnClick);
                this._viewUI.btn_reset1.off(LEvent.CLICK, this, this.onBtnClick);
                this._viewUI.btn_reset2.off(LEvent.CLICK, this, this.onBtnClick);
                for (let i = 0; i < 8; i++) {
                    this._viewUI["btn_type" + i].off(LEvent.CLICK, this, this.onBtnClickWithTween);
                    if (i <= 4) {
                        this._viewUI["view_type" + i].off(LEvent.CLICK, this, this.onClickSimpleCard);
                    }
                }
            }
            this._game.mainScene.off(SceneOperator.AVATAR_MOUSE_CLICK_HIT, this, this.onClickCards);
            this._game.network.removeHanlder(Protocols.SMSG_OPERATION_FAILED, this, this.onOptHandler);
            this._sssMgr.clearCardObject();
            this._sssMgr.resetData();
            this._mapInfo = null;

            super.close();
        }
    }
}