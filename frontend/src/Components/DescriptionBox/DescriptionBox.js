import React from 'react'
import '../DescriptionBox/DescriptionBox.css'

const DescriptionBox = () => {
  return (
    <div className='descriptionBox'>
      <div className="descriptionbax-navigation">
        <div className="descriptionbox-navbox">Description</div>
        <div className="descriptionbox-navbox fade">Review (122)</div>
      </div>
      <div className="descriptionbox-description">
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam, culpa?</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, ipsa!</p>
      </div>
    </div>
  )
}


export default DescriptionBox
