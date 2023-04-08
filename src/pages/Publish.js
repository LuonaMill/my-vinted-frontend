import "../assets/css/publish.scss";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import CustomInput from "../components/WIPCustomInput";
//Pour publier sur mon propre backend, remplacer par : http://localhost:4002/offer/publish

const Publish = ({ token }) => {
  const [picture, setPicture] = useState({});
  const [preview, setPreview] = useState("");
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState(0);
  const [exchangeInterest, setExchangeInterest] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    // console.log(token);

    try {
      const formData = new FormData();
      formData.append("picture", picture);
      formData.append("category", category);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("brand", brand);
      formData.append("size", size);
      formData.append("color", color);
      formData.append("condition", condition);
      formData.append("city", city);
      formData.append("price", price);
      formData.append("exchangeInterest", exchangeInterest);
      const response = await axios.post(
        "https://site--backend-vinted--wbbmf4gr4bwy.code.run/offer/publish",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data._id) {
        navigate(`/offer/${response.data._id}`);
      }
    } catch (error) {
      console.log(error.response.data.message);
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div className="publish-offer">
      <form onSubmit={handleSubmit}>
        <h2>Vends ton article</h2>
        {/* <div className="picture-upload">
          <h2>Drag and drop test</h2>
          <MyDropzone />
        </div> */}
        <div className="picture-upload">
          {preview ? (
            <img
              src={preview}
              alt="prévisualisation de l'article"
              style={{ height: "200px", width: "200px", objectFit: "cover" }}
            />
          ) : (
            <div>
              <label
                htmlFor="picture-upload"
                style={{ backgroundColor: "yellow" }}
              >
                Ajoute une photo
              </label>
              <div>
                <input
                  style={{ display: "none" }}
                  type="file"
                  placeholder="Ajoute une photo"
                  name="picture-upload"
                  id="picture-upload"
                  required
                  onChange={(event) => {
                    console.log(event.target.files[0]);
                    setPicture(event.target.files[0]);
                    setPreview(URL.createObjectURL(event.target.files[0]));
                  }}
                />
              </div>
            </div>
          )}
        </div>

        <div className="article-introduction">
          <div className="article-category">
            <label htmlFor="article-category">Catégorie d'article</label>
            <select
              name="article-category"
              id="article-category"
              onChange={(event) => {
                setCategory(event.target.value);
              }}
            >
              <option value="">--Sélectionner la catégorie--</option>
              <option value="top">T-shirt, pull, veste, top</option>
              <option value="bottom">Pantalon, jupe, short</option>
              <option value="body">Robe, combis, ensembles</option>
              <option value="shoes">Souliers</option>
              <option value="other">Autre</option>
            </select>
            {/* <input
              type="text"
              placeholder="ex : Chemise Sézane verte"
              id="article-title"
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            /> */}
          </div>
          <div className="article-title">
            <label htmlFor="article-title">Titre</label>
            <input
              type="text"
              placeholder="ex : Chemise Sézane verte"
              id="article-title"
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
          </div>
          <div className="article-description">
            <label htmlFor="article-description">Description</label>
            <textarea
              name="article-description"
              id="article-description"
              cols="30"
              rows="10"
              placeholder="ex : Porté quelques fois"
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            />
          </div>
        </div>
        <div className="article-details">
          <div className="brand">
            <label htmlFor="article-brand">Marque</label>
            <input
              type="text"
              placeholder="ex : Sézane"
              id="article-brand"
              onChange={(event) => {
                setBrand(event.target.value);
              }}
            />
          </div>
          <div className="size">
            <label htmlFor="article-size">Taille</label>
            <input
              type="text"
              placeholder="ex : L / 40 / 12"
              id="article-size"
              onChange={(event) => {
                setSize(event.target.value);
              }}
            />
          </div>
          <div className="color">
            <label htmlFor="article-color">Couleur</label>
            <input
              type="text"
              placeholder="ex : Vert"
              id="article-color"
              onChange={(event) => {
                setColor(event.target.value);
              }}
            />
          </div>
          <div className="condition">
            <label htmlFor="article-condition">État</label>
            <input
              type="text"
              placeholder="ex : Neuf avec étiquette"
              id="article-condition"
              onChange={(event) => {
                setCondition(event.target.value);
              }}
            />
          </div>
          <div className="city">
            <label htmlFor="article-city">Lieu</label>
            <input
              type="text"
              placeholder="ex : Paris"
              id="article-city"
              onChange={(event) => {
                setCity(event.target.value);
              }}
            />
          </div>
        </div>
        <div className="selling-conditions">
          <div className="price">
            <label htmlFor="article-price">Prix</label>
            <input
              type="text"
              placeholder="ex : 0,00€"
              id="article-price"
              onChange={(event) => {
                setPrice(event.target.value);
              }}
            />
            {/* A noter : alert si pas un nombre : Offer validation failed: product_price: Cast to Number failed for value "vdqvsq" (type string) at path "product_price" */}
          </div>
          <div className="exchange-condition">
            <input
              type="checkbox"
              className="checkbox"
              onClick={() => {
                setExchangeInterest(!exchangeInterest);
              }}
            />
            <span>Je suis intéressé(e) par les échanges</span>
          </div>
          {errorMessage && (
            <p>Nous rencontrons l'erreur suivante : {errorMessage}</p>
          )}
        </div>
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
};

export default Publish;
