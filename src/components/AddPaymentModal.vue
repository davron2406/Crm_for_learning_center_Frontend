<template>
    <div class="modal-backdrop">
        <div class="modal">
            <header class="modal-header">
                <slot name="header">
                    ADD PAYMENT
                </slot>
                <button type="button" class="btn-close" @click="closeModal"> x
                </button>
            </header>
            <section class="modal-body">
                <div class="search-select">
                     <div class="input-wrapper">
                        <input class="select-input input" type="text" placeholder="Enter student email" v-model="email">
                        <p class="placeholder">Student Email</p>
                    </div>
                    <ul v-if="this.students.length > 0">
                        <li v-for="student in students" @click="chooseStudent(student[0],student[2])">
                            <p class="student-name">{{ student[1] }} </p >
                            <p class="student-email">{{ student[2] }}</p>
                        </li>
                    </ul>
                </div>

                <select v-model="payment.groupId" class="select user-group-select">
                    <option selected value="">Chose students group</option>
                    <option v-for="group in groups" :value="group.id">{{ group.name }}</option>
                </select>

                <div class="date">
                    <select v-model="payment.month" class="select">
                        <option :value=0>Chose a month</option>
                        <option :value=1>January</option>
                        <option :value=2>February</option>
                        <option :value=3>March</option>
                        <option :value=4>Aril</option>
                        <option :value=5>May</option>
                        <option :value=6>June</option>
                        <option :value=7>July</option>
                        <option :value=8>August</option>
                        <option :value=9>September</option>
                        <option :value=10>October</option>
                        <option :value=11>November</option>
                        <option :value=12>December</option>
                    </select>

                    <select v-model="payment.year" class="select">
                        <option value="0">Choose a year</option>
                        <option :value=2024>2024</option>
                        <option :value=2025>2025</option>
                        <option :value=2026>2026</option>
                        <option :value=2027>2027</option>
                        <option :value=2028>2028</option>
                        <option :value=2029>2029</option>
                    </select>
                </div>

                <div class="input-wrapper">
                        <input class="input" type="number" placeholder="Enter Payment Amount" v-model="payment.paymentAmount">
                        <p class="placeholder">Payment Amount</p>
                    </div>
            </section>
            <footer class="modal-footer">
                <button type="button" class="btn-green" @click="addPayment()"> 
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
                payment: {
                    userId: "",
                    groupId: "",
                    month: 0,
                    year: 0,
                    paymentAmount: 0,
                },
                students:[],
                groups:[],
                email:""

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

            async getUserGroups(){
                const response = await axios.get("http://localhost:8080/api/group/getUserGroups/" + this.payment.userId,{headers: {"Authorization": "Bearer " + localStorage.getItem('token')}});
                console.log(response)
                this.groups = response.data
            },
            chooseStudent(id,email){
                this.payment.userId = id;
                this.email = email;
                this.students = []
            },

            async addPayment(){
                console.log(this.payment)
                const response = await axios.post("http://localhost:8080/api/payment", this.payment,{headers: {"Authorization": "Bearer " + localStorage.getItem('token')}})
                console.log(response)
            }
        },

        watch: {
            email(){
                if(this.email.length >= 4){
                    this.searchUser();
                }
            },

            'payment.userId'(){
                console.log("working")
                this.getUserGroups()
            }
        },
        
        created: function(){
        }

    }
</script>



<style>
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
    display: flex;
    flex-direction: column;
    row-gap: 10px;
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
    position: relative;
    padding: 10px 30px;
    font-size: 24px;
    border: 2px solid grey;
  }

  .input{
    border: none;
    padding: 0;
    outline: none;
    font-size: 24px;
    background-color: transparent;
    width: 100%;
  }

  .placeholder{
    position: absolute;
    top: -14px;
    left: 5%;
    background-color: white;
    padding: 5px;
    font-size: 16px;
    color: #773DD3;
    font-weight: 700;
    display: none;
  }


.input-wrapper:focus-within{
    border-color: #773DD3;
}

.input-wrapper:focus-within .placeholder{
    display: block;
}

.search-select{
    width: 100%;
    position: relative;
}

.search-select ul{
    list-style: none;
    width: 100%;
    background-color: white;
    border: 2px solid #773DD3;
    border-top: none;
    position: absolute;
    left:0;
    right: 0;
    z-index: 99;
    max-height: 150px;
    overflow-y: scroll;
    
}

.search-select ul li:hover{
    background-color: rgb(225, 219, 219);
}

.search-select ul li{
    padding: 10px;
    cursor: pointer;
}

.student-name{
    color: black;
    font-weight: 600;
}

.student-email{
    font-size: 12px;
    color: rgb(110, 107, 107);
}

.select{
    padding: 10px 20px;
    width: 100%;
    outline: none;
    border: 2px solid grey;
    font-size: 20px;
}

.select:focus{
    border-color: #773DD3;
}

.date{
    display: flex;
    gap: 10px;
}




</style>