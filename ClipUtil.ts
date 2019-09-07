/**
* 位图切片生成工具
*/
module gameshisanshui {
    export class ClipUtil extends Laya.Box {
        //货币 金色
        public static MONEY_FONT2: any;
        //加钱飘字
        public static ADD_MONEY_FONT: any;
        //扣钱飘字
        public static SUB_MONEY_FONT: any;

        static init(): void {
            this.MONEY_FONT2 = {
                source: DatingPath.atlas_dating_ui + "tongyong.atlas",
                url: DatingPath.ui_dating + 'tongyong/clip_money1.png',
                clipWidth: 16,
                clipHeight: 22,
                clipX: 11,
                space: 0
            };
            
            //加钱飘字
            this.ADD_MONEY_FONT = {
                source: PathGameTongyong.atlas_game_ui_tongyong+ "general.atlas",
                url: PathGameTongyong.ui_tongyong_general + 'clip_num1.png',
                clipWidth: 25,
                clipHeight: 32,
                clipX: 11,
                space: -8
            };

            //扣钱飘字
            this.SUB_MONEY_FONT = {
                source: PathGameTongyong.atlas_game_ui_tongyong+ "general.atlas",
                url: PathGameTongyong.ui_tongyong_general + 'clip_num.png',
                clipWidth: 25,
                clipHeight: 32,
                clipX: 11,
                space: -8
            };
        }
        private _clip: ClipCell;
        constructor(font: any) {
            super();
            this._clip = ObjectPools.malloc(ClipCell, [this, font]) as ClipCell;
            this.setFont(font);
            this.setContainer(this);
        }

        /**
         * 设置文本
         * @param str 文本
         * @param needZero 是否需要0
         * @param isTween  是否缓动
         * @param preSkin 
         * @param postSkin 
         */
        public setText(str: any, needZero: boolean = false, isTween: boolean = false, preSkin: string = null, postSkin: string = null): void {
            this._clip.setText(str, needZero, isTween, preSkin, postSkin)
        }

        /**
         * 播放缓动
         * @param numStr 文本
         */
        public playTween(numStr: string): void {
            this._clip.playTween(numStr)
        }

        /**
         * 设置字体
         * @param font 字体枚举
         */
        public setFont(font: any): void {
            this._clip.setFont(font)
        }

        /**
         * 设置容器
         * @param font 字体枚举
         */
        public setContainer(container: ClipUtil): void {
            this._clip.setContainer(container)
        }

        /**
         * 销毁
         * @param destroyChild 
         */
        destroy(destroyChild?: boolean) {
            if (this._clip) {
                ObjectPools.free(this._clip);
            }
            this._clip = null;
            super.destroy(destroyChild);
        }
    }

    class ClipCell implements IPoolsObject {
        poolName: string = "ClipCell";
        /**
		 * 进池 （相当于对象dispose函数）
		 */
        intoPool(...arg): void {
            this.reset();
        }
		/**
		 * 出池 （相当于对象初始化函数）
		 */
        outPool(...arg): void {
            // this._container = arg[0]
            // this.setFont(arg[1])
        }
        //滚数字结束
        static TWEEN_END: string = "tween_end";
        //当前选中的字体
        private _curFont: any;
        //clip组件集合
        private _clipArray: Laya.Clip[];
        //滚数字停止集合
        private _stopArray: boolean[];
        //前置图片
        public _preImage: LImage;
        //后置图片
        public _postImage: LImage;
        private _num: any;
        private _refTexture: RefAsset;
        private _container: ClipUtil;
        constructor(container: ClipUtil, font: any) {
            this.setContainer(container);
            this.setFont(font);
            this._stopArray = [];
            this._clipArray = [];
        }

        public setContainer(container: ClipUtil) {
            this._container = container;
        }

        public setFont(font: any): void {
            if (this._curFont == font) return;
            this._curFont = font;
            if (font.source) {
                let refTexture = RefAsset.Get(font.source);
                refTexture.retain();
            }
            if (this._clipArray) {
                for (let clip of this._clipArray) {
                    clip.destroy(true);
                }
                this._clipArray = [];
            }
        }

        //设置
        private _txtStr: string = "";
        private _needZero: boolean = false;
        private _isTween: boolean = false;
        private _preSkin: string = null;
        private _postSkin: string = null;
        public setText(str: any, needZero: boolean = false, isTween: boolean = false, preSkin: string = null, postSkin: string = null): void {
            if (this._num == str && this._needZero == needZero && this._isTween == isTween && this._preSkin == preSkin && this._postSkin == postSkin)  {
                return;
            }
            this._num = str;
            Laya.timer.clearAll(this);
            str = str.toString();
            if (!this._curFont) {
                loge("Font not found!");
            }
            this._txtStr = str;
            this._needZero = needZero;
            this._isTween = isTween;
            this._preSkin = preSkin;
            this._postSkin = postSkin;
            if (!this._refTexture) {
                this._refTexture = RefAsset.Get(this._curFont.source);
                if (!this._refTexture.parseComplete) {
                    this._refTexture.once(LEvent.COMPLETE, this, () => {
                        this.onAssetParseComplete();
                    });
                }
            }

            if (this._refTexture.parseComplete) {
                this.onAssetParseComplete();
            }
        }


