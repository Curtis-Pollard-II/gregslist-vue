<template>
  <form @submit.prevent="handleSubmit()" class="house-form">
    <h3 class="text-primary">List Your House</h3>
    <div class="row">

      <div class="col-4">
        <label class="form-label" for="year">Year</label>
        <input class="form-control" type="number" minlength="3" id="year" name="year" v-model="editable.year">
      </div>

      <div class="col-4">
        <label class="form-label" for="levels">Levels</label>
        <input class="form-control" type="number" minlength="3" id="levels" name="levels" v-model="editable.levels">
      </div>

      <div class="col-4">
        <label class="form-label" for="rooms">Bedrooms</label>
        <input class="form-control" type="number" id="bedrooms" name="bedrooms" v-model="editable.bedrooms">
      </div>

      <div class="col-4">
        <label class="form-label" for="bathrooms">Bathrooms</label>
        <input class="form-control" type="number" id="bathrooms" name="bathrooms" v-model="editable.bathrooms">
      </div>

      <label class="form-label" for="price">Price</label>
      <input class="form-control" type="number" min="1000" id="price" name="price" v-model="editable.price">

      <label class="form-label" for="imgUrlUrl">Image</label>
      <input class="form-control" type="text" id="imgUrl" name="imgUrl" v-model="editable.imgUrl">

      <button type="submit" class="btn btn-primary w-100 p-2 mt-3 text-light" data-bs-dismiss="modal">Submit</button>
    </div>
  </form>
</template>


<script>
import { ref, watchEffect } from '@vue/runtime-core';
import { AppState } from '../AppState';
import { housesService } from '../services/HouseService';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
export default {
setup() {
    const editable = ref({})

    watchEffect(() => {

    if (!AppState.activeHouse) { return }
    editable.value = { ...AppState.activeHouse}
    })

  return {
    editable,
    async handleSubmit() {
        try {
          if (editable.value.id) {
            housesService.editHouse(editable.value)
          } else {
            housesService.createHouse(editable.value)
          }
          editable.value = {}
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
    }
  }
}
}
</script>


<style lang="scss" scoped> 
</style>