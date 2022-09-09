<template>
    <div class="container" style="padding-bottom: 50px;max-width: 400px; border: 1px solid #f2f4f5;">
        <NavBar></NavBar>
        <div class="padding-filter">
            <div style="display:flex; margin-bottom: 20px;">
                <button @click="filtershow" style="margin-top: 5px; background-color: white; border: none;"><i
                        class='bx bxs-filter-alt' style="color: #FF7519; font-size: 3rem;"></i></button>
                <div v-if="filterRender" class="select-box">
                    <select v-model="filter.year" @change="filterHandler" name="sample" id="sample" class="fa">
                        <option value="" selected>Year</option>
                        <option value="2022" class="fa">2022</option>
                        <option value="2021" class="fa">2021</option>
                        <option value="2020" class="fa">2020</option>
                        <option value="2019" class="fa">2019</option>
                        <option value="total" class="fa">Total</option>
                    </select>

                </div>
                <div v-if="(filter.year && filter.year !== 'total') && filterRender" class="select-box">
                    <select v-model="filter.month" @change="filterHandler" name="sample" id="sample" class="fa">
                        <option value="" selected>Month</option>
                        <option value="1" class="fa">Jan</option>
                        <option value="2" class="fa">Feb</option>
                        <option value="3" class="fa">March</option>
                        <option value="4" class="fa">April</option>
                        <option value="5" class="fa">May</option>
                        <option value="6" class="fa">June</option>
                        <option value="7" class="fa">July</option>
                        <option value="8" class="fa">Aug</option>
                        <option value="9" class="fa">Sep</option>
                        <option value="10" class="fa">Oct</option>
                        <option value="11" class="fa">Nov</option>
                        <option value="12" class="fa">Dec</option>
                    </select>
                </div>

                <div v-if="(filter.year || filter.month) && filterRender" style="margin-left: 20px" class="">
                    <button style="background-color:white;   border: none;" @click="cancelFilter"><i
                            class='bx bx-x-circle' style="font-size:4rem ; color: #FF7519"></i></button>
                </div>
            </div>
            <div style="margin: 135px" v-if="loading">
                <Loader />
            </div>
            <div v-else>
                <h2 style="font-size:1.5rem ; font-weight: 700;">Expenses summary</h2>
                <Pie v-if="data.length" :data="data" :labels="labels" />
                <div v-else>
                    <h5 style="color:#FF7519; font-weight:800; padding: 50px;">There are no expense's data!</h5>
                </div>
                <!-- <PieChart v-if="data.length" :data="data" :labels="labels" /> -->
                <h2 style="font-size:1.5rem ; font-weight: 700;">Income | Expense | Savings</h2>
                <BarChart v-if="totalData.length > 0" :totalData="totalData" :label="totalLabels" />
                <div v-else>
                    <h3>There are no transection history!</h3>
                </div>
            </div>

            <!-- <BarChart /> -->
        </div>
        <div v-if="limit > 0" class="notes">
            <p v-if="limit < expenseAmount " class="first">Expensive</p>
            <p v-else class="first">Cheep</p>
            <p class="second">
                <span v-if="perDayCost > 0">You have to cost per day <span style="color:#FF7519">{{perDayCost}}</span> tk </span>
                <span v-else> You alraedy cross your limit</span>
                <br />
                <b>N.B: Your have limt of spenting <span style="color:#FF7519">{{limit}} </span> tk but you have already spent <span style="color:#FF7519">{{ expenseAmount }}</span> tk</b>
            </p>
        </div>
    </div>
</template>
<script>
import { ref } from 'vue'
import axios from 'axios'
import NavBar from '../common/NavBar.vue';
import BarChart from '../common/ChartBar.vue'
import PieChart from '../common/PiChart.js'
import Loader from '../common/Loader.vue'
import Pie from '../common/Pie.vue';

