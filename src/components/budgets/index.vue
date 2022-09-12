<template>
    <div class="container" style="max-width: 400px; border: 1px solid #f2f4f5;">
        <NavBar></NavBar>
        <button type="button" class="btn btn-labeled btn-primay app" data-toggle="modal" data-target="#myModal">
            <span class="btn-label"><i class="glyphicon glyphicon-plus"></i></span></button>
        <Loader style="margin: 40%" v-if="loading"></Loader>
        <div v-else>
            <h2 style="font-size:1.5rem ; font-weight: 700;">Budget limit's</h2>
            <article class="">
                <section class="list">
                    <div class="list-item" v-for="(item, index) in list" :style="'--order:' + index + ';'">
                    <div style="display: flex; width: 95%; padding-top: 16px;">
                            <div class="thumbnail">
                                <i class="glyphicon glyphicon-calendar"></i>
                            </div>
                            <div class="item-body" style="display:contents">
                                <h3 style="margin: 0px 5px">{{ months[item?.month - 1]}}</h3>
                                <h4 style="padding: 10px 5px">{{ item?.target_ammount}} tk</h4>
                            </div>
                        </div>
                        <button
                            style="border: none; background:white; right: 0;"
                            @click="deleteData(item?.target_ammount, item?.month)"
                            data-toggle="modal" data-target="#myModal"
                        >
                            <i style="color: #1b1796; font-size: 20px"
                                class="glyphicon glyphicon-edit">
                            </i>
                        </button>
                    </div>

                </section>
            </article>
        </div>
        <div class="modal" id="myModal" style="border-radius: 10px">
            <div class="modal-dialog">
                <div class="modal-content">

                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                    </div>

                    <!-- Modal body -->
                    <div class="modal-body">
                        <form class="form-inline">
                            <input v-model="target_ammount" type="number" class="form-control my-form" placeholder="Enter your amount limit" id="email">
                            <div class="form-group">
                                <label></label>
                                <select style=" width: 305px;" v-model="month" class="select" id="sel1">
                                    <option value="" selected>Select month</option>
                                    <option v-for="(item, index) in months" :value="index + 1">{{ item }}</option>
                                </select>
                            </div>
                            <button @click="submitData" data-dismiss="modal" class="btn btn-primary my-button">Submit</button>
                        </form>
                    </div>

                    <!-- Modal footer
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                    </div> -->

                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import NavBar from '../common/NavBar.vue';
import Loader from '../common/Loader.vue';
export default {
    components: {
        NavBar,
        Loader
    },
    data() {
        return {
            list: [],
            loading: true,
            user_id: localStorage.getItem("id"),
            target_ammount: '',
            month: 0,
            months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        }
    },
    methods: {
        errorMessage(message = 'All fields are required!') {
            this.$swal.fire(
                {
                    icon: 'error',
                    title: 'Oops...',
                    text: message,
                }
            );
        },
        async deleteData (amount, month) {
            this.target_ammount = amount;
            this.month = month
        },
        async submitData () {
          try {
            const d = new Date();
            let year = d.getFullYear();
            let month = d.getMonth() + 1;
            if (this.target_ammount > 0 && this.month > 0) {
                this.loading = true;
                let that = this;
                let target = {
                target_ammount: this.target_ammount,
                month: this.month,
                year,
                user_id: this.user_id
            }
            const result = await axios.post("https://my-cash-app.herokuapp.com/target/", target);
            if (result) {
                that.loading = false;
                this.target_ammount = '';
                this.month = month;
                that.getLimitData()

            } else {
                this.errorMessage('Somethings went wrong!')
            }

            } else {
                this.errorMessage()
            }

          } catch {
              this.errorMessage('Somethings went wrong!')
          }
        },
        async getLimitData() {
            try {
                let that = this;
                this.loading = true;
                await axios.get(`https://my-cash-app.herokuapp.com/target/${this.user_id}`)
                    .then(async function (response) {
                        that.loading = false;
                        that.list = response?.data;
                        // setMonthTarget(response?.data?.reverse());
                    }).catch(function (error) {
                        this.loading = false;
                    })
                    .then(function () {
                        // always executed
                    });
            } catch {
                this.loading = false;
            }
        }
    },
    mounted() {
        if (localStorage.getItem("id")) {
            this.getLimitData();
            const d = new Date();
            let month = d.getMonth() + 1;
            this.month = month;
        } else {
            window.location.href = '/';
        }
    }
}
</script>

<style scoped>
    .btn-labeled {
        margin-top: 10px;
    }
    @media screen and (min-width: 576px) {
        .btn-labeled {
        margin-top: 50px;
        margin-left: 320px;
    }
}
</style>
