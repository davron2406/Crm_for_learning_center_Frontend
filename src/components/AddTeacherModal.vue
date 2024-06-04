<template>
    <div class="modal-backdrop">
        <div class="modal">
            <header class="modal-header">
                <slot name="header">
                    Add Teacher
                </slot>
                <button type="button" class="btn-close" @click="closeModal"> x
                </button>
            </header>
            <section class="modal-body">
                <div class="input-wrapper">
                    <label for="email">Enter User Email</label>
                    <input type="text" id="email" v-model="email" @change="searchUser()">
                </div>

                <div>
                    <ul class="user-list">
                        <li v-for="user in users" @click="chooseUser(user)">
                            {{ user[2] }}
                        </li>

                        <div class="chosen-user">
                            {{this.chosenUser[2]}}
                        </div>
                    </ul>

                </div>

                
            </section>
            <footer class="modal-footer">
                <button type="button" class="btn-green" @click="addTeacher()"> 
                    Add
                </button>
            </footer>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default{
        data(){
            return{
               email: "",
               chosenUser: {},
               users: []
            }
        },

        methods: {
            closeModal(){
                this.$emit("close-modal")
            },

            async searchUser(){
                const response = await axios.get("http://localhost:8080/api/user/searchUser/" + this.email,{headers: {"Authorization": "Bearer " + localStorage.getItem('token')}});
                this.users = response.data.content
            },

            chooseUser(user){
                this.users = this.users.filter((item) => {
                    return item[0] != user[0]
                })

                this.chosenUser = user;
            },

          
            async addTeacher(){
                const response = await axios.get("http://localhost:8080/api/teacher/addTeacher?id=" + this.chosenUser[0],{headers: {"Authorization": "Bearer " + localStorage.getItem('token')}});
            },
        },

    }
</script>



<style scoped>
    .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
  }

  
  .modal-header,
  .modal-footer {
    padding: 15px;
    display: flex;
  }

  .modal-header {
    position: relative;
    border-bottom: 1px solid #eeeeee;
    color: #4AAE9B;
    justify-content: space-between;
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
    flex-direction: column;
    justify-content: flex-end;
  }

  .modal-body {
    position: relative;
    padding: 20px 50px;
  }

  .btn-close {
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    font-size: 20px;
    padding: 10px;
    cursor: pointer;
    font-weight: bold;
    color: #4AAE9B;
    background: transparent;
  }

  .btn-green {
    color: white;
    background: #4AAE9B;
    border: 1px solid #4AAE9B;
    border-radius: 2px;
    padding: 5px ;
  }

  .input-wrapper{
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
  }

  input{
    padding: 5px 20px;
    font-size: 22px;
    border-radius: 20px;
    color: #3a3838;
  }

  .permissions{
    display: flex;
    gap: 20px;
  }

  .permissions-list{
    min-width: 200px;
  }

  .user-list li{
    font-size: 20px;
    background-color: #4AAE9B;
    padding: 5px;
    width: 100%;
    border: 1px solid black;
    color: white;
    cursor: pointer;
    display: flex;
    flex-direction: column;
  }

  .permissions-list li:hover{
    background-color: #0de8bf;
  }

  .role-permission-list{
    min-width: 200px;
  }

  .role-permission-list li{
    font-size: 20px;
    background-color: #e11d48;
    padding: 5px;
    width: 100%;
    border: 1px solid black;
    color: white;
    cursor: pointer;
    display: flex;
    flex-direction: column;
  }

  .roles{
    display: flex;
    justify-content: space-between;
  }

</style>