/**
* 十三水 
*/
module gamershisanshui.page {
	export class RshisanshuiPageDef extends game.gui.page.PageDef {
		static GAME_NAME: string;
		//界面
		static PAGE_SSS: string = "1";			//HUD界面
		static PAGE_SSS_MAP: string = "2";		//地图界面
		static PAGE_SSS_RULE: string = "101";		//规则界面
		static PAGE_SSS_PLAYING: string = "8";	//拼牌界面
		static PAGE_SSS_QUANLEIDA: string = "9";//全垒打
		static PAGE_SSS_SPECIAL: string = "10";	//特殊牌界面
		static PAGE_SSS_CREATE_CARDROOM: string = "11";	// 创建房间
		static PAGE_SSS_CARDROOM_SETTLE: string = "13";	// 房卡结算页
		static PAGE_SSS_JOIN_CARDROOM: string = "100";		// 加入房间

		static myinit(str: string) {
			super.myinit(str);
			ShisanshuiClip.init();
			PageDef._pageClassMap[RshisanshuiPageDef.PAGE_SSS] = RshisanshuiPage;
			PageDef._pageClassMap[RshisanshuiPageDef.PAGE_SSS_MAP] = RshisanshuiMapPage;
			PageDef._pageClassMap[RshisanshuiPageDef.PAGE_SSS_RULE] = RshisanshuiRulePage;
			PageDef._pageClassMap[RshisanshuiPageDef.PAGE_SSS_PLAYING] = RshisanshuiPlayingPage;
			PageDef._pageClassMap[RshisanshuiPageDef.PAGE_SSS_QUANLEIDA] = RshisanshuiQuanLeiDa;
			PageDef._pageClassMap[RshisanshuiPageDef.PAGE_SSS_SPECIAL] = RshisanshuiSpecial;
			PageDef._pageClassMap[RshisanshuiPageDef.PAGE_SSS_CREATE_CARDROOM] = RshisanshuiCreadRoomPage;
			PageDef._pageClassMap[RshisanshuiPageDef.PAGE_SSS_JOIN_CARDROOM] = RshisanshuiJoinRoomPage;
			PageDef._pageClassMap[RshisanshuiPageDef.PAGE_SSS_CARDROOM_SETTLE] = RshisanshuiRoomSettlePage;



			this["__needLoadAsset"] = [
				Path_game_shisanshui.atlas_game_ui + "shisanshui.atlas",
				PathGameTongyong.atlas_game_ui_tongyong + "hud.atlas",
				PathGameTongyong.atlas_game_ui_tongyong + "general.atlas",
				PathGameTongyong.atlas_game_ui_tongyong + "touxiang.atlas",
				PathGameTongyong.atlas_game_ui_tongyong + "pai.atlas",
				PathGameTongyong.atlas_game_ui_tongyong + "fk.atlas",
				PathGameTongyong.atlas_game_ui_tongyong + "general/effect/fapai_1.atlas",
				PathGameTongyong.atlas_game_ui_tongyong + "general/effect/xipai.atlas",
				Path_game_shisanshui.atlas_game_ui + "shisanshui/effect/paixing.atlas",

				PathGameTongyong.atlas_game_ui_tongyong + "jiaru.atlas",
				PathGameTongyong.atlas_game_ui_tongyong + "dating.atlas",
				PathGameTongyong.atlas_game_ui_tongyong + "logo.atlas",
				Path.custom_atlas_scene + 'card.atlas',

				Path.map + 'pz_rshisanshui.png',
				Path.map_far + 'bg_rshisanshui.jpg'
			]

			if (WebConfig.needMusicPreload) {
				this["__needLoadAsset"] = this["__needLoadAsset"].concat([
					Path_game_shisanshui.music_shisanshui + "13s_bgm.mp3",
					Path_game_shisanshui.music_shisanshui + "all_nan.mp3",
					Path_game_shisanshui.music_shisanshui + "all_nv.mp3",
					Path_game_shisanshui.music_shisanshui + "daqiang.mp3",
					Path_game_shisanshui.music_shisanshui + "daqiang_nan.mp3",
					Path_game_shisanshui.music_shisanshui + "daqiang_nv.mp3",
					Path_game_shisanshui.music_shisanshui + "piaoqian.mp3",
					Path_game_shisanshui.music_shisanshui + "special_poker_type.mp3",
					Path_game_shisanshui.music_shisanshui + "start_bipai.mp3",
					Path_game_shisanshui.music_shisanshui + "start_chupai.mp3",
					Path_game_shisanshui.music_shisanshui + "tesu_1_nan.mp3",
					Path_game_shisanshui.music_shisanshui + "tesu_1_nv.mp3",
					Path_game_shisanshui.music_shisanshui + "tesu_2_nan.mp3",
					Path_game_shisanshui.music_shisanshui + "tesu_2_nv.mp3",
					Path_game_shisanshui.music_shisanshui + "tesu_3_nan.mp3",
					Path_game_shisanshui.music_shisanshui + "tesu_3_nv.mp3",
					Path_game_shisanshui.music_shisanshui + "tesu_4_nan.mp3",
					Path_game_shisanshui.music_shisanshui + "tesu_4_nv.mp3",
					Path_game_shisanshui.music_shisanshui + "tesu_5_nan.mp3",
					Path_game_shisanshui.music_shisanshui + "tesu_5_nv.mp3",
					Path_game_shisanshui.music_shisanshui + "tesu_6_nan.mp3",
					Path_game_shisanshui.music_shisanshui + "tesu_6_nv.mp3",
					Path_game_shisanshui.music_shisanshui + "tesu_7_nan.mp3",
					Path_game_shisanshui.music_shisanshui + "tesu_7_nv.mp3",
					Path_game_shisanshui.music_shisanshui + "tesu_8_nan.mp3",
					Path_game_shisanshui.music_shisanshui + "tesu_8_nv.mp3",
					Path_game_shisanshui.music_shisanshui + "tesu_9_nan.mp3",
					Path_game_shisanshui.music_shisanshui + "tesu_9_nv.mp3",
					Path_game_shisanshui.music_shisanshui + "tesu_10_nan.mp3",
					Path_game_shisanshui.music_shisanshui + "tesu_10_nv.mp3",
					Path_game_shisanshui.music_shisanshui + "tesu_11_nan.mp3",
					Path_game_shisanshui.music_shisanshui + "tesu_11_nv.mp3",
					Path_game_shisanshui.music_shisanshui + "tesu_12_nan.mp3",
					Path_game_shisanshui.music_shisanshui + "tesu_12_nv.mp3",
					Path_game_shisanshui.music_shisanshui + "tesu_13_nan.mp3",
					Path_game_shisanshui.music_shisanshui + "tesu_13_nv.mp3",
				])
			}
			this["__roomcard"] = Web_operation_fields.GAME_ROOM_CONFIG_CARD_ROOM;
		}
	}
}