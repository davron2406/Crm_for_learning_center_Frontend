<template id="roles">
    <div class="roles main-container">
       <div class="home__main__name">
          Roles
       </div>

        <div class="home__search__panel">
            <input type="text" id="search">
        </div>

        <div class="home__main__info">
            <table class="table">
               <thead class="table-header">
                    <tr class="table-header-row">
                        <th>Role Name</th>
                        <th>Role Permissions</th>
                        <th>Settings</th>
                    </tr>
               </thead>
                        
                <tbody class="table-body">
                    <tr v-for="role in roles" class="table-body-row">
                        <td>{{ role.name }}</td>
                        <td class="permissions">
                            <div>
                                {{ role.permissions.toString() }} 
                            </div>
                        </td>
                        <td>
                            <button class="delete"><span class="material-icons">delete</span>
                            </button></td>
                    </tr>
                </tbody>
            </table>

            <div class="table__control">
                <button class="backward" @click="decPageNumber">Orqaga</button>
                <div class="current__page"><p>{{ +this.pageNumber + 1 }} / {{ this.totalPages }}</p></div>
                <button class="forward" @click="incPageNumber()">Oldinga</button>
            </div>

            <div>
                <button class="add-user-btn" @click="showModal()">Add</button>
            </div>        


        </div>

        <AddRoleModal v-if="isOpenModal"  @close-modal="closeModal"></AddRoleModal>

    </div>
    
</template>

<script>
import axios from 'axios';
import AddRoleModal from '../components/AddRoleModal.vue';
   export default{
      data() {
       return{
           roles: [],
           defaultPageSize : 10,
           pageNumber : 0,
           totalPages : 0,
           isOpenModal: false,
       }
      },

      components :{
        AddRoleModal
      },

      methods:{
           async getRoles(pageSize, pageNumber){
                const response = await axios.get("http://localhost:8080/api/role?pageSize=" + pageSize + "&pageNumber=" + pageNumber,{headers: {"Authorization" : "Bearer " + localStorage.getItem('token')}})
                console.log(response);
                this.totalPages = response.data.totalPages
                this.roles = response.data.content;
           },

           incPageNumber(){
               if(this.pageNumber < this.totalPages - 1){
                   this.pageNumber++;
                   this.getRoles(this.defaultPageSize,this.pageNumber)
               }
           },
           decPageNumber(){
               if(this.pageNumber > 0){
                   this.pageNumber--;
                   this.getRoles(this.defaultPageSize, this.pageNumber);
               }
           },  

           showModal(){
             this.isOpenModal = true;
           },
           
           closeModal(){
            this.isOpenModal = false;
           },

         
      },

      created: function(){
        this.getRoles(this.defaultPageSize,this.pageNumber);
      }

     
   }
</script>

<style>

.roles{
   display: flex;
   flex-direction: column;
   width: 100%;
   padding: 2rem;
}

.home__main__name{
       font-size: 28px;
   }

   .home__search__panel{
       width: 100%;
   }

   .home__search__panel input{
       width: 100%;
       padding: 5px 20px;
       border-radius: 10px;
       outline: none;
       font-size: 20px;
   }

   table{
       width: 100%;
       margin-top: 50px;
       border: 1px solid;
       border-collapse: collapse;
       border-radius: 5px;
   }

   .table-header{
    background-color: #27ae60;
    color: white;
   }

   .group-name{
        cursor: pointer;
        transition: all 0.2s ease-out;
    }

    .group-name:hover{
        background-color: #0e66f3;
        color: white;
    }

   td,th{
       border: 1px solid;
       padding: 5px;
       border-radius: 5px;
   }

   td{
       text-align: center;
   }

   .table__control{
       display: flex;
       margin: 20px auto;
       justify-content: center;
       align-items: center;
       gap: 10px;
   }

   .table__control button{
       padding: 5px;
       border-radius: 10px;
       outline: none;
       border: 1px solid blue;
       background-color: rgb(76, 76, 213);
       cursor: pointer;
       font-size: 20px;
   }

   .current__page{
       font-size: 24px;
       color: red;
       width: 50px;
       height: 50px;
       border-radius: 50%;
       display: flex;
       justify-content: center;
       align-items: center;
   }

   .add-user-btn{
       padding: 5px 20px;
       font-size: 20px;
       border-radius: 20px;
       background-color: #0e66f3;
       color: white;
       transition: all 0.2s ease-out;
   }

   .add-user-btn:hover{
       background-color: #a531ed;
   }


   .delete span{
    color: red;
   }

   .permissions{
    max-width: 500px;
   }

   .permissions div{
    line-height: 30px;
    white-space: initial;
    word-break: break-all;
   }

</style>