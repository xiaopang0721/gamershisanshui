
module ui.nqp.game_ui.shisanshui.component {
    export class BaZiUI extends View {
		public ani1:Laya.FrameAnimation;

        public static  uiView:any ={"type":"View","props":{"width":280,"height":270},"child":[{"type":"Image","props":{"y":114,"x":117,"visible":false,"skin":"shisanshui_ui/game_ui/shisanshui/tu_zidan.png","anchorY":0.5,"anchorX":0.5},"compId":3},{"type":"Image","props":{"y":71,"x":147,"visible":false,"skin":"shisanshui_ui/game_ui/shisanshui/tu_zidan.png","scaleY":0.8,"scaleX":0.8,"anchorY":0.5,"anchorX":0.5},"compId":4},{"type":"Image","props":{"y":146,"x":188,"width":50,"visible":false,"skin":"shisanshui_ui/game_ui/shisanshui/tu_zidan.png","scaleY":0.95,"scaleX":0.95,"height":46,"anchorY":0.5,"anchorX":0.5},"compId":5},{"type":"Image","props":{"y":181,"x":133,"visible":false,"skin":"shisanshui_ui/game_ui/shisanshui/tu_zidan.png","anchorY":0.5,"anchorX":0.5},"compId":6}],"animations":[{"nodes":[{"target":4,"keyframes":{"visible":[{"value":false,"tweenMethod":"linearNone","tween":false,"target":4,"key":"visible","index":0},{"value":true,"tweenMethod":"linearNone","tween":false,"target":4,"key":"visible","index":3}]}},{"target":6,"keyframes":{"visible":[{"value":false,"tweenMethod":"linearNone","tween":false,"target":6,"key":"visible","index":0},{"value":true,"tweenMethod":"linearNone","tween":false,"target":6,"key":"visible","index":8}]}},{"target":3,"keyframes":{"visible":[{"value":false,"tweenMethod":"linearNone","tween":false,"target":3,"key":"visible","index":0},{"value":true,"tweenMethod":"linearNone","tween":false,"target":3,"key":"visible","index":13}]}},{"target":5,"keyframes":{"visible":[{"value":false,"tweenMethod":"linearNone","tween":false,"target":5,"key":"visible","index":0},{"value":true,"tweenMethod":"linearNone","tween":false,"target":5,"key":"visible","index":18}]}}],"name":"ani1","id":1,"frameRate":18,"action":0}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.nqp.game_ui.shisanshui.component.BaZiUI.uiView);
        }
    }
}

module ui.nqp.game_ui.shisanshui.component {
    export class JianYiPaiDuiZi1UI extends View {
		public btn_choose:Laya.Button;
		public img_choose:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":340,"height":43},"child":[{"type":"Button","props":{"y":0,"x":0,"var":"btn_choose","stateNum":1,"skin":"shisanshui_ui/game_ui/shisanshui/btn_dz.png","labelStroke":2,"labelSize":26,"labelPadding":"-6","labelFont":"Microsoft YaHei","labelColors":"#ffffff","label":"对子       对子       对子"}},{"type":"Image","props":{"y":-5,"x":0,"var":"img_choose","skin":"shisanshui_ui/game_ui/shisanshui/tu_xz.png","blendMode":"lighter"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.nqp.game_ui.shisanshui.component.JianYiPaiDuiZi1UI.uiView);
        }
    }
}

module ui.nqp.game_ui.shisanshui.component {
    export class PaiXingGuangUI extends View {
		public ani1:Laya.FrameAnimation;
		public view_guang:ui.nqp.game_ui.tongyong.GuangUI;
		public img_type1:Laya.Image;
		public img_type:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":548,"height":541},"child":[{"type":"Guang","props":{"y":240,"x":276,"var":"view_guang","blendMode":"lighter","anchorY":0.5,"anchorX":0.5,"runtime":"ui.nqp.game_ui.tongyong.GuangUI"},"compId":7},{"type":"Image","props":{"y":243,"x":199,"skin":"shisanshui_ui/game_ui/shisanshui/effect/paixing/tu_paixg.png","anchorY":1,"anchorX":1},"compId":5},{"type":"Image","props":{"y":243,"x":342,"skin":"shisanshui_ui/game_ui/shisanshui/effect/paixing/tu_paixg.png","scaleX":-1,"anchorY":1,"anchorX":1},"compId":6},{"type":"Image","props":{"y":149,"x":0,"skin":"shisanshui_ui/game_ui/shisanshui/effect/paixing/tu_paixd.png"}},{"type":"Image","props":{"y":270,"x":273,"var":"img_type1","skin":"shisanshui_ui/game_ui/shisanshui/effect/paixing/tu_paix21_1.png","anchorY":0.5,"anchorX":0.5},"compId":3},{"type":"Image","props":{"y":252,"x":274,"var":"img_type","skin":"shisanshui_ui/game_ui/shisanshui/effect/paixing/tu_paix21.png","anchorY":0.5,"anchorX":0.5},"compId":2}],"animations":[{"nodes":[{"target":6,"keyframes":{"scaleY":[{"value":0.5,"tweenMethod":"backOut","tween":true,"target":6,"key":"scaleY","index":0},{"value":1,"tweenMethod":"linearNone","tween":true,"target":6,"key":"scaleY","index":10}],"scaleX":[{"value":-0.5,"tweenMethod":"backOut","tween":true,"target":6,"key":"scaleX","index":0},{"value":-1,"tweenMethod":"linearNone","tween":true,"target":6,"key":"scaleX","index":10}]}},{"target":5,"keyframes":{"scaleY":[{"value":0.5,"tweenMethod":"backOut","tween":true,"target":5,"key":"scaleY","index":0},{"value":1,"tweenMethod":"linearNone","tween":true,"target":5,"key":"scaleY","index":10}],"scaleX":[{"value":0.5,"tweenMethod":"backOut","tween":true,"target":5,"key":"scaleX","index":0},{"value":1,"tweenMethod":"linearNone","tween":true,"target":5,"key":"scaleX","index":10}]}},{"target":2,"keyframes":{"var":[{"value":null,"tweenMethod":"linearNone","tween":false,"target":2,"key":"var","index":0},{"value":"","tweenMethod":"linearNone","tween":false,"target":2,"key":"var","index":80}],"scaleY":[{"value":2,"tweenMethod":"backOut","tween":true,"target":2,"key":"scaleY","index":0},{"value":1,"tweenMethod":"linearNone","tween":true,"target":2,"key":"scaleY","index":10}],"scaleX":[{"value":2,"tweenMethod":"backOut","tween":true,"target":2,"key":"scaleX","index":0},{"value":1,"tweenMethod":"linearNone","tween":true,"target":2,"key":"scaleX","index":10}]}},{"target":3,"keyframes":{"y":[{"value":290,"tweenMethod":"linearNone","tween":true,"target":3,"key":"y","index":0},{"value":270,"tweenMethod":"linearNone","tween":true,"target":3,"key":"y","index":10},{"value":290,"tweenMethod":"linearNone","tween":true,"target":3,"label":null,"key":"y","index":20},{"value":270,"tweenMethod":"linearNone","tween":true,"target":3,"label":null,"key":"y","index":30},{"value":290,"tweenMethod":"linearNone","tween":true,"target":3,"label":null,"key":"y","index":40},{"value":270,"tweenMethod":"linearNone","tween":true,"target":3,"label":null,"key":"y","index":50},{"value":290,"tweenMethod":"linearNone","tween":true,"target":3,"label":null,"key":"y","index":60},{"value":270,"tweenMethod":"linearNone","tween":true,"target":3,"label":null,"key":"y","index":70},{"value":290,"tweenMethod":"linearNone","tween":true,"target":3,"label":null,"key":"y","index":80}],"var":[{"value":null,"tweenMethod":"linearNone","tween":false,"target":3,"key":"var","index":0},{"value":"","tweenMethod":"linearNone","tween":false,"target":3,"key":"var","index":80}]}},{"target":7,"keyframes":{"var":[{"value":null,"tweenMethod":"linearNone","tween":false,"target":7,"key":"var","index":0},{"value":"","tweenMethod":"linearNone","tween":false,"target":7,"key":"var","index":80}]}}],"name":"ani1","id":1,"frameRate":30,"action":0}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ui.nqp.game_ui.tongyong.GuangUI",ui.nqp.game_ui.tongyong.GuangUI);

            super.createChildren();
            this.createView(ui.nqp.game_ui.shisanshui.component.PaiXingGuangUI.uiView);
        }
    }
}

