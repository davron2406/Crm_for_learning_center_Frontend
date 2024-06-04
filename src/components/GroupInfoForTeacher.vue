<template>
    <div class="group-info">
            <div class="today-attendance">
                <h1>Today's Attendance</h1>
                <table>
                    <tr class="table-header">
                        <th>Student Full Name</th>
                        <th>Attendance</th>
                        <th>Homework</th>
                    </tr>
                            
                    <tr v-for="attendance in attendances">
                        <td >{{ this.students.find(student => student.id == attendance.userId).fullName}}</td>
                        <td> <input type="checkbox" value="true" v-model="attendance.present"></td>
                        <td><select v-model="attendance.homework">
                            <option value="0" selected>0%</option>
                            <option value="20">20%</option>
                            <option value="40">40%</option>
                            <option value="60">60%</option>
                            <option value="80">80%</option>
                            <option value="100">100%</option>
                        </select></td>
                    </tr>
                </table>
                <button @click="save()">SAVE</button>

            </div>

            <div class="this-month-attendance">
                <h1>This Month's Attendance</h1>
                <table>
                    <tr class="table-header">
                        <th>Student Full Name</th>
                        <th>Attendance(How many lessons missed)</th>
                        <th>Homework(Average)</th>
                    </tr>
                     <tr v-for="attendance in monthlyAttendance">
                        <td class="userFullName" @click="userMonthlyAttendance(attendance.userId,this.$route.params.id)">{{ attendance.fullName }}</td>
                        <td>{{ attendance.allLessonsCount - attendance.attendanceCount }}</td>
                        <td>{{ attendance.averageHomework }}</td>
                    </tr>

                </table>
            </div>
    </div>
</template>


<script>
    import axios from 'axios'
    export default{
        props: {
            user :{
                type: String,
                required: true,
            },

            group: {
                type: String,
                required: true  
            }
        },
        data(){
            return{
                students:[],
                attendances: [],
                currentAttendances : [],
                monthlyAttendance : []
            }
        },

        methods:{
            async getGroupStudents(){
                const response = await axios.get("http://localhost:8080/api/group/getGroupStudents/" +this.$route.params.id, {headers: {"Authorization" : "Bearer " + localStorage.getItem('token')}})
                this.students = response.data
                await this.getGroupTodayAttendance(this.$route.params.id)
                if(this.currentAttendances.length != 0){
                    this.attendances = this.currentAttendances
                }

                else{
                    for(let i = 0; i < this.students.length; i ++){
                        this.attendances.push({ present: false, homework: 0,userId: this.students[i].id,groupId:this.$route.params.id, fullName: this.students[i].fullName})
                    }
                }
            },

            async getGroupTodayAttendance(groupId){
                const response = await axios.get("http://localhost:8080/api/attendance/getGroupTodayAttendance/" +groupId, {headers: {"Authorization" : "Bearer " + localStorage.getItem('token')}})
                 this.currentAttendances = response.data 
            },

            async getGroupThisMonthAttendance(groupId, month, year){
                const response = await axios.get("http://localhost:8080/api/attendance/getGroupMonthAttendance?groupId=" + groupId + "&month=" + month + "&year=" + year, {headers: {"Authorization" : "Bearer " + localStorage.getItem('token')}})
                this.monthlyAttendance = response.data
                console.log(this.monthlyAttendance)
            },

            async save(){
               const response = await axios.post("http://localhost:8080/api/attendance",this.attendances,{headers: {"Authorization" : "Bearer " + localStorage.getItem('token')}})  
            },

            userMonthlyAttendance(userId,groupId){
                console.log("Working")
                this.$router.push({name: "UserAttendance", params: {user: userId, group: groupId}}) 
            }

        },

        created: function(){
            this.getGroupStudents();
            this.getGroupThisMonthAttendance(this.$route.params.id,new Date().getMonth() + 1, new Date().getFullYear())
        }
    }
</script>

<style scoped>

    *{
        margin: 0;
    }

    .group-info{
        display: flex;
        align-items:  center;
        width: 100%;
        padding: 10px 50px;
        flex-direction: column;
        gap: 50px;
    }

    .group-info .today-attendance{
        width: 100%;
        margin-top: 20px;
    }

    .today-attendance button{
        margin-top: 10px;
        background-color: rgb(44, 104, 225);
        padding: 5px 20px;
        border-radius: 20px;
        font-size: 18px;
        color: white;
        transition: all 0.3s ease-out;
    }

    .today-attendance button:hover{
        background-color: rgb(7, 48, 151);
    }

    .group-info .this-month-attendance{
        width: 100%;
    }


</style>