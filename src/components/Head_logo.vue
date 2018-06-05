<template>
    <div class="head_box">
        <img class="img" src="http://m.kugou.com/v3/static/images/index/logo.png" alt="">
        <div class="img_box">
            <img class="img2" src="http://m.kugou.com/v3/static/images/index/search.png" alt="">
        </div>
    </div>
</template>

<style>
.head_box {
    background-color: #2ca2f9;
    padding: 0.15rem;
    height: 0.8rem;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    box-sizing: border-box;
    z-index: 500;
}

.img {
    float: left;
    height: 100%;
}

.img2 {
    height: 100%;
    float: left;
}

.img_box {
    float: right;
    height: 0.34rem;
    padding: 0.1rem 0;
}
</style>

<script>
export default {
  
}
</script>
