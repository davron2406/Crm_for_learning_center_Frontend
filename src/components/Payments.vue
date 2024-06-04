<template>
    <div class="payments main-container">
        <h1> PAYMENTS </h1>

        <div class="table-container">
            <div class="input-wrapper search-input-wrapper">
                <input type="text" class="input" placeholder="Enter user email to search" v-model="email" @change="searchPayment()">
                <p class="placeholder search-placeholder">User email</p>
            </div>
            
            <table class="table">
                <thead class="table-header">
                    <tr class="table-header-row">
                        <th>Full Name</th>
                        <th>Group</th>
                        <th>Month</th>
                        <th>Year</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody class="table-body">
                    <tr v-for="payment in payments" class="table-body-row">
                        <td>{{ payment.fullName }}</td>
                        <td>{{ payment.groupName }}</td>
                        <td>{{ payment.month }}</td>
                        <td>{{ payment.year }}</td>
                        <td>{{ payment.paymentAmounts }}</td>
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
            
            <div class="table-footer-button">
                <button @click="showModal()" class="add-button">ADD PAYMENT</button>
            </div>
           
        </div>
        <AddPaymentModal v-if="this.isModalOpen" @close-modal="closeModal"></AddPaymentModal>
    </div>
</template>

<script>
import AddPaymentModal from './AddPaymentModal.vue';
import axios from 'axios';
    export default{

        components:{
            AddPaymentModal,
        },
        data(){
            return{
                isModalOpen: false,
                payments: [],
                defaultPageSize: 10,
                pageNumber: 0,
                totalPages : 0,
                email: "",
                isSearching: false
            }
        },

        methods: {
            showModal(){
                this.isModalOpen = true;
            },

            closeModal(){
                this.isModalOpen = false;
            },

            async getPayments(pageSize,pageNumber){
                const response = await axios.get("http://localhost:8080/api/payment?pageNumber="+ pageNumber + "&pageSize="+pageSize, {headers: {"Authorization": "Bearer " + localStorage.getItem('token')}});
                this.payments = response.data.content;
                this.totalPages = response.data.totalPages;
                this.pageNumber = response.data.number
            },

            async searchPayment(pageSize,pageNumber){
                const response = await axios.get("http://localhost:8080/api/payment/getUserPayments/" + this.email + "?pageNumber=" + pageNumber + "&pageSize=" + pageSize, {headers: {"Authorization": "Bearer " + localStorage.getItem('token')}})
                this.payments = response.data.content
                this.pageNumber = response.data.number
                this.totalPages = response.data.totalPages
                this.isSearching = true;
            },

            forward(){
                if(this.pageNumber + 2 <= this.totalPages){
                    this.pageNumber++;
                    if(this.isSearching == false){
                        this.getPayments(this.defaultPageSize,this.pageNumber)
                    }

                    this.searchPayment(this.defaultPageSize,this.pageNumber
                    )
                }
            },

            backward(){
                if(this.pageNumber > 0){
                    this.pageNumber--;
                    if(this.isSearching == false){
                        this.getPayments(this.defaultPageSize,this.pageNumber)
                    }

                    this.searchPayment(this.defaultPageSize,this.pageNumber
                    )
                
                }
            }
        },

        created: function(){
            this.getPayments(this.defaultPageSize,this.pageNumber);
        },

        watch: {
            email(){
                if(this.email == ""){
                    this.getPayments(this.defaultPageSize,this.pageNumber)
                    this.isSearching=false;
                }
            }
        }
    }
</script>

<style>

    .payments{
        width: 100%;
        background: rgb(230, 227, 227);
    }

    .main-container{
        overflow-y: scroll;
        max-height: 100vh;
    }

    .payments h1{
        margin-bottom: 20px;
    }

    .table-container{
        width: 90%;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .table{
        border-spacing: 1;
        border-collapse: collapse;
        background: #fff;
        border-radius: 10px;
        overflow: hidden;
        width: 100%;
        margin: 0 auto;
        position: relative;
    }

    .table *{
        position: relative;
    }

    .table-header-row{
        height: 60px;
        background: #36304a;
    }

    .table-header-row th{
        font-family: OpenSans-Regular;
        font-size: 18px;
        color: #fff;
        line-height: 1.2;
        font-weight: unset;
    }

    .table-body-row{
        height: 50px;
    }

    .table-body-row{
        font-family: OpenSans-Regular;
        font-size: 15px;
        color: gray;
        line-height: 1.2;
        font-weight: unset;
        text-align: center;
    }

    .table-body tr:nth-child(even){
        background-color: #f5f5f5;
    }

    .search-input-wrapper{
        width: 50%;
        border-radius: 20px;
    }

    .search-placeholder{
        background-color: rgb(230, 227, 227);
    }
    

    .table-control{
        display: flex;
        align-items: center;
        gap: 5px;
        justify-content: center;
    }

    .backward-button, .forward-button{
        width: 30px;
        height: 30px;
        background-color: #36304a;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        position: relative;
    }

    .backward-button span, .forward-button span{
        text-align: center;
        color: rgb(227, 223, 223);
        
    }

    .backward-button span{
        position: relative;
        left: 4px;
    }

    .table-footer-button{
        width: 50%;
    }



    .add-button {
        --b: 3px;   /* border thickness */
        --s: .45em; /* size of the corner */
        --color: #373B44;
        
        padding: calc(.5em + var(--s)) calc(.9em + var(--s));
        color: var(--color);
        --_p: var(--s);
        background:
            conic-gradient(from 90deg at var(--b) var(--b),#0000 90deg,var(--color) 0)
            var(--_p) var(--_p)/calc(100% - var(--b) - 2*var(--_p)) calc(100% - var(--b) - 2*var(--_p));
        transition: .3s linear, color 0s, background-color 0s;
        outline: var(--b) solid #0000;
        outline-offset: .6em;
        font-size: 16px;

        border: 0;

        user-select: none;
        -webkit-user-select: none;
        touch-action: manipulation;
        width: 200px;
    }

    .add-button:hover,
    .add-button:focus-visible{
        --_p: 0px;
        outline-color: var(--color);
        outline-offset: .05em;
    }

    .add-button:active {
        background: var(--color);
        color: #fff;
    }

</style>
