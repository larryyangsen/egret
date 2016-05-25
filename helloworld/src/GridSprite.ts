class GridSprite extends egret.Sprite{
    public constructor(){
        super();
        this.drawGrid();
    }
    
    private drawGrid(){
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
    }
}