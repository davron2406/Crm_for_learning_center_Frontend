<template>
    <div class="modal-backdrop">
        <div class="modal">
            <header class="modal-header">
                <slot name="header">
                    Add Role
                </slot>
                <button type="button" class="btn-close" @click="closeModal"> x
                </button>
            </header>
            <section class="modal-body">
                <div class="input-wrapper">
                    <label for="name">Enter Role Name</label>
                    <input type="text" id="name" v-model="role.name">
                </div>

                <div class="permissions">
                    <ul class="permissions-list">
                        <li v-for="permission in permissions" @click="choosePermission(permission)">{{ permission }}</li>
                    </ul>
                
                    <ul class="role-permission-list">
                        <li v-for="permission in role.permissions" @click="unChoosePermission(permission)">
                          {{ permission }}
                        </li>
                    </ul>
                </div>
            </section>
            <footer class="modal-footer">
                <button type="button" class="btn-green" @click="addRole()"> 
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
                role: {
                    name:"",
                    permissions: []
                },
                permissions:[],
            }
        },

        methods: {
            closeModal(){
                this.$emit("close-modal")
            },

            async getPermissions(){
                const response = await axios.get("http://localhost:8080/api/role/getPermissions" ,{headers: {"Authorization": "Bearer " + localStorage.getItem('token')}});
                this.permissions = response.data;
                console.log(this.permissions)
            },

            choosePermission(permission){
              this.permissions = this.permissions.filter((item) => {
                    return item != permission;
                })

              this.role.permissions.push(permission);
            },

            unChoosePermission(permission){
              this.role.permissions = this.role.permissions.filter( (item) =>{
                return item != permission;
              })

              this.permissions.push(permission)
            },


            async addRole(){
              const response = await axios.post("http://localhost:8080/api/role/addRole" , this.role, {headers: {Authorization : "Bearer " + localStorage.getItem('token')}});
              console.log("student added");
              this.closeModal();
              this.$router.go();
            }
        },
        
        created: function(){
            this.getPermissions();
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
    max-height: 90vh;
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

  .permissions{
    display: flex;
    gap: 20px;
    height: 90%;
  }

  .permissions-list{
    min-width: 200px;
  }

  .permissions-list li{
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

  .permissions-list li:hover{
    background-color: #0de8bf;
  }

  .role-permission-list{
    min-width: 200px;
  }

  .role-permission-list li{
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

  .roles{
    display: flex;
    justify-content: space-between;
  }

</style>