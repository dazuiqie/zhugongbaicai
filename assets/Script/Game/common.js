

cc.Class({
    extends: cc.Component,

    properties: {
        QvarX:null,
        QvarY:null,
    },

    onLoad(){
        D.common = this;
        D.commonState.poolObj = {};
    },


    //批处理对象池

    batchInitNodePool:function(that,objArray){
        for(let i=0;i<objArray.length;i++){
            let objInfo = objArray[i];
            this.initNodePool(that,objInfo);
        }
    },

    initNodePool:function(that,objInfo){

        let name = objInfo.name;
        let poolName = name +"Pool";
        that[poolName] = new cc.NodePool();

        D.commonState.poolObj[poolName] = that[poolName];

        for(let i = 0; i < objInfo.poolAmount; i++){
            let newNode = cc.instantiate(objInfo.prefab);
            that[poolName].put(newNode);
        }

    },


    genNewNode:function(pool,prefab,nodeParent){
        let newNode = null;
        if(pool.size() > 0){
           newNode = pool.get();         
        }
        else{
            newNode = cc.instantiate(prefab);
        }

        nodeParent.addChild(newNode);
        return newNode;
    },

    putBackPool(that,node){
        let poolName = node.name + 'Pool';
        that[poolName].put(node);


    },

});

