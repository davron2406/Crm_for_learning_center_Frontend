<template>
    <div class="app">
        <Login v-if="!isLoggedIn" @logged-in="loggedIn()">   
        </Login>
        <SideBar v-if="isLoggedIn"></SideBar>
        <router-view/>
       
    </div>
</template>

<script>

import SideBar from './components/SideBar.vue';
import Login from './components/Login.vue';
export default{
    data(){
        return {
            isLoggedIn : false
        }
    },

    

    methods: {
        loggedIn(){
            localStorage.setItem("loggedIn",true)
        },

        setLoggedIn(){
            const i = localStorage.getItem("loggedIn");
            if(i != null){
                this.isLoggedIn = true;
            }
        }
       
    },

    components: {
        SideBar,
        Login
    },

    created: function(){
        this.setLoggedIn()
    }

}
</script>


<style > 
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Fira sans',sans-serif;
    }

    button{
        cursor: pointer;
        appearance: none;
        border: none;
        outline: none;
        background: none;
    }

    .app{
        display: flex;
    }

    .app main{
        padding: 2rem;
    }

</style>
