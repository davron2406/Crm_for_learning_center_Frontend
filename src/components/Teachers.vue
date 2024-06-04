<template id="teachers">
    <div class="teachers main-container">
       <div class="home__main__name">
          Teachers
     </div>

     <div class="home__search__panel">
        <input type="text" id="search">
     </div>

     <div class="home__main__info">
       <table class="table">
            <thead class="table-header">
                <tr class="table-header-row">
                    <th>№</th>
                    <th>Full Name</th>
                    <th>Salary</th>
                    <th>Groups</th>
                    <th>Country</th>
                </tr>
            </thead>

                  
            <tbody class="table-body">
                <tr v-for="teacher,index in this.teachers" class="table-body-row">
                    <td>{{index + 1}}</td>
                    <td>{{teacher.fullName}}</td>
                    <td>{{ teacher.salary }}</td>
                    <td>{{ teacher.groupCount }}</td>
                    <td>Country</td>
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

            <button class="forward-button" @click="forward()">
                <span class="material-icons">
                    arrow_forward_ios
                </span>
            </button>
        </div>  

       <div>
           <button class="add-button" @click="showModal()">Add</button>
       </div>  
       
       <AddTeacherModal v-if="isOpenModal"  @close-modal="closeModal()"></AddTeacherModal>
   </div>

    </div>
    
</template>

<script>
import AddTeacherModal from './AddTeacherModal.vue';
import axios from 'axios'
   export default{
      data() {
       return{
           teachers: {},
           defaultPageSize : 10,
           pageNumber : 0,
           totalPages : 0,
           isOpenModal: false,
       }
      },

      components:{
        AddTeacherModal
      },

      methods:{
           async getTeachers( pageSize,  pageNumber){
             const  response = await axios.get("http://localhost:8080/api/teacher/getTeachers?pageSize="+pageSize+"&pageNumber="+pageNumber, {headers: { "Authorization": "Bearer " + localStorage.getItem("token")}})
             this.pageNumber = response.data.pageable.pageNumber;
             this.totalPages = response.data.totalPages
             this.teachers = response.data.content;
             console.log(response)
           },

           forward(){
               if(this.pageNumber < this.totalPages - 1){
                   this.pageNumber++;
                   this.getTeachers(this.defaultPageSize,this.pageNumber)
               }
           },
           backward(){
               if(this.pageNumber > 0){
                   this.pageNumber--;
                   this.getTeachers(this.defaultPageSize, this.pageNumber);
               }
           },
           
           showModal(){
            this.isOpenModal=true;
           },

           closeModal(){
            this.isOpenModal=false;
           }
      },

      created: function(){
        this.getTeachers(this.defaultPageSize,this.pageNumber);
      }
   }
</script>

<style scoped>

.teachers{
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
   }

   td,th{
       border: 1px solid;
       padding: 5px;
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
</style>