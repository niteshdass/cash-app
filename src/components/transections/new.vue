<script setup>
import { ref } from 'vue';

let form = ref({
    name:'',
    photo: 'uploaded'
})

const getPhoto = () => {
    let photo = "/upload/image.png"
    if (form.value.photo) {
        if(form.value.photo.indexOf('base64') != -1) {
            photo = form.value.photo
        } else {
            photo = '/upload/'+form.value.photo
        }
    }
    return photo;
}

const updatePhoto = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    let limit = 1024 * 1024 * 2;
    if (file['size'] > limit) {
        return false;
    }
    reader.onloadend = (file) => {
        form.value.photo = reader.result;
    }
    reader.readAsDataURL(file);
}
const saveProduct = () => {
    let value = form.value;
    axios.post("/api/add_new_product", value)
    .then(response => console.log(response))
    .catch(error => {
      console.error("There was an error!", error);
    });
}
</script>

<template>
     <div class="container">
<div class="products__create ">
    
             <div class="products__create__titlebar dflex justify-content-between align-items-center">
                 <div class="products__create__titlebar--item">
                     
                     <h1 class="my-1">Add Product</h1>
                 </div>
                 <div class="products__create__titlebar--item">
                     
                     <button @click="saveProduct"  class="btn btn-secondary ml-1" >
                         Save
                     </button>
                 </div>
             </div>

             <div class="products__create__cardWrapper mt-2">
                 <div class="products__create__main">
                     <div class="products__create__main--addInfo card py-2 px-2 bg-white">
                         <p class="mb-1">Name</p>
                         <input type="text" class="input" v-model="form.name">
                         
                         <div class="products__create__main--media--images mt-2">
                            <ul class="products__create__main--media--images--list list-unstyled">
                                <li class="products__create__main--media--images--item">
                                    <div class="products__create__main--media--images--item--imgWrapper">
                                        <img class="products__create__main--media--images--item--img" alt="" :src="getPhoto()" />  
                                    </div>
                                </li>
                                <!-- upload image small -->
                                <li class="products__create__main--media--images--item">
                                    <form class="products__create__main--media--images--item--form">
                                        <label class="products__create__main--media--images--item--form--label" for="myfile">Add Image</label>
                                        <input class="products__create__main--media--images--item--form--input" type="file" id="myfile" @change="updatePhoto" >
                                    </form>
                                </li>
                            </ul>
                        </div>
                    
                     </div>

                 </div>
             </div>
             <!-- Footer Bar -->
             <div class="dflex justify-content-between align-items-center my-3">
                 <p ></p>
                 <button @click="saveProduct"  class="btn btn-secondary" >Save</button>
             </div>
         
     </div>
     </div>
</template>