module ui.nqp.game_ui.shisanshui.component {
    export class QiangUI extends View {
		public ani1:Laya.FrameAnimation;

        public static  uiView:any ={"type":"View","props":{"width":280,"height":270},"child":[{"type":"Image","props":{"y":134,"x":142,"skin":"shisanshui_ui/game_ui/shisanshui/tu_qiang3.png","anchorY":0.5,"anchorX":0.5},"compId":2}],"animations":[{"nodes":[{"target":2,"keyframes":{"y":[{"value":134,"tweenMethod":"linearNone","tween":true,"target":2,"key":"y","index":0},{"value":134,"tweenMethod":"linearNone","tween":true,"target":2,"label":null,"key":"y","index":5},{"value":134,"tweenMethod":"linearNone","tween":true,"target":2,"label":null,"key":"y","index":10},{"value":134,"tweenMethod":"linearNone","tween":true,"target":2,"label":null,"key":"y","index":15}],"skin":[{"value":"shisanshui_ui/game_ui/shisanshui/tu_qiang0.png","tweenMethod":"linearNone","tween":false,"target":2,"key":"skin","index":0},{"value":"shisanshui_ui/game_ui/shisanshui/tu_qiang1.png","tweenMethod":"linearNone","tween":false,"target":2,"key":"skin","index":1},{"value":"shisanshui_ui/game_ui/shisanshui/tu_qiang2.png","tweenMethod":"linearNone","tween":false,"target":2,"key":"skin","index":2},{"value":"shisanshui_ui/game_ui/shisanshui/tu_qiang3.png","tweenMethod":"linearNone","tween":false,"target":2,"key":"skin","index":3},{"value":"shisanshui_ui/game_ui/shisanshui/tu_qiang0.png","tweenMethod":"linearNone","tween":false,"target":2,"label":null,"key":"skin","index":5},{"value":"shisanshui_ui/game_ui/shisanshui/tu_qiang1.png","tweenMethod":"linearNone","tween":false,"target":2,"label":null,"key":"skin","index":6},{"value":"shisanshui_ui/game_ui/shisanshui/tu_qiang2.png","tweenMethod":"linearNone","tween":false,"target":2,"label":null,"key":"skin","index":7},{"value":"shisanshui_ui/game_ui/shisanshui/tu_qiang3.png","tweenMethod":"linearNone","tween":false,"target":2,"label":null,"key":"skin","index":8},{"value":"shisanshui_ui/game_ui/shisanshui/tu_qiang0.png","tweenMethod":"linearNone","tween":false,"target":2,"label":null,"key":"skin","index":10},{"value":"shisanshui_ui/game_ui/shisanshui/tu_qiang1.png","tweenMethod":"linearNone","tween":false,"target":2,"label":null,"key":"skin","index":11},{"value":"shisanshui_ui/game_ui/shisanshui/tu_qiang2.png","tweenMethod":"linearNone","tween":false,"target":2,"label":null,"key":"skin","index":12},{"value":"shisanshui_ui/game_ui/shisanshui/tu_qiang3.png","tweenMethod":"linearNone","tween":false,"target":2,"label":null,"key":"skin","index":13},{"value":"shisanshui_ui/game_ui/shisanshui/tu_qiang0.png","tweenMethod":"linearNone","tween":false,"target":2,"label":null,"key":"skin","index":15},{"value":"shisanshui_ui/game_ui/shisanshui/tu_qiang1.png","tweenMethod":"linearNone","tween":false,"target":2,"label":null,"key":"skin","index":16},{"value":"shisanshui_ui/game_ui/shisanshui/tu_qiang2.png","tweenMethod":"linearNone","tween":false,"target":2,"label":null,"key":"skin","index":17},{"value":"shisanshui_ui/game_ui/shisanshui/tu_qiang3.png","tweenMethod":"linearNone","tween":false,"target":2,"label":null,"key":"skin","index":18}]}}],"name":"ani1","id":1,"frameRate":18,"action":0}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.nqp.game_ui.shisanshui.component.QiangUI.uiView);
        }
    }
}

module ui.nqp.game_ui.shisanshui.component {
    export class ShiSanShuiDuiZiUI extends View {

        public static  uiView:any ={"type":"View","props":{"width":111,"height":55},"child":[{"type":"Button","props":{"y":0,"x":0,"stateNum":1,"skin":"shisanshui_ui/game_ui/shisanshui/btn_dz1.png","labelStroke":2,"labelSize":26,"labelPadding":"-6","labelFont":"Microsoft YaHei","labelColors":"#ffffff","label":"对子"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.nqp.game_ui.shisanshui.component.ShiSanShuiDuiZiUI.uiView);
        }
    }
}

module ui.nqp.game_ui.shisanshui.component {
    export class TouDunUI extends View {
		public lab_pos:Laya.Label;
		public lab_val:Laya.Label;
		public lab_num:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":216,"height":36},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"shisanshui_ui/game_ui/shisanshui/tu_dk.png"}},{"type":"Label","props":{"y":6,"x":10,"var":"lab_pos","text":"头墩","fontSize":22,"color":"#00ff12"}},{"type":"Label","props":{"y":6,"x":83,"width":48,"var":"lab_val","text":"0","height":22,"fontSize":22,"color":"#00ff12","align":"center"}},{"type":"Label","props":{"y":6,"x":142,"var":"lab_num","text":"（0）","fontSize":22,"color":"#00ffcc","align":"center"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.nqp.game_ui.shisanshui.component.TouDunUI.uiView);
        }
    }
}

module ui.nqp.game_ui.shisanshui.component {
    export class TouXiangUI extends View {
		public img_icon:Laya.Image;
		public img_txk:Laya.Image;
		public txt_name:laya.display.Text;
		public txt_money:laya.display.Text;
		public img_qifu:Laya.Image;
		public qifu_type:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":100,"height":137},"child":[{"type":"Box","props":{"y":1,"x":1,"width":99,"height":136},"child":[{"type":"Image","props":{"y":-7,"x":-5,"skin":"tongyong_ui/game_ui/tongyong/general/tu_txk1.png"}},{"type":"Image","props":{"y":64,"x":49,"var":"img_icon","skin":"tongyong_ui/game_ui/tongyong/touxiang/head_0.png","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":14,"x":2,"var":"img_txk","skin":"tongyong_ui/game_ui/tongyong/touxiang/tu_v1.png","scaleY":0.95,"scaleX":0.95}},{"type":"Text","props":{"y":4,"x":-2,"wordWrap":true,"width":101,"var":"txt_name","text":"玩家名字","leading":6,"height":17,"fontSize":16,"color":"#efda8b","align":"center"}},{"type":"Text","props":{"y":109,"x":-7,"wordWrap":true,"width":110,"var":"txt_money","text":"0","leading":6,"height":22,"fontSize":20,"color":"#efda8b","align":"center"}},{"type":"Image","props":{"y":21,"x":69,"visible":false,"var":"img_qifu","skin":"tongyong_ui/game_ui/tongyong/touxiang/tu_qf.png"}},{"type":"Image","props":{"y":105,"x":50,"visible":false,"var":"qifu_type","skin":"tongyong_ui/game_ui/tongyong/qifu/f_cs2.png","scaleY":0.5,"scaleX":0.5,"anchorY":1,"anchorX":0.5}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.createView(ui.nqp.game_ui.shisanshui.component.TouXiangUI.uiView);
        }
    }
}

module ui.nqp.game_ui.shisanshui.component {
    export class ZuPaiTiaoDongUI extends View {
		public ani1:Laya.FrameAnimation;

