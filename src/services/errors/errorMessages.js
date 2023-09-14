export const generateUserErrorInfo = (user) =>{
    return `las propiedades requeridas no son válidas: 
    En first_name se recibió ${user.first_name} en vez de un type string;
    En email se recibió ${user.email} en vez de un type string;

    `
}

export const generateProductErrorInfo = (product) =>{
    return `las propiedades requeridas no son válidas: 
    En title se recibió ${product.title} en vez de un type string;
    En price se recibió ${product.price} en vez de un type number;

    `
}