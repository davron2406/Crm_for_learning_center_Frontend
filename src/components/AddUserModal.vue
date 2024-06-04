<template>
    <div class="modal-backdrop">
        <div class="modal">
            <header class="modal-header">
                <slot name="header">
                    Add User to group
                </slot>
                <button type="button" class="btn-close" @click="closeModal"> x
                </button>
            </header>
            <section class="modal-body">
                <div class="input-wrapper">
                    <label for="email">Enter Users Email</label>
                    <input type="text" id="email" @change="searchUser()" v-model="email">
                </div>

                <div class="users">
                    <ul class="student-list">
                        <li v-for="student in students"  @click="chooseUser(student)">{{ student[1] }}</li>
                    </ul>
                
                    <ul class="chosen-student-list">
                        <li v-for="student in chosenStudents" @click="unChooseUser(student)">{{ student[1] }}</li>
                    </ul>
                </div>
            </section>
            <footer class="modal-footer">
                <button type="button" class="btn-green" @click="addUser"> 
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
                email : "",
                students:[],
                chosenStudents: [],
                chosenStudentIds:[],
            }
        },

        methods: {
            closeModal(){
                this.$emit("close-modal")
            },

            async searchUser(){
                const response = await axios.get("http://localhost:8080/api/user/searchUser/" + this.email,{headers: {"Authorization": "Bearer " + localStorage.getItem('token')}});
                this.students = response.data.content
            },

            chooseUser(chosenStudent){
                this.chosenStudents.push(chosenStudent)
                const currentStudents = this.students;
                this.students = currentStudents.filter((student) => {
                    return student[0] != chosenStudent[0]
                })

                console.log(this.students)
            },

            unChooseUser(chosenStudent){
              const currentStudents = this.chosenStudents;
              this.chosenStudents = currentStudents.filter((student) => {
                    return student[0] != chosenStudent[0]
                })
              this.students.push(chosenStudent);
            },

            getIds(){
              this.chosenStudents.forEach(student => {
                this.chosenStudentIds.push(student[0])
              })
            },


            async addUser(){
              this.getIds()
              const response = await axios.post("http://localhost:8080/api/group/addUsersToGroup/" + this.$route.params.id, this.chosenStudentIds, {headers: {Authorization : "Bearer " + localStorage.getItem('token')}});
              console.log("student added");
              this.closeModal();
              this.$router.go();
            }
        }    

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

  .student-list li{
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

  .student-list li:hover{
    background-color: #0de8bf;
  }

  .chosen-student-list li{
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

  .users{
    display: flex;
    justify-content: space-between;
  }

</style>