        public static  uiView:any ={"type":"View","props":{"width":347,"height":42},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"shisanshui_ui/game_ui/shisanshui/tu_zpd.png"}},{"type":"Image","props":{"y":20,"x":118,"skin":"shisanshui_ui/game_ui/shisanshui/tu_zp0.png","anchorY":0.5,"anchorX":0.5,"alpha":1},"compId":4},{"type":"Image","props":{"y":20,"x":156,"skin":"shisanshui_ui/game_ui/shisanshui/tu_zp1.png","anchorY":0.5,"anchorX":0.5,"alpha":1},"compId":5},{"type":"Image","props":{"y":20,"x":194,"skin":"shisanshui_ui/game_ui/shisanshui/tu_zp2.png","anchorY":0.5,"anchorX":0.5,"alpha":1},"compId":6},{"type":"Image","props":{"y":20,"x":232,"skin":"shisanshui_ui/game_ui/shisanshui/tu_zp3.png","anchorY":0.5,"anchorX":0.5,"alpha":1},"compId":7}],"animations":[{"nodes":[{"target":4,"keyframes":{"y":[{"value":20,"tweenMethod":"linearNone","tween":true,"target":4,"key":"y","index":0},{"value":0,"tweenMethod":"linearNone","tween":true,"target":4,"key":"y","index":5},{"value":20,"tweenMethod":"linearNone","tween":true,"target":4,"key":"y","index":10}],"alpha":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":4,"key":"alpha","index":0}]}},{"target":5,"keyframes":{"y":[{"value":20,"tweenMethod":"linearNone","tween":true,"target":5,"key":"y","index":0},{"value":0,"tweenMethod":"linearNone","tween":true,"target":5,"key":"y","index":10},{"value":20,"tweenMethod":"linearNone","tween":true,"target":5,"key":"y","index":15}],"alpha":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":5,"key":"alpha","index":0},{"value":1,"tweenMethod":"linearNone","tween":true,"target":5,"key":"alpha","index":10}]}},{"target":6,"keyframes":{"y":[{"value":20,"tweenMethod":"linearNone","tween":true,"target":6,"key":"y","index":0},{"value":0,"tweenMethod":"linearNone","tween":true,"target":6,"key":"y","index":15},{"value":20,"tweenMethod":"linearNone","tween":true,"target":6,"key":"y","index":20}],"alpha":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":6,"key":"alpha","index":0},{"value":1,"tweenMethod":"linearNone","tween":true,"target":6,"key":"alpha","index":15}]}},{"target":7,"keyframes":{"y":[{"value":20,"tweenMethod":"linearNone","tween":true,"target":7,"key":"y","index":0},{"value":0,"tweenMethod":"linearNone","tween":true,"target":7,"key":"y","index":20},{"value":20,"tweenMethod":"linearNone","tween":true,"target":7,"key":"y","index":25}],"alpha":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":7,"key":"alpha","index":0},{"value":1,"tweenMethod":"linearNone","tween":true,"target":7,"key":"alpha","index":20}]}}],"name":"ani1","id":1,"frameRate":24,"action":0}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.nqp.game_ui.shisanshui.component.ZuPaiTiaoDongUI.uiView);
        }
    }
}

module ui.nqp.game_ui.shisanshui {
    export class JieSuan_FangKaUI extends View {
		public ani2:Laya.FrameAnimation;
		public lab_xinxi:Laya.Label;
		public list_settle:Laya.List;
		public btn_create_room:Laya.Button;
		public btn_back_hud:Laya.Button;

        public static  uiView:any ={"type":"View","props":{},"child":[{"type":"Box","props":{"width":925,"height":644,"centerY":0,"centerX":0,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":145,"x":458,"skin":"tongyong_ui/game_ui/tongyong/general/tu_gs.png","rotation":360,"blendMode":"lighter","anchorY":0.5,"anchorX":0.5},"compId":44},{"type":"Image","props":{"y":342,"x":463,"width":928,"skin":"tongyong_ui/game_ui/tongyong/general/tu_bk1.png","sizeGrid":"89,49,71,39","height":454,"centerY":20,"centerX":0,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":64,"x":463,"skin":"tongyong_ui/game_ui/tongyong/general/jiesuan_sl2.png","centerY":-258,"centerX":0,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":74,"x":463,"skin":"tongyong_ui/game_ui/tongyong/general/jiesuan_js.png","centerY":-248,"centerX":0,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":103,"x":448,"skin":"tongyong_ui/game_ui/tongyong/general/jiesuan_2.png","blendMode":"lighter","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":183,"x":-25,"width":967,"skin":"tongyong_ui/game_ui/tongyong/general/jiesuan_d1.png","sizeGrid":"9,95,9,76","height":38}},{"type":"Label","props":{"y":528,"x":466,"wordWrap":true,"width":495,"var":"lab_xinxi","text":"5S后开始第1局，本轮共5局","leading":6,"height":23,"fontSize":20,"color":"#ffff96","anchorY":0.5,"anchorX":0.5,"align":"center"}},{"type":"Label","props":{"y":205,"x":99,"wordWrap":true,"width":63,"text":"昵称","leading":6,"height":23,"fontSize":18,"color":"#1f2530","anchorY":0.5,"anchorX":0.5,"align":"center"}},{"type":"Label","props":{"y":205,"x":398,"wordWrap":true,"width":63,"text":"手牌","leading":6,"height":23,"fontSize":18,"color":"#1f2530","anchorY":0.5,"anchorX":0.5,"align":"center"}},{"type":"Label","props":{"y":205,"x":731,"wordWrap":true,"width":63,"text":"积分","leading":6,"height":23,"fontSize":18,"color":"#1f2530","anchorY":0.5,"anchorX":0.5,"align":"center"}},{"type":"Label","props":{"y":205,"x":835,"wordWrap":true,"width":84,"text":"累计积分","leading":6,"height":23,"fontSize":18,"color":"#1f2530","anchorY":0.5,"anchorX":0.5,"align":"center"}},{"type":"List","props":{"y":228,"x":10,"width":897,"var":"list_settle","spaceY":4,"repeatY":4,"height":280},"child":[{"type":"JieSuanRender3","props":{"renderType":"render","runtime":"ui.nqp.game_ui.tongyong.JieSuanRender3UI"}}]},{"type":"Button","props":{"y":613,"x":318,"width":200,"visible":false,"var":"btn_create_room","stateNum":1,"skin":"tongyong_ui/game_ui/tongyong/general/btn_2.png","sizeGrid":"0,20,0,20","labelStrokeColor":"#9d4725","labelStroke":2,"labelSize":26,"labelPadding":"-2","labelColors":"#ffffff","labelBold":true,"label":"创建房间","anchorY":0.5,"anchorX":0.5}},{"type":"Button","props":{"y":613,"x":608,"width":200,"visible":false,"var":"btn_back_hud","stateNum":1,"skin":"tongyong_ui/game_ui/tongyong/general/btn_3.png","sizeGrid":"0,20,0,20","labelStrokeColor":"#397119","labelStroke":2,"labelSize":26,"labelPadding":"-2","labelColors":"#ffffff","labelBold":true,"label":"返回大厅","anchorY":0.5,"anchorX":0.5}}]}],"animations":[{"nodes":[{"target":44,"keyframes":{"rotation":[{"value":0,"tweenMethod":"linearNone","tween":true,"target":44,"key":"rotation","index":0},{"value":360,"tweenMethod":"linearNone","tween":true,"target":44,"key":"rotation","index":100}]}}],"name":"ani2","id":2,"frameRate":24,"action":2}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ui.nqp.game_ui.tongyong.JieSuanRender3UI",ui.nqp.game_ui.tongyong.JieSuanRender3UI);

            super.createChildren();
            this.createView(ui.nqp.game_ui.shisanshui.JieSuan_FangKaUI.uiView);
        }
    }
}

module ui.nqp.game_ui.shisanshui {
    export class PaiXingTiShiUI extends View {
		public btn_play:Laya.Button;
		public box_toudun:Laya.Box;
		public img_card_0_0:Laya.Image;
		public img_card_0_1:Laya.Image;
		public img_card_0_3:Laya.Image;
		public box_zhongdun:Laya.Box;
		public img_card_1_0:Laya.Image;
		public img_card_1_1:Laya.Image;
		public img_card_1_2:Laya.Image;
		public img_card_1_3:Laya.Image;
		public img_card_1_4:Laya.Image;
		public box_weidun:Laya.Box;
		public img_card_2_0:Laya.Image;
		public img_card_2_1:Laya.Image;
		public img_card_2_2:Laya.Image;
		public img_card_2_3:Laya.Image;
		public img_card_2_4:Laya.Image;
		public btn_reset0:Laya.Button;
		public btn_reset1:Laya.Button;
		public btn_reset2:Laya.Button;
		public btn_type0:Laya.Button;
		public btn_type1:Laya.Button;
		public btn_type2:Laya.Button;
		public btn_type3:Laya.Button;
		public btn_type4:Laya.Button;
		public btn_type5:Laya.Button;
		public btn_type6:Laya.Button;
		public btn_type7:Laya.Button;
		public view_type0:ui.nqp.game_ui.shisanshui.component.JianYiPaiDuiZi1UI;
		public view_type1:ui.nqp.game_ui.shisanshui.component.JianYiPaiDuiZi1UI;
		public view_type2:ui.nqp.game_ui.shisanshui.component.JianYiPaiDuiZi1UI;
		public view_type3:ui.nqp.game_ui.shisanshui.component.JianYiPaiDuiZi1UI;
		public view_type4:ui.nqp.game_ui.shisanshui.component.JianYiPaiDuiZi1UI;
		public img_time:ui.nqp.game_ui.tongyong.DaoJiShiUI;

