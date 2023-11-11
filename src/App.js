import axios from "axios";
import Aside from "./components/Aside";
import Navi from "./components/Navi";
import Table from "./components/Table";
import "./style/app.scss";
import { useState } from "react";
import { useEffect } from "react";


function App() {
  const [categories,setCategories] = useState([]);
  const [yemekler,setYemekler] = useState([]);
  const [secilenYemek,setSecilenYemek] = useState(null);
  const [secilenKategori,setSecilenKategori] = useState("");

  const yemekEkleDuzenle = async (yeni)=>{
    let url = "http://localhost:3005/products";
    if(!secilenYemek){
      const response = await axios.post(url,yeni);
      if(response.status === 201){
        setYemekler(prev=>[...prev,yeni]);
      }
    }
    else{
      url += `/${secilenYemek.id}`;
      const response2 = await axios.put(url,yeni);
      console.log(response2);
      setSecilenYemek(null)
    }
  }
  
  const yemekSil = async (id)=>{
    let url = `http://localhost:3005/products/${id}`;
    const response = await axios.patch(url,{isDeleted:true})
    console.log(response);
    if(response.status===200){
      setYemekler(prev=>prev.filter(statedenGelen=>statedenGelen.id!==id));
    }
  }

  const yemekleriGetir = async ()=> {
    let url = "http://localhost:3005/products";
    if(secilenKategori && secilenKategori!=="Tüm Yemekler"){
      url+="?yemekKategori="+secilenKategori;
    }
    const response = await fetch(url);
    const yemek = await response.json();
    setYemekler(yemek);
    console.log(yemek);
  }

  const kategoriyiGetir = async ()=> {
    let url = "http://localhost:3005/categories";
    const response = await axios.get(url);
    const categories = response.data;
    setCategories(categories);
  }

  const yemekDuzenle = async (id)=>{
    let url = `http://localhost:3005/products/${id}`;
    const response = await axios.get(url);
    const duzenlenecekYemek = response.data;
    setSecilenYemek(duzenlenecekYemek);
  }

  useEffect(()=>{
    yemekleriGetir()
    kategoriyiGetir()
  },[secilenYemek,secilenKategori])

  return (
    <>
      <Navi secilenKategori={secilenKategori} setSecilenKategori={setSecilenKategori} categories={categories}/>
      <div className="container">
        <Aside secilenYemek={secilenYemek} yemekEkleDuzenle={yemekEkleDuzenle} categories={categories} yemekler={yemekler} setCategories={setCategories} secilenKategori={secilenKategori} setSecilenKategori={setSecilenKategori}/>
        <Table secilenKategori={secilenKategori} yemekDuzenle={yemekDuzenle} yemekSil={yemekSil} yemekler={yemekler}/>
      </div>
    </>
  );
}

export default App;
