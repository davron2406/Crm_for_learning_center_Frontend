<template>
    <div class="modal-backdrop">
      <div class="modal">
        <header class="modal-header">
          <slot name="header">
            Add Group
          </slot>
          <button type="button" class="btn-close"  @click="closeModal"> x
          </button>
        </header>
  
        <section class="modal-body">
          <slot name="body">
            <form class="group-form">
                <div>
                    <label for="name">Enter Group Name</label>
                    <input type="text" name="name" id="name" v-model="group.name">
                </div>

                <div>
                    <label for="startDate">Enter Start Date</label>
                    <input type="date" name="startDate" id="startDate" v-model="group.startDate">
                </div>
               
                <div>
                    <label for="startTime">Enter Start Time</label>
                    <select name="startTime" id="startTime" v-model="group.startTime">
                        <option v-for="startTime in startTimes" v-bind:value="startTime.value">{{ startTime.text }}</option>
                    </select>
                </div>

                <div>
                    <label for="teacher">Select teacher</label>
                    <select name="teacher" id="teacher" v-model="group.teacherId">
                        <option v-for="teacher in teachers" v-bind:value="teacher[0]">{{ teacher[1] }}</option>
                    </select>
                </div>
            </form>
          </slot>
         </section>
  
        <footer class="modal-footer">
          <button type="button" class="btn-green" @click="addGroup()"> 
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
                startTimes:[
                    {value: "08:00:00",text: "08:00"},
                    {value: "10:00:00",text: "10:00"},
                    {value: "12:00:00",text: "12:00"},
                    {value: "14:00:00",text: "14:00"},
                    {value: "16:00:00",text: "16:00"},
                    {value: "18:00:00",text: "18:00"}
                ],
                teachers: [],

                group:{
                    name: "",
                    startDate: "",
                    startTime: "",
                    teacherId: "",
                    studentIds:[]

                }
            }
        },

        methods: {
            closeModal(){
                this.$emit('close-modal',false)
            },

            async getTeachers(){
               const response = await axios.get("http://localhost:8080/api/teacher/getTeacherIdsAndNames",{headers:{"Authorization": "Bearer " + localStorage.getItem('token')}});
               console.log(response)
               this.teachers = response.data.content;
            },

            async getStudents(){
               const response = await axios.get("http://localhost:8080/api/user",{headers:{"Authorization": "Bearer " + localStorage.getItem('token')}});
               console.log(response)
               this.students = response.data.content;
            },

            async addGroup(){
                const response = await axios.post("http://localhost:8080/api/group/addGroup",this.group, {headers: {"Authorization" : "Bearer " + localStorage.getItem('token')}});
                console.log(response)
                this.closeModal();
            }

        },

        created: function(){
            this.getTeachers();
            this.getStudents()
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
    padding: 20px 10px;
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

  .students{
    margin: 20px 10px;
  }


  .group-form{
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .group-form div{
    display: flex;
  }

  .group-form div label{
    width: 200px;
  }

  .group-form input{
    padding: 3px 10px;
    border-radius: 10px;
    font-size: 20px;
  }

</style>