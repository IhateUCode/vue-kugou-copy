<template>
    <div>
        <div class="info_cover" v-bind:style="{'backgroundImage': 'url(' + imgurl + ')'}">
            <div class="rankname">
                <span>{{ rankname }}</span>
                <img class="backarrow_img" src="../assets/images/goback_icon.png" alt="" v-on:click="backarrow">
            </div>
            <p class="gengxin_time">上次更新时间：{{ times }}</p>
        </div>
        <mt-cell class="poop" v-bind:title="item.filename" v-for="(item, index) in songList" v-bind:key="index" v-on:click.native="getSong(index)">
            <span class="paiming" v-bind:class="{'no1': index < 3, 'no2': index === 1,'no3': index === 2}">{{ index + 1 }}</span>
            <img src="../assets/images/download_icon.png" alt="" width="20">
        </mt-cell>
    </div>
</template>

<script>
import { Indicator } from 'mint-ui'
export default {
    name:'info',
    data(){
        return {
            rankid: this.$route.params.id,
            imgurl:'',
            rankname: '',
            songList: []
        }
    },
    computed: {
        times(){
            var dates = new Date();
            var year = dates.getFullYear();
            var mouth = dates.getMonth() + 1;
            var day = dates.getDate();
            return `${year}-${mouth}-${day}`;
        }
    },
    methods: {
        getList(){
            Indicator.open({
                text: '加载中...',
                spinnerType: 'snake'
            });
            this.$axios.get(`/proxy/rank/info/?rankid=${this.rankid}&page=1&json=true`).then(({data})=>{
                Indicator.close();
                console.log(data);
                this.imgurl = data.info.imgurl.replace('{size}','400');
                this.rankname = data.info.rankname;
                this.songList = data.songs.list;
            }).catch(err=>{
                console.log(err);
            })
        },
        hideMenu(){
            this.$store.commit('hidemenu',false);
        },
        backarrow(){
            this.$store.commit('hidemenu',true);
            this.$router.go(-1);
        },
        getSong(index){
           var hash = this.songList[index].hash;
           var info = {
               list: this.songList,
               index: index
           } 
           this.$store.commit('addSonglist',info);      //vuex状态获取点击提交的数据和index
           this.$store.dispatch('asyGetAuthor',hash);  
        }
    },
    created(){
        this.getList();
        this.hideMenu();
    }
}
</script>

<style>
.info_cover {
    width: 100%;
    height: 3.2rem;
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: center;
    margin-top: -0.7rem;
}

.rankname {
    height: 0.5rem;
    position: relative;
}

.rankname span {
    font-size: 0.24rem;
    color: #fff;
    text-align: center;
    display: block;
    line-height: 0.5rem;
    font-weight: bold;
}

.backarrow_img {
    position: absolute;
    left: 0.2rem;
    top: 0.08rem;
    width: 0.2rem;
}

.gengxin_time {
    font-size: 0.22rem;
    color: #fff;
    margin-top: 2.2rem;
    margin-left: 0.2rem;
    font-family: 'helvetica neue','hiragino sans gb',stheiti,'wenquanyi micro hei',\5FAE\8F6F\96C5\9ED1,\5B8B\4F53,sans-serif;
}

.mint-cell-text {
    font-size: 0.2rem;
}

.poop .mint-cell-title {
    padding-left: 0.48rem;
}

.paiming {
    position: absolute;
    left: 0.2rem;
    top: 0.26rem;
    font-size: 0.14rem;
    padding: 2px 8px;
}

.no1 {
    padding: 2px 8px;
    background-color: red;
    border-radius: 10px;
    color: #fff;
    line-height: 10px;
    box-sizing: border-box;
}

.no2 {
    background-color: #FF7200;
}

.no3 {
    background-color: #F8B300;
}
</style>
