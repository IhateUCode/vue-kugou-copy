<template>
    <div class="player_box" v-bind:class="{'showIt': ok}">
        <audio v-bind:src="audio.songUrl" autoplay id="autoplay" @ended="nextSong()" @error="nextSong()" @timeupdate="change()"></audio>
        <div class="audio-panel-control" v-on:click="toggleBottom" v-bind:class="{'icon': toggleIcon}">
            <mt-spinner type="snake" v-show="loadingShow" :size="20"></mt-spinner>    
        </div> 
        <div class="play_controls">
            <img class="left_pic" v-bind:src="audio.songImg" alt="" v-on:click="toDetail">
            <div class="left_word" v-on:click="toDetail">
                <p class="name_title ellipsis">{{ audio.title }}</p>
                <p class="name">{{ audio.author }}</p>
            </div>
            <div class="left_icon">
                <span class="start" v-on:click="toggleStatus" v-bind:class="{'pause': isPlay}"></span>
                <span class="next" v-on:click="nextSong"></span>
            </div>
        </div> 
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'
export default {
    data(){
        return {
            ok: false,
            toggleIcon: false
        }
    },
    computed: {
        ...mapState([
            'listInfo',
            'audio',
            'loadingShow',
            'isPlay'
        ])
    },
    methods: {
        toggleStatus(){
            if(!this.isPlay){
                document.getElementById('autoplay').pause();
                this.$store.commit('isplaying',true);
            }else {
                document.getElementById('autoplay').play();
                this.$store.commit('isplaying',false);
            }
        },
        nextSong(){
            this.$store.dispatch('next');
        },
        change(){
            var time = document.getElementById('autoplay').currentTime
            if (this.audio.currentFlag) {
                document.getElementById('audioPlay').currentTime = this.audio.currentLength;
                this.$store.commit('setCurrent', false);
            } else {
                this.$store.commit('setAudioTime', time);
            }            
        },
        toggleBottom(){
            if(!this.ok){
               this.ok = true;
               this.toggleIcon = true;
            }else {
               this.ok = false;
               this.toggleIcon = false;
            }
        },
        toDetail(){
            if(this.audio.songImg === 'http://m.kugou.com/v3/static/images/index/logo_kugou.png'){
                return 
            }else {
                this.$store.commit('hideMenu',true);
            }
            this.$store.dispatch('getDetail',this.listInfo.hash);
            console.log(this.listInfo.hash);
        }
    }
}
</script>

<style>
.player_box {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 501;
    width: 100%;
    transition: all .5s;
    -webkit-transition: all .5s
}

.audio-panel-control {
    width: 0.5rem;
    height: 0.5rem;
    background-image: url('../assets/images/close_icon.png');
    background-repeat: no-repeat;
    background-size: 0.42rem 0.42rem;
    background-position: center;
    margin-left: 10px;
    margin-bottom: 10px;
    background-color: rgba(0, 0, 0, 0.8);
    border-radius: 20px;
    overflow: hidden;
}

.audio-panel-control .mint-spinner-snake {
    margin: 2px;
    background-color: #000;
}

.play_controls {
    display: flex;
    flex-direction: row; 
    background-color: rgba(0, 0, 0, 0.8);
    padding: 7px;
    height: 0.7rem;
}

.left_pic {
    height: 100%;
}

.left_word {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-left: 10px;
    width: 60%;
}

.left_word p {
    font-size: 0.2rem;
    color: #fff;
}

.ellipsis {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}

.left_icon {
    height: 100%;
    display: flex;
    flex-direction: row;
    align-self: flex-end;
}

.left_icon span {
    display: block;
    height: 100%;
}

.start {
    background-image: url('../assets/images/pause_icon.png');
    background-repeat: no-repeat;
    background-size: 70%;
    background-position: center;
    width: 0.8rem;
}

.pause {
    background-image: url('../assets/images/play_icon.png');
    background-repeat: no-repeat;
    background-size: 70%;
    background-position: center;
    width: 0.8rem;
}

.next {
    background-image: url('../assets/images/next_icon.png');
    background-repeat: no-repeat;
    background-size: 70%;
    background-position: center;
    width: 0.8rem;
}

.left_word .name {
    font-size: 0.18rem;
    color: #ccc;
}

.showIt {
    bottom: -0.92rem;
}

.icon {
    background-image: url('../assets/images/open_icon.png');
}
</style>