        public static  uiView:any ={"type":"View","props":{"y":360,"x":640,"width":1280,"height":720,"centerY":0,"centerX":0,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Box","props":{"y":360,"x":640,"width":1280,"height":720,"centerY":0,"centerX":0,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Box","props":{"y":35,"x":163},"child":[{"type":"Image","props":{"y":0,"x":1,"skin":"shisanshui_ui/game_ui/shisanshui/tu_bk1.png"}},{"type":"Image","props":{"y":0,"x":933,"skin":"shisanshui_ui/game_ui/shisanshui/tu_bk1.png","scaleX":-1}}]},{"type":"Box","props":{"y":121,"x":158},"child":[{"type":"Box","props":{"y":-9.799999999999997,"x":25},"child":[{"type":"Image","props":{"y":41,"skin":"shisanshui_ui/game_ui/shisanshui/tu-td.png"}},{"type":"Image","props":{"y":142,"skin":"shisanshui_ui/game_ui/shisanshui/tu_zd.png"}},{"type":"Image","props":{"y":262,"skin":"shisanshui_ui/game_ui/shisanshui/tu_wd.png"}},{"type":"Image","props":{"x":87,"width":397,"skin":"shisanshui_ui/game_ui/shisanshui/tu_rxd.png","sizeGrid":"224,122,44,114","height":357}},{"type":"Image","props":{"y":2,"x":564,"width":333,"skin":"shisanshui_ui/game_ui/shisanshui/tu_jypd.png","sizeGrid":"39,40,37,38","height":296}},{"type":"Image","props":{"y":-48,"x":149,"skin":"shisanshui_ui/game_ui/shisanshui/tu_rx.png"}},{"type":"Image","props":{"y":-49,"x":644,"skin":"shisanshui_ui/game_ui/shisanshui/tu_jy.png"}}]},{"type":"Button","props":{"y":294.2,"x":677,"var":"btn_play","stateNum":1,"skin":"shisanshui_ui/game_ui/shisanshui/btn_cp.png","labelStrokeColor":"#9d8c27","labelStroke":2,"labelSize":26,"labelPadding":"-5","labelFont":"Microsoft YaHei","labelColors":"#ffffff","label":"出  牌"}},{"type":"Box","props":{"y":0.20000000000000284,"x":211,"var":"box_toudun"},"child":[{"type":"Image","props":{"var":"img_card_0_0","skin":"shisanshui_ui/game_ui/shisanshui/tu_pd.png"}},{"type":"Image","props":{"x":50,"var":"img_card_0_1","skin":"shisanshui_ui/game_ui/shisanshui/tu_pd.png"}},{"type":"Image","props":{"x":98,"var":"img_card_0_3","skin":"shisanshui_ui/game_ui/shisanshui/tu_pd.png"}}]},{"type":"Box","props":{"y":100.2,"x":161,"var":"box_zhongdun"},"child":[{"type":"Image","props":{"var":"img_card_1_0","skin":"shisanshui_ui/game_ui/shisanshui/tu_pd.png"}},{"type":"Image","props":{"x":50,"var":"img_card_1_1","skin":"shisanshui_ui/game_ui/shisanshui/tu_pd.png"}},{"type":"Image","props":{"x":100,"var":"img_card_1_2","skin":"shisanshui_ui/game_ui/shisanshui/tu_pd.png"}},{"type":"Image","props":{"x":150,"var":"img_card_1_3","skin":"shisanshui_ui/game_ui/shisanshui/tu_pd.png"}},{"type":"Image","props":{"x":199,"var":"img_card_1_4","skin":"shisanshui_ui/game_ui/shisanshui/tu_pd.png"}}]},{"type":"Box","props":{"y":198.2,"x":121,"var":"box_weidun"},"child":[{"type":"Image","props":{"var":"img_card_2_0","skin":"shisanshui_ui/game_ui/shisanshui/tu_pd.png"}},{"type":"Image","props":{"x":70,"var":"img_card_2_1","skin":"shisanshui_ui/game_ui/shisanshui/tu_pd.png"}},{"type":"Image","props":{"x":140,"var":"img_card_2_2","skin":"shisanshui_ui/game_ui/shisanshui/tu_pd.png"}},{"type":"Image","props":{"x":210,"var":"img_card_2_3","skin":"shisanshui_ui/game_ui/shisanshui/tu_pd.png"}},{"type":"Image","props":{"x":280,"var":"img_card_2_4","skin":"shisanshui_ui/game_ui/shisanshui/tu_pd.png"}}]},{"type":"Button","props":{"y":23.200000000000003,"x":444,"var":"btn_reset0","stateNum":1,"skin":"tongyong_ui/game_ui/tongyong/hud/btn_gb.png","scaleY":0.8,"scaleX":0.8,"anchorY":0.5,"anchorX":0.5}},{"type":"Button","props":{"y":123.2,"x":494,"var":"btn_reset1","stateNum":1,"skin":"tongyong_ui/game_ui/tongyong/hud/btn_gb.png","scaleY":0.8,"scaleX":0.8,"anchorY":0.5,"anchorX":0.5}},{"type":"Button","props":{"y":219.2,"x":537,"var":"btn_reset2","stateNum":1,"skin":"tongyong_ui/game_ui/tongyong/hud/btn_gb.png","scaleY":0.8,"scaleX":0.8,"anchorY":0.5,"anchorX":0.5}},{"type":"Button","props":{"y":377.2,"x":0,"var":"btn_type0","stateNum":1,"skin":"shisanshui_ui/game_ui/shisanshui/btn_dz1.png","labelStroke":2,"labelSize":26,"labelPadding":"-6","labelFont":"Microsoft YaHei","labelColors":"#ffffff","label":"对子"}},{"type":"Button","props":{"y":377.2,"x":118,"var":"btn_type1","stateNum":1,"skin":"shisanshui_ui/game_ui/shisanshui/btn_dz1.png","labelStroke":2,"labelSize":26,"labelPadding":"-6","labelFont":"Microsoft YaHei","labelColors":"#ffffff","label":"两对"}},{"type":"Button","props":{"y":377.2,"x":236,"var":"btn_type2","stateNum":1,"skin":"shisanshui_ui/game_ui/shisanshui/btn_dz1.png","labelStroke":2,"labelSize":26,"labelPadding":"-6","labelFont":"Microsoft YaHei","labelColors":"#ffffff","label":"三条"}},{"type":"Button","props":{"y":377.2,"x":354,"var":"btn_type3","stateNum":1,"skin":"shisanshui_ui/game_ui/shisanshui/btn_dz1.png","labelStroke":2,"labelSize":26,"labelPadding":"-6","labelFont":"Microsoft YaHei","labelColors":"#ffffff","label":"顺子"}},{"type":"Button","props":{"y":377.2,"x":472,"var":"btn_type4","stateNum":1,"skin":"shisanshui_ui/game_ui/shisanshui/btn_dz1.png","labelStroke":2,"labelSize":26,"labelPadding":"-6","labelFont":"Microsoft YaHei","labelColors":"#ffffff","label":"同花"}},{"type":"Button","props":{"y":377.2,"x":590,"var":"btn_type5","stateNum":1,"skin":"shisanshui_ui/game_ui/shisanshui/btn_dz1.png","labelStroke":2,"labelSize":26,"labelPadding":"-6","labelFont":"Microsoft YaHei","labelColors":"#ffffff","label":"葫芦"}},{"type":"Button","props":{"y":377.2,"x":708,"var":"btn_type6","stateNum":1,"skin":"shisanshui_ui/game_ui/shisanshui/btn_dz1.png","labelStroke":2,"labelSize":26,"labelPadding":"-6","labelFont":"Microsoft YaHei","labelColors":"#ffffff","label":"铁支"}},{"type":"Button","props":{"y":377.2,"x":826,"var":"btn_type7","stateNum":1,"skin":"shisanshui_ui/game_ui/shisanshui/btn_dz1.png","labelStroke":2,"labelSize":26,"labelPadding":"-6","labelFont":"Microsoft YaHei","labelColors":"#ffffff","label":"同花顺"}},{"type":"JianYiPaiDuiZi1","props":{"y":5,"x":586,"var":"view_type0","runtime":"ui.nqp.game_ui.shisanshui.component.JianYiPaiDuiZi1UI"}},{"type":"JianYiPaiDuiZi1","props":{"y":62,"x":586,"var":"view_type1","runtime":"ui.nqp.game_ui.shisanshui.component.JianYiPaiDuiZi1UI"}},{"type":"JianYiPaiDuiZi1","props":{"y":119,"x":586,"var":"view_type2","runtime":"ui.nqp.game_ui.shisanshui.component.JianYiPaiDuiZi1UI"}},{"type":"JianYiPaiDuiZi1","props":{"y":176,"x":586,"var":"view_type3","runtime":"ui.nqp.game_ui.shisanshui.component.JianYiPaiDuiZi1UI"}},{"type":"JianYiPaiDuiZi1","props":{"y":233,"x":586,"var":"view_type4","runtime":"ui.nqp.game_ui.shisanshui.component.JianYiPaiDuiZi1UI"}}]},{"type":"DaoJiShi","props":{"y":38,"x":605,"var":"img_time","runtime":"ui.nqp.game_ui.tongyong.DaoJiShiUI"}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ui.nqp.game_ui.shisanshui.component.JianYiPaiDuiZi1UI",ui.nqp.game_ui.shisanshui.component.JianYiPaiDuiZi1UI);
			View.regComponent("ui.nqp.game_ui.tongyong.DaoJiShiUI",ui.nqp.game_ui.tongyong.DaoJiShiUI);

            super.createChildren();
            this.createView(ui.nqp.game_ui.shisanshui.PaiXingTiShiUI.uiView);
        }
    }
}

module ui.nqp.game_ui.shisanshui {
    export class QuanLeiDaUI extends View {
		public ani1:Laya.FrameAnimation;

