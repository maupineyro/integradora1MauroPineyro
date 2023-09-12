import { faker } from "@faker-js/faker"



export const generateMockingProducts = () =>{
 return {
        _id: faker.database.mongodbObjectId(),
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        thumbnails: [faker.image.url(), faker.image.url(), faker.image.url()],
        category: faker.commerce.department(),
        price: faker.commerce.price(),
        stock: faker.string.numeric(),
        status: faker.datatype.boolean(),
    }
}