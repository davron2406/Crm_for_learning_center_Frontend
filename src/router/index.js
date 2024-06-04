import {createRouter, createWebHistory} from 'vue-router'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Home from '../components/Home.vue'
import Groups from '../components/Groups.vue'
import Group from '../components/Group.vue'
import Users from '../components/Users.vue'
import Teachers from '../components/Teachers.vue'
import Roles from "../components/Role.vue"
import MyGroups from '../components/MyGroups.vue'
import GroupInfoForTeacher from '../components/GroupInfoForTeacher.vue'
import UserAttendance from '../components/UserAttendance.vue'
import Payments from '../components/Payments.vue'



const routes = [

    {
        path: '/home',
        name: "Home",
        component: Home
        
    },  
    {
        path: '/groups',
        name: "Groups",
        component: Groups
        
    }, 
    {
        path: '/group/:id',
        name: "Group",
        component: Group
        
    }, 
    {
        path: '/users',
        name: "Users",
        component: Users
        
    }, 
    {
        path: '/users/allUsers',
        name: "AllUsers",
        component: Users
        
    }, 
    {
        path: '/users/activeUsers',
        name: "ActiveUsers",
        component: Users
        
    }, 
    {
        path: '/users/blockedUsers',
        name: "BlockedUsers",
        component: Users
        
    }, 
    {
        path: '/users/debtorUsers',
        name: "DebtorUsers",
        component: Users
        
    }, 
    {
        path: '/users/newUsers',
        name: "NewUsers",
        component: Users
        
    }, 
    {
        path: '/teachers',
        name: "Teachers",
        component: Teachers
        
    }, 
    {
        path: '/roles',
        name: "Roles",
        component: Roles
        
    }, 
    {
        path: '/register',
        name: "Register",
        component: Register
    },

    {
        path: '/myGroups',
        name: "MyGroups",
        component: MyGroups
    },

    {
        path: "/myGroupInfo/:id",
        name: "MyGroupInfo",
        component: GroupInfoForTeacher
    },

    {
        path: "/userAttendance/:user/:group",
        name: "UserAttendance",
        component: UserAttendance,
        props: true
    },

    {
        path: "/Payments",
        name: "Payments",
        component: Payments,
        props: true
    }

 
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router