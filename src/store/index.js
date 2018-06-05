import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)


const store = new Vuex.Store({
    state: {
        listInfo: {              //初始化
            songList: [],
            songIndex: 0,
            hash:null
        },
        audio: {
            songUrl: '',
            songImg: 'http://m.kugou.com/v3/static/images/index/logo_kugou.png',
            title: '',
            author: '',
            currentLength: 0,
            currentFlag: false
        },
        loadingShow: false,          //是否显示加载.gif
        isPlay: false,               //判断播放or暂停
        detailPlayer: false,          //是否显示播放器详情、歌词
        showMenu: true,         //是否显示菜单
        detailList: {
            bgImg: '',
            Lrc: '',
            songTitle: '',
            songLength: ''     //播放时长
        }
    },
    getters: {
    },
    mutations: {
        addSonglist(state,preload){
            state.listInfo.songList = preload.list;
            state.listInfo.songIndex = preload.index;
        },
        showLoading(state,flag){      
            state.loadingShow = flag;
        },
        isplaying(state,judge){
            state.isPlay = judge
        },
        hideMenu(state,judge){
            state.detailPlayer = judge
        },
        setAudioTime(state, time){
			state.audio.currentLength = time
        },
        setCurrent(state, flag){
			state.audio.currentFlag = flag
        },
        hidemenu(state, flag){
            state.showMenu = flag
        }
    },
    actions: {
        asyGetAuthor(context,hash){
            context.commit('showLoading',true);
            axios.get(`/bproxy/yy/index.php?r=play/getdata&hash=${hash}`).then(( {data} )=>{
                data = data.data;
                context.state.audio.songImg = data.img;
                context.state.audio.songUrl = data.play_url;
                context.state.audio.title = data.audio_name;
                context.state.audio.author = data.author_name;
                context.state.listInfo.hash = data.hash;        //将歌曲hash值传入到listInfo的hash变量里
                context.commit('showLoading',false);
            }).then(()=>{
                if(context.state.isPlay){
                    document.getElementById('autoplay').pause();
                }else {
                    document.getElementById('autoplay').play();
                }                
            })
        },
        next(context){
            // var nowNumber = context.state.listInfo.songIndex;         //这里要注意千万不要用nowNumber
            if(context.state.listInfo.songIndex == context.state.listInfo.songList.length - 1){               
                context.state.listInfo.songIndex = 0;
            }else {
                context.state.listInfo.songIndex++;
            }
            var nextHash = context.state.listInfo.songList[context.state.listInfo.songIndex].hash;
            context.dispatch('asyGetAuthor',nextHash);
            context.dispatch('getDetail',nextHash);
        },
        prev(context){
            if(context.state.listInfo.songIndex === 0){
                context.state.listInfo.songIndex = context.state.listInfo.songList.length
            }else {
                context.state.listInfo.songIndex--;
            }
            var nextHash = context.state.listInfo.songList[context.state.listInfo.songIndex].hash;
            context.dispatch('asyGetAuthor',nextHash);
            context.dispatch('getDetail',nextHash);
        },
        getDetail(context,hash){
            axios.get(`/bproxy/yy/index.php?r=play/getdata&hash=${hash}`).then(( {data} )=>{
                data = data.data;
                context.state.detailList.bgImg = data.img;
                context.state.detailList.Lrc = data.lyrics;
                context.state.detailList.songTitle = data.audio_name;
                context.state.detailList.songLength = data.timelength/1000;
            }).then(()=>{
                if(context.state.isPlay){
                    document.getElementById('autoplay').pause();
                }else {
                    document.getElementById('autoplay').play();
                }                
            })            
        }
    }
})

export default store