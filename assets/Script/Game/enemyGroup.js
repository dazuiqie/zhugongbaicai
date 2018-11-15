const enemyG = cc.Class({
    name:'enemyG',
    properties:{
        name:"",
        freq:0,
        prefab:cc.Prefab,
        poolAmount:0

    },

});

cc.Class({
    extends: cc.Component,

    properties: {
        enemyGroup:{
            default:[],
            type:enemyG,
        },
        mainScript:{
            default:null,
            type:require('mainScript')
        },

        

    },


    onLoad(){
        D.common.batchInitNodePool(this,this.enemyGroup)       
    },

    startAction(){
        for(let i = 0; i<this.enemyGroup.length; i++){
            let groupName = this.enemyGroup[i].name;
            let freq = this.enemyGroup[i].freq;

            this[groupName] = function(i){
                
                this.genNewEnemy(this.enemyGroup[i]);
                
            }.bind(this,i);//这样绑定是因为用的是schedule回调函数

            this.schedule(this[groupName],freq);
        }
    },

    genNewEnemy(enemyInfo){
        let poolName = enemyInfo.name + 'Pool';
        let newNode = D.common.genNewNode(this[poolName],enemyInfo.prefab,this.node);
        let pos = this.genEnemyPos(newNode);
        newNode.setPosition(pos);
        newNode.getComponent('enemy').enemyGroup = this;
        newNode.getComponent('enemy').enemyInit();

    },

    genEnemyPos(newEnemy){
        
        let randx = cc.randomMinus1To1() * (this.node.parent.width / 2 - newEnemy.width / 2);
        let randy = this.node.parent.height / 2 + newEnemy.height / 2;
        if(this.enemyGenRol(randx,randy) === true){
            return cc.v2(randx,randy);        
        }
        else{
            return cc.v2(-1000,-1000);
        }
        
    },


    enemyGenRol(randx,randy){
       
        if(D.common.QvarX === null){
            D.common.QvarX = randx;
            D.common.QvarY = randy;
            return true;
        }
        if(Math.abs(D.common.QvarX - randx) < 105){
            return false;
        }
        else{
            D.common.QvarX = randx;
            D.common.QvarY = randy;
            return true;
        }
        
        //newNode.getComponent('enemy');
    },


    destroyEnemy(node,score){
     
        D.common.putBackPool(this,node);
        
    },

});



