<template id="users">
     <div class="users main-container">
        <div class="home__main__name">
           Users
         </div>
         
         

            <div class="table-container">
                <div class="input-wrapper search-input-wrapper">
                    <input type="text" class="input" placeholder="Enter user email to search" v-model="email" @change="searchPayment()">
                    <p class="placeholder search-placeholder">User email</p>
                </div>

                <nav class="table-menu" id="table-menu">
                    <li class="table-menu-item" :class="{active: this.status === -1}" @click="sortUsers(-1)">
                        <p>All Users</p>
                    </li>
                    <li class="table-menu-item" :class="{active: this.status === 1 }"  @click="sortUsers(1)">
                        <p>Active Users</p>
                    </li>
                    <li class="table-menu-item"  :class="{active: this.status === 2}"  @click="sortUsers(2)">
                        <p>New Users</p>
                    </li>
                    <li class="table-menu-item" :class="{active: this.status === 3}"  @click="sortUsers(3)">
                        <p>Debtor Users</p>
                    </li>
                    <li class="table-menu-item" :class="{active: this.status === 0}"  @click="sortUsers(0)">
                        <p>Blocked Users</p>
                    </li>
                    
                </nav>

                <table class="table">
                    <thead class="table-header">
                        <tr class="table-header-row">
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Settings</th>
                        </tr>
                    </thead>
                        
                    <tbody class="table-body">
                        <tr v-for="user in users" class="table-body-row">
                            <td>{{user[0]}}</td>
                            <td>{{user[2]}}</td>
                            <td>
                                <button class="delete-button">
                                    <span class="material-icons">delete</span>
                                </button>
                                <button class="delete-button" @click="blockUser(user[3])">
                                    <span class="material-icons">block</span>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div class="table-control">
                    <button class="backward-button" @click="backward()">
                        <span class="material-icons">
                            arrow_back_ios
                        </span>
                    </button>     
                            
                    <div class="table-info">
                        <p>{{ this.pageNumber + 1}}/{{ this.totalPages }}</p>
                    </div>

                    <button class="forward-button">
                        <span class="material-icons">
                            arrow_forward_ios
                        </span>
                    </button>
                </div>   
            </div>

          <ConfirmModal message='are you sure to block user'></ConfirmModal>

            <div>
                <button class="add-button">Add User</button>
            </div> 

        
    </div>
</template>

<script>
import axios from 'axios'
import ConfirmModal from './ConfirmModal.vue'
    export default{
       data() {
        return{
            users: {},
            defaultPageSize : 10,
            pageNumber : 0,
            totalPages : 0,
            status: -1,
        }
       },
       components:{
        ConfirmModal
       },

       methods:{
            sortUsers(status){
                this.status = status;
                console.log(this.status)
                this.getUsers(this.defaultPageSize,0)
            },

            async getUsers( pageSize,  pageNumber){
                const response = await axios.get("http://localhost:8080/api/user/" + this.status + "?pageSize="+pageSize+"&pageNumber="+pageNumber, {headers: { "Authorization": "Bearer " + localStorage.getItem("token")}}) 
                this.pageNumber = response.data.pageable.pageNumber;
                this.totalPages = response.data.totalPages
                this.users = response.data.content;
            },

            async blockUser(userId){
                const response = await axios.get("http://localhost:8080/api/user/blockUser/" + userId, {headers: { "Authorization": "Bearer " + localStorage.getItem("token")}})
                console.log(response);
            },

            forward(){
                if(this.pageNumber < this.totalPages - 1){
                    this.pageNumber++;
                    this.getUsers(this.defaultPageSize,this.pageNumber)
                }
            },
            backward(){
                if(this.pageNumber > 0){
                    this.pageNumber--;
                    this.getUsers(this.defaultPageSize, this.pageNumber);
                }
            },
       },

       created: function(){
            console.log(this.$route.fullPath);
            this.getUsers(this.defaultPageSize,this.pageNumber);
       }
    }
</script>

<style scoped>

.users{
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 2rem;
}

.home__main__name{
        font-size: 28px;
}

.table-menu , .table-menu-item{
    display: flex;
}

.table-menu{
    border-radius: 6px;
	background-image: linear-gradient(
		rgb(48, 48, 48) 13%,
		rgb(30, 30, 30) 40%,
		#0c0d11 86%
	);
	color: rgba(255, 255, 255, 0.6);
	text-shadow: 0 -2px 0 black;
	cursor: pointer;
	box-shadow: 1px 2px 4px rgb(20, 20, 20), 0 4px 12px rgb(10, 10, 10);
    justify-content: space-between;
}

.table-menu-item{
    flex-direction: row-reverse;
	font-size: 0.8999rem;
	line-height: 1rem;
	align-items: center;
	min-width: 120px;
	justify-content: center;
	transition: all 80ms ease;
    color: rgba(222, 218, 218, 0.87);
    text-decoration: none;
}

.active{
    color: hsl(260, 100%, 80%);
	text-shadow: 0 0 3px hsla(260, 100%, 70%, 0.7);
}



.table-menu-item:not(.router-link-exact-active):hover{
    color: rgba(255, 255, 255, 0.87);
}

.table-menu-item:not(:first-of-type) {
	border-left: 1px solid rgb(60, 60, 60);
}

.table-menu-item:not(:last-of-type) {
	border-right: 0.1rem solid black;
}

.table-menu-item p{
	color: inherit;
	text-decoration: none;
	padding: 1ch;
}

.delete-button{
    color: red;
}
</style>