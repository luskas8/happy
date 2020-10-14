import React, { ChangeEvent, FormEvent, useState } from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import { useHistory } from "react-router-dom";
import { FiPlus, FiX } from "react-icons/fi";
import { LeafletMouseEvent } from 'leaflet';

import Sidebar from "../../components/Sidebar";
import happyMapIcon from "../../utils/mapIcon";
import api from "../../services/api";

import './styles.css';

export default function CreateOrphanate() {
  const history = useHistory();
  const [position, setPosition] = useState({latitude: 0, longitude: 0});

  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [intructions, setInstructions] = useState('');
  const [opening_hours, setOpeningHours] = useState('');
  const [open_on_weekend, setOpenOnWeekend] = useState(true);
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  console.log(images);

  function handleMapClick(event: LeafletMouseEvent) {
   const { lat, lng } = event.latlng;
    setPosition({
      latitude: lat,
      longitude: lng,
   });
  }

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) return;

    const selectedImages = Array.from(event.target.files);

    setImages(selectedImages);

    const selectedImagensPreview = selectedImages.map(image => {
      return URL.createObjectURL(image);
    });

    setPreviewImages(selectedImagensPreview);
  }

  function handleDeleteClick(deleteImage: number) {
    const newImagesArray = images;
    
    newImagesArray.splice(deleteImage, 1);

    const selectedImagensPreview = newImagesArray.map(image => {
      return URL.createObjectURL(image);
    });
    
    setImages(newImagesArray);    
    setPreviewImages(selectedImagensPreview);
  }

  async function handleSubmit(event: FormEvent) {
   event.preventDefault();

    const { latitude, longitude } = position;

    const data = new FormData();

    data.append('name', name);
    data.append('about', about);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('instructions', intructions);
    data.append('opening_hours', opening_hours);
    data.append('open_on_weekend', String(open_on_weekend));
    images.forEach(image => {
      data.append('images', image);
    })

    await api.post('orphanates', data);

    alert("CADASTRO FEITO!!");
    history.push('/app');
  }

  return (
    <div id="page-create-orphanate">
      <Sidebar />

      <main>
        <form onSubmit={handleSubmit} className="create-orphanate-form">
          <fieldset>
            <legend>Dados</legend>

            <Map 
              center={[-24.100864, -46.6485248]} 
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onclick={handleMapClick}
            >
              <TileLayer 
                url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />
              
              {
                position.latitude !== 0 && (
                  <Marker
                    interactive={false}
                    icon={happyMapIcon}
                    position={[position.latitude, position.longitude]}
                  />
                )
              }
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                value={name}
                onChange={event => {setName(event.target.value)}}
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea
                id="name"
                maxLength={300}
                value={about}
                onChange={event => {setAbout(event.target.value)}}
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {
                  previewImages.map((image, index) => {
                    return (
                      <div key={index} className="preview-image">
                        <img src={image} alt="Preview da imagem" />
                        <button
                          type="button"
                          className="delete"
                          onClick={() => {handleDeleteClick(index)}}
                        >
                            <FiX size={24} color="#FF669D"/>
                        </button>
                      </div>
                    );
                  })
                }
                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>
              <input multiple onChange={handleSelectImages} type="file"id="image[]"/>
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea
                id="instructions"
                value={intructions}
                onChange={event => {setInstructions(event.target.value)}}
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário das visitas</label>
              <input
                id="opening_hours"
                value={opening_hours}
                onChange={event => {setOpeningHours(event.target.value)}}
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button
                  type="button"
                  className={open_on_weekend ? "active" : ''}
                  onClick={() => {setOpenOnWeekend(true)}}
                >
                  Sim
                </button>

                <button
                  type="button"
                  className={!open_on_weekend ? "active" : ''}
                  onClick={() => {setOpenOnWeekend(false)}}
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
