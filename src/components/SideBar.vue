<template>

    <aside :class="`${this.is_expanded ? 'is-expanded' : ''}`">
        <div class="logo">
            <img src="../assets/images/ilmNuri logo.jpg" alt="">
            <p>{{ this.currentUser.fullName }}</p>
            <p>{{ this.currentUser.email }}</p>
        </div>

        <div class="menu-toggle-wrap">
            <button class="menu-toggle" @click="toggleMenu">
                <span class="material-icons">keyboard_double_arrow_right</span>
            </button>
        </div>

        <h3>Menu</h3>
        <div class="menu">
            <router-link class="button" to="/">
                <span class="material-icons">home</span>
                <span class="text">Home</span>
            </router-link>
            <router-link v-for="sideBar in sideBars" class="button" :to="sideBar.routerLink">
                <span class="material-icons">{{ sideBar.iconName }}</span>
                <span class="text">{{ sideBar.name }}</span>
            </router-link>
        </div>

        <div class="flex"></div>

            <div class="menu">
                <router-link class="button" to="/settings">
                    <span class="material-icons">settings</span>
                    <span class="text">Settings</span>
                </router-link> 
            </div>
    </aside>



</template>

<script >
    import axios from 'axios'
    export default{

        data(){
            return{
                is_expanded : false,
                currentUser: {
                    fullName: "",
                    email: "",
                    id: "",
                },
                sideBars : []
            }
        },

        methods: {
            toggleMenu(){
                this.is_expanded = !this.is_expanded
            },

            async getCurrentUser(){
                let response = await axios.get("http://localhost:8080/api/user/getCurrentUser", {headers: { "Authorization": 'Bearer ' + localStorage.getItem('token')}});
                this.currentUser.fullName = response.data.fullName
                this.currentUser.email = response.data.email
                this.currentUser.id = response.data.id
                localStorage.setItem('currentUser',response.data.id)
                let response2 = await axios.get("http://localhost:8080/api/auth/getSideBarMenu?id=" + response.data.id,{headers: { "Authorization": 'Bearer ' + localStorage.getItem('token')}} );
                this.sideBars = response2.data;
                console.log(response2);
             
            },

         
        },

        created: function(){
            this.getCurrentUser()
       }
    }
</script>

<style scoped>

    aside{
        display: flex;
        flex-direction: column;
        width: 4rem;
        overflow: hidden;
        min-height: 100vh;
        padding: 1rem;

        background-color: rgb(33, 32, 32);
        color: rgb(218, 212, 212);

        transition: 0.2s ease-out;
    }

    aside.is-expanded{
        width: 300px;
    }

    aside.is-expanded .menu-toggle-wrap{
        top: -3rem;
    }

    .logo{
        margin-bottom: 1rem;
    }

    .logo img{
        width: 2rem;

    }

    .menu-toggle-wrap{
        display: flex;
        justify-content: flex-end;
        margin-bottom: 1rem;

        position: relative;
        top: 0;
        transition: 0.2s ease-out;
    }

    .menu-toggle{
        transition: 0.2s ease-out;
    }

   .menu-toggle .material-icons{
        font-size: 2rem;
        color: #E5E5E5
   }

   .menu-toggle:hover .material-icons{
        color: #44beee;
        transform: translateX(0.5rem);
        transition: 0.2s ease-out;
   }

   aside.is-expanded .menu-toggle{
        transform: rotate(-180deg);
   }

   aside.is-expanded h3, .button, .text{
    opacity: 1;
   }

   aside.is-expanded  .button{
    opacity: 1;
   }

   aside.is-expanded .text{
    opacity: 1;
   }


   h3, .text{
        opacity: 0;
        transition: 0.3s ease-out;
   }
   .menu{
        margin: 0 -1rem;
   }

   .flex{
     flex: 1 1 0;
   }

   .menu .button{
        display: flex;
        align-items: center;
        text-decoration: none;

        padding: 0.5rem 1rem;
        transition: 0.2s ease-out;
   }

   .menu .button .material-icons{
        font-size: 2rem;
        color: #E5E5E5;
        transition: 0.2s ease-out;
        margin-right: 1rem;
   }

   .menu .button .text{
        color: #E5E5E5;
        transition: 0.2s ease-out;
   }

   .button:hover{
        background-color: #24353c;
   }

   .button.router-link-exact-active{
    background-color: #24353c;
   }

   .button.router-link-exact-active .text{
    color: #44beee;
   }

   .button.router-link-exact-active .material-icons{
    color: #44beee;
   }
   .button:hover .text{
    color: #44beee;
   }

   .button:hover .material-icons{
    color: #44beee;
   }

   h3{
    color: gray;
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
   }

   .button.router-link-exact-active{
    border-right: 5px solid #44beee;
   }
   
 
    @media only screen and(max-width: 700px){
        aside{
            position: fixed;
            z-index: 99;
        }
    }

</style>