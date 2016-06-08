/**
 * panel_Setup 
 */
class panel_Intro extends eui.Component  {
    public btn_login:eui.Button;    
    public li_server:eui.List;
    public ti_player: eui.TextInput;
    public msg_setup :eui.Label;   
    constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddStage,this);
    }
    
    private onAddStage(){
        this.msg_setup.text="Intro";
        this.btn_login.addEventListener(egret.TouchEvent.TOUCH_TAP,this.qr,this);
        
    }
    public qr(){
        this.removeChildren();
        this.dispatchEventWith("this_sence_over");
    }
}