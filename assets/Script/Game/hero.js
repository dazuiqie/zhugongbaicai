

cc.Class({
    extends: cc.Component,

    properties: () => ({
        bulletGroup:{
            default:null,
            type: require('bulletGroup'),

        },

         mainScript:{
             default:null,
             type:require('mainScript'),

         },   
     
    }),

    // LIFE-CYCLE CALLBACKS:

    start () {
        this.onDrag();
        let manager = cc.director.getCollisionManager();
        // 开启碰撞检测系统
        manager.enabled = true;

    },



 

    onDrag(){
        this.node.on('touchmove',this.onHandleHeroMove,this);
    },

    offDrag(){
        this.node.off('touchmove',this.onHandleHeroMove,this);
    },
   
    onHandleHeroMove(event){
        let position = event.getLocation();
        let location = this.node.parent.convertToNodeSpaceAR(position);
        this.node.setPosition(location);
    },


    onCollisionEnter: function (other, self) {
        if (other.node.group === 'ufo'){
            switch (other.node.name) {
                case 'doubleBullet':
                    this.bulletGroup.changeBullet(other.node.name);
                    break;
                case 'tnt':
                    this.mainScript.receiveBomb();
                    break;
            }
        } else if (other.node.group === 'enemy'){
            let anim = this.getComponent(cc.Animation);
            let animName = this.node.name + '_exploding';
            anim.play(animName);
            anim.on('finished', this.onHandleDestroy, this);
        }

    },


    onHandleDestroy: function () {
        // 暂停正在运行的场景，该暂停只会停止游戏逻辑执行，但是不会停止渲染和 UI 响应
        this.offDrag();
        // 游戏结束转场
        this.mainScript.gameOver();
    }

    
});