export default {
    components: { BarChart, NavBar, PieChart, Pie, Loader },
    data() {
        return {
            filter: {
                year: '',
                month: ''
            },
            loading: true,
            data: [],
            totalData: [''],
            perDayCost: 0,
            expenseAmount: 0,
            totalLabels: ['Earn', 'Cost', 'Save'],
            labels: [],
            userId: '62b88f52d21490416a74fc91',
            filterRender: false,
            limit: 0,
            colorArray: ['aqua', 'black', 'blue', 'fuchsia', 'gray', 'green',
                'lime', 'maroon', 'navy', 'olive', 'orange', 'purple', 'red',
                'silver', 'teal', 'white', 'yellow']
        };
    },
    watch : {
        limit (newLimit, oldQuestion) {
            let d = new Date();
            let days = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
                    let rest_date = days - d.getDate();
                   setTimeout(() => {
                    let targetAvg = (newLimit - this.expenseAmount)/rest_date;
                    this.perDayCost = Math.trunc(targetAvg);
                   }, 1000)
        }
    },
    methods: {
        filterHandler() {
            if (this.filter.year === 'total') {
                let url = `https://my-cash-app.herokuapp.com/budget/${this.userId}/`;
                this.getAllTransection(url);
                this.getMonthTarget(
                    `https://my-cash-app.herokuapp.com/target/${this.userId}`
                )
                return;
            }
            let month = parseInt(this.filter.month, 10);
            let year = parseInt(this.filter.year, 10);
            if (month > 0 && year > 0) {
                let url = `https://my-cash-app.herokuapp.com/budget/month/${this.userId}/${month}/${year}`;
                this.getAllTransection(url)
                this.getMonthTarget(
                    `https://my-cash-app.herokuapp.com/target/${this.userId}/${month}/${year}`
                )
            }
        },
        cancelFilter() {
            this.filter.month = '';
            this.filter.year = '';
            this.filterRender = false;
            this.getAllTransection();
        },
        filtershow() {
            this.filterRender = !this.filterRender;
        },
        prepareAllTransactionData(data) {
            var flags = [], labels = [], amount = [], credit = [], l = data.length, i;
            let dTotal = 0, cTotal = 0;
            for (i = 0; i < l; i++) {
                if (data[i].budget_type === 'debit') {
                    dTotal = dTotal + data[i]?.amount;
                    if (flags[data[i].purpose]) continue;
                    flags[data[i].purpose] = true;
                    const result = data.filter(budget => budget.purpose === data[i].purpose);
                    const sum = result.reduce((accumulator, object) => {
                        return accumulator + object.amount;
                    }, 0);
                    labels.push(data[i].purpose);
                    amount.push(sum)
                    // output.push({
                    //     name: data[i].purpose, amount: sum, legendFontColor: this.colorArray[i],
                    //     legendFontSize: 12, color: this.colorArray[i]
                    // });
                } else {
                    cTotal = cTotal + data[i]?.amount;
                    if (flags[data[i].purpose]) continue;
                    flags[data[i].purpose] = true;
                    const result = data.filter(budget => budget.purpose === data[i].purpose);
                    const sum = result.reduce((accumulator, object) => {
                        return accumulator + object.amount;
                    }, 0);
                    credit.push({
                        name: data[i].purpose, amount: sum, legendFontColor: this.colorArray[i],
                        legendFontSize: 12, color: this.colorArray[i]
                    });
                }
            }
            this.data = amount;
            this.labels = labels
            let totalData = [cTotal, dTotal, cTotal - dTotal]
            this.totalData = totalData;
            this.expenseAmount = dTotal;
        },
        async getAllTransection(customUrl = '') {
            const d = new Date();
            let year = d.getFullYear();
            let month = d.getMonth() + 1;

            let that = this;
            that.loading = true;
            let url = customUrl.length > 1 ? customUrl : `https://my-cash-app.herokuapp.com/budget/month/${this.userId}/${month}/${year}`;
            await axios.get(url)
                .then(async function (response) {
                    that.prepareAllTransactionData(response.data.reverse());
                    that.loading = false;
                    // getEachMonthCostTotal(response.data);
                    // setLoading(false);
                }).catch(function (error) {
                    that.loading = false;
                })
                .then(function () {
                });
        },
        async getMonthTarget(url = '') {
            const d = new Date();
            let year = d.getFullYear();
            let month = d.getMonth() + 1;
            let that = this;
            url = url.length ? url : `https://my-cash-app.herokuapp.com/target/${this.userId}/${month}/${year}`;
            // We have data!!
            await axios.get(url)
                .then(async function (response) {
                    let totalTarget = 0;
                    response?.data?.map((item) => {
                        totalTarget = totalTarget + item?.target_ammount;
                    })
                    that.limit = totalTarget
                }).catch(function (error) {
                    // handle error
                })
                .then(function () {
                    // always executed
                });
        }
    },
    mounted() {
        this.getAllTransection();
        this.getMonthTarget();
    },
};
</script>

<style scoped>
.select-box {
    display: inline-block;
    border-radius: 2px;
    box-shadow: 1px 4px 4px #FF7519;
    margin-left: 18px;
    max-height: 38px;
}

select:focus {
    outline: none;
}

.fa {
    font-family: 'Lato', 'Font Awesome 5 Free', 'Font Awesome 5 Brands';
    font-weight: 900;
    padding: 1rem 2rem;
    color: #FF7519;
    border: none;

}

/* for product */
/* * {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
} */



.notes {
  width: 100%;
  height: 150px;
  background-color: #f1f1f1;
  padding: 20px;
  margin: 50px auto;
  border: 1px solid #ddd;
  text-align: center;
  box-shadow: 5px 5px 10px #ddd inset, -5px -5px 10px #ddd inset;
}

.first {
  background-color: #FF7519;
  position: relative;
  left: -40px;
  color: #fff;
  font-weight: bold;
}

.first {
  width: 300px;
  padding: 10px 0;
  font-size: 20px;
}

.first::after {
  content: "";
  height: 100%;
  width: 10px;
  position: absolute;
  right: -6px;
  top: 0;
  background-color: #2e1606;
  transform: skew(10deg);
}

.first::before {
  content: "";
  border: 10px solid;
  border-color: #2e1606 #2e1606 transparent transparent;
  position: absolute;
  left: 0;
  bottom: -20px;
}


.second {
  line-height: 1.6;
  font-size: 14px;
  font-style: italic;
  color: #444;
}
</style>