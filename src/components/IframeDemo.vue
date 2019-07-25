<template>
    <div>
        <div>
            <button @click="goSon">像子传参</button>
            <div id="pa"></div>
            <iframe :src="testurl" ref="iframeDemo" height="200" width="100%" frameborder="0"></iframe>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                testurl:" http://localhost:8080/static/iframe/iframe1.html"
            }
        },
        mounted() {
            window.addEventListener('message', function(e) {
                console.log(e);
                if(e.data.msg){
                    document.getElementById('pa').innerHTML =  e.data.msg;
                }
                
            }, false);
        },
        methods: {
            goSon() {
                this.$refs.iframeDemo.contentWindow.postMessage("主页面消息", "http://localhost:8080/static/iframe/iframe1.html");
            }
        },
    }
</script>
<style scoped>

</style>