<template>
    <div>
        <HeadLogo />
        <HeadMenu />
    </div>
</template>

<style>

</style>

<script>
import HeadLogo from './Head_logo'
import HeadMenu from './Head_menu'
import { mapState } from 'vuex'
export default {
    components: {
        HeadLogo,
        HeadMenu
    },
    data(){
        return {

        }
    },
    computed: {
        ...mapState([
            'detailPlayer'
        ])
    }  
}
</script>
