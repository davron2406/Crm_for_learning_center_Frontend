<template>
    <main class="group">
        <div class="group-users">
            <table>
                <tr class="table-header">
                    <th>Number</th>
                    <th>User Full Name</th>
                </tr>

                <tr v-for="student,index in students">
                    <td>{{ index + 1 }} </td>
                    <td>{{ student.fullName }}</td>
                </tr>
            </table>

            <div class="table-control">
                <button class="add-user" @click="openModal">Add User</button>
            </div>

            <AddUserModal  v-if="isModalVisible"  @close-modal = "closeModal"></AddUserModal>
        </div>
    </main>
</template>

<script>
    import axios from 'axios'
    import AddUserModal from './AddUserModal.vue'
    export default{

        data(){
            return{
                students: [],
                isModalVisible : false,
            }
        },

        components: {
            AddUserModal
        },
        methods: {
            async getGroupUsers(){
               const response = await axios.get("http://localhost:8080/api/group/getGroupStudents/" + this.$route.params.id,{headers: {"Authorization" : "Bearer " + localStorage.getItem('token')}})
               this.students = response.data;
            },

            openModal(){
                this.isModalVisible = true;
            },

            closeModal(){
                this.isModalVisible = false;
            }
        },

        created: function(){
            this.getGroupUsers();
        }
    }
</script>

<style scoped>
    .group{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: start;
    }
    .table-header{
        background-color: #27ae60;
        color: white;
   }
   .add-user{
     padding: 5px 20px;
     background-color: #27ae60;
     color: white;
     margin-top: 20px;
     border-radius: 10px;
     font-size: 18px;
   }
</style>