<template>
    <div class="modal-backdrop-top">
        <div class="modal">
            <div class="modal-body">
                <p>{{ message }}</p>
            </div>

            <div class="confirm-modal-footer">
                <button class="no-button">No</button>
                <button class="yes-button">Yes</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        data(){
            return{

            }
        },

        props: {
            message: {
                type: String,
                required: true
            }
        }

    }
</script>

<style>

.modal-backdrop-top {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }

  .confirm-modal-footer{
    display: flex;
    border-top: 0.5px solid black;
    justify-content: space-between;
  }

  .no-button{
    width: 50%;
    padding:10px 0;
    background-color: red;
   }

   .yes-button{
    width: 50%;
    padding:10px 0;
    background-color: green;
   }
</style>