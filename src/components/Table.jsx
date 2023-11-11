import React from 'react'
import '../style/table.scss'
import {BsTrash3, BsGear} from 'react-icons/bs'

const Table = ({secilenKategori ,yemekler, yemekDuzenle, yemekSil}) => {
    return (
        <div className="tablee">
            <h3>Product List</h3>
        <table>
            <thead>
                <tr>
                    <th></th>
                    <th>#</th>
                    <th>Product Name</th>
                    <th>Quantity Per Unit</th>
                    <th>Unit Price($)</th>
                    <th>Units In Stock</th>
                </tr>
            </thead>
            <tbody>
                {yemekler.map((yemek)=>(
                !yemek.isDeleted&&
                (!secilenKategori || secilenKategori===yemek.categoryId)&&
                (
                <tr>
                    <td><button className='delete' onClick={() => yemekSil(yemek.id)}><BsTrash3 /></button></td>
                    <td>{yemek.id}</td>
                    <td>{yemek.productName}</td>
                    <td>{yemek.quantityPerUnit}</td>
                    <td>{yemek.unitPrice}</td>
                    <td>{yemek.unitsInStock}</td>
                    <td><button className='edit' onClick={() => yemekDuzenle(yemek.id)}><BsGear /></button></td>
                </tr>
                )
            )).reverse()}
            </tbody>
        </table>
        </div>
    )
}

export default Table