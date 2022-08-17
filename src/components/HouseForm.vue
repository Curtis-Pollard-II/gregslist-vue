<template>
  <form @submit.prevent="handleSubmit()" class="house-form">
    <h3 class="text-primary">List Your House</h3>
    <div class="row">

      <div class="col-4">
        <label class="form-label" for="footage">Footage</label>
        <input class="form-control" type="number" minlength="3" id="footage" name="footage" v-model="editable.footage">
      </div>

      <div class="col-4">
        <label class="form-label" for="rooms">Rooms</label>
        <input class="form-control" type="number" id="rooms" name="rooms" v-model="editable.rooms">
      </div>

      <div class="col-4">
        <label class="form-label" for="bathrooms">Bathrooms</label>
        <input class="form-control" type="number" id="bathrooms" name="bathrooms" v-model="editable.bathrooms">
      </div>

      <label class="form-label" for="price">Price</label>
      <input class="form-control" type="number" min="1000" id="price" name="price" v-model="editable.price">

      <label class="form-label" for="img">Image</label>
      <input class="form-control" type="text" id="img" name="img" v-model="editable.img">

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