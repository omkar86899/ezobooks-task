export type GetAllProductResponse = {
    status: string,
    items: Product[]
}

export type Product = {
    itemName: string,
    itemPrice: number,
    itemBarcode: string,
    url: string
}