
cc.Class({
    extends: cc.Component,

    properties: () => ({

    
        enemyGroup: {
            default: null,
            type:require('enemyGroup'),
        },
    
        bulletGroup:{
            default:null,
            type:require('bulletGroup'),
        },

  
    }), 

  

    onLoad(){
       this.enemyGroup.startAction();
       
   },

   gameOver: function () {
  //  D.common.clearAllPool();
    cc.audioEngine.play(this.gameOverSound);
    cc.director.loadScene('End');
},

});
