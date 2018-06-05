<template>
    <div>
        <mt-swipe :auto="4000">     
            <mt-swipe-item v-for="(item, index) in banners" v-bind:key="index">
                <a><img v-bind:src="item.imgurl" alt=""></a>
            </mt-swipe-item>
        </mt-swipe>

        <mt-cell v-bind:title="item.filename" v-for="(item, index) in songList" v-bind:key="index" v-on:click.native="getSong(index)">
            <img src="../assets/images/download_icon.png" alt="" width="20">
        </mt-cell>

    </div>
</template>

<script>
import { Indicator } from 'mint-ui'
import {mapState} from 'vuex'
import { mapGetters } from 'vuex'
import { mapMutations } from 'vuex'
export default {
    data(){
        return {
            banners: [],
            songList: []
        }
    },
    computed: {
        ...mapState([
            'loadingShow'
        ])
    },
    methods: {
        getBanner (){
            Indicator.open({
				text: '加载中...',
				spinnerType: 'snake'
			});
            this.$axios.get('/proxy/?json=true').then((data)=> {
                this.banners = data.data.banner;
                this.songList = data.data.data;
            }).then(()=>{
                Indicator.close();
            }).catch((err)=>{
                console.log(err);
            })
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
        this.getBanner();
    }
}
</script>

<style>
	.mint-swipe {
		height: 39vw !important;
	}
	
	.mint-swipe-indicator {
		width: 12px !important;
		height: 12px !important;
	}
	
	.mint-swipe-indicators {
		bottom: 5px !important;
    }
    
    .mint-cell-title {
        padding-left: 0.1rem;
    }

    .mint-cell-text {
        font-size: 0.2rem;
    }
</style>