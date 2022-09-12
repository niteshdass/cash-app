<template>
     <header style="background-color: #f2f4f5;" class="header" id="header">
        <nav class="nav container">
            <!-- <a  style="margin-left: -114px;" href="#" class="nav__logo"> <i class='bx bx-left-arrow-alt nav__icon'></i></a> -->

            <div class="nav__menu" id="nav-menu">
                <ul class="nav__list">
                    <li class="nav__item">
                        <router-link class="nav__link" to="/home" exact>
                            <i class='bx bx-home-alt nav__icon'></i>
                            <span class="nav__name">Home</span>
                        </router-link>
                    </li>

                    <li class="nav__item">
                        <router-link class="nav__link" to="/transactions" exact>
                            <i class='bx bx bx-plus-medical nav__icon'></i>
                            <span class="nav__name">Transactions</span>
                        </router-link>
                    </li>

                     <li class="nav__item">
                        <router-link class="nav__link" to="/borrower" exact>
                            <i class='bx bx-user nav__icon'></i>
                            <span class="nav__name">Borrower</span>
                        </router-link>
                    </li>
                    
                    <li class="nav__item">
                        <router-link class="nav__link" to="/budgets" exact>
                            <i class='bx bx-briefcase-alt nav__icon'></i>
                            <span class="nav__name">Budgets</span>
                        </router-link>
                    </li>

                   <li class="nav__item">
                        <router-link class="nav__link" to="/settings" exact>
                            <i class='bx bxs-cog nav__icon'></i>
                            <span class="nav__name">Settings</span>
                        </router-link>
                    </li>

                    <li @click="logOut" class="nav__item">
                        <div class="nav__link">
                        <i style="font-size: large;" class="glyphicon glyphicon-log-out nav__icon"></i>
                        <span class="nav__name">Logout</span>
                        </div>
                    </li>
                </ul>
            </div>

            <img src="assets/img/perfil.png" alt="" class="nav__img">
        </nav>
    </header>
</template>
<script>
    export default {
        data () {
            return {

            }
        },
        methods : {
            logOut () {
                this.$swal.fire({
                icon: 'warning',
                title: 'Logout',
                text: 'Do you want to logout this session?',
                showCancelButton: true,
                confirmButtonText: 'Logout',
            }).then(async (result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    localStorage.removeItem("id");
                    window.location.href = '/';
                }
            })
            }
        }
    }
</script>