

import { AppState } from "../AppState.js";
import { House } from "../Models/House.js";
import { server } from "./AxiosService.js";

class HouseService{

  async editHouse(houseData) {
    let res = await server.put (`api/houses${houseData.id}`, houseData)
    let house = new House(res.data)
    let houseIndex = AppState.houses.findIndex(h => h.id == houseData.id)
    AppState.houses.splice(houseIndex, 1, house)
  }
  async getHouses() {
    let res = await server.get('api/houses')
    AppState.houses = res.data.map (h => new House(h))
  }

   async createHouse(newHouseData){
      console.log('creating a house in the service', newHouseData);

      let res = await server.post ('api/houses', newHouseData)
      let house = new House(res.data)
      AppState.houses = [...AppState.houses, new House(newHouseData)]
      
      console.log('current houses', AppState.houses);
    }

    async deleteHouse(houseId) {
      let url = `api/houses/${houseId}`
      await server.delete(url)
      AppState.houses = AppState.houses.filter(h => h.id != houseId)
    }

    async setActiveHouse(house) {
      AppState.activeHouse = house
    }

    async getHouseById(houseId){
      const res = await server.get(`api/houses/${houseId}`)
      AppState.activeHouse = new House(res.data)
    }

}

export const housesService = new HouseService()
