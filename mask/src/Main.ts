/**
 * name
 */
class Main extends egret.Sprite {
    constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onStage, this);
    }
    private onStage(evt: egret.Event) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onStage, this);
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.configcom, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }
    private configcom(evt: RES.ResourceEvent) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.configcom, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.loadGroup("preload");
    }
    private onResourceLoadComplete(evt: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        this.init();
    }
    private init() {
        var bmp: egret.Bitmap = new egret.Bitmap();
        bmp.texture = RES.getRes("bgImage");
        bmp.width = 400;
        bmp.height = 300;
        var rect: egret.Rectangle = new egret.Rectangle(50, 50, 200, 300);
        bmp.mask = rect;
        this.addChild(bmp);
        this.addEventListener(egret.Event.ENTER_FRAME,()=>{
            if(bmp.mask) bmp.mask=null;
            else bmp.mask=rect;
        },this)
      
    }
}