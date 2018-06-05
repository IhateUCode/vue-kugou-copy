<template>
    <div class="head_menu_box" v-if="showMenu">
        <a v-for="(item,index) in menu" v-bind:key="index" v-bind:class="{'select':istrue === index}" v-on:click="toLink(index)">{{ item }}</a>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data(){
        return {
            menu: [
                '新歌','排行','歌单','歌手'
            ],
            istrue: 0
        }
    },
    methods: {
        toLink(index){
            this.istrue = index;
                switch(index){
                case 0:
                this.$router.push('/');
                break;
                case 1:
                this.$router.push('/rank');
                break;            
            }
        }
    },
    computed: {
        ...mapState([
            'showMenu'
        ])
    }
}
</script>

<style>
.head_menu_box {
    position: fixed;
    left: 0;
    top: 0.8rem;
    display: flex;
    width: 100%;
    padding: 0 0.1rem;
    box-sizing: border-box;
    border-bottom: solid 1px #e4e4e4;
    z-index: 500;
    background-color: #fff;
}

.head_menu_box a {
    font-size: 0.25rem;
    text-align: center;
    display: block;
    flex-grow: 1;
    padding: 0.16rem 0;
    
}

.select {
    border-bottom: solid 4px #26a2ff;
    color: #26a2ff;
}
</style>
