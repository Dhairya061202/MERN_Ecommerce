import React, { useContext } from 'react'
import '../Pages/CSS/Product.css'
import { ShopContext } from '../Context/ShopContext'
import { useParams } from 'react-router-dom'
import Breadcum from '../Components/Breadcum/Breadcum'
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay'
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox'
import Relatedproducts from '../Components/Relatedproducts/Relatedproducts'

const Product = () => {

  const {all_product} = useContext(ShopContext)

  const {productId} = useParams()

  const product = all_product.find((e)=> e.id === Number(productId));

  return (
    <div>
      <Breadcum product={product}/>
      <ProductDisplay product={product}/>
      <DescriptionBox />
      <Relatedproducts />
    </div>
  )
}

export default Product
