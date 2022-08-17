

export class House {
    constructor({ id, imgUrl, bedrooms, bathrooms, price, level, year }) {
        this.id = id
        this.imgUrl = imgUrl
        this.bedrooms = bedrooms || 1
        this.bathrooms = bathrooms || 1
        this.price = price || 10000
        this.level = level || 2
        this.year = year || 2000
    }

}









