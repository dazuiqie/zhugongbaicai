cc.Class({
    extends: cc.Component,

    properties: {

        HP:{
            default:0,
            type:cc.Integer,
            tooltip:'敌人血量'
        },
        
        maxSpeed:0,
        minSpeed:0,
        
        initSpriteFrame:{
            default:null,
            type:cc.SpriteFrame,
            tooltip:"初始图像"
        },

        explosionSound:{
            type:cc.AudioClip,
            default:null,
        },

    },





    onLoad(){
        this.speed = Math.random()*(this.maxSpeed - this.minSpeed) + this.minSpeed;
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;
        this.enemyInit();
    },

    enemyInit(){
        this.enemyHp = this.HP;

        let nsprite = this.node.getComponent(cc.Sprite);
        if(nsprite.SpriteFrame != this.initSpriteFrame){
            nsprite.SpriteFrame = this.initSpriteFrame;
        }     
    },

    onCollisionEnter(other,self){
           
        if(other.node.group != 'bullet'){
            return;
        }
        if(this.enemyHp === 0 ){
            this.explodingAnim();
            return;
        }
        if(this.enemyHp > 0 ){
            this.enemyHp--;
        }
    },

    
    explodingAnim(){
        cc.audioEngine.play(this.explosionSound);

        //爆破动画
        let anim = this.getComponent(cc.Animation);
        let animName = this.node.name + '_exploding';
        anim.play(animName);
        anim.on('finished',this.onHandleDestroy,this);
    },

    update(dt){
        this.node.y = this.node.y - dt * this.speed;
        if(this.node.y < - this.node.parent.height/2){
            this.enemyGroup.destroyEnemy(this.node,0);
        }

    },

    onHandleDestroy(){
        this.enemyGroup.destroyEnemy(this.node);
    },

});
