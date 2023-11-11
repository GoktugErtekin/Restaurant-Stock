import React from 'react'
import '../style/navi.scss'
import Logo from '../images/restoran-logo.jpg'

const Navi = ({categories, secilenKategori, setSecilenKategori}) => {
  return (
    <nav>
        <div className="brand">
            <img src={Logo} alt="logo buraya" />
            <b>Yılların Ustası Göktuğ Baba</b>
        </div>
        <div className="kategori">
        {
        categories.map(data=>
        (secilenKategori || data.categoryName !== "Tüm Yemekler")&&<a onClick={()=>setSecilenKategori(data.id)}>{data.categoryName}</a>)
        }
        </div>
    </nav>
  )
}

export default Navi