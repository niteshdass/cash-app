<template>
    <div class="container" style="max-width: 400px; border: 1px solid #f2f4f5;">
        <NavBar></NavBar>
        <button type="button" class="btn btn-labeled btn-primay app" data-toggle="modal" data-target="#myModal">
            <span class="btn-label"><i class="glyphicon glyphicon-plus"></i></span></button>
        <article class="">
            <section class="list">
                <div class="list-item" v-for="(item, index) in list" :style="'--order:' + index + ';'">
                    <div class="thumbnail">
                        <i class="glyphicon glyphicon-plus"></i>
                    </div>
                    <div class="item-body">
                        <h4>{{ item.title }}</h4>
                        <p>{{ item.desc }}</p>
                    </div>
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
                        <form class="form-inline" action="/action_page.php">
                            <input type="email" class="form-control my-form" placeholder="Enter email" id="email">
                            <input type="password" class="form-control my-form" placeholder="Enter password" id="pwd">
                            <button type="submit" class="btn btn-primary my-button">Submit</button>
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
import NavBar from '../common/NavBar.vue';
export default {
    components: {
        NavBar
    },
    data() {
        return {
            list: [
                {
                    title: "Pepe Raina",
                    desc: "Goal Keeper Center attacking midfielder Center attacking midfielder",
                    image: 'https://via.placeholder.com/52/7C83FD/FFFFFF?text=GK'
                },
                {
                    title: "Peter Cech",
                    desc: "Goal Keeper",
                    image: 'https://via.placeholder.com/52/96BAFF/FFFFFF?text=GK'
                },
                {
                    title: "Luka Modric",
                    desc: "Center attacking midfielder",
                    image: 'https://via.placeholder.com/52/7DEDFF/FFFFFF?text=CF'
                },
                {
                    title: "Andres Iniesta",
                    desc: "Center midfielder",
                    image: 'https://via.placeholder.com/52/C490E4/FFFFFF?text=CM'
                },
                {
                    title: "Pepe Raina",
                    desc: "Goal Keeper",
                    image: 'https://via.placeholder.com/52/7C83FD/FFFFFF?text=GK'
                },
                {
                    title: "Peter Cech",
                    desc: "Goal Keeper",
                    image: 'https://via.placeholder.com/52/96BAFF/FFFFFF?text=GK'
                },
                {
                    title: "Luka Modric",
                    desc: "Center attacking midfielder Center attacking midfielder Center attacking midfielder",
                    image: 'https://via.placeholder.com/52/7DEDFF/FFFFFF?text=CF'
                },
                {
                    title: "Andres Iniesta",
                    desc: "Center midfielder",
                    image: 'https://via.placeholder.com/52/C490E4/FFFFFF?text=CM'
                },
                {
                    title: "Pepe Raina",
                    desc: "Goal Keeper",
                    image: 'https://via.placeholder.com/52/7C83FD/FFFFFF?text=GK'
                },
                {
                    title: "Peter Cech",
                    desc: "Goal Keeper",
                    image: 'https://via.placeholder.com/52/96BAFF/FFFFFF?text=GK'
                },
                {
                    title: "Luka Modric",
                    desc: "Center attacking midfielder",
                    image: 'https://via.placeholder.com/52/7DEDFF/FFFFFF?text=CF'
                },
                {
                    title: "Andres Iniesta",
                    desc: "Center midfielder",
                    image: 'https://via.placeholder.com/52/C490E4/FFFFFF?text=CM'
                },
            ]
        }
    }
}
</script>

<style>
.container {
    color: #114273;
    font-family: sans-serif;
}

.app {
    margin-top: 50px;
    margin-bottom: 10px;
    margin-left: 280px;
}

article {
    background-color: #fff;
    box-shadow: 0 2px 12px 3px rgba(8, 8, 8, 0.15);
    border-radius: 0.5em;
    overflow: hidden;
}

section.header {
    text-align: center;
    padding: 1em;
    background-color: #2260a0;
    color: #fff;
}

section.list {
    display: flex;
    flex-flow: row wrap;
    padding: 1em;
}

section.list .list-item {
    flex: 0 1 320px;
    /* 	border-bottom: 1px solid #ddd; */
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    padding: 0.5em;
    gap: 1.4em;
}

.list-item h4 {
    font-size: 1.2em;
}

.list-item h4,
.list-item p {
    margin: 0 0 0.3em 0;
}

:is(.list-item) h4,
:is(.list-item) p {
    margin: 0 0 0.3em 0;
}

section.list .list-item .thumbnail {
    flex: 0 1 52px;
    font-size: 20px;
    text-align: center;
    color: white;
    background-color: #FF7519;
}

section.list .list-item .item-body {
    flex: 0 1 calc(100% - 52px);
}

/* Animation styles */

section.list .list-item {
    opacity: 0;
    animation: stagger ease-in 0.4s forwards 1;
    animation-delay: calc(var(--order) * 0.3s);
}

@keyframes stagger {
    from {
        opacity: 0;
        transform: translateY(80px);
    }

    to {
        opacity: 1;
        transform: translateY(0px);
    }
}
.my-form {
    max-width: 350px;
    min-height: 40px;
    margin: 20px;
    margin-left: 0px;
    padding: 25px;
    font-size: 18px;
    background-color: #ecf0f3;
    border-radius: 15px;
    box-shadow: 13px 13px 20px #cbced1, -13px -13px 20px #fff;
}
.my-button {
    width: 100%; height: 50px; background-color: #FF7519;
    margin-top: 30px;
    border-radius: 15px;
    box-shadow: 13px 13px 20px #cbced1, -13px -13px 20px #fff;
}
</style>