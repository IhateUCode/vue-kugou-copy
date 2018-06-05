<template>
    <div>
        <mt-cell v-for="(item,index) in songList" v-bind:key="index" :title="item.rankname" :to="`/info/${item.rankid}`" is-link>
            <img slot="icon" alt="" :src="item.imgurl.replace('{size}', '400')" width="60" height="60">
        </mt-cell>
    </div>
</template>

<script>
import { Indicator } from 'mint-ui'
export default {
    name: 'rank',
    data(){
        return {
            songList: []
        }
    },
    methods: {
        getList(){
            Indicator.open({
                text: '加载中...',
                spinnerType: 'snake'
            });
            this.$axios.get('/proxy/rank/list&json=true').then(({data})=>{
                Indicator.close();
                this.songList = data.rank.list;
            })
        }
    },
    created(){
        this.getList();
    }
}
</script>

<style>
.mint-cell-title img {
    margin: 10px 10px 10px 0;
}
</style>
