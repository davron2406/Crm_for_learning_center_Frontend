<template>
    <div class="login">
        <div class="login__main">
            <div class="login__main__logo">
                <img src="../assets/images/ilmNuri logo.jpg" alt="">
            </div>
            <form action="#" @submit.prevent="login()">
                <label for="username">
                    <i class="fa fa-user"></i>
                    <p>Username</p>
                </label> 
                <input type="email" id="username" name="username" v-model="formData.email">

                <label for="password">
                    <i class="fa fa-lock"></i>
                    <p>Password</p>
                </label>
                <input type="password" id="password" name="password" v-model="formData.password">

                <button type="submit">Login</button>
            </form>

            <p class="register">If you don't have an account please <a href="http://localhost:5173/register">Register</a></p>
        </div>
    </div>
</template>

<script>

import axios from 'axios'

export default{
    name:"Login",
    data() {
        return{
            formData:{
                email: "",
                password: "",
            }
            
        }
    },

    methods:{
        async login(){
            let response = await axios.post("http://localhost:8080/api/auth/login",
                this.formData
            )

            console.log(response.data)
            localStorage.setItem('token',response.data)
            this.$emit('logged-in')
            this.$router.push('/home')
           
        }
    }
}
</script>

<style scoped>

    template{
        height: 100vh;
    }

    .login{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100vh;
    }

    .login__main{
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 40%;
        padding: 30px 0;
        border: 2px solid rgb(151, 148, 148);
        border-radius: 10px;
    }

    .login__main__logo{
        width: 100px;
        height: 100px;
        border-radius: 50%;
    }

    .login__main__logo img{
        width: 100%;
        border-radius: 50%;
    }

    form{
        display: flex;
        flex-direction: column;
    }

    form label{
        display: flex;
        align-items: center;
        gap: 5px;
    }

    form label p{
        color: #7288C7;
        font-size: 24px;
    }

    form label i{
        font-size: 24px;
        color: #7288C7;
    }

    form input{
        width: 100%;
        border-radius: 15px;
        font-size: 18px;
        padding: 5px 15px;
        border: 2px solid #7288C7;
        outline: none;
    }

    form input:focus{
        border: 2px solid red;
    }

    button[type="submit"]{
        padding: 15px 5px;
        background-color: #7288C7;
        outline: none;
        border-radius: 20px;
        color: white;
        font-size: 18px;
        border: none;
        cursor: pointer;

        display: inline-block;
        width: 80%;
        text-align: center;
        margin: 20px auto;
    }

    .register{
        font-size: 16px;
        color: rgb(57, 55, 55);
    }

    .register a{
        font-size: 20px;
    }

</style>