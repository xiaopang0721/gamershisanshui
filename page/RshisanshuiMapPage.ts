/**
* 十三水-房间
*/
module gamershisanshui.page {
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
    const ChipConfig: any = {
        "151": [1],       //新手
        "152": [5],       //初级
        "153": [20],      //中级
        "154": [50],      //高级
    };
    const QiangPos: any = [[634, 526], [973, 373], [615, 141], [265, 373]]; //抢和靶子的位置
    const QiangRola: any = { //抢的缩放和旋转角度
        0: [[1, 0], [1, -40], [-1, 0]],
        1: [[-1, 20], [-1, -18], [-1, -46]],
        2: [[-1, -51], [-1, -95], [1, 55]],
        3: [[1, 70], [1, 18], [1, 0]],
    }
    const MONEY_NUM = 24; // 特效金币数量
    const MONEY_FLY_TIME = 50; // 金币飞行时间间隔
    const MAX_SEAT = 4;   //最大玩家数
    //音效url
    const MUSIC_PATH = {
        bgMusic: "13s_bgm.mp3",
        biPaiMusic: "start_bipai.mp3",
        chuPaiMusic: "start_chupai.mp3",
        cardTypeMusic: "sss_",
        daQiangMusic: "daqiang_",
        quanLeiDaMusic: "all_",
    }

    export class RshisanshuiMapPage extends game.gui.base.Page {
        private _viewUI: ui.nqp.game_ui.shisanshui.ShiSanShuiUI;
        private _mapInfo: RshisanshuiMapInfo;
        private _shisanshuiMgr: ShisanshuiMgr;
        private _shisanshuiStory: any;
        private _battleIndex: number = -1;
        private _curStatus: number; //当前地图状态
        private _countDown: number; //倒计时结束时间
        private _mainIdx: number;   //主玩家座位号
        private _clipList: Array<ShisanshuiClip> = [];//飘字
        private _settleWinInfo: any = [];  //结算信息,闲家赢
        private _settleLoseInfo: any = [];  //结算信息，闲家输
        private _totalVla: number = 0;  //总共几水
        private _moneyImg: any = [];    //飘金币里的金币
        private _daQiangInfo: any = []; //打枪信息
        private _touQiang: number = 0;  //打枪头墩数额
        private _zhongQiang: number = 0;  //打枪中墩数额
        private _weiQiang: number = 0;  //打枪尾墩数额
        private _compareCount: number = 0;   //计算比牌次数，打枪用
        private _isPlaying: boolean = false;    //是否进行中
        private _isGameEnd: boolean = false;    //是否本局游戏结束
        private _qldUnit: Unit; //全垒打玩家
        private _specialCardsInfo: any = [];    //特殊牌的数据
        private _playAniCount: number = 0;      //特殊牌特效播放次数
        private _pointTemp: any = [];   //每局积分
        private _showCards: any = [];   //每局每人的牌
        private _isPlayCard: boolean = false;   //是否出牌了

        constructor(v: Game, onOpenFunc?: Function, onCloseFunc?: Function) {
            super(v, onOpenFunc, onCloseFunc);
            this._isNeedDuang = false;
            this._asset = [
                PathGameTongyong.atlas_game_ui_tongyong + "hud.atlas",
                Path_game_shisanshui.atlas_game_ui + "shisanshui.atlas",
                PathGameTongyong.atlas_game_ui_tongyong + "general.atlas",
                PathGameTongyong.atlas_game_ui_tongyong + "touxiang.atlas",
                PathGameTongyong.atlas_game_ui_tongyong + "pai.atlas",
                PathGameTongyong.atlas_game_ui_tongyong + "fk.atlas",
                PathGameTongyong.atlas_game_ui_tongyong + "general/effect/fapai_1.atlas",
                PathGameTongyong.atlas_game_ui_tongyong + "general/effect/xipai.atlas",
                Path_game_shisanshui.atlas_game_ui + "shisanshui/effect/paixing.atlas",
            ];
        }

        // 页面初始化函数
        protected init(): void {
            this._viewUI = this.createView('game_ui.shisanshui.ShiSanShuiUI');
            this.addChild(this._viewUI);
            this._pageHandle = PageHandle.Get("ShisanshuiMapPage");//额外界面控制器
            if (!this._shisanshuiMgr) {
                this._shisanshuiStory = this._game.sceneObjectMgr.story as RshisanshuiStory;
                this._shisanshuiMgr = this._shisanshuiStory.sssMgr;
            }
            this._game.playMusic(Path_game_shisanshui.music_shisanshui + MUSIC_PATH.bgMusic);
        }

        // 页面打开时执行函数
        protected onOpen(): void {
            super.onOpen();
             //api充值不显示
            this._viewUI.btn_chongzhi.visible = !WebConfig.enterGameLocked;
            
            this.updateViewUI();
            this.onUpdateUnitOffline();
            if (this._shisanshuiStory instanceof gamecomponent.story.StoryRoomCardBase) {
                this.onUpdateMapInfo();
            }
            this._game.sceneObjectMgr.on(SceneObjectMgr.EVENT_MAPINFO_CHANGE, this, this.onUpdateMapInfo);
            this._game.sceneObjectMgr.on(SceneObjectMgr.EVENT_ADD_UNIT, this, this.onUnitAdd);
            this._game.sceneObjectMgr.on(SceneObjectMgr.EVENT_REMOVE_UNIT, this, this.onUnitRemove);
            this._game.sceneObjectMgr.on(SceneObjectMgr.EVENT_UNIT_MONEY_CHANGE, this, this.onUpdateUnit);
            this._game.sceneObjectMgr.on(SceneObjectMgr.EVENT_UNIT_CHANGE, this, this.onUpdateUnit);
            this._game.sceneObjectMgr.on(SceneObjectMgr.EVENT_UNIT_ACTION, this, this.onUpdateUnit);
            this._game.sceneObjectMgr.on(RshisanshuiMapInfo.EVENT_SSS_STATUS_CHECK, this, this.onUpdateMapState);
            this._game.sceneObjectMgr.on(RshisanshuiMapInfo.EVENT_SSS_BATTLE_CHECK, this, this.updateBattledInfo);
            this._game.sceneObjectMgr.on(RshisanshuiMapInfo.EVENT_SSS_COUNT_DOWN, this, this.updateCountDown);//倒计时更新
            this._game.sceneObjectMgr.on(SceneObjectMgr.EVENT_UNIT_QIFU_TIME_CHANGE, this, this.onUpdateUnit);
            this._game.sceneObjectMgr.on(SceneObjectMgr.EVENT_MAIN_UNIT_CHANGE, this, this.updateCardRoomDisplayInfo);
            this._game.network.addHanlder(Protocols.SMSG_OPERATION_FAILED, this, this.onOptHandler);
            this._game.sceneObjectMgr.on(SceneObjectMgr.EVENT_OPRATE_SUCESS, this, this.onSucessHandler);
            this._game.qifuMgr.on(QiFuMgr.QIFU_FLY, this, this.qifuFly);

            this._viewUI.btn_menu.on(LEvent.CLICK, this, this.onBtnClickWithTween);
            this._viewUI.btn_back.on(LEvent.CLICK, this, this.onBtnClickWithTween);
            this._viewUI.btn_cardtype.on(LEvent.CLICK, this, this.onBtnClickWithTween);
            this._viewUI.btn_qifu.on(LEvent.CLICK, this, this.onBtnClickWithTween);
            this._viewUI.btn_rules.on(LEvent.CLICK, this, this.onBtnClickWithTween);
            this._viewUI.btn_set.on(LEvent.CLICK, this, this.onBtnClickWithTween);
            this._viewUI.btn_record.on(LEvent.CLICK, this, this.onBtnClickWithTween);
            this._viewUI.btn_chongzhi.on(LEvent.CLICK, this, this.onBtnClickWithTween);
            this._viewUI.view_type.ani1.on(LEvent.COMPLETE, this, this.onPlayAniOver);
            if (!this.isCardRoomType) {
                this._viewUI.btn_continue.on(LEvent.CLICK, this, this.onBtnClickWithTween);
            }
            this.setCardRoomBtnEvent(true);
        }

