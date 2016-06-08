class GridSprite extends egret.Sprite{
    private r:number;
    public constructor(r:number){
        super();
        this.r=r||30;
        this.drawGrid();
    }
    
    private drawGrid(){
        var ang:number=0;
        var r=this.r;
        this.graphics.beginFill(0x00ff00);
        this.graphics.drawRect(100,100,50,50);
        this.graphics.endFill();
        this.graphics.beginFill(0x00ffff);
        this.graphics.drawRect(50,100,50,50);
        this.graphics.endFill();
        this.graphics.beginFill(0xffff00);
        this.graphics.drawRect(100,50,50,50);
        this.graphics.endFill();
        this.graphics.beginFill(0xf0f0f0);
        this.graphics.drawRect(50,50,50,50);
        this.graphics.endFill();
        this.addEventListener(egret.Event.ENTER_FRAME,(evt:egret.Event)=>{
            this.x=50+Math.cos(ang*Math.PI/180)*r;
            this.y=50+Math.sin(ang*Math.PI/180)*r;
            ang++;
        },this)
    }
}