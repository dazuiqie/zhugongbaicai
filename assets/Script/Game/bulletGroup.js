// 子弹生成的位置
const bulletPosition = cc.Class({
    name: 'bulletPosition',
    properties: {
        positionX: {
            default: "",
            tooltip: '子弹相对Hero的位置'
        }
    }
});

const infiniteBullet = cc.Class({
    name:'infiniteBullet',
     properties:{
        name:'',
        rate: 0,
        poolAmount:0,
        prefab:cc.Prefab,
        position:{
            default:[],
            type:bulletPosition,
            },
        },
       

});


const finiteBullte = cc.Class({
    extends:infiniteBullet,
    name:'finiteBullet',
    properties:{
        duration:0,
        ufoBullteName:'',
    }

});

cc.Class({
    extends: cc.Component,

    properties: () => ({
        infiniteBullet:{
            default:null,
            type:infiniteBullet,
            tooltip:'无限子弹'
        },
        finiteBullte:{
            default:[],
            type:finiteBullte,
            tooltip:'有限子弹'
        },
        hero:cc.Node,


    }),

   

    onLoad(){
        D.common.initNodePool(this,this.infiniteBullet);
        //D.common.batchInitNodePool(this.finiteBullte);
    },

    startAction(){
        let startShoot = function(){
            this.genNewBullet(this.infiniteBullet)
        }.bind(this);
        this.schedule(startShoot,this.infiniteBullet.rate);
    },


    genNewBullet(bulletInfo){

        let bulletPool = bulletInfo.name + 'Pool';
        let newNode = D.common.genNewNode(this[bulletPool],bulletInfo.prefab,this.node);
        let pos = this.getBulletPosition(bulletInfo.position[0].positionX);
        newNode.setPosition(pos);

        newNode.getComponent('bullet').bulletGroup = this;

    },

    getBulletPosition(positionX){
        let heroPos = this.hero.getPosition();
        let newV2_x = heroPos.x + eval(positionX);
        let newV2_y = heroPos.y;
        return cc.p(newV2_x,newV2_y);
        
    },

    destroyBullet(node){
        D.common.putBackPool(this,node);
    },


});
