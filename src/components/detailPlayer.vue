<template>
<div class="bigbig" v-show="detailPlayer">
    <div class="detail_player_box" v-bind:style="{backgroundImage: 'url(' + this.detailList.bgImg + ')'}">
        <div class="bg_two">
            <div class="detail_top">
                <img v-on:click="exitInfo" src="../assets/images/goback_icon.png" alt="">
                <p class="detail_top_title">{{ detailList.songTitle }}</p>
            </div>
            <img class="small_img" v-bind:src="this.detailList.bgImg" alt="">
            <div class="p_boxbox">
                <div class="p_box" v-bind:style="{marginTop: wordOffset + 'px'}">
                    <p class="word" v-for="(item,index) in newWord" v-bind:key="index" 
                    v-bind:class="{isCurrentLrc:item.seconds >= audio.currentLength}" > {{ item.lrcContent }} </p>
                </div>
            </div>
            <div class="time_process">
                <span>{{ audio.currentLength | time }}</span>
                <mt-range id="range" v-model="audio.currentLength" v-bind:min="0" v-bind:max="max"></mt-range>
                <span>{{ detailList.songLength | time }}</span>
            </div>
            <div class="info_pause_start">
                <span v-on:click="prevSong"></span>
                <span v-on:click="toggleStatus" v-bind:class="{'detail_start': isPlay}"></span>
                <span v-on:click="nextSong"></span>
            </div>
        </div>
    </div>
</div>      
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'detailPlayer',
    data(){
        return {
        }
    },
    filters:{
        time(value){
            var length = Math.floor(parseInt(value));
            var minute = Math.floor(length / 60);
            if(minute < 10){
                minute = '0' + minute
            }
            var second = length % 60;
            if(second < 10){
                second = '0' + second;
            }
            return minute + ':' + second;
        }
    },
    computed: {
        ...mapState([
            'detailPlayer',
            'detailList',
            'audio',
            'isPlay'
        ]),
        newWord(){
            var temp = this.detailList.Lrc.split('\r\n')
            temp = temp.splice(0, temp.length - 1)
            temp = temp.map((value)=> {
                var time = value.substr(1, 5)
                var seconds = parseInt(time.split(':')[0]) * 60 + parseInt(time.split(':')[1])
                var lrcContent = value.substr(10)
                return {
                    seconds,      //秒数 和 内容
                    lrcContent   
                }
            })
            return temp;
        },
        wordOffset(){
            if (this.newWord) {
                var offset = (this.newWord.length - document.querySelectorAll('.isCurrentLrc').length - 2) * (-19)
                return this.audio.currentLength + offset - this.audio.currentLength
            }
        },
        max(){
            return parseInt(this.detailList.songLength);
        }
    },
    mounted(){
        console.log(this.newWord)
    },
    methods: {
        exitInfo(){
            this.$store.commit('hideMenu',false)
        },
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
        prevSong(){
            this.$store.dispatch('prev');        
        }
    }
}
</script>

<style>
html,body {
    width: 100%;
    height: 100%;
}

.bigbig {
    position: fixed;
    left: 0;
    top: 0.8rem;
    z-index: 1000;
    width: 100%;
    height: 100%;
    background-color: #fff;    
}

.detail_player_box {
    width: 100%;
    height: 100%; 
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    /* filter:blur(5px); */
}

.bg_two {
    width: 100%;
    height: 100%;   
    background-color: rgba(0, 0, 0, 0.5); 
    /* filter:blur(5px); */
}

.detail_top {
    padding: 0.1rem 0.2rem 0 0.2rem;
    box-sizing: border-box;
    text-align: center;
    height: 0.5rem;
    line-height: 0.5rem;
}

.detail_top img {
    position: absolute;
    left: 0.2rem;
    top: 0.1rem;
    height: 0.42rem;
}

.detail_top_title {
    font-size: 0.32rem;
    color: #fff;
    width: 70%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    margin: 0 auto;
}

.small_img {
    width: 3rem;
    height: 3rem;
    margin: 0.6rem auto 0.3rem;
    display: block;
}

.word {
    font-size: 0.22rem;
    color: #fff;
    text-align: center;
}
.p_boxbox {
    width: 100%;
    height: 0.6rem;
    overflow: hidden;
    margin: 0.6rem 0 1.2rem 0;
}

.p_box {
    transition: all .5s;
}

.time_process {
    padding: 0 0.2rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}

.time_process span {
    font-size: 0.2rem;
    color: #fff;
}

#range {
    width: 80%;
}

.mt-range-thumb {
    width: 0.2rem;
    height: 0.2rem;
    top: 0.14rem;
}

.info_pause_start {
    display: flex;
    flex-direction: row;
    padding: 0 1rem;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.6rem;
    height: 1.2rem;
}

.info_pause_start span {
    display: block;
    height: 100%;
}

.info_pause_start span:nth-child(1) {
    background-image: url('../assets/images/play_prev.png');
    background-repeat: no-repeat;
    background-size: 100%;
    width: 1rem;
    background-position: center;
}

.info_pause_start span:nth-child(2) {
    background-image: url('../assets/images/play_pause.png');
    background-repeat: no-repeat;
    background-size: 100%;
    width: 1.2rem;
}

.info_pause_start span:nth-child(3) {
    background-image: url('../assets/images/play_next.png');
    background-repeat: no-repeat;
    background-size: 100%;
    width: 1rem;
    background-position: center;
}

.detail_start {
    background-image: url('../assets/images/play_play.png') !important; 
    background-repeat: no-repeat !important;
    background-size: 100% !important;
    width: 1.2rem !important;
}
</style>