        public static  uiView:any ={"type":"View","props":{"width":1280,"height":720},"child":[{"type":"Image","props":{"x":640,"width":1280,"skin":"shisanshui_ui/game_ui/shisanshui/tu_qld4.png","height":337,"centerY":0,"centerX":0,"anchorY":0.5,"anchorX":0.5},"compId":2},{"type":"Image","props":{"y":223,"x":362,"visible":true,"skin":"shisanshui_ui/game_ui/shisanshui/tu_qld3.png","anchorY":0.5,"anchorX":0.5},"compId":5},{"type":"Image","props":{"y":391,"x":938,"visible":true,"skin":"shisanshui_ui/game_ui/shisanshui/tu_qld1.png","rotation":11,"anchorY":0.5,"anchorX":0.5},"compId":6},{"type":"Image","props":{"y":347,"visible":true,"skin":"shisanshui_ui/game_ui/shisanshui/tu_qld2.png","scaleY":1,"scaleX":1,"centerX":0,"anchorY":0.5,"anchorX":0.5},"compId":3},{"type":"Image","props":{"y":185,"x":385,"width":165,"visible":true,"skin":"shisanshui_ui/game_ui/shisanshui/tu_qld0.png","scaleY":1,"scaleX":1,"pivotY":67,"pivotX":84,"height":170},"compId":4}],"animations":[{"nodes":[{"target":2,"keyframes":{"x":[{"value":640,"tweenMethod":"linearNone","tween":true,"target":2,"key":"x","index":0},{"value":640,"tweenMethod":"linearNone","tween":true,"target":2,"key":"x","index":13}],"width":[{"value":1800,"tweenMethod":"linearNone","tween":true,"target":2,"key":"width","index":0},{"value":1280,"tweenMethod":"linearNone","tween":true,"target":2,"key":"width","index":5}],"visible":[{"value":true,"tweenMethod":"linearNone","tween":false,"target":2,"key":"visible","index":0},{"value":true,"tweenMethod":"linearNone","tween":false,"target":2,"key":"visible","index":45}],"height":[{"value":10,"tweenMethod":"linearNone","tween":true,"target":2,"key":"height","index":0},{"value":337,"tweenMethod":"linearNone","tween":true,"target":2,"key":"height","index":5}]}},{"target":3,"keyframes":{"y":[{"value":446,"tweenMethod":"linearNone","tween":true,"target":3,"key":"y","index":0},{"value":366,"tweenMethod":"backOut","tween":true,"target":3,"key":"y","index":15},{"value":347,"tweenMethod":"linearNone","tween":true,"target":3,"key":"y","index":25},{"value":347,"tweenMethod":"linearNone","tween":true,"target":3,"key":"y","index":35}],"visible":[{"value":false,"tweenMethod":"linearNone","tween":false,"target":3,"key":"visible","index":0},{"value":true,"tweenMethod":"linearNone","tween":false,"target":3,"key":"visible","index":15}],"scaleY":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":3,"key":"scaleY","index":0},{"value":2,"tweenMethod":"backOut","tween":true,"target":3,"key":"scaleY","index":15},{"value":1,"tweenMethod":"linearNone","tween":true,"target":3,"key":"scaleY","index":25}],"scaleX":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":3,"key":"scaleX","index":0},{"value":2,"tweenMethod":"backOut","tween":true,"target":3,"key":"scaleX","index":15},{"value":1,"tweenMethod":"linearNone","tween":true,"target":3,"key":"scaleX","index":25}]}},{"target":5,"keyframes":{"y":[{"value":286,"tweenMethod":"linearNone","tween":true,"target":5,"key":"y","index":0},{"value":213,"tweenMethod":"linearNone","tween":true,"target":5,"key":"y","index":5},{"value":213,"tweenMethod":"linearNone","tween":true,"target":5,"key":"y","index":20},{"value":213,"tweenMethod":"linearNone","tween":true,"target":5,"key":"y","index":24},{"value":213,"tweenMethod":"linearNone","tween":true,"target":5,"key":"y","index":27},{"value":223,"tweenMethod":"linearNone","tween":true,"target":5,"key":"y","index":35}],"x":[{"value":372,"tweenMethod":"linearNone","tween":true,"target":5,"key":"x","index":0},{"value":1486,"tweenMethod":"linearNone","tween":true,"target":5,"key":"x","index":5},{"value":372,"tweenMethod":"linearNone","tween":true,"target":5,"key":"x","index":13},{"value":442,"tweenMethod":"linearNone","tween":true,"target":5,"key":"x","index":22},{"value":538.25,"tweenMethod":"linearNone","tween":true,"target":5,"key":"x","index":24},{"value":422,"tweenMethod":"linearNone","tween":true,"target":5,"key":"x","index":27},{"value":362,"tweenMethod":"linearNone","tween":true,"target":5,"key":"x","index":35}],"visible":[{"value":false,"tweenMethod":"linearNone","tween":false,"target":5,"key":"visible","index":0},{"value":true,"tweenMethod":"linearNone","tween":false,"target":5,"key":"visible","index":5}]}},{"target":4,"keyframes":{"y":[{"value":251,"tweenMethod":"linearNone","tween":true,"target":4,"key":"y","index":0},{"value":578,"tweenMethod":"linearNone","tween":true,"target":4,"key":"y","index":13},{"value":224,"tweenMethod":"linearNone","tween":true,"target":4,"key":"y","index":20},{"value":175,"tweenMethod":"linearNone","tween":true,"target":4,"key":"y","index":24},{"value":175,"tweenMethod":"linearNone","tween":true,"target":4,"key":"y","index":27},{"value":203,"tweenMethod":"linearNone","tween":true,"target":4,"key":"y","index":35}],"x":[{"value":624,"tweenMethod":"linearNone","tween":true,"target":4,"key":"x","index":0},{"value":-279,"tweenMethod":"linearNone","tween":true,"target":4,"key":"x","index":13},{"value":794,"tweenMethod":"linearNone","tween":true,"target":4,"key":"x","index":20},{"value":575,"tweenMethod":"linearNone","tween":true,"target":4,"key":"x","index":24},{"value":445,"tweenMethod":"linearNone","tween":true,"target":4,"key":"x","index":27},{"value":646,"tweenMethod":"linearNone","tween":true,"target":4,"key":"x","index":35}],"visible":[{"value":false,"tweenMethod":"linearNone","tween":false,"target":4,"key":"visible","index":0},{"value":true,"tweenMethod":"linearNone","tween":false,"target":4,"key":"visible","index":13},{"value":true,"tweenMethod":"linearNone","tween":false,"target":4,"key":"visible","index":20}],"scaleY":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":4,"key":"scaleY","index":0},{"value":3,"tweenMethod":"linearNone","tween":true,"target":4,"key":"scaleY","index":13},{"value":1,"tweenMethod":"linearNone","tween":true,"target":4,"key":"scaleY","index":20}],"scaleX":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":4,"key":"scaleX","index":0},{"value":3,"tweenMethod":"linearNone","tween":true,"target":4,"key":"scaleX","index":13},{"value":1,"tweenMethod":"linearNone","tween":true,"target":4,"key":"scaleX","index":20}]}},{"target":6,"keyframes":{"y":[{"value":310,"tweenMethod":"linearNone","tween":true,"target":6,"key":"y","index":0},{"value":391,"tweenMethod":"linearNone","tween":true,"target":6,"key":"y","index":5}],"x":[{"value":938,"tweenMethod":"linearNone","tween":true,"target":6,"key":"x","index":0},{"value":-102,"tweenMethod":"linearNone","tween":true,"target":6,"key":"x","index":5},{"value":938,"tweenMethod":"linearNone","tween":true,"target":6,"key":"x","index":13},{"value":938,"tweenMethod":"linearNone","tween":true,"target":6,"label":null,"key":"x","index":17}],"visible":[{"value":false,"tweenMethod":"linearNone","tween":false,"target":6,"key":"visible","index":0},{"value":true,"tweenMethod":"linearNone","tween":false,"target":6,"key":"visible","index":5}],"rotation":[{"value":-29,"tweenMethod":"linearNone","tween":true,"target":6,"key":"rotation","index":0},{"value":20,"tweenMethod":"linearNone","tween":true,"target":6,"key":"rotation","index":5},{"value":28,"tweenMethod":"linearNone","tween":true,"target":6,"key":"rotation","index":13},{"value":42,"tweenMethod":"linearNone","tween":true,"target":6,"key":"rotation","index":15},{"value":28,"tweenMethod":"linearNone","tween":true,"target":6,"label":null,"key":"rotation","index":17},{"value":-21,"tweenMethod":"linearNone","tween":true,"target":6,"key":"rotation","index":20},{"value":22,"tweenMethod":"linearNone","tween":true,"target":6,"key":"rotation","index":27},{"value":11,"tweenMethod":"linearNone","tween":true,"target":6,"key":"rotation","index":35}]}}],"name":"ani1","id":1,"frameRate":24,"action":1}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.nqp.game_ui.shisanshui.QuanLeiDaUI.uiView);
        }
    }
}

