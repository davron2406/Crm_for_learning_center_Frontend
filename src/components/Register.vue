<template>

    <div class="register">
        <div class="register__main">
            <div class="register__logo">
                <img src="../assets/images/ilmNuri logo.jpg" alt="">
            </div>
            <form @submit.prevent="register()">
                <div>
                    <label for="fullName">
                        Full Name
                    </label>
                    <input type="text" name="fullName" id="fullName" v-model="formData.fullName">
                </div>

                <div>
                    <label for="email">Email</label>
                    <input type="email" name="email" id="email" v-model="formData.email">
                </div>

                <div>
                    <label for="password">Password</label>
                    <input type="password" name="password" id="password" v-model="formData.password">
                </div>
                <button type="submit">Register User</button>
            </form>

        </div>
    </div>

</template>

<script>
import axios from 'axios'
    export default{

        data(){
            return{
                formData:{
                    email:"",
                    fullName:"",
                    password: ""
                }
            }

        },

        methods:{
            async register(){
                let response = await axios.post("http://localhost:8080/api/auth/register",this.formData).catch(response => console.log(response))
                this.$router.push('/login')
            }
        }
    }
</script>

<style scoped>
    .register{
        width: 100%;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .register__logo{
        width: 100px;
        height: 100px;
        border-radius: 50%;
        margin-bottom: 50px;
    }

    .register__logo img{
        width: 100%;
        border-radius: 50%;

    }

    .register__main{
        width: 40%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        border: 2px solid #7288C7;
        border-radius: 20px;
        padding: 100px 0;
    }

    form{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        gap: 30px;
    }

    form div{
        display: flex;
        width: 100%;
        gap: 20px;
        justify-content: space-between;
    }

    form div label{
        font-size: 20px;
        letter-spacing: 1.5px;
        color: rgb(69, 110, 233);
    }


    form div input{
        font-size: 16px;
        padding: 5px 15px;
        outline: none;
        border: 2px solid #2659e4;
        border-radius: 10px;
    }

    button{
        display: inline-block;
        margin: auto;
        font-size: 20px;
        padding: 10px 50px;
        border: 1px solid #2659e4;
        cursor:pointer;
        border-radius: 20px;
    }
</style>