        //打开时要处理的东西
        private updateViewUI(): void {
            this._viewUI.text_cardroomid.visible = this.isCardRoomType;
            this._viewUI.img_menu.visible = false;
            this._viewUI.btn_continue.visible = false;
            this._viewUI.text_info.visible = false;
            this._viewUI.text_roomtype.visible = false;
            this._viewUI.btn_continue.visible = false;
            this._viewUI.img_time.visible = false;
            this._viewUI.view_bazi.visible = false;
            this._viewUI.view_bazi.ani1.stop();
            this._viewUI.view_qiang.visible = false;
            this._viewUI.view_qiang.ani1.stop();
            this._viewUI.view_type.visible = false;
            this._viewUI.view_type.ani1.stop();
            this._viewUI.vw_card.visible = false;
            this._viewUI.text_round.visible = false;
            this._viewUI.text_cardroomid.visible = false;
            this._viewUI.view_type.view_guang.ani1.gotoAndStop(1);
            for (let i = 0; i < MAX_SEAT; i++) {
                this._viewUI["view_player" + i].visible = false;
                this._viewUI["view_settle" + i].visible = false;
                this._viewUI["box_show" + i].visible = false;
                this._viewUI["view_show" + i].ani1.stop();
                this._viewUI["box_special" + i].visible = false;
                this._viewUI["img_special" + i].scale(1, 1);
                for (let k = 0; k < 3; k++) {
                    this._viewUI["img_type_" + i + "_" + k].visible = false;
                }
            }
        }

        //按钮点击
        protected onBtnTweenEnd(e: LEvent, target: any) {
            switch (target) {
                case this._viewUI.btn_menu:
                    this._viewUI.img_menu.visible = true;
                    this._viewUI.btn_menu.visible = false;
                    break;
                case this._viewUI.btn_back:
                    let mapinfo: RshisanshuiMapInfo = this._game.sceneObjectMgr.mapInfo as RshisanshuiMapInfo;
                    if (this.isCardRoomType) {
                        if (!this.canEndCardGame()) return;
                        if (this._shisanshuiStory.isCardRoomMaster() && !this._isGameEnd) {
                            this.masterDismissCardGame();
                            return;
                        }
                    } else {
                        if (mapinfo && mapinfo.GetPlayState() == 1) {
                            this._game.showTips("游戏尚未结束，请先打完这局哦~");
                            return;
                        }
                    }
                    this.resetData();
                    this.clearMapInfoListen();
                    this._shisanshuiMgr.clear();
                    this._shisanshuiStory.clear();
                    this.clearClip();
                    this.clearMoneyImg();
                    this._game.sceneObjectMgr.leaveStory(true);
                    // this.close();
                    break;
                case this._viewUI.btn_cardtype:
                    this._game.uiRoot.general.open(RshisanshuiPageDef.PAGE_SSS_RULE, (page: RshisanshuiRulePage) => {
                        page.dataSource = 1;
                    });
                    break;
                case this._viewUI.btn_rules:
                    this._game.uiRoot.general.open(RshisanshuiPageDef.PAGE_SSS_RULE);
                    break;
                case this._viewUI.btn_qifu:
                    this._game.uiRoot.general.open(DatingPageDef.PAGE_QIFU);
                    break;
                case this._viewUI.btn_set:
                    this._game.uiRoot.general.open(TongyongPageDef.PAGE_TONGYONG_SETTING);
                    break;
                case this._viewUI.btn_record:
                    this._game.uiRoot.general.open(TongyongPageDef.PAGE_TONGYONG_RECORD, (page) => {
                        page.dataSource = {
                            gameid: RshisanshuiPageDef.GAME_NAME,
                            isCardRoomType: this._mapInfo.GetMapLevel() == Web_operation_fields.GAME_ROOM_CONFIG_CARD_ROOM,
                        };
                    });
                    break;
                case this._viewUI.btn_continue:
                    if (this._game.sceneObjectMgr.mainPlayer.playerInfo.money < ChipConfig[this._shisanshuiStory.mapLv][0] * 4) {
                        this.onNotEnoughMoney()
                        return;
                    }
                    if (this._game.sceneObjectMgr.mapInfo instanceof MapInfo) {
                        this.clearClip();
                        this.clearMoneyImg();
                        this.resetData();
                        this.updateViewUI();
                        // this._shisanshuiStory.removeListen();
                        // this.clearMapInfoListen();
                        this._shisanshuiMgr.clear();
                        this._shisanshuiMgr.resetData();
                        this._game.sceneObjectMgr.leaveStory();

                    } else {
                        this.onUpdateMapInfo();
                    }
                    break;
                case this._viewUI.btn_chongzhi:
                    this._game.uiRoot.general.open(DatingPageDef.PAGE_CHONGZHI);
                    break;
                case this._viewUI.vw_card.btn_invite://房卡邀请
                    // 微信邀请玩家参与房卡游戏
                    if (this.isCardRoomType && this._mapInfo.GetCardRoomId()) {
                        this._game.network.call_get_roomcard_share(RshisanshuiPageDef.GAME_NAME);
                    }
                    break;
                // case this._viewUI.vw_card.btn_dismiss://房卡解散
                //     this.masterDismissCardGame();
                //     break;
                case this._viewUI.vw_card.btn_start:////房卡开始
                    this.setCardGameStart();
                    break;
                default:
                    break;
            }
        }

        protected onSucessHandler(data: any) {
            if (data.code == Web_operation_fields.CLIENT_IRCODE_GET_ROOMCARD_SHARE) {
                if (data && data.success == 0) {
                    let img_url: string = data.msg.img_url;
                    let wx_context: string = data.msg.context || ShisanshuiMgr.WXSHARE_DESC;
                    let wx_title: string = data.msg.title + this._mapInfo.GetCardRoomId() || StringU.substitute(ShisanshuiMgr.WXSHARE_TITLE, this._mapInfo.GetCardRoomId());
                    this._game.wxShareUrl(wx_title, wx_context, img_url);
                }
            }
        }

        //点击任意地方关闭菜单
        protected onMouseClick(e: LEvent) {
            if (e.currentTarget != this._viewUI.btn_menu) {
                this._viewUI.img_menu.visible = false;
                this._viewUI.btn_menu.visible = true;
            }
        }

        private onUnitAdd(u: Unit): void {
            this.onUpdateUnit();
        }

        //玩家出去了
        private onUnitRemove(u: Unit) {
            this.onUpdateUnit();
        }

        //精灵显示
        private onUpdateUnit(qifu_index?: number): void {
            let mapinfo: RshisanshuiMapInfo = this._game.sceneObjectMgr.mapInfo as RshisanshuiMapInfo;
            if (!mapinfo) return;
            let mainUnit = this._game.sceneObjectMgr.mainUnit;
            if (!mainUnit) return;
            let idx = mainUnit.GetIndex();
            if (this._mainIdx != idx) {
                this._mainIdx = idx;
            }
            for (let index = 0; index < MAX_SEAT; index++) {
                let posIdx = (idx + index) % MAX_SEAT == 0 ? MAX_SEAT : (idx + index) % MAX_SEAT;
                let unit = this._game.sceneObjectMgr.getUnitByIdx(posIdx)
                this._viewUI["view_player" + index].visible = unit;
                if (unit) {
                    let name = getMainPlayerName(unit.GetName());
                    this._viewUI["view_player" + index].txt_name.text = name;
                    let money = EnumToString.getPointBackNum(unit.GetMoney(), 2);
                    this._viewUI["view_player" + index].txt_money.text = money;
                    //头像框
                    this._viewUI["view_player" + index].img_txk.visible = unit.GetVipLevel() > 0;
                    if (this._viewUI["view_player" + index].img_txk.visible) {
                        this._viewUI["view_player" + index].img_txk.skin = PathGameTongyong.ui_tongyong_touxiang + "tu_v" + unit.GetVipLevel() + ".png";
                    }
                    //vip
                    this._viewUI["view_player" + index].img_vip.visible = unit.GetVipLevel() > 0;
                    this._viewUI["view_player" + index].img_vip.skin = TongyongUtil.getVipUrl(unit.GetVipLevel());
                    //祈福成功 头像上就有动画
                    if (qifu_index && posIdx == qifu_index) {
                        this._viewUI["view_player" + index].qifu_type.visible = true;
                        this._viewUI["view_player" + index].qifu_type.skin = this._qifuTypeImgUrl;
                        this.playTween(this._viewUI["view_player" + index].qifu_type, qifu_index);
                    }
                    //时间戳变化 才加上祈福标志
                    if (unit.GetQiFuEndTime() > this._game.sync.serverTimeBys) {
                        if (qifu_index && posIdx == qifu_index) {
                            Laya.timer.once(2500, this, () => {
                                this._viewUI["view_player" + index].img_qifu.visible = true;
                                if (this._viewUI["view_player" + index].img_qifu.visible && unit.GetQiFuType()) {
                                    this._viewUI["view_player" + index].img_icon.skin = PathGameTongyong.ui_tongyong_touxiang + "head_" + this._nameStrInfo[unit.GetQiFuType() - 1] + ".png";
                                }
                            })
                        } else {
                            this._viewUI["view_player" + index].img_qifu.visible = true;
                            if (this._viewUI["view_player" + index].img_qifu.visible && unit.GetQiFuType()) {
                                this._viewUI["view_player" + index].img_icon.skin = PathGameTongyong.ui_tongyong_touxiang + "head_" + this._nameStrInfo[unit.GetQiFuType() - 1] + ".png";
                            }
                        }
                    } else {
                        this._viewUI["view_player" + index].img_qifu.visible = false;
                        this._viewUI["view_player" + index].img_icon.skin = PathGameTongyong.ui_tongyong_touxiang + "head_" + unit.GetHeadImg() + ".png";
                    }
                }
            }
        }