module ui.nqp.game_ui.shisanshui {
    export class ShiSanShuiUI extends View {
		public box_view:Laya.Box;
		public view_player2:ui.nqp.game_ui.shisanshui.component.TouXiangUI;
		public view_player1:ui.nqp.game_ui.shisanshui.component.TouXiangUI;
		public view_player3:ui.nqp.game_ui.shisanshui.component.TouXiangUI;
		public view_player0:ui.nqp.game_ui.shisanshui.component.TouXiangUI;
		public box_card2:Laya.Box;
		public img_type_2_0:Laya.Image;
		public img_type_2_1:Laya.Image;
		public img_type_2_2:Laya.Image;
		public box_card3:Laya.Box;
		public img_type_3_0:Laya.Image;
		public img_type_3_1:Laya.Image;
		public img_type_3_2:Laya.Image;
		public box_card0:Laya.Box;
		public img_type_0_0:Laya.Image;
		public img_type_0_1:Laya.Image;
		public img_type_0_2:Laya.Image;
		public box_card1:Laya.Box;
		public img_type_1_0:Laya.Image;
		public img_type_1_1:Laya.Image;
		public img_type_1_2:Laya.Image;
		public box_settle:Laya.Box;
		public view_settle0:ui.nqp.game_ui.shisanshui.component.TouDunUI;
		public view_settle1:ui.nqp.game_ui.shisanshui.component.TouDunUI;
		public view_settle3:ui.nqp.game_ui.shisanshui.component.TouDunUI;
		public view_settle2:ui.nqp.game_ui.shisanshui.component.TouDunUI;
		public text_info:Laya.Label;
		public text_roomtype:Laya.Label;
		public text_cardroomid:Laya.Label;
		public text_round:Laya.Label;
		public box_show0:Laya.Box;
		public view_show0:ui.nqp.game_ui.shisanshui.component.ZuPaiTiaoDongUI;
		public box_show2:Laya.Box;
		public view_show2:ui.nqp.game_ui.shisanshui.component.ZuPaiTiaoDongUI;
		public box_show3:Laya.Box;
		public view_show3:ui.nqp.game_ui.shisanshui.component.ZuPaiTiaoDongUI;
		public box_show1:Laya.Box;
		public view_show1:ui.nqp.game_ui.shisanshui.component.ZuPaiTiaoDongUI;
		public btn_continue:Laya.Button;
		public img_time:ui.nqp.game_ui.tongyong.DaoJiShiUI;
		public view_bazi:ui.nqp.game_ui.shisanshui.component.BaZiUI;
		public view_qiang:ui.nqp.game_ui.shisanshui.component.QiangUI;
		public view_type:ui.nqp.game_ui.shisanshui.component.PaiXingGuangUI;
		public vw_card:ui.nqp.game_ui.tongyong.FangKa_GoUI;
		public box_special0:Laya.Box;
		public img_special0:Laya.Image;
		public box_special1:Laya.Box;
		public img_special1:Laya.Image;
		public box_special2:Laya.Box;
		public img_special2:Laya.Image;
		public box_special3:Laya.Box;
		public img_special3:Laya.Image;
		public btn_back:Laya.Button;
		public btn_chongzhi:Laya.Button;
		public btn_menu:Laya.Button;
		public img_menu:Laya.Image;
		public btn_record:Laya.Button;
		public btn_rules:Laya.Button;
		public btn_cardtype:Laya.Button;
		public btn_set:Laya.Button;
		public btn_qifu:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":1280,"height":720,"centerY":0,"centerX":0},"child":[{"type":"Box","props":{"width":1280,"var":"box_view","height":720,"centerY":0,"centerX":0,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"TouXiang","props":{"y":13,"x":773,"var":"view_player2","runtime":"ui.nqp.game_ui.shisanshui.component.TouXiangUI"}},{"type":"TouXiang","props":{"y":329,"x":1136,"var":"view_player1","runtime":"ui.nqp.game_ui.shisanshui.component.TouXiangUI"}},{"type":"TouXiang","props":{"y":329,"x":5,"var":"view_player3","runtime":"ui.nqp.game_ui.shisanshui.component.TouXiangUI"}},{"type":"TouXiang","props":{"y":565,"x":375,"var":"view_player0","runtime":"ui.nqp.game_ui.shisanshui.component.TouXiangUI"}},{"type":"Box","props":{"y":0,"x":542,"width":228,"visible":true,"var":"box_card2","height":274},"child":[{"type":"Image","props":{"y":46,"x":-119,"var":"img_type_2_0","skin":"shisanshui_ui/game_ui/shisanshui/tu_px1.png"}},{"type":"Image","props":{"y":120,"x":-119,"var":"img_type_2_1","skin":"shisanshui_ui/game_ui/shisanshui/tu_px1.png"}},{"type":"Image","props":{"y":194,"x":-119,"var":"img_type_2_2","skin":"shisanshui_ui/game_ui/shisanshui/tu_px1.png"}}]},{"type":"Box","props":{"y":243,"x":170,"visible":true,"var":"box_card3"},"child":[{"type":"Image","props":{"y":57,"x":201,"var":"img_type_3_0","skin":"shisanshui_ui/game_ui/shisanshui/tu_px1.png"}},{"type":"Image","props":{"y":131,"x":201,"var":"img_type_3_1","skin":"shisanshui_ui/game_ui/shisanshui/tu_px1.png"}},{"type":"Image","props":{"y":205,"x":201,"var":"img_type_3_2","skin":"shisanshui_ui/game_ui/shisanshui/tu_px1.png"}}]},{"type":"Box","props":{"y":450,"x":542,"width":279,"visible":true,"var":"box_card0","height":274},"child":[{"type":"Image","props":{"y":57,"x":199,"var":"img_type_0_0","skin":"shisanshui_ui/game_ui/shisanshui/tu_px1.png"}},{"type":"Image","props":{"y":131,"x":199,"var":"img_type_0_1","skin":"shisanshui_ui/game_ui/shisanshui/tu_px1.png"}},{"type":"Image","props":{"y":205,"x":199,"var":"img_type_0_2","skin":"shisanshui_ui/game_ui/shisanshui/tu_px1.png"}}]},{"type":"Box","props":{"y":244,"x":907,"width":274,"visible":true,"var":"box_card1","height":194},"child":[{"type":"Image","props":{"y":56,"x":-116,"var":"img_type_1_0","skin":"shisanshui_ui/game_ui/shisanshui/tu_px1.png"}},{"type":"Image","props":{"y":130,"x":-116,"var":"img_type_1_1","skin":"shisanshui_ui/game_ui/shisanshui/tu_px1.png"}},{"type":"Image","props":{"y":204,"x":-116,"var":"img_type_1_2","skin":"shisanshui_ui/game_ui/shisanshui/tu_px1.png"}}]},{"type":"Box","props":{"y":542,"visible":true,"var":"box_settle"},"child":[{"type":"TouDun","props":{"var":"view_settle0","runtime":"ui.nqp.game_ui.shisanshui.component.TouDunUI"}},{"type":"TouDun","props":{"y":39,"var":"view_settle1","runtime":"ui.nqp.game_ui.shisanshui.component.TouDunUI"}},{"type":"TouDun","props":{"y":120,"var":"view_settle3","runtime":"ui.nqp.game_ui.shisanshui.component.TouDunUI"}},{"type":"TouDun","props":{"y":80,"var":"view_settle2","runtime":"ui.nqp.game_ui.shisanshui.component.TouDunUI"}}]},{"type":"Label","props":{"y":22,"x":84,"var":"text_info","text":"牌局号:  15322222222255522145635","fontSize":20,"color":"#d4d4d4"}},{"type":"Label","props":{"y":52,"x":84,"width":268,"var":"text_roomtype","text":"试玩场：底注：1","height":20,"fontSize":20,"color":"#d4d4d4"}},{"type":"Label","props":{"y":279,"x":510,"width":260,"var":"text_cardroomid","text":"房间号：","height":41,"fontSize":35,"color":"#ffffff","align":"left"}},{"type":"Label","props":{"y":81,"x":85,"width":268,"var":"text_round","text":"局数：","height":20,"fontSize":20,"color":"#d4d4d4","align":"left"}},{"type":"Box","props":{"y":560,"x":471,"var":"box_show0"},"child":[{"type":"ZuPaiTiaoDong","props":{"y":62,"x":5,"var":"view_show0","runtime":"ui.nqp.game_ui.shisanshui.component.ZuPaiTiaoDongUI"}}]},{"type":"Box","props":{"y":17,"x":392,"var":"box_show2"},"child":[{"type":"ZuPaiTiaoDong","props":{"y":62,"x":5,"var":"view_show2","runtime":"ui.nqp.game_ui.shisanshui.component.ZuPaiTiaoDongUI"}}]},{"type":"Box","props":{"y":315,"x":131,"var":"box_show3"},"child":[{"type":"ZuPaiTiaoDong","props":{"y":62,"x":5,"var":"view_show3","runtime":"ui.nqp.game_ui.shisanshui.component.ZuPaiTiaoDongUI"}}]},{"type":"Box","props":{"y":315,"x":748,"var":"box_show1"},"child":[{"type":"ZuPaiTiaoDong","props":{"y":62,"x":5,"var":"view_show1","runtime":"ui.nqp.game_ui.shisanshui.component.ZuPaiTiaoDongUI"}}]},{"type":"Button","props":{"width":240,"var":"btn_continue","stateNum":1,"skin":"tongyong_ui/game_ui/tongyong/general/btn_5.png","sizeGrid":"0,20,0,20","labelStrokeColor":"#9d8c27","labelStroke":2,"labelSize":26,"labelPadding":"-2","labelColors":"#ffffff","label":"继续游戏","height":59,"centerY":40,"centerX":0,"anchorY":0.5,"anchorX":0.5}},{"type":"DaoJiShi","props":{"y":188,"x":596,"var":"img_time","scaleY":1.2,"scaleX":1.2,"runtime":"ui.nqp.game_ui.tongyong.DaoJiShiUI"}},{"type":"BaZi","props":{"y":141,"x":615,"var":"view_bazi","anchorY":0.5,"anchorX":0.5,"runtime":"ui.nqp.game_ui.shisanshui.component.BaZiUI"}},{"type":"Qiang","props":{"y":373,"x":265,"var":"view_qiang","rotation":0,"anchorY":0.5,"anchorX":0.5,"runtime":"ui.nqp.game_ui.shisanshui.component.QiangUI"}},{"type":"PaiXingGuang","props":{"y":89,"x":366,"var":"view_type","runtime":"ui.nqp.game_ui.shisanshui.component.PaiXingGuangUI"}},{"type":"FangKa_Go","props":{"y":0,"x":0,"var":"vw_card","runtime":"ui.nqp.game_ui.tongyong.FangKa_GoUI"}},{"type":"Box","props":{"y":540.5,"x":478,"var":"box_special0"},"child":[{"type":"Image","props":{"y":34.5,"x":147,"width":294,"skin":"shisanshui_ui/game_ui/shisanshui/tu_zpd.png","height":69,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":33.5,"x":147,"var":"img_special0","skin":"shisanshui_ui/game_ui/shisanshui/effect/paixing/tu_teshupai.png","scaleY":1,"scaleX":1,"anchorY":0.5,"anchorX":0.5}}]},{"type":"Box","props":{"y":345.5,"x":833,"var":"box_special1"},"child":[{"type":"Image","props":{"y":34.5,"x":147,"width":294,"skin":"shisanshui_ui/game_ui/shisanshui/tu_zpd.png","height":69,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":32.5,"x":146,"var":"img_special1","skin":"shisanshui_ui/game_ui/shisanshui/effect/paixing/tu_paix9.png","scaleY":1,"scaleX":1,"anchorY":0.5,"anchorX":0.5}}]},{"type":"Box","props":{"y":97.5,"x":475,"var":"box_special2"},"child":[{"type":"Image","props":{"y":34.5,"x":147,"width":294,"skin":"shisanshui_ui/game_ui/shisanshui/tu_zpd.png","height":69,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":33.5,"x":150,"var":"img_special2","skin":"shisanshui_ui/game_ui/shisanshui/effect/paixing/tu_paix9.png","scaleY":1,"scaleX":1,"anchorY":0.5,"anchorX":0.5}}]},{"type":"Box","props":{"y":343.5,"x":100,"var":"box_special3"},"child":[{"type":"Image","props":{"y":34.5,"x":147,"width":294,"skin":"shisanshui_ui/game_ui/shisanshui/tu_zpd.png","height":69,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":34.5,"x":149,"var":"img_special3","skin":"shisanshui_ui/game_ui/shisanshui/effect/paixing/tu_paix9.png","scaleY":1,"scaleX":1,"anchorY":0.5,"anchorX":0.5}}]}]},{"type":"Button","props":{"var":"btn_back","top":16,"stateNum":1,"skin":"tongyong_ui/game_ui/tongyong/general/btn_fh1.png","right":10,"anchorY":0.5,"anchorX":0.5}},{"type":"Button","props":{"var":"btn_chongzhi","stateNum":1,"skin":"tongyong_ui/game_ui/tongyong/general/btn_chongzhi.png","right":10,"bottom":0,"anchorY":0.5,"anchorX":0.5}},{"type":"Button","props":{"var":"btn_menu","top":16,"stateNum":1,"skin":"tongyong_ui/game_ui/tongyong/general/btn_cd.png","left":10,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":0,"x":10,"width":180,"var":"img_menu","top":0,"skin":"tongyong_ui/game_ui/tongyong/general/cd_1.png","sizeGrid":"20,20,20,20","left":10,"height":291},"child":[{"type":"Image","props":{"y":73,"x":11,"width":160,"skin":"tongyong_ui/game_ui/tongyong/general/cd_2.png"}},{"type":"Image","props":{"y":145,"x":11,"width":160,"skin":"tongyong_ui/game_ui/tongyong/general/cd_2.png"}},{"type":"Image","props":{"y":216,"x":11,"width":160,"skin":"tongyong_ui/game_ui/tongyong/general/cd_2.png"}},{"type":"Button","props":{"y":158,"x":14,"var":"btn_record","stateNum":1,"skin":"tongyong_ui/game_ui/tongyong/general/btn_zj.png"}},{"type":"Button","props":{"y":87,"x":14,"var":"btn_rules","stateNum":1,"skin":"tongyong_ui/game_ui/tongyong/general/btn_gz.png"}},{"type":"Button","props":{"y":16,"x":14,"var":"btn_cardtype","stateNum":1,"skin":"tongyong_ui/game_ui/tongyong/general/btn_px.png"}},{"type":"Button","props":{"y":227,"x":14,"var":"btn_set","stateNum":1,"skin":"tongyong_ui/game_ui/tongyong/general/btn_sz.png"}}]},{"type":"Button","props":{"y":60,"x":60,"var":"btn_qifu","top":16,"stateNum":1,"skin":"tongyong_ui/game_ui/tongyong/general/btn_qf.png","right":85,"anchorY":0.5,"anchorX":0.5}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ui.nqp.game_ui.shisanshui.component.TouXiangUI",ui.nqp.game_ui.shisanshui.component.TouXiangUI);
			View.regComponent("ui.nqp.game_ui.shisanshui.component.TouDunUI",ui.nqp.game_ui.shisanshui.component.TouDunUI);
			View.regComponent("ui.nqp.game_ui.shisanshui.component.ZuPaiTiaoDongUI",ui.nqp.game_ui.shisanshui.component.ZuPaiTiaoDongUI);
			View.regComponent("ui.nqp.game_ui.tongyong.DaoJiShiUI",ui.nqp.game_ui.tongyong.DaoJiShiUI);
			View.regComponent("ui.nqp.game_ui.shisanshui.component.BaZiUI",ui.nqp.game_ui.shisanshui.component.BaZiUI);
			View.regComponent("ui.nqp.game_ui.shisanshui.component.QiangUI",ui.nqp.game_ui.shisanshui.component.QiangUI);
			View.regComponent("ui.nqp.game_ui.shisanshui.component.PaiXingGuangUI",ui.nqp.game_ui.shisanshui.component.PaiXingGuangUI);
			View.regComponent("ui.nqp.game_ui.tongyong.FangKa_GoUI",ui.nqp.game_ui.tongyong.FangKa_GoUI);

