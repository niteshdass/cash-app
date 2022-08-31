<template>
    <div>
        <canvas :id="chartId" width="auto" height="auto"></canvas>
    </div>
</template>
<script>

    import Chart from 'chart.js/auto';
    export default({
        name: 'CardChart',
        props: ['data', 'labels'],
        data() {
            return {
                loading: false,
                chartId: 'chartId',
                chartHeight: 'auto',
                chartWidth: 'auto',
                myData: this.data,
                chartLabels: this.labels
            }
        },
        watch: {
            data(newQuestion, oldQuestion) {
                console.log(this.data, 'chh')
                this.myData = this.data;
                this.chartLabels = this.labels;
                this.updateChart('chartId');
            }
        },
        methods: {
            updateChart(id) {
                window[id].destroy();
                var options = {
                    type: 'pie',
                    data: {
                        labels: this.chartLabels,
                        datasets: [
                            {
                                bezierCurve: false,
                                label: '',
                                borderWidth: 1,
                                borderColor: [
                                    'rgba(255, 99, 132, 1)',
                                    'rgba(54, 162, 235, 1)',
                                    'rgba(255, 206, 86, 1)',
                                    'rgba(75, 192, 192, 1)',
                                    'rgba(153, 102, 255, 1)',
                                    'rgba(255, 159, 64, 1)'
                                ],
                                backgroundColor: [
                                    'rgba(255, 99, 132, 1)',
                                    'rgba(54, 162, 235, 1)',
                                    'rgba(255, 206, 86, 1)',
                                    'rgba(75, 192, 192, 1)',
                                    'rgba(153, 102, 255, 1)',
                                    'rgba(255, 159, 64, 1)'
                                ],
                                data: this.myData,
                                fill: true,
                            }
                        ]
                    },
                    options: {}
                }
                var ctx = document.getElementById(this.chartId).getContext('2d');
                window[this.chartId] = new Chart(ctx, options);
            },
            generateChart() {
                var options = {
                    type: 'pie',
                    data: {
                        labels: this.chartLabels,
                        datasets: [
                            {
                                bezierCurve: false,
                                label: '',
                                borderWidth: 1,
                                borderColor: [
                                    'rgba(255, 99, 132, 1)',
                                    'rgba(54, 162, 235, 1)',
                                    'rgba(255, 206, 86, 1)',
                                    'rgba(75, 192, 192, 1)',
                                    'rgba(153, 102, 255, 1)',
                                    'rgba(255, 159, 64, 1)'
                                ],
                                backgroundColor: [
                                    'rgba(255, 99, 132, 1)',
                                    'rgba(54, 162, 235, 1)',
                                    'rgba(255, 206, 86, 1)',
                                    'rgba(75, 192, 192, 1)',
                                    'rgba(153, 102, 255, 1)',
                                    'rgba(255, 159, 64, 1)'
                                ],
                                data: this.myData,
                                fill: true,
                            }
                        ]
                    },
                    options: {}
                }
                var ctx = document.getElementById(this.chartId).getContext('2d');
                window[this.chartId] = new Chart(ctx, options);
            }
        },
        mounted() {

            this.generateChart();
        }
    })
    </script>