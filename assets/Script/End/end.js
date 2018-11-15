cc.Class({
    extends: cc.Component,

    properties: {
     
        restartBtn: {
            default: null,
            type: cc.Button,
        },
 
    },

    // use this for initialization
    onLoad: function () {
     //  this.newScore.string = D.commonState.gameScore ? D.commonState.gameScore.toString() : '0';
    },
    restartGame: function () {
        //cc.audioEngine.play(this.buttonSound);
        cc.director.loadScene('Game');
    },
    /*
    quitGame: function () {
        cc.audioEngine.play(this.buttonSound);
        cc.director.loadScene('Start');
    },
    */


    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