            super.createChildren();
            this.createView(ui.nqp.game_ui.shisanshui.ShiSanShuiUI.uiView);
        }
    }
}

module ui.nqp.game_ui.shisanshui {
    export class ShiSanShui_GuiZeUI extends View {
		public btn_close:Laya.Button;
		public btn_tab:Laya.Tab;
		public panel_type:Laya.Panel;
		public lab_type:Laya.Box;
		public panel_rule:Laya.Panel;
		public lab_wanfa:Laya.Image;
		public panel_daxiao:Laya.Panel;
		public lab_daxiao:Laya.Box;

        public static  uiView:any ={"type":"View","props":{"width":1280,"height":720},"child":[{"type":"Box","props":{"width":792,"scaleY":1.25,"scaleX":1.25,"height":510,"centerY":0,"centerX":0,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":-37,"x":399,"skin":"tongyong_ui/game_ui/tongyong/hud/tu_bk4.png"}},{"type":"Image","props":{"y":-37,"x":399,"skin":"tongyong_ui/game_ui/tongyong/hud/tu_bk4.png","scaleX":-1}},{"type":"Image","props":{"y":24,"x":396,"skin":"tongyong_ui/game_ui/tongyong/hud/tit_game_rule.png","anchorY":0.5,"anchorX":0.5}},{"type":"Button","props":{"y":-28,"x":769,"var":"btn_close","stateNum":1,"skin":"tongyong_ui/game_ui/tongyong/hud/btn_tuichu.png"}},{"type":"Tab","props":{"y":66,"x":15,"width":756,"var":"btn_tab","space":4,"skin":"tongyong_ui/game_ui/tongyong/hud/tab_bq.png","labels":"玩法介绍,牌型说明,结算计分","labelSize":20,"labelColors":"#cacaca,#cacaca,#ffffff","height":58}},{"type":"Panel","props":{"y":130,"x":20,"width":750,"var":"panel_type","height":355},"child":[{"type":"Box","props":{"y":0,"x":0,"var":"lab_type"},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"shisanshui_ui/game_ui/shisanshui/guize_2.png"}},{"type":"Image","props":{"y":845,"x":0,"skin":"shisanshui_ui/game_ui/shisanshui/guize_2_1.png"}},{"type":"Image","props":{"y":387,"x":0,"skin":"shisanshui_ui/game_ui/shisanshui/guize_2_0.png"}},{"type":"Image","props":{"y":1528,"x":0,"skin":"shisanshui_ui/game_ui/shisanshui/guize_2_2.png"}}]}]},{"type":"Panel","props":{"y":130,"x":20,"width":755,"var":"panel_rule","height":350},"child":[{"type":"Image","props":{"y":0,"x":0,"var":"lab_wanfa","skin":"shisanshui_ui/game_ui/shisanshui/guize_1.png","height":411}}]},{"type":"Panel","props":{"y":130,"x":20,"width":755,"var":"panel_daxiao","height":350},"child":[{"type":"Box","props":{"y":0,"x":0,"var":"lab_daxiao"},"child":[{"type":"Image","props":{"skin":"shisanshui_ui/game_ui/shisanshui/guize_3.png"}},{"type":"Image","props":{"y":383,"skin":"shisanshui_ui/game_ui/shisanshui/guize_3.png"}}]}]}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.nqp.game_ui.shisanshui.ShiSanShui_GuiZeUI.uiView);
        }
    }
}

module ui.nqp.game_ui.shisanshui {
    export class ShiSanShui_HUDUI extends View {
		public img_mn:Laya.Image;
		public view_hud:ui.nqp.game_ui.tongyong.HudUI;
		public box_roomcard:Laya.Box;
		public img_room_create:Laya.Image;
		public img_room_join:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":1280,"height":720},"child":[{"type":"Image","props":{"top":0,"skin":"shisanshui_ui/game_ui/shisanshui/zjh.jpg","right":-1,"left":-1,"bottom":-1}},{"type":"Image","props":{"var":"img_mn","skin":"shisanshui_ui/game_ui/shisanshui/zjh_rw.png","left":-130,"bottom":0,"anchorY":0.5,"anchorX":0}},{"type":"Hud","props":{"var":"view_hud","top":0,"runtime":"ui.nqp.game_ui.tongyong.HudUI","right":0,"left":0,"bottom":0}},{"type":"Image","props":{"top":10,"skin":"shisanshui_ui/game_ui/shisanshui/tu_shisanshui.png","scaleY":1,"scaleX":1,"centerX":124,"anchorY":0.5,"anchorX":0.5}},{"type":"Box","props":{"y":0,"x":0,"width":910,"var":"box_roomcard","top":0,"right":0,"bottom":0,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":352,"var":"img_room_create","skin":"tongyong_ui/game_ui/tongyong/hud/tu_fangka.png","right":421,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":14,"x":43,"skin":"tongyong_ui/game_ui/tongyong/hud/tu_fangka2.png"}}]},{"type":"Image","props":{"y":352,"var":"img_room_join","skin":"tongyong_ui/game_ui/tongyong/hud/tu_fangka1.png","right":72,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":39,"x":83,"skin":"tongyong_ui/game_ui/tongyong/hud/tu_fangka3.png"}}]}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ui.nqp.game_ui.tongyong.HudUI",ui.nqp.game_ui.tongyong.HudUI);