        private onAssetParseComplete(): void {
            let posX = 0;
            //前置图片
            if (this._preSkin) {
                if (!this._preImage) {
                    this._preImage = new LImage();
                    this._container.addChild(this._preImage);
                }
                this._preImage.skin = this._preSkin;
                this._preImage.x = posX;
                this._preImage.centerY = 0;
                posX += this._preImage.width + this._curFont.space;
            } else {
                if (this._preImage) {
                    this._preImage.destroy();
                    this._preImage = null;
                }
            }
            //清理
            for (let clip of this._clipArray) {
                clip.removeSelf();
            }
            if (this._txtStr && (((!this._needZero && this._txtStr > "0") || this._needZero))) {
                let len: number = this._txtStr.length;
                for (let i = 0; i < len; i++) {
                    let clip = this._clipArray[i];
                    let indexStr: string = this._txtStr.charAt(i).toString();
                    let index = (indexStr == ".") ? 10 : parseInt(indexStr);
                    if (!clip) {
                        clip = this.createClip(index);
                        this._container.addChild(clip);
                        clip.x = posX;
                        clip.y = 0;
                        this._clipArray[this._clipArray.length] = clip;
                    } else {
                        clip.index = index;
                        if (!clip.parent)
                            this._container.addChild(clip);
                        clip.x = posX;
                        clip.y = 0;
                    }
                    posX += this._curFont.clipWidth + this._curFont.space;
                    clip.visible = true;
                }
                // this.isShowClip(true);
            } else {
                this.isShowClip(false);
            }

            //后置图片
            if (this._postSkin) {
                if (!this._postImage) {
                    this._postImage = new LImage();
                    this._container.addChild(this._postImage);
                }
                this._postImage.skin = this._postSkin;
                this._postImage.x = posX;
                this._postImage.centerY = 0;
                posX += this._postImage.width;
            } else {
                if (this._postImage) {
                    this._postImage.destroy();
                    this._postImage = null;
                }
            }

            this._container.size(posX, this._curFont.clipHeight);

            //需要播放滚动特效
            if (this._isTween) {
                this.playTween(this._txtStr);
            }
        }

        //是否显示
        private isShowClip(isShow: boolean) {
            for (let clip of this._clipArray) {
                clip.visible = isShow;
            }
        }

        //滚数字表现
        public playTween(numStr: string): void {
            Laya.timer.frameLoop(1, this, this.showTween, [parseInt(numStr)]);
            for (let i = 0; i < numStr.length; i++) {
                if (this._stopArray[i]) {
                    this._stopArray[i] = false;
                } else {
                    this._stopArray.push(false);
                }
                Laya.timer.once(500 + 500 * i, this, () => {
                    this.stopTween(i);
                });
            }
        }

        //停止滚数字
        private stopTween(index: number): void {
            this._stopArray[index] = true;
            if (index == this._num.toString().length - 1) {
                this._container.event(ClipCell.TWEEN_END);
            }
        }

        private showTween(num: number): void {
            let numStr = num.toString();
            for (let i = 0; i < numStr.length; i++) {
                let child = this._container.getChildAt(i) as laya.ui.Clip;
                let index = child.index;
                index++;
                if (child) {
                    if (this._stopArray[i]) {
                        child.index = parseInt(numStr[i]);
                        if (i >= numStr.length - 1)
                            Laya.timer.clearAll(this);
                    } else {
                        child.index = index % 10;
                    }
                }
            }
        }

        //创建位图切片
        private createClip(index: number): laya.ui.Clip {
            let clip = new laya.ui.Clip(this._curFont.url);
            clip.clipWidth = (clip.width / this._curFont.clipX) || this._curFont.clipWidth;
            clip.clipX = this._curFont.clipX;
            clip.index = index;
            this._container.addChild(clip);
            return clip;
        }

        //释放
        reset(): void {
            this._num = null;
            Laya.timer.clearAll(this);
            if (this._refTexture) {
                this._refTexture.offAll();
                this._refTexture.release();
                this._refTexture = null;
            }
            if (this._curFont.source) {
                this._curFont = null;
            }
            if (this._preImage) {
                this._preImage.destroy(true);
                this._preImage = null;
            }
            if (this._postImage) {
                this._postImage.destroy(true);
                this._postImage = null;
            }
            if (this._clipArray) {
                for (let clip of this._clipArray) {
                    clip.destroy(true);
                }
            }
            this._clipArray = [];
            this._stopArray = [];

        }
    }



}