        private _diff: number = 500;
        private _timeList: { [key: number]: number } = {};
        private _firstList: { [key: number]: number } = {};
        private playTween(img: LImage, index: number, isTween?: boolean) {
            if (!img) return;
            if (!this._timeList[index]) {
                this._timeList[index] = 0;
            }
            if (this._timeList[index] >= 2500) {
                this._timeList[index] = 0;
                this._firstList[index] = 0;
                img.visible = false;
                return;
            }
            Laya.Tween.to(img, { alpha: isTween ? 1 : 0.2 }, this._diff, Laya.Ease.linearNone, Handler.create(this, this.playTween, [img, index, !isTween]), this._firstList[index] ? this._diff : 0);
            this._timeList[index] += this._diff;
            this._firstList[index] = 1;
        }

        private _nameStrInfo: string[] = ["xs", "px", "gsy", "gg", "cs", "tdg"];
        private _qifuTypeImgUrl: string;
        private qifuFly(dataSource: any): void {
            if (!dataSource) return;
            let dataInfo = dataSource;
            this._game.qifuMgr.showFlayAni(this._viewUI.view_player0.img_icon, this._viewUI, dataSource, (dataInfo) => {
                //相对应的玩家精灵做出反应
                this._qifuTypeImgUrl = StringU.substitute(PathGameTongyong.ui_tongyong_touxiang + "f_{0}2.png", this._nameStrInfo[dataInfo.qf_id - 1]);
                this.onUpdateUnit(dataInfo.qifu_index);
            });
        }
        protected onOptHandler(optcode: number, msg: any) {
            if (msg.type == Operation_Fields.OPRATE_TELEPORT) {
                switch (msg.reason) {
                    case Operation_Fields.OPRATE_TELEPORT_MAP_CREATE_ROOM_SUCCESS://在地图中重新创建房间成功
                        this.resetData();
                        this.clearClip();
                        this.clearMoneyImg();
                        this._battleIndex = -1;
                        this._game.sceneObjectMgr.clearOfflineObject();
                        break;
                }
            }
        }

        //地图监听
        private onUpdateMapInfo(): void {
            let mapInfo = this._game.sceneObjectMgr.mapInfo;
            this._mapInfo = mapInfo as RshisanshuiMapInfo;
            if (mapInfo) {
                this._viewUI.btn_continue.visible = false;
                if (this._shisanshuiMgr.isReLogin) {
                    this._shisanshuiStory.mapLv = this._mapInfo.GetMapLevel();
                    this._shisanshuiMgr.isReLogin = false;
                    this._shisanshuiMgr.isReDealCard = false;
                    this._isGameEnd = false;
                    this.resetBattleIdx();
                    this.updateBattledInfo();
                    this.onUpdateMapState();
                    this.updateCountDown();
                }
                if (this.isCardRoomType) {
                    this.updateCardRoomDisplayInfo();
                }
                this.onUpdateUnit();
            } else {
                if (this.isCardRoomType) return;
                this.onUpdateUnitOffline();
                this._game.uiRoot.general.open(TongyongPageDef.PAGE_TONGYONG_MATCH, null, (page) => {
                    this._viewUI.btn_continue.visible = page.dataSource;
                });
                this._viewUI.btn_continue.visible = false;
            }
        }

        //假精灵数据
        private onUpdateUnitOffline() {
            if (!this._shisanshuiMgr.unitOffline) return;
            let unitOffline = this._shisanshuiMgr.unitOffline;
            let mPlayer = this._game.sceneObjectMgr.mainPlayer;
            if (unitOffline) {
                this._viewUI.view_player0.visible = true;
                let money;
                if (mPlayer) {
                    if (!mPlayer.playerInfo) return;
                    money = mPlayer.playerInfo.money;
                    this._viewUI.view_player0.txt_name.text = getMainPlayerName(mPlayer.playerInfo.nickname);
                    this._viewUI.view_player0.img_icon.skin = PathGameTongyong.ui_tongyong_touxiang + "head_" + mPlayer.playerInfo.headimg + ".png";
                    this._viewUI.view_player0.img_qifu.visible = mPlayer.playerInfo.qifu_endtime > this._game.sync.serverTimeBys;
                    if (this._viewUI.view_player0.img_qifu.visible && mPlayer.playerInfo.qifu_type) {
                        this._viewUI.view_player0.img_icon.skin = PathGameTongyong.ui_tongyong_touxiang + "head_" + this._nameStrInfo[mPlayer.playerInfo.qifu_type - 1] + ".png";
                    }
                    //头像框
                    this._viewUI.view_player0.img_txk.visible = mPlayer.playerInfo.vip_level > 0;
                    if (this._viewUI.view_player0.img_txk.visible) {
                        this._viewUI.view_player0.img_txk.skin = PathGameTongyong.ui_tongyong_touxiang + "tu_v" + mPlayer.playerInfo.vip_level + ".png";
                    }
                } else {
                    money = unitOffline.GetMoney();
                    this._viewUI.view_player0.txt_name.text = getMainPlayerName(unitOffline.GetName());
                    this._viewUI.view_player0.img_icon.skin = Path_game_shisanshui.ui_shisanshui + "head_" + unitOffline.GetHeadImg() + ".png";
                    this._viewUI.view_player0.img_qifu.visible = unitOffline.GetQiFuEndTime() > this._game.sync.serverTimeBys;
                    if (this._viewUI.view_player0.img_qifu.visible && unitOffline.GetQiFuType()) {
                        this._viewUI.view_player0.img_icon.skin = PathGameTongyong.ui_tongyong_touxiang + "head_" + this._nameStrInfo[unitOffline.GetQiFuType() - 1] + ".png";
                    }
                    //头像框
                    this._viewUI.view_player0.img_txk.visible = unitOffline.GetVipLevel() > 0;
                    if (this._viewUI.view_player0.img_txk.visible) {
                        this._viewUI.view_player0.img_txk.skin = PathGameTongyong.ui_tongyong_touxiang + "tu_v" + unitOffline.GetVipLevel() + ".png";
                    }
                }
                money = EnumToString.getPointBackNum(money, 2);
                this._viewUI.view_player0.txt_money.text = money.toString();
            }
        }

        //隐藏房卡模式UI
        private updateCardRoomDisplayInfo() {
            if (!this._mapInfo) return;
            if (!this._game.sceneObjectMgr.mainUnit) return;
            this.onUpdateUnit();
            if (this._mapInfo.GetCardRoomId() && !this._isPlaying && !this._isGameEnd) {
                this.setCardRoomBtnVisible();
            }
        }

        // 房卡按纽及状态
        private setCardRoomBtnVisible() {
            this._viewUI.vw_card.visible = this.isCardRoomType;
            if (!this._shisanshuiMgr.isReLogin) {
                this._viewUI.text_cardroomid.visible = true;
            }
            this._viewUI.text_cardroomid.text = "房间号：" + this._mapInfo.GetCardRoomId();
            if (this.isCardRoomType) {
                this._viewUI.vw_card.btn_invite.visible = true;
                this._viewUI.vw_card.btn_invite.x = this._shisanshuiStory.isCardRoomMaster() ? 420 : this._viewUI.vw_card.btn_start.x;
                // this._viewUI.vw_card.btn_dismiss.visible = this._shisanshuiStory.isCardRoomMaster();
                this._viewUI.vw_card.btn_start.visible = this._shisanshuiStory.isCardRoomMaster();
            }
        }

