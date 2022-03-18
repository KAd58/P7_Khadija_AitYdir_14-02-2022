<template>
<main class="container">
    <!-- Section contenant le module de connexion -->
    <section class="col-10 col-md-5 mt-5 mx-auto p-3 bg-light rounded">  
        <form @submit.prevent="handleSubmit">
            <h1 class="text-center font-weight-bold" style="font-size:30px">CONNEXION</h1>
            <div class="form-group mt-3">
                <label for="inputEmail">Email:</label>
                <input v-on:keydown="isInvalid = false" v-model="inputEmail" type="email" class="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="votre email">    
            
            </div>
            <div class="form-group mt-3">
                <label for="inputPassword">Mot de passe:</label>
                <input v-on:keydown="isInvalid = false" v-model="inputPassword" type="password" class="form-control" id="inputPassword" aria-describedby="passwordHelp" placeholder="votre mot de passe">                        
               
            </div>
            <button type="submit" class="btn btn-primary  mt-2 w-50 shadow contrastBoutonNoir font-weight-bold">SE CONNECTER</button>
           <router-link to="/inscription"> <button type="submit" class="btn btn-primary contrastBoutonNoir text-white mt-2 w-50 pt-2 border-0 rounded shadow font-weight-bold">S'INSCRIRE</button></router-link> 
        </form>
    </section>
    <div v-show="isInvalid" class="invalidBox m-3" key="invalid" style="border-radius:60px">
        Veuillez vérifier vos informations de connexion.
    </div>  
   
</main>
</template>

<script>
import axios from "axios";
import router from "../router";
import "../main.css";

export default {
    name: "Accueil",
    data() {
        return {
            inputEmail: "",
            inputPassword: "",
            isInvalid: false
        }
    },
    methods: {
        handleSubmit() {

            if ( !this.inputEmail || !this.inputPassword ) {
                    return this.isInvalid = true;
                }

            axios.post("http://localhost:3000/api/auth/login", { 
                email : this.inputEmail,
                password: this.inputPassword
             })
            .then(function (res) {
                localStorage.setItem("token", res.data.token)
                localStorage.setItem("userId", res.data.userId)
                localStorage.setItem("userName", res.data.userName)
                localStorage.setItem("role", res.data.role)
                router.push({ path : 'Stream'});
            })
            .catch((error) => {
                this.isInvalid = true;
                console.log(error);
            })         
        }
    }
}    
</script>