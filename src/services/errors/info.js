export const generateUserErrorInfo = user => {
    return `
    Uno o mas properties están incompletos o no son validos.
    Lista de properties obligatorios:
        - first_name: Must be a String (${user.first_name})
        - last_name: Must be a String (${user.last_name})
        - email: Must be a String (${user.email})
    `
}

export const AuthorizedErrorInfo = () => {
    return `
        El token entregado no esta autorizado 
    `
}
export const AuthErrorInfo = () => {
    return `
        El token entregado no esta autenticado 
    `
}

export const createProductErrorInfo = product => {
    return `
    Uno o mas properties están incompletos o no son validos.
    Lista de properties obligatorios:
        - title: (${product.title})
        - description:  (${product.description})
        - price:  (${product.price})
        - thumbnails:  (${product.thumbnails})
        - code:  (${product.code})
        - stock: (${product.stock})
    `
}