        // 房卡事件和初始界面布局
        private setCardRoomBtnEvent(isOn) {
            if (this.isCardRoomType && isOn) {
                this._viewUI.vw_card.btn_invite.on(LEvent.CLICK, this, this.onBtnClickWithTween);
                this._viewUI.vw_card.btn_start.on(LEvent.CLICK, this, this.onBtnClickWithTween);
                // this._viewUI.vw_card.btn_dismiss.on(LEvent.CLICK, this, this.onBtnClickWithTween);
            } else {
                this._viewUI.vw_card.btn_invite.off(LEvent.CLICK, this, this.onBtnClickWithTween);
                this._viewUI.vw_card.btn_start.off(LEvent.CLICK, this, this.onBtnClickWithTween);
                // this._viewUI.vw_card.btn_dismiss.off(LEvent.CLICK, this, this.onBtnClickWithTween);
            }
        }

        // 是否可以提前终止游戏
        private canEndCardGame() {
            if (this._isPlaying) {
                TongyongPageDef.ins.alertRecharge(StringU.substitute("游戏中禁止退出，请先完成本轮" + this._mapInfo.GetCardRoomGameNumber() + "局游戏哦~~"), () => {
                }, () => {
                }, true, PathGameTongyong.ui_tongyong_general + "btn_qd.png");
                return false;
            }
            return !this._isPlaying;
        }

        // 游戏结束 场景恢复
        private setGameEnd() {
            this._viewUI.btn_continue.visible = !this.isCardRoomType;
            this._viewUI.vw_card.visible = false;
            this._isGameEnd = true;
            this._shisanshuiMgr.resetData();
            this._shisanshuiMgr.clear();
            this.resetData();
            this._battleIndex = -1;
        }

        //地图状态
        private onUpdateMapState(): void {
            if (!this._mapInfo) return;
            let mainUnit = this._game.sceneObjectMgr.mainUnit;
            if (!mainUnit) return;
            this._curStatus = this._mapInfo.GetMapState();
            let idx = mainUnit.GetIndex();
            let betPos = this._mapInfo.GetCurrentBetPos();
            let state = this._mapInfo.GetMapState();
            this._viewUI.text_info.text = "牌局号：" + this._mapInfo.GetGameNo();
            let round = this._mapInfo.GetRound() + 1;
            this._viewUI.text_round.text = "局数：" + round + "/" + this._mapInfo.GetCardRoomGameNumber();
            this._viewUI.text_roomtype.visible = !this.isCardRoomType;
            let str = "";
            this._isPlaying = state >= MAP_STATUS.MAP_STATE_SHUFFLE && state < MAP_STATUS.MAP_STATE_END;
            if (this._shisanshuiStory.mapLv == Web_operation_fields.GAME_ROOM_CONFIG_SHISANSHUI_1) {
                str = "新手场：底注：";
            } else if (this._shisanshuiStory.mapLv == Web_operation_fields.GAME_ROOM_CONFIG_SHISANSHUI_2) {
                str = "小资场：底注：";
            } else if (this._shisanshuiStory.mapLv == Web_operation_fields.GAME_ROOM_CONFIG_SHISANSHUI_3) {
                str = "老板场：底注：";
            } else if (this._shisanshuiStory.mapLv == Web_operation_fields.GAME_ROOM_CONFIG_SHISANSHUI_4) {
                str = "富豪场：底注：";
            }
            if (!this.isCardRoomType) {
                this._viewUI.text_roomtype.text = str + ChipConfig[this._shisanshuiStory.mapLv][0];
            }
            if (this.isCardRoomType) {
                if (this._isPlaying) {  //隐藏下按钮
                    this._viewUI.text_info.visible = true;
                    this._viewUI.text_round.visible = true;
                    this._viewUI.text_cardroomid.visible = false;
                    this._viewUI.vw_card.btn_invite.visible = false;
                    // this._viewUI.vw_card.btn_dismiss.visible = false;
                    this._viewUI.vw_card.btn_start.visible = false;
                }
            } else {
                this._viewUI.text_info.visible = true;
            }
            if (state == MAP_STATUS.MAP_STATE_SHUFFLE) {
                this._pageHandle.pushClose({ id: RshisanshuiPageDef.PAGE_SSS_CARDROOM_SETTLE, parent: this._game.uiRoot.HUD });
            }
            if (state == MAP_STATUS.MAP_STATE_PLAYING) {
                if (!this._isPlayCard) {
                    //隐藏牌
                    this._shisanshuiMgr.setCardVisible(false);
                    this._game.uiRoot.general.open(RshisanshuiPageDef.PAGE_SSS_PLAYING, (page: RshisanshuiPlayingPage) => {
                        page.setBattleInfoIdx(this._battleIndex);
                    });
                    this._game.playSound(Path_game_shisanshui.music_shisanshui + MUSIC_PATH.chuPaiMusic, false);
                }
                for (let i = 1; i < MAX_SEAT; i++) {
                    let seat = this.GetSeatFromUiPos(i);
                    let unit = this._game.sceneObjectMgr.getUnitByIdx(seat);
                    if (unit) {
                        this._viewUI["box_show" + i].visible = true;
                        this._viewUI["view_show" + i].ani1.play(1, true)
                    }
                }
            } else {
                if (this._game.uiRoot.general.isOpened(RshisanshuiPageDef.PAGE_SSS_PLAYING)) {
                    this._game.uiRoot.general.close(RshisanshuiPageDef.PAGE_SSS_PLAYING);
                }
                for (let i = 0; i < MAX_SEAT; i++) {
                    this._viewUI["box_show" + i].visible = false;
                    this._viewUI["view_show" + i].ani1.stop();
                }
            }
            if (state != MAP_STATUS.MAP_STATE_COMPARE) {
                this._viewUI.view_bazi.visible = false;
                this._viewUI.view_bazi.ani1.stop();
                this._viewUI.view_qiang.visible = false;
                this._viewUI.view_qiang.ani1.stop();
            } else {
                this._game.playSound(Path_game_shisanshui.music_shisanshui + MUSIC_PATH.biPaiMusic, false);
            }
            if (state != MAP_STATUS.MAP_STATE_QUANLEIDA) {
                if (this._game.uiRoot.general.isOpened(RshisanshuiPageDef.PAGE_SSS_QUANLEIDA)) {
                    this._game.uiRoot.general.close(RshisanshuiPageDef.PAGE_SSS_QUANLEIDA);
                }
            }
            if (state == MAP_STATUS.MAP_STATE_SPECIAL) {
                this.playSpecialAni();
                this.onPlayAniOver();
            } else {
                this._viewUI.view_type.visible = false;
                this._viewUI.view_type.ani1.stop();
            }
            if (state == MAP_STATUS.MAP_STATE_WAIT) {
                this.openSettlePage();
                this.clearClip();
                this.updateViewUI();
                this.onUpdateUnit();
                this.resetData();
                this.clearMoneyImg();
                this._shisanshuiMgr.resetData();
                this._shisanshuiMgr.clear();
            }
            if (state == MAP_STATUS.MAP_STATE_SETTLE) {
                this.addBankerWinEff();
            }
            if (state == MAP_STATUS.MAP_STATE_END) {
                if (!this.isCardRoomType) {
                    this._viewUI.btn_continue.visible = true;
                } else {
                    this.openSettlePage();
                    this.clearClip();
                    this.updateViewUI();
                    this.onUpdateUnit();
                    this.resetData();
                    this.clearMoneyImg();
                    this._shisanshuiMgr.resetData();
                    this._shisanshuiMgr.clear();
                    this._battleIndex = -1;
                }
            }
            this._pageHandle.updatePageHandle();
            this._pageHandle.reset();
        }

        //打开结算界面
        private openSettlePage(): void {
            if (this._pointTemp.length == 0) return;
            if (!this._mapInfo) return;
            let temps = [];
            let infoTemps = [];
            for (let i = 1; i < 5; i++) {
                let unit = this._game.sceneObjectMgr.getUnitByIdx(i)
                let score: number = 0; //积分
                for (let k = 0; k < this._pointTemp.length / 2; k++) {
                    if (i == this._pointTemp[k * 2]) {
                        score = this._pointTemp[k * 2 + 1];
                        break;
                    }
                }
                let cards = []; //手牌
                for (let index = 0; index < this._showCards.length; index++) {
                    if (this._showCards[index].seat == i) {
                        cards = this._showCards[index].cards;
                        break;
                    }
                }
                if (unit) {
                    let obj = {
                        isMain: this._game.sceneObjectMgr.mainUnit.GetIndex() == i,
                        name: unit.GetName(),
                        score: score,
                        totalPoint: EnumToString.getPointBackNum(unit.GetMoney(), 2),
                        cardtype: cards,
                    }
                    temps.push(obj);
                }
            }
            infoTemps.push(this._mapInfo.GetRound() + 1);
            infoTemps.push(this._mapInfo.GetCardRoomGameNumber());
            infoTemps.push(temps);
            this._pageHandle.pushOpen({ id: RshisanshuiPageDef.PAGE_SSS_CARDROOM_SETTLE, dataSource: infoTemps, parent: this._game.uiRoot.HUD });
        }

