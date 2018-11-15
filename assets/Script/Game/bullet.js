
cc.Class({
    extends: cc.Component,

    properties: {
      speed:cc.Integer,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
  
    },

    update (dt) {
        this.node.y += dt * this.speed;
        if(this.node.y > this.node.parent.height){
            this.bulletGroup.destroyBullet(this.node);
            
        }

    },

    onCollisionEnter(other,self){
        this.bulletGroup.destroyBullet(self.node);

    }

});
