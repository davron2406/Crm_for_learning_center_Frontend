<template>
    <div class="user-monthly-attendance">
        <h1>Users MonthLy Attendance</h1>
    
    <table>
        <tr>
            <th>Date</th>
            <th v-for = "monthlyAttendance in monthlyAttendances">{{ monthlyAttendance.date }}</th>
        </tr>

        <tr>
            <td>Attendance</td>
            <td v-for="monthlyAttendance in monthlyAttendances">{{ monthlyAttendance.present }}</td>
        </tr>

        <tr>
            <td>Homework</td>
            <td v-for="monthlyAttendance in monthlyAttendances">{{ monthlyAttendance.homework }}%</td>
        </tr>
    </table>
    </div>
    
</template>

<script>
 import axios from "axios";
export default{
   
    data(){
        return{
            userId: "",
            groupId: "",
            monthlyAttendances: [],

        }
    
    },

    methods: {
        async getGroupThisMonthAttendance(groupId, month, year){
                const response = await axios.get("http://localhost:8080/api/attendance/getUserMonthlyAttendance?userId=" + this.userId + "&groupId=" + groupId + "&month=" + month + "&year=" + year, {headers: {"Authorization" : "Bearer " + localStorage.getItem('token')}})
                this.monthlyAttendances = response.data
                console.log(this.monthlyAttendances)
            },
    },

    created: function(){
        this.userId = this.$route.params.user;
        this.groupId = this.$route.params.group;

        this.getGroupThisMonthAttendance(this.groupId, new Date().getMonth() + 1, 2024);
    }
}
</script>

<style scoped>
    .user-monthly-attendance{
        width: 100%;
        padding: 20px;
    }
</style>