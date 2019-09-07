/**
* 十三水 
*/
module gameshisanshui.data {
	export class ShisanshuiData extends gamecomponent.object.PlayingPoker {
		private _posTemp = [[525, 550, 26], [1087, 309, -26], [725, 4, -26], [155, 309, 26]];	//初始牌的位置
		private _cardsPosTemp = {	//出牌后各个位置各张牌的位置
			0: [[598, 518], [633, 516], [654, 518], [562, 591], [599, 578], [632, 577], [656, 578], [687, 591], [562, 651], [599, 638], [632, 637], [656, 638], [687, 651]],
			1: [[963, 312], [998, 310], [1019, 312], [927, 385], [964, 372], [997, 371], [1021, 372], [1052, 385], [927, 445], [964, 432], [997, 431], [1021, 432], [1052, 445]],
			2: [[598, 68], [633, 66], [654, 68], [562, 141], [599, 128], [632, 127], [656, 128], [687, 141], [562, 201], [599, 188], [632, 187], [656, 188], [687, 201]],
			3: [[226, 312], [261, 310], [282, 312], [190, 385], [227, 372], [260, 371], [284, 372], [315, 385], [190, 445], [227, 432], [260, 431], [284, 432], [315, 445]],
		};
		private _cardsRotaTionTemp = [-16, -1, 16, -31, -15, 1, 15, 31, -31, -15, 3, 15, 31];	//出牌后各个位置各张牌的旋转角度
		private _playingTemp = [205, 635, 70];	//拼牌界面牌的位置
		private _cardTypePos = {	//三墩牌的位置
			1: [[419, 191], [469, 191], [519, 191]],
			2: [[369, 291], [419, 291], [469, 291], [519, 291],[569, 291]],
			3: [[329, 389], [399, 389], [469, 389], [539, 389], [609, 389]]
		};

		private _mainPlayerIndex: number;
		public _ownerIdx: number;		//牌的归属座位
		public _cardIndex: number;		//牌的序号
		public _isPinPai: boolean = false;		//是不是拼牌界面的
		public _cardType: number;		//牌属于哪个墩
		myOwner(index: number, seat: number, cardIndex: number) {
			this.size = 0.8;
			this._mainPlayerIndex = index;
			this._ownerIdx = seat;
			this._cardIndex = cardIndex;
			this.scaleX = -1;
		}

		protected Analyze(): void {
			this._card_val = this._val % 13;
			if (this._card_val == 0) this._card_val = 13;
			this._card_color = Math.floor(this._val / 13);
        }

		fapai() {
			let idx = this._ownerIdx;
			let posIdx = (idx - this._mainPlayerIndex + 4) % 4;
			let posX = this._posTemp[posIdx][0];
			let posY = this._posTemp[posIdx][1];
			let space = this._posTemp[posIdx][2];
			if (!this.targe_pos) {
				this.targe_pos = new Vector2();
			}
			this.targe_pos.x = posX + this.index * space;
			this.targe_pos.y = posY + 80;
			this.time_interval = 400;
			if(!this.pos) return;
			Laya.Tween.to(this.pos, { x: this.targe_pos.x, y: this.targe_pos.y }, this.time_interval);
		}

		pinpai() {
			let posX = this._playingTemp[0];
			let posY = this._playingTemp[1];
			let space = this._playingTemp[2];
			this.size = 1;
			this.isUIShow = true;
			this.pos.x = posX + this.index * space;
			this.pos.y = posY;
			this.fanpai();
		}

		xuanpai() {
			let posX = this._cardTypePos[this._cardType][this.index][0];
			let posY = this._cardTypePos[this._cardType][this.index][1];
			if (!this.targe_pos) {
				this.targe_pos = new Vector2();
			}
			this.isFinalPos = false;
			this.targe_pos.x = posX;
			this.targe_pos.y = posY;
			this.time_interval = 400;
			if(!this.pos) return;
			Laya.Tween.to(this.pos, { x: this.targe_pos.x, y: this.targe_pos.y }, this.time_interval);
		}

		//出牌，改变牌的位置
		playingcard() {
			let idx = this._ownerIdx;
			let posIdx = (idx - this._mainPlayerIndex + 4) % 4;
			let posX = this._cardsPosTemp[posIdx][this._cardIndex][0];
			let posY = this._cardsPosTemp[posIdx][this._cardIndex][1];
			if (!this.targe_pos) {
				this.targe_pos = new Vector2();
			}
			this.isFinalPos = false;
			this.targe_pos.x = posX;
			this.targe_pos.y = posY;
			this.rotateAngle = this._cardsRotaTionTemp[this._cardIndex] * Math.PI / 180;
			this.time_interval = 400;
			if(!this.pos) return;
			Laya.Tween.to(this.pos, { x: this.targe_pos.x, y: this.targe_pos.y }, this.time_interval);
		}

		//重连发牌
		refapai() {
			let idx = this._ownerIdx;
			let posIdx = (idx - this._mainPlayerIndex + 4) % 4;
			let posX = this._posTemp[posIdx][0];
			let posY = this._posTemp[posIdx][1];
			let space = this._posTemp[posIdx][2];
			this.pos.x = posX + this.index * space;
			this.pos.y = posY;
		}

		fanpai() {
			super.fanpai();
		}
	}
}