        //特殊牌特效播放
        private playSpecialAni(): void {
            let mainUnit = this._game.sceneObjectMgr.mainUnit;
            if (!mainUnit) return;
            let mainIdx = mainUnit.GetIndex();
            if (mainIdx == 0) return;
            for (let i = 0; i < this._specialCardsInfo.length; i++) {
                let seat = this._specialCardsInfo[i].seat;
                this._shisanshuiMgr.compare(seat, 1);
                this._shisanshuiMgr.compare(seat, 2);
                this._shisanshuiMgr.compare(seat, 3);
                let posIdx = (seat - mainIdx + MAX_SEAT) % MAX_SEAT;
                this._viewUI["box_special" + posIdx].visible = false;
            }
        }

        //特殊牌播放停止后执行
        private onPlayAniOver(): void {
            let mainUnit = this._game.sceneObjectMgr.mainUnit;
            if (!mainUnit) return;
            let mainIdx = mainUnit.GetIndex();
            if (mainIdx == 0) return;
            this._viewUI.view_type.view_guang.ani1.gotoAndStop(1);
            if (this._playAniCount >= this._specialCardsInfo.length) {
                this._viewUI.view_type.ani1.gotoAndStop(1);
                this._viewUI.view_type.visible = false;
                return;
            };
            this._viewUI.view_type.visible = true;
            this._viewUI.view_type.ani1.play(1, false);
            let type = this._specialCardsInfo[this._playAniCount].type
            this._viewUI.view_type.img_type.skin = Path_game_shisanshui.ui_shisanshui + "effect/paixing/tu_paix" + type + ".png";
            this._viewUI.view_type.img_type1.skin = Path_game_shisanshui.ui_shisanshui + "effect/paixing/tu_paix" + type + "_1.png";
            //显示特殊牌
            let seat = this._specialCardsInfo[this._playAniCount].seat;
            let posIdx = (seat - mainIdx + MAX_SEAT) % MAX_SEAT;
            this._viewUI["box_special" + posIdx].visible = true;
            this._viewUI["img_special" + posIdx].scale(0.5, 0.5);
            this._viewUI["img_special" + posIdx].skin = Path_game_shisanshui.ui_shisanshui + "effect/paixing/tu_paix" + type + ".png";
            this._viewUI.view_type.view_guang.ani1.play(1, false)
            this._playAniCount = this._playAniCount + 1;
        }

        //更新倒计时时间戳
        private updateCountDown(): void {
            let mapinfo: RshisanshuiMapInfo = this._game.sceneObjectMgr.mapInfo as RshisanshuiMapInfo;
            this._countDown = mapinfo.GetCountDown();
            if (!mapinfo) return;
        }

