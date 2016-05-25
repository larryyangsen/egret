//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends egret.DisplayObjectContainer {

    /**
     * 加载进度界面
     * Process interface loading
     */
    private loadingView: LoadingUI;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private drawGrid(){
        
    }
    private onAddToStage(event: egret.Event) {
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);

        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    }

    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event: RES.ResourceEvent): void {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event: RES.ResourceEvent): void {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onResourceLoadError(event: RES.ResourceEvent): void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    private onResourceProgress(event: RES.ResourceEvent): void {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    private textfield: egret.TextField;

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private text: egret.TextField;
    private text2: egret.TextField;
    private circle: egret.Shape;
    private rect: egret.Shape;
    private arc: egret.Shape;
    private line: egret.Shape;
    private linecurve: egret.Shape;
    private createGameScene(): void {
        this.circle = new egret.Shape();
        this.line = new egret.Shape();
        this.linecurve = new egret.Shape();
        this.arc = new egret.Shape();
        this.rect = new egret.Shape();
        this.circle.graphics.lineStyle(2, 0xff00aa);
        this.circle.graphics.beginFill(0xff00aa, 1);
        this.circle.graphics.drawCircle(0, 180, 80);
        this.circle.graphics.endFill();
        this.line.graphics.lineStyle(2, 0x00af02);
        this.line.graphics.moveTo(0, 100);
        this.line.graphics.lineTo(200, 100);
        this.line.graphics.lineTo(200, 120);
        this.line.graphics.lineTo(150, 120);
        this.line.graphics.lineTo(150, 200);
        this.line.graphics.endFill();
        this.linecurve.graphics.lineStyle(2, 0x00af02);
        this.linecurve.graphics.moveTo(50, 50);
        this.linecurve.graphics.curveTo(100, 100, 200, 50);
        this.linecurve.graphics.endFill();
        this.arc.graphics.beginFill(0x002288, 0.8);
        this.arc.graphics.drawArc(200, 200, 100, 0, Math.PI, false);
        this.arc.graphics.endFill();
        this.rect.graphics.beginFill(0x0000ff);
        this.rect.graphics.drawRect(0, 0, 50, 50);
        this.rect.graphics.endFill();
        this.rect.graphics.beginFill(0x00ff00);
        this.rect.graphics.drawRect(50, 50, 50, 50);
        this.rect.graphics.endFill();
        this.rect.graphics.beginFill(0xff0000);
        this.rect.graphics.drawRect(0, 50, 50, 50);
        this.rect.graphics.endFill();
        this.rect.graphics.beginFill(0xff00ff);
        this.rect.graphics.drawRect(50,0,50,50);
        this.rect.graphics.endFill();

        this.addChild(this.circle);
        this.addChild(this.line);
        this.addChild(this.linecurve);
        this.addChild(this.arc);
        this.addChild(this.rect);
        this.text = new egret.TextField();
        this.text2 = new egret.TextField();

        this.addChild(this.text);
        this.addChild(this.text2);
        this.text.width = 400;
        this.text.height = 400;
        this.text.text = "Hello World";
        this.stage.frameRate = 60;
        this.addEventListener(egret.Event.ENTER_FRAME, move, this);
        this.text.touchEnabled = true;
        this.text.addEventListener(egret.TouchEvent.TOUCH_TAP, touchEventHandler, this);
        var _myGrid : GridSprite = new GridSprite();
        this.addChild(_myGrid);
        var count: number = 1;
        function touchEventHandler(evt: egret.TouchEvent): void {
            let text: egret.TextField = evt.currentTarget;
            let colors = [0xff0000, 0x00ff00, 0x0000ff, 0x334567, 0x765432]
            text.textColor = colors[Math.random() * 5 | 0];
            this.text2.text = count;
            count++;
        }
        var x: number = 0;
        var y: number = 0;
        function move(evt: egret.Event) {
            if (this.text.x > 480) {
                this.text.x = 0;
                this.text.y = 0;
                x = 0;
                y = 0;
            }
            this.text.x = x;
            this.text.y = y;
            this.circle.x = x;
            x++;
            y++;
        }
    }
}
