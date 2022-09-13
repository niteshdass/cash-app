<template>
    <div class="container" style="max-width: 400px; border: 1px solid #f2f4f5;">
        <NavBar></NavBar>
        <div style="margin: 135px" v-if="loading">
            <Loader />
        </div>
        <div v-else class="wrapper">
            <h2 style="font-size:1.5rem ; font-weight: 700; color:midnightblue">Borrower summary</h2>
            <button style="margin-top: -40px;" type="button" class="btn btn-labeled btn-primay app" data-toggle="modal"
                data-target="#myModal">
                <span class="btn-label"><i class="glyphicon glyphicon-plus"></i></span></button>
            <div class="notes">
                <div style="display:flex; text-align: center;">
                    <h5 style="width: 50%; right: 0;">To borrow</h5>
                    <h5 style="color:#FF7519">{{ borrower_total }} </h5>
                </div>

                <div style="display:flex; text-align: center; border-bottom: 1px solid #FF7519;">
                    <h5 style="width: 50%; right: 0;">To Lend</h5>
                    <h5 style="color:#FF7519">{{ lender_total }} </h5>
                </div>
                <div style="display:flex; text-align: center;">
                    <h5 style="width: 50%; right: 0;">Total borrow</h5>
                    <h5 style="color:#FF7519">{{ borrower_total - lender_total }} </h5>
                </div>
            </div>
            <h2 style="font-size:1.5rem ; font-weight: 700; color:midnightblue">Borrower list</h2>
            <article class="">
                <section class="list">
                    <div v-if="borrower.length > 0" class="list-item" v-for="(item, index) in borrower"
                        :style="'--order:' + index + ';'">
                        <!-- {{ item }} -->
                        <div class="thumbnail">
                            <i v-if="item.loan_type === 'borrower'" style="color: green"
                                class="glyphicon glyphicon-plus"></i>
                            <i v-else class="glyphicon glyphicon-minus"></i>
                        </div>
                        <div class="item-body">
                            <div style="display:flex">
                                <h4>{{ item.name }} </h4>
                                <p> &nbsp; {{ item.amount }} tk &nbsp; {{ item.date }}</p>
                            </div>
                            <p>{{ item.note }}</p>
                        </div>
                        <button style="border: none; background:white" @click="deleteBorrower(item.id)"><i
                                style="color: #1b1796; font-size: 20px" class="glyphicon glyphicon-trash"></i></button>
                    </div>
                    <div v-else>
                        <h4>Borrower not found !</h4>
                    </div>
                </section>
            </article>
            <article v-if="user?.length === 0" class="">
                <section class="list">
                    <div >
                        <h4 style="color:#FF7519">There are no borrower listed yet. 
                            please go to <router-link to="/settings">Settings</router-link> page and listing
                            borrower</h4>
                    </div>
                </section>
            </article>
            <div class="modal" id="myModal" style="border-radius: 10px">
                <div class="modal-dialog">
                    <div class="modal-content">

                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                        </div>

                        <!-- Modal body -->
                        <div class="modal-body">
                            <form class="form-inline">
                                <div class="form-group">
                                    <label></label>
                                    <select v-model="name" class="select" id="sel1" placeholder="Amount">
                                        <option value="" selected>Borrower</option>
                                        <option v-for="(item, index) in user" :value="item">{{ item }}</option>
                                    </select>
                                </div>
                                <input v-model="amount" type="number" class="form-control my-form" placeholder="Amount">
                                <div class="form-group">
                                    <label></label>
                                    <select v-model="loan_type" class="select" id="sel1" placeholder="Amount">
                                        <option value="" selected>Borrow type</option>
                                        <option value="borrower">Borrower</option>
                                        <option value="lender">Lender</option>
                                    </select>
                                </div>
                                <input v-model="refound_date" type="text" class="form-control my-form"
                                    placeholder="Note">
                                <button @click="addTransaction" class="btn btn-primary my-button"
                                    data-dismiss="modal">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { ref } from 'vue'
import NavBar from '../common/NavBar.vue';
import axios from 'axios';
import BarChart from '../common/ChartBar.vue'
import PieChart from '../common/PiChart.js'
import Loader from '../common/Loader.vue'