        //操作倒计时
        deltaUpdate(): void {
            if (!(this._game.sceneObjectMgr.mapInfo instanceof RshisanshuiMapInfo)) return;
            if (!this._viewUI) return;
            if (this._curStatus != MAP_STATUS.MAP_STATE_PLAYING) {
                this._viewUI.img_time.visible = false;
                this._viewUI.img_time.ani1.gotoAndStop(24);
                return;
            }
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

        //战斗日志
        private updateBattledInfo(): void {
            let mainUnit = this._game.sceneObjectMgr.mainUnit;
            if (!mainUnit) return;
            let battleInfoMgr = this._mapInfo.battleInfoMgr;
            let mainIdx = mainUnit.GetIndex();
            if (mainIdx == 0) return;
            for (let i = 0; i < battleInfoMgr.info.length; i++) {
                let battleInfo = battleInfoMgr.info[i] as gamecomponent.object.BattleInfoBase;
                switch (battleInfo.Type) {
                    case 5: {   //明牌
                        if (this._battleIndex < i) {
                            this._battleIndex = i;
                            let info = battleInfoMgr.info[i] as gamecomponent.object.BattleInfoMingPai;
                            let idx = info.SeatIndex;
                            let cards = [];
                            let touDun = [];
                            let zhongDun = [];
                            let weiDun = [];
                            for (let index = 0; index < info.Cards.length; index++) {
                                let card = info.Cards[index];
                                cards.push(card);
                                if (index < 3) {
                                    touDun.push(card);
                                } else if (index < 8) {
                                    zhongDun.push(card);
                                } else {
                                    weiDun.push(card);
                                }
                            }
                            //存下牌，结算界面表现用
                            let obj = {
                                seat: idx,
                                cards: info.Cards,
                            }
                            this._showCards.push(obj);
                            this._shisanshuiMgr.showCards(cards, idx);
                            this._shisanshuiMgr.playingCard(idx);
                            let posIdx = (idx - mainIdx + MAX_SEAT) % MAX_SEAT;
                            this._viewUI["box_show" + posIdx].visible = false;
                            this._viewUI["view_show" + posIdx].ani1.stop();
                            //判断下3个墩的牌型
                            let type0 = this._shisanshuiMgr.checkCardsType(touDun) + 1;
                            let type1 = this._shisanshuiMgr.checkCardsType(zhongDun) + 1;
                            let type2 = this._shisanshuiMgr.checkCardsType(weiDun) + 1;
                            this._viewUI["img_type_" + posIdx + "_0"].skin = Path_game_shisanshui.ui_shisanshui + "tu_px" + type0 + ".png";
                            this._viewUI["img_type_" + posIdx + "_1"].skin = Path_game_shisanshui.ui_shisanshui + "tu_px" + type1 + ".png";
                            this._viewUI["img_type_" + posIdx + "_2"].skin = Path_game_shisanshui.ui_shisanshui + "tu_px" + type2 + ".png";
                            //自己拼完牌，关闭界面
                            if (idx == mainIdx) {
                                //显示牌
                                this._shisanshuiMgr.setCardVisible(true);
                                if (this._game.uiRoot.general.isOpened(RshisanshuiPageDef.PAGE_SSS_SPECIAL)) {
                                    this._game.uiRoot.general.close(RshisanshuiPageDef.PAGE_SSS_SPECIAL);
                                }
                                if (this._game.uiRoot.general.isOpened(RshisanshuiPageDef.PAGE_SSS_PLAYING)) {
                                    this._game.uiRoot.general.close(RshisanshuiPageDef.PAGE_SSS_PLAYING);
                                }
                                this._isPlayCard = true;
                            }
                        }
                        break;
                    }
                    case 30: {   //十三水比牌
                        if (this._battleIndex < i) {
                            this._battleIndex = i;
                            let info = battleInfoMgr.info[i] as gamecomponent.object.BattleInfoShiSanShuiCompare;
                            let dun = info.Dun - 1;
                            let dunTemp = ["头墩", "中墩", "尾墩"];
                            let unit = this._game.sceneObjectMgr.getUnitByIdx(info.SeatIndex);
                            let isSpecial: boolean = false; //是不是特殊牌
                            for (let index = 0; index < this._specialCardsInfo.length; index++) {
                                if (this._specialCardsInfo[index].seat == info.SeatIndex) {
                                    isSpecial = true;
                                    break;
                                }
                            }
                            let posIdx = (info.SeatIndex - mainIdx + MAX_SEAT) % MAX_SEAT;
                            if (isSpecial) {    //特殊牌就不显示墩位
                                this._viewUI["box_card" + posIdx].visible = false;
                            } else {
                                this._shisanshuiMgr.compare(info.SeatIndex, info.Dun);
                                this._viewUI["box_card" + posIdx].visible = true;
                            }
                            this._viewUI["img_type_" + posIdx + "_" + dun].visible = unit;
                            if (info.SeatIndex == mainIdx) {
                                this._viewUI["view_settle" + dun].visible = true;
                                this._viewUI["view_settle" + dun].lab_val.text = info.Val;
                                this._viewUI["view_settle" + dun].lab_pos.text = dunTemp[dun];
                                this._viewUI["view_settle" + dun].lab_num.text = "(0)";
                                this._viewUI.view_settle3.visible = true;
                                this._viewUI.view_settle3.lab_pos.text = "总计";
                                this._viewUI.view_settle3.lab_num.text = "(0)";
                                this._totalVla = this._totalVla + info.Val;
                                this._viewUI.view_settle3.lab_val.text = this._totalVla.toString();
                            }
                            if (info.Dun == 3) {
                                this._compareCount++;
                                if (this._compareCount == this.unitCount()) {
                                    this.daQiangEff();
                                }
                            }
                        }
                        break;
                    }
                    case 32: {   //打枪
                        if (this._battleIndex < i) {
                            this._battleIndex = i;
                            let info = battleInfoMgr.info[i] as gamecomponent.object.BattleInfoShiSanShuiDaQiang;
                            let obj = {
                                target: info.SeatIndex,
                                attack: info.attacker,
                                touDun: info.touVal,
                                zhongDun: info.zhongVal,
                                weiDun: info.weiVal,
                            }
                            this._daQiangInfo.push(obj);
                        }
                        break;
                    }
                    case 1: {   //全垒打
                        if (this._battleIndex < i) {
                            this._battleIndex = i;
                            let info = battleInfoMgr.info[i] as gamecomponent.object.BattleInfoPass;
                            if (!this._game.uiRoot.general.isOpened(RshisanshuiPageDef.PAGE_SSS_QUANLEIDA)) {
                                this._game.uiRoot.general.open(RshisanshuiPageDef.PAGE_SSS_QUANLEIDA);
                            }
                            let unit = this._game.sceneObjectMgr.getUnitByIdx(info.SeatIndex);
                            if (unit) {
                                let headNum = parseInt(unit.GetHeadImg());
                                let sexType = headNum > 10 ? "nv" : "nan";
                                this._game.playSound(Path_game_shisanshui.music_shisanshui + MUSIC_PATH.quanLeiDaMusic + sexType + ".mp3", false);
                                this._qldUnit = unit;
                            }
                        }
                        break;
                    }
                    case 36: {  //全垒打结算
                        if (this._battleIndex < i) {
                            this._battleIndex = i;
                            let info = battleInfoMgr.info[i] as gamecomponent.object.BattleInfoQuanLeiDa;
                            let unit = this._game.sceneObjectMgr.getUnitByIdx(info.SeatIndex);
                            if (info.SeatIndex == mainIdx) {
                                let touVal = this._touQiang;
                                let zhongVal = this._zhongQiang;
                                let weiVal = this._weiQiang;
                                if (unit == this._qldUnit) {
                                    touVal = this._touQiang + info.touDun;
                                    zhongVal = this._zhongQiang + info.zhongDun;
                                    weiVal = this._weiQiang + info.weiDun;
                                } else {
                                    touVal = this._touQiang - info.touDun;
                                    zhongVal = this._zhongQiang - info.zhongDun;
                                    weiVal = this._weiQiang - info.weiDun;
                                }
                                let totalVal = touVal + zhongVal + weiVal;
                                this._viewUI.view_settle0.lab_num.text = "(" + touVal + ")";
                                this._viewUI.view_settle1.lab_num.text = "(" + zhongVal + ")";
                                this._viewUI.view_settle2.lab_num.text = "(" + weiVal + ")";
                                this._viewUI.view_settle3.lab_num.text = "(" + totalVal + ")";
                            }
                        }
                        break;
                    }
                    case 37: {  //特殊牌结算
                        if (this._battleIndex < i) {
                            this._battleIndex = i;
                            let info = battleInfoMgr.info[i] as gamecomponent.object.BattleInfoSpecial;
                            if (info.SeatIndex == mainIdx) {
                                let touVal = this._touQiang;
                                let zhongVal = this._zhongQiang;
                                let weiVal = this._weiQiang;
                                let totalVal = touVal + zhongVal + weiVal + info.SpecialVal;
                                this._viewUI.view_settle3.lab_num.text = "(" + totalVal + ")";
                            }
                        }
                        break;
                    }
                    case 38: {  //特殊牌型
                        if (this._battleIndex < i) {
                            this._battleIndex = i;
                            let info = battleInfoMgr.info[i] as gamecomponent.object.BattleInfoSpecialCard;
                            let obj = {
                                seat: info.SeatIndex,
                                type: info.cardType,
                            }
                            this._specialCardsInfo.push(obj);
                            let posIdx = (info.SeatIndex - mainIdx + MAX_SEAT) % MAX_SEAT;
                            this._viewUI["box_special" + posIdx].visible = true;
                            this._viewUI["img_special" + posIdx].skin = Path_game_shisanshui.ui_shisanshui + "effect/paixing/tu_teshupai.png";
                        }
                        break;
                    }
                    case 11: {   //结算
                        if (this._battleIndex < i) {
                            this._battleIndex = i
                            let info = battleInfoMgr.info[i] as gamecomponent.object.BattleInfoSettle;
                            if (info.SettleVal > 0) {
                                this._settleWinInfo.push(info.SeatIndex);
                                this._settleWinInfo.push(info.SettleVal);
                            } else if (info.SettleVal < 0) {
                                this._settleLoseInfo.push(info.SeatIndex);
                                this._settleLoseInfo.push(info.SettleVal);
                            }
                            this.addMoneyClip(info.SettleVal, info.SeatIndex);
                            //存下结算数据
                            this._pointTemp.push(info.SeatIndex);
                            this._pointTemp.push(info.SettleVal);
                        }
                        break;
                    }
                }
            }
        }

        //重连之后，战斗日志从哪开始刷
        private resetBattleIdx(): void {
            //不是房卡模式，就不用算
            if (!this.isCardRoomType) return;
            let battleInfoMgr = this._mapInfo.battleInfoMgr;
            for (let i = 0; i < battleInfoMgr.info.length; i++) {
                let battleInfo = battleInfoMgr.info[i] as gamecomponent.object.BattleInfoBase;
                if (battleInfo.Type == 11) {
                    this._battleIndex = i;
                }
            }
        }

        //打枪
        private daQiangEff(): void {
            let mainUnit = this._game.sceneObjectMgr.mainUnit;
            if (!mainUnit) return;
            let count = 1;
            for (let i = 0; i < this._daQiangInfo.length; i++) {
                Laya.timer.once(1000 * count, this, () => {
                    if (this._daQiangInfo[i].target == mainUnit.GetIndex()) {
                        this._touQiang = this._touQiang - this._daQiangInfo[i].touDun;
                        this._zhongQiang = this._zhongQiang - this._daQiangInfo[i].zhongDun;
                        this._weiQiang = this._weiQiang - this._daQiangInfo[i].weiDun;
                    } else if (this._daQiangInfo[i].attack == mainUnit.GetIndex()) {
                        this._touQiang = this._touQiang + this._daQiangInfo[i].touDun;
                        this._zhongQiang = this._zhongQiang + this._daQiangInfo[i].zhongDun;
                        this._weiQiang = this._weiQiang + this._daQiangInfo[i].weiDun;
                    }
                    this._viewUI.view_settle0.lab_num.text = "(" + this._touQiang + ")";
                    this._viewUI.view_settle1.lab_num.text = "(" + this._zhongQiang + ")";
                    this._viewUI.view_settle2.lab_num.text = "(" + this._weiQiang + ")";
                    this._viewUI.view_settle3.lab_num.text = "(" + (this._touQiang + this._zhongQiang + this._weiQiang) + ")";
                    //打枪动画
                    let qiangPos = (this._daQiangInfo[i].attack - mainUnit.GetIndex() + MAX_SEAT) % MAX_SEAT;
                    let baZiPos = (this._daQiangInfo[i].target - mainUnit.GetIndex() + MAX_SEAT) % MAX_SEAT;
                    this._viewUI.view_bazi.x = QiangPos[baZiPos][0];
                    this._viewUI.view_bazi.y = QiangPos[baZiPos][1];
                    this._viewUI.view_bazi.visible = true;
                    this._viewUI.view_bazi.ani1.play(1, false);
                    let targetIdx = (this._daQiangInfo[i].target - this._daQiangInfo[i].attack + MAX_SEAT) % MAX_SEAT - 1;
                    this._viewUI.view_qiang.x = QiangPos[qiangPos][0];
                    this._viewUI.view_qiang.y = QiangPos[qiangPos][1];
                    this._viewUI.view_qiang.scaleX = QiangRola[qiangPos][targetIdx][0];
                    this._viewUI.view_qiang.rotation = QiangRola[qiangPos][targetIdx][1];
                    this._viewUI.view_qiang.visible = true;
                    this._viewUI.view_qiang.ani1.play(1, false);
                    let unit = this._game.sceneObjectMgr.getUnitByIdx(this._daQiangInfo[i].attack);
                    if (unit) {
                        let headNum = parseInt(unit.GetHeadImg());
                        let sexType = headNum > 10 ? "nv" : "nan";
                        this._game.playSound(Path_game_shisanshui.music_shisanshui + MUSIC_PATH.daQiangMusic + sexType + ".mp3", false);
                    }
                })
                count++;
            }
        }

        //看下在场几个人
        private unitCount(): number {
            let count = 0;
            for (let i = 0; i < MAX_SEAT; i++) {
                let index = i + 1;
                let unit = this._game.sceneObjectMgr.getUnitByIdx(index);
                if (unit) {
                    count++;
                }
            }
            return count;
        }

        //UI的位置转为座位
        private GetSeatFromUiPos(pos: number): number {
            let mainUnit = this._game.sceneObjectMgr.mainUnit;
            if (!mainUnit) return;
            let mainIdx = mainUnit.GetIndex();
            if (mainIdx == 0) return;
            let seat = 0;
            let posIdx = (pos + mainIdx) % MAX_SEAT
            seat = posIdx == 0 ? MAX_SEAT : posIdx;
            return seat;
        }

        //庄家赢钱
        private addBankerWinEff(): void {
            let timeInternal = MONEY_NUM * MONEY_FLY_TIME
            let mainUnit = this._game.sceneObjectMgr.mainUnit;
            if (!mainUnit) return;
            if (!this._mainIdx) return;
            Laya.timer.once(timeInternal, this, () => {
                this.addBankerLoseEff();
            });
            if (this._settleLoseInfo.length < 1) return;
            let mainIdx = mainUnit.GetIndex();
            let bankerPos = (this._mainIdx - mainIdx + MAX_SEAT) % MAX_SEAT;
            for (let i: number = 0; i < this._settleLoseInfo.length / 2; i++) {
                let index = i * 2;
                let unitPos = (this._settleLoseInfo[index] - mainIdx + MAX_SEAT) % MAX_SEAT;
                if (i < this._settleLoseInfo.length / 2) {
                    let fromX = this._game.mainScene.camera.getScenePxByCellX(this._viewUI["view_player" + unitPos].x) + 23;
                    let fromY = this._game.mainScene.camera.getScenePxByCellY(this._viewUI["view_player" + unitPos].y) + 70;
                    this.subMoneyFly(fromX, fromY);
                }
            }
        }

        //庄家输钱
        private addBankerLoseEff(): void {
            if (this._settleWinInfo.length < 1) return;
            if (!this._game.mainScene || !this._game.mainScene.camera) return;
            let mainIdx = this._game.sceneObjectMgr.mainUnit.GetIndex();
            let bankerPos = (this._mainIdx - mainIdx + MAX_SEAT) % MAX_SEAT;
            for (let i: number = 0; i < this._settleWinInfo.length / 2; i++) {
                let index = i * 2;
                let unitPos = (this._settleWinInfo[index] - mainIdx + MAX_SEAT) % MAX_SEAT;
                if (i < this._settleWinInfo.length / 2) {
                    let tarX = this._game.mainScene.camera.getScenePxByCellX(this._viewUI["view_player" + unitPos].x) + 23;
                    let tarY = this._game.mainScene.camera.getScenePxByCellY(this._viewUI["view_player" + unitPos].y) + 65;
                    this.addMoneyFly(tarX, tarY, i);
                }
            }
        }

        //金币变化 飘金币特效
        public addMoneyFly(tarX: number, tarY: number, index: number): void {
            let posEndX = MathU.randomRange(tarX, tarX);
            let posEndY = MathU.randomRange(tarY, tarY);
            for (let i: number = 0; i < this._moneyImg.length; i++) {
                if (i < MONEY_NUM / (this._settleWinInfo.length / 2) * (index + 1) && i >= MONEY_NUM / (this._settleWinInfo.length / 2) * index) {
                    let moneyImg: LImage = this._moneyImg[i];
                    // Laya.Bezier 贝塞尔曲线  取得点
                    Laya.Tween.to(moneyImg, { x: posEndX }, i * MONEY_FLY_TIME, null);
                    Laya.Tween.to(moneyImg, { y: posEndY }, i * MONEY_FLY_TIME, null, Handler.create(this, () => {
                        moneyImg.removeSelf();
                    }));
                }
            }
        }

        public subMoneyFly(fromX: number, fromY: number): void {
            let posBeginX = MathU.randomRange(fromX, fromX);
            let posBeginY = MathU.randomRange(fromY, fromY);
            for (let i: number = 0; i < MONEY_NUM / (this._settleLoseInfo.length / 2); i++) {
                let posEndX = MathU.randomPointInCicle(new Vector2(640, 360), 0, 50).x;
                let posEndY = MathU.randomPointInCicle(new Vector2(640, 360), 0, 50).y;
                let moneyImg: LImage = new LImage(PathGameTongyong.ui_tongyong_general + "icon_money.png");
                moneyImg.scale(0.7, 0.7);
                if (!moneyImg.parent) this._viewUI.addChild(moneyImg);
                moneyImg.pos(posBeginX, posBeginY);
                // Laya.Bezier 贝塞尔曲线  取得点
                Laya.Tween.to(moneyImg, { x: posEndX }, i * MONEY_FLY_TIME, null);
                Laya.Tween.to(moneyImg, { y: posEndY }, i * MONEY_FLY_TIME, null);
                this._moneyImg.push(moneyImg);
            }
        }

        //金币变化 飘字clip
        public addMoneyClip(value: number, pos: number): void {
            let mainUnit = this._game.sceneObjectMgr.mainUnit;
            if (!mainUnit) return;
            let idx = mainUnit.GetIndex();
            let valueClip = value >= 0 ? new ShisanshuiClip(ShisanshuiClip.ADD_MONEY_FONT) : new ShisanshuiClip(ShisanshuiClip.SUB_MONEY_FONT);
            let preSkin = value >= 0 ? PathGameTongyong.ui_tongyong_general + "tu_jia.png" : PathGameTongyong.ui_tongyong_general + "tu_jian.png";
            valueClip.scale(0.8, 0.8);
            valueClip.anchorX = 0.5;
            let moneyStr = EnumToString.getPointBackNum(Math.abs(value), 2);
            valueClip.setText(moneyStr + "", true, false, preSkin);
            let index = (pos - idx + MAX_SEAT) % MAX_SEAT;
            let posX = this._viewUI["view_player" + index].x + 50;
            let posY = this._viewUI["view_player" + index].y + 50;
            let deep = this._viewUI.img_menu.parent.getChildIndex(this._viewUI.img_menu);
            if (!valueClip.parent) this._viewUI.box_view.addChildAt(valueClip, deep);
            valueClip.pos(posX, posY);
            this._clipList.push(valueClip);
            Laya.Tween.clearAll(valueClip);
            Laya.Tween.to(valueClip, { y: posY - 80 }, 1000);
        }

        //清理飘钱动画
        private clearClip(): void {
            if (this._clipList && this._clipList.length) {
                for (let i: number = 0; i < this._clipList.length; i++) {
                    let clip = this._clipList[i];
                    clip.removeSelf();
                    clip.destroy();
                    clip = null;
                }
            }
            this._clipList = [];
        }

        //清理金币
        private clearMoneyImg(): void {
            if (this._moneyImg.length > 0) {
                for (let i: number = 0; i < this._moneyImg.length; i++) {
                    let moneyImg: LImage = this._moneyImg[i];
                    moneyImg.removeSelf();
                }
            }
            this._moneyImg = [];
        }

        //充值弹框
        private onNotEnoughMoney(): void {
            if (!this._game.sceneObjectMgr.mainPlayer) return;
            if (this._game.sceneObjectMgr.mainPlayer.GetMoney() < ChipConfig[this._shisanshuiStory.mapLv][0] * 8) {
                TongyongPageDef.ins.alertRecharge(StringU.substitute("老板，您的金币少于{0}哦~\n补充点金币去大杀四方吧~", ChipConfig[this._shisanshuiStory.mapLv][0] * 8), () => {
                    this._game.uiRoot.general.open(DatingPageDef.PAGE_CHONGZHI);
                }, () => {
                }, false, PathGameTongyong.ui_tongyong_general + "btn_cz.png");
            }
        }

        //算下几个人了
        private getUnitCount() {
            let count: number = 0;
            let unitDic = this._game.sceneObjectMgr.unitDic;
            if (unitDic) {
                for (let key in unitDic) {
                    count++;
                }
            }
            return count;
        }

        get isCardRoomType() {
            return this._shisanshuiStory instanceof gamecomponent.story.StoryRoomCardBase;
        }

        //房卡模式，开始游戏
        private setCardGameStart() {
            let mainUnit: Unit = this._game.sceneObjectMgr.mainUnit;
            if (!mainUnit) return;
            let mapinfo: RshisanshuiMapInfo = this._game.sceneObjectMgr.mapInfo as RshisanshuiMapInfo;
            if (!mapinfo) return;
            if (mapinfo.GetPlayState()) return;
            if (mainUnit.GetRoomMaster() != 1) {
                TongyongPageDef.ins.alertRecharge(StringU.substitute("只有房主才可以选择开始游戏哦"), () => {
                }, () => {
                }, true, PathGameTongyong.ui_tongyong_general + "btn_qd.png");
                return;
            }
            this._shisanshuiMgr.totalUnitCount = this.getUnitCount();
            if (this._shisanshuiMgr.totalUnitCount < ShisanshuiMgr.MIN_CARD_SEATS_COUNT) {
                TongyongPageDef.ins.alertRecharge(StringU.substitute("老板，再等等嘛，需要两个人才可以开始"), () => {
                }, () => {
                }, true, PathGameTongyong.ui_tongyong_general + "btn_qd.png");
                return;
            }
            this._shisanshuiStory.startRoomCardGame(mainUnit.guid, this._mapInfo.GetCardRoomId());
        }

        // 房卡模式解散游戏,是否需要房主限制
        private masterDismissCardGame() {
            let mainUnit: Unit = this._game.sceneObjectMgr.mainUnit;
            if (!mainUnit) return;
            if (mainUnit.GetRoomMaster() != 1) {
                TongyongPageDef.ins.alertRecharge(StringU.substitute("只有房主才可以解散房间哦"), () => {
                }, () => {
                }, true, PathGameTongyong.ui_tongyong_general + "btn_qd.png");
            } else {
                if (!this._isGameEnd) {
                    TongyongPageDef.ins.alertRecharge("游戏未开始，解散房间不会扣除金币！\n是否解散房间？", () => {
                        this._shisanshuiStory.endRoomCardGame(mainUnit.GetIndex(), this._mapInfo.GetCardRoomId());
                        this._game.sceneObjectMgr.leaveStory(true);
                    }, null, false, PathGameTongyong.ui_tongyong_general + "btn_tx.png");
                }
            }
        }

        //重置数据
        private resetData(): void {
            //不是房卡模式，才会去设置
            if (!this.isCardRoomType) {
                this._battleIndex = -1;
            }
            this._shisanshuiMgr.isReLogin = false;
            this._shisanshuiStory && (this._shisanshuiStory.isReConnected = false);
            this._settleWinInfo = [];
            this._settleLoseInfo = [];
            this._totalVla = 0;
            this._daQiangInfo = [];
            this._touQiang = 0;
            this._zhongQiang = 0;
            this._weiQiang = 0;
            this._compareCount = 0;
            this._qldUnit = null;
            this._specialCardsInfo = [];
            this._playAniCount = 0;
            this._pointTemp = [];
            this._showCards = [];
            this._isPlayCard = false;
        }

        private clearMapInfoListen(): void {
            this._game.sceneObjectMgr.off(RshisanshuiMapInfo.EVENT_SSS_STATUS_CHECK, this, this.onUpdateMapState);
            this._game.sceneObjectMgr.off(RshisanshuiMapInfo.EVENT_SSS_BATTLE_CHECK, this, this.updateBattledInfo);
            this._game.sceneObjectMgr.off(RshisanshuiMapInfo.EVENT_SSS_COUNT_DOWN, this, this.updateCountDown);//倒计时更新
            this._game.sceneObjectMgr.off(SceneObjectMgr.EVENT_ADD_UNIT, this, this.onUnitAdd);
            this._game.sceneObjectMgr.off(SceneObjectMgr.EVENT_REMOVE_UNIT, this, this.onUnitRemove);
            this._game.sceneObjectMgr.off(SceneObjectMgr.EVENT_UNIT_MONEY_CHANGE, this, this.onUpdateUnit);
            this._game.sceneObjectMgr.off(SceneObjectMgr.EVENT_UNIT_CHANGE, this, this.onUpdateUnit);
            this._game.sceneObjectMgr.off(SceneObjectMgr.EVENT_UNIT_ACTION, this, this.onUpdateUnit);
            this._game.sceneObjectMgr.off(SceneObjectMgr.EVENT_MAPINFO_CHANGE, this, this.onUpdateMapInfo);
            this._game.sceneObjectMgr.off(SceneObjectMgr.EVENT_UNIT_QIFU_TIME_CHANGE, this, this.onUpdateUnit);
            this._game.sceneObjectMgr.off(SceneObjectMgr.EVENT_MAIN_UNIT_CHANGE, this, this.updateCardRoomDisplayInfo);
            this._game.network.removeHanlder(Protocols.SMSG_OPERATION_FAILED, this, this.onOptHandler);

            Laya.timer.clearAll(this);
            Laya.Tween.clearAll(this);
        }

        public close(): void {
            if (this._viewUI) {
                this._viewUI.btn_menu.off(LEvent.CLICK, this, this.onBtnClickWithTween);
                this._viewUI.btn_continue.off(LEvent.CLICK, this, this.onBtnClickWithTween);
                this._viewUI.btn_back.on(LEvent.CLICK, this, this.onBtnClickWithTween);
                this._viewUI.btn_cardtype.on(LEvent.CLICK, this, this.onBtnClickWithTween);
                this._viewUI.btn_qifu.on(LEvent.CLICK, this, this.onBtnClickWithTween);
                this._viewUI.btn_rules.on(LEvent.CLICK, this, this.onBtnClickWithTween);
                this._viewUI.btn_set.on(LEvent.CLICK, this, this.onBtnClickWithTween);
                this._viewUI.btn_record.on(LEvent.CLICK, this, this.onBtnClickWithTween);
                this._viewUI.btn_chongzhi.off(LEvent.CLICK, this, this.onBtnClickWithTween);
                this._viewUI.view_type.ani1.off(LEvent.COMPLETE, this, this.onPlayAniOver);

                this._game.sceneObjectMgr.off(RshisanshuiMapInfo.EVENT_SSS_STATUS_CHECK, this, this.onUpdateMapState);
                this._game.sceneObjectMgr.off(RshisanshuiMapInfo.EVENT_SSS_BATTLE_CHECK, this, this.updateBattledInfo);
                this._game.sceneObjectMgr.off(RshisanshuiMapInfo.EVENT_SSS_COUNT_DOWN, this, this.updateCountDown);//倒计时更新
                this._game.sceneObjectMgr.off(SceneObjectMgr.EVENT_ADD_UNIT, this, this.onUnitAdd);
                this._game.sceneObjectMgr.off(SceneObjectMgr.EVENT_REMOVE_UNIT, this, this.onUnitRemove);
                this._game.sceneObjectMgr.off(SceneObjectMgr.EVENT_UNIT_MONEY_CHANGE, this, this.onUpdateUnit);
                this._game.sceneObjectMgr.off(SceneObjectMgr.EVENT_UNIT_CHANGE, this, this.onUpdateUnit);
                this._game.sceneObjectMgr.off(SceneObjectMgr.EVENT_UNIT_ACTION, this, this.onUpdateUnit);
                this._game.sceneObjectMgr.off(SceneObjectMgr.EVENT_MAPINFO_CHANGE, this, this.onUpdateMapInfo);
                this._game.sceneObjectMgr.off(SceneObjectMgr.EVENT_UNIT_QIFU_TIME_CHANGE, this, this.onUpdateUnit);
                this._game.sceneObjectMgr.off(SceneObjectMgr.EVENT_MAIN_UNIT_CHANGE, this, this.updateCardRoomDisplayInfo);
                this._game.sceneObjectMgr.off(SceneObjectMgr.EVENT_OPRATE_SUCESS, this, this.onSucessHandler);
                this._game.qifuMgr.off(QiFuMgr.QIFU_FLY, this, this.qifuFly);
                this._game.network.removeHanlder(Protocols.SMSG_OPERATION_FAILED, this, this.onOptHandler);


                Laya.timer.clearAll(this);
                Laya.Tween.clearAll(this);
                this._mapInfo = null;
                this._game.stopMusic();
                this._game.stopAllSound();
                this.setCardRoomBtnEvent(false);
            }

            super.close();
        }
    }
}