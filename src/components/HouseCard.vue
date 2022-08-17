<template>
      <div class="hover-house selectable my-3" :title="house.price">
    <router-link :to="{ name: 'House', params: { houseId: house.id } }">
      <img class="img-fluid" :src="house.img" alt="">
    </router-link>
  </div>
</template>

<script>
import { House } from '../Models/House';
import { housesService } from '../services/HouseService';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
export default {
    props: {
        house: {type: House, required: true}
    },
setup() {
  return {
    adjustHouse(house){
        housesService.setActiveHouse(house)
    },
    async deleteHouse(house) {
        try {
          const yes = await Pop.confirm('Are you sure you want to delete this House?')
          if (!yes) {return}
          await housesService.deleteHouse(house.id)
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
    }
    
  };
},
};
</script>


<style lang="scss" scoped>
.hover-house {
  transition: all .15s linear;

  &:hover {
    transform: translateY(2px);
    border-radius: 10px;
  }

}
</style>