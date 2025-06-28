import React from 'react'
import '../../styles/Orders/sectionTitle.css'

export default function SectionTitle({title,...props}) {
  return (
    <div className='section-title' >{title} :</div>
  )
}