            super.createChildren();
            this.createView(ui.nqp.game_ui.shisanshui.ShiSanShui_HUDUI.uiView);
        }
    }
}

module ui.nqp.game_ui.shisanshui {
    export class TipsUI extends View {
		public img_type:Laya.Image;
		public txt_label:laya.display.Text;
		public btn_enter:Laya.Button;
		public btn_cancle:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":1280,"height":720},"child":[{"type":"Box","props":{"width":608,"height":286,"centerY":0,"centerX":0,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":6,"width":793,"skin":"tongyong_ui/game_ui/tongyong/general/tu_bk3.png","scaleX":-1,"height":279,"centerX":0,"anchorX":0.5,"alpha":0.8}},{"type":"Image","props":{"y":225,"skin":"shisanshui_ui/game_ui/shisanshui/effect/paixing/tu_paix12_1.png","centerX":-172,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":94,"var":"img_type","skin":"shisanshui_ui/game_ui/shisanshui/effect/paixing/tu_paix12.png","centerX":79,"anchorY":0.5,"anchorX":0.5}},{"type":"Text","props":{"y":161,"x":38,"wordWrap":true,"width":530,"var":"txt_label","valign":"middle","text":"您的牌型为特殊牌型，是否确定直接摊牌？","leading":8,"height":42,"fontSize":24,"color":"#ffffff","align":"center"}},{"type":"Button","props":{"y":237,"var":"btn_enter","stateNum":1,"skin":"tongyong_ui/game_ui/tongyong/general/btn_qd.png","right":30,"anchorY":0.5,"anchorX":0.5}},{"type":"Button","props":{"y":237,"var":"btn_cancle","stateNum":1,"skin":"tongyong_ui/game_ui/tongyong/general/btn_qx.png","left":32,"anchorY":0.5,"anchorX":0.5}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.createView(ui.nqp.game_ui.shisanshui.TipsUI.uiView);
        }
    }
}
