<template>
    <div class="my-groups">
        <ul class="list">
            <li v-for="group in groups" class="list-item" @click="groupInfo(group.id)">
                {{ group.name +"   " + group.startTime}}
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios'
    export default{
        data(){
            return{
                groups: []
            }
        },

        methods: {
            async getMyGroups(){
               const response = await axios.get("http://localhost:8080/api/group/getTeacherGroups/" + localStorage.getItem('currentUser'),{headers: {"Authorization" : "Bearer " + localStorage.getItem('token')}});
               this.groups = response.data
            },

            groupInfo(id){
                this.$router.push("/myGroupInfo/" + id);
            }
        },

        created: function(){
            this.getMyGroups();
        }
    }
</script>

<style scoped>
    .my-groups{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
    }

    .list{
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .list-item{
        background-color: rgb(13, 214, 134);
        font-size: 24px;
        padding: 20px;
    }
</style>