export default {
    components: { BarChart, NavBar, PieChart, Loader },
    data() {
        return {
            userId: localStorage.getItem("id"),
            borrower_total: 0,
            lender_total: 0,
            loading: true,
            borrower: [],
            user: [],
            name: '',
            refound_date: '',
            loan_type: '',
            amount: ''
        };
    },
    methods: {
        async deleteBorrower(id) {
            try {
                this.$swal.fire({
                icon: 'warning',
                title: 'Delete',
                text: 'Are you sure delete the borrower?',
                showCancelButton: true,
                confirmButtonText: 'Delete',
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        this.loading = true;
                        let that = this;
                        await axios.delete(`https://my-cash-app.herokuapp.com/loan/${id}`);
                        that.getLoan();
                    }
                })
            } catch {
                this.loading = false;
                this.errorMessage('Somethings went wrong!')
            }
        },
        errorMessage(message = 'All fields are required!') {
            this.$swal.fire(
                {
                    icon: 'error',
                    title: 'Oops...',
                    text: message,
                }
            );
        },
        formatDate() {
            var d = new Date(),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;

            return [year, month, day].join('-');
        },
        async addTransaction() {
           try {
                if (this.amount && this.loan_type && this.refound_date && this.name) {
                    let date = this.formatDate();
                    const budget = {
                        amount: this.amount, name: this.name, loan_type: this.loan_type, date, refound_date: this.refound_date, user_id: this.userId
                    }
                    try {
                        this.loading = true;
                        let that = this;
                        const result = await axios.post("https://my-cash-app.herokuapp.com/loan/", budget);
                        if (result) {
                            this.getLoan();
                        }
                        that.loading = false;
                    } catch {
                        this.loading = false;
                        this.errorMessage('Something went wrong!')
                    }
                } else {
                    this.errorMessage()
                }
           } catch {
                this.errorMessage('Something went wrong!') 
           }
        },
        calculationLoan(data, that) {
            that.borrower = [];
            let borrower_total = 0;
            let lender_total = 0;
            data?.map(item => {
                if (item?.loan_type === "borrower") {
                    borrower_total = borrower_total + item?.amount
                } else {
                    lender_total = lender_total + item?.amount;
                }
            })
            this.lender_total = lender_total;
            this.borrower_total = borrower_total;
            var flags = [], output = [], i;
            for (i = 0; i < data?.length; i++) {
                if (flags[data[i].name]?.status) {
                    flags[data[i].name] = {
                        status: true,
                        amount: flags[data[i].name]?.amount + data[i].amount,
                        loan_type: data[i].loan_type,
                        name: data[i].name,
                        date: data[i].date,
                        note: `${flags[data[i].name]?.note} , ${data[i].refound_date}`,
                        id: data[i]?._id
                    };
                    continue
                };
                flags[data[i].name] = {
                    status: true,
                    amount: data[i].amount,
                    loan_type: data[i].loan_type,
                    name: data[i].name,
                    date: data[i].date,
                    note: data[i].refound_date,
                    id: data[i]?._id
                };
            }
            Object.keys(flags).forEach(function (key, index) {
                that.borrower.push(flags[key])
            });
        },
        async getLoan() {
            this.loading = true;
            let that = this;
            await axios.get(`https://my-cash-app.herokuapp.com/loan/${this.userId}`)
                .then((response) => {
                    if (response?.data?.length) {
                        this.calculationLoan(response?.data?.reverse(), that)
                    }
                    that.loading = false;
                }).catch(function (error) {
                    // handle error
                    that.loading = false;
                })
                .then(function () {
                    // always executed
                });
        },
        prepareCategoryData(data, that) {
            let loandata = [];
            data?.map(item => {
                if (item?.slug === "loan") {
                    loandata.push(item);
                }
            })
            loandata?.map((item) => {
                that.user.push(item?.name)
            })
        },
        async getBorrower() {
            this.loading = true;
            let that = this;
            await axios.get(`https://my-cash-app.herokuapp.com/category/${this.userId}`)
                .then(async function (response) {
                    response?.data && (
                        that.prepareCategoryData(response?.data, that)
                    );
                    that.loading = false;
                }).catch(function (error) {
                    // handle error
                    that.loading = false;
                })
                .then(function () {
                    // always executed
                });
        }
    },
    mounted() {
        if (localStorage.getItem("id")) {
            this.getLoan();
            this.getBorrower();
        } else {
            window.location.href = '/';
        }
    },
};
</script>
<style scoped>
.notes {
    width: 100%;
    height: 150px;
    background-color: #f1f1f1;
    padding: 20px;
    margin: 20px auto;
    border: 1px solid #ddd;
    text-align: center;
    box-shadow: 5px 5px 10px #ddd inset, -5px -5px 10px #ddd inset;
}
</style>