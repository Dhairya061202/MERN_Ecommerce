import React, { useEffect, useState } from 'react'
import '../NewCollections/NewCollections.css'
import Item from '../Item/Item'
import new_collections from '../Assests/new_collections'
import { baseUrl } from '../../urls'


const NewCollection = () => {

  // const [new_collections,setNew_collections]=useState([])

  // useEffect(()=>{
  //   fetch(`${baseUrl}/newcollection`).then((res)=>res.json()).then((data)=>setNew_collections(data))
  // },[])

  return (
    <div className='new-collection'>
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {new_collections.map((item,i)=>{
            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
        })}
        
      </div>
    </div>
  )
}

export default NewCollection
