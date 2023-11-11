import React, { useEffect } from 'react'
import '../style/aside.scss'
import { useState } from 'react'
const Aside = ({ yemekler, yemekEkleDuzenle, categories, secilenYemek, secilenKategori, setSecilenKategori }) => {

  const [productName, setProductName] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productStock, setProductStock] = useState("");
  const [productCategoryId, setProductCategoryId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    yemekEkleDuzenle({
      id: yemekler.length + 1,
      productCategoryId: productCategoryId,
      productName: productName,
      quantityPerUnit: productQuantity,
      unitPrice: productPrice,
      unitsInStock: productStock
    });

    setProductName("");
    setProductQuantity("");
    setProductPrice("");
    setProductStock("");
    setProductCategoryId("");
  }
  useEffect(()=>{
    if(secilenYemek){
      setProductName(secilenYemek.productName)
      setProductQuantity(secilenYemek.quantityPerUnit)
      setProductPrice(secilenYemek.unitPrice)
      setProductStock(secilenYemek.unitsInStock)
      setProductCategoryId(secilenYemek.productCategoryId)
    }
  },[secilenYemek])

  return (
    <aside>
      <div className="kategori-filtre">
        <h2>Categories</h2>
        <ul>
        {categories.map(data=>
        (secilenKategori || data.categoryName !== "Tüm Yemekler")&&
            <li onClick={()=>setSecilenKategori(data.id)}>{data.categoryName}</li>
        )
      }
        </ul>
      </div>
      <form onSubmit={handleSubmit} className='product-form'>
        <h2>{secilenYemek?"Yemeği Düzenle":"Yemek Ekle"}</h2>
        <select value={productCategoryId} onChange={e=> setProductCategoryId(e.target.value)} required>
          <option value={""} >Select Category Id</option>
          {categories.map(category => (
            <option value={category.id} key={category.id} >{category.categoryName}</option>
          ))}
        </select>
        <div className="input-area">
          <input value={productName} type="text" placeholder='Product Name:' onChange={e => setProductName(e.target.value)} required />
        </div>
        <div className="input-area">
          <input value={productQuantity} type="text" placeholder='Quantity Per Unit:' onChange={e => setProductQuantity(e.target.value)} required />
        </div>
        <div className="input-area">
          <input value={productPrice} type="number" placeholder='Unit Price:' onChange={e => setProductPrice(e.target.value)} required />
        </div>
        <div className="input-area">
          <input value={productStock} type="number" placeholder='Units In Stock:' onChange={e => setProductStock(e.target.value)} required />
        </div>
        <input disabled={
          productCategoryId==="Select Category Id" ||
          !productName.trim() ||
          !productQuantity.trim() ||
          !productPrice.trim() ||
          !productStock.trim() ||
          !productCategoryId
        } type='submit' value={secilenYemek?"Edit":"Add"}/>
      </form>
    </aside>
  );
}

export default Aside;