import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";
import { useParams } from 'react-router-dom'

import Sidebar from "../../components/Sidebar";
import happyMapIcon from "../../utils/mapIcon";
import api from "../../services/api";

import './styles.css';

interface Orphanate {
  latitude: number;
  longitude: number;
  name: string;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekend: boolean;
  images: Array<{
    id: number;
    url: string;
  }>
}

interface OrphanateParams {
  id: string;
}

export default function Orphanate() {
  const params = useParams<OrphanateParams>();
  const [orphanate, setOrphanates] = useState<Orphanate>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  useEffect(() => {
      api.get(`orphanates/${params.id}`)
          .then(response => {
              setOrphanates(response.data);
          })
  }, [params.id]);

  if (!orphanate) {
    return <p>Carregando...</p>;
  }

  return (
    <div id="page-orphanate">
      <Sidebar />

      <main>
        <div className="orphanate-details">
          <img src={orphanate.images[activeImageIndex].url} alt={orphanate.name} />

          <div className="images">
            {
              orphanate.images.map((image, index) => {
                return (
                  <button
                    key={image.id}
                    type="button"
                    className={activeImageIndex === index ? "active" : ''}
                    onClick={() => {
                      setActiveImageIndex(index);
                    }}
                  >
                    <img src={image.url} alt={orphanate.name} />
                  </button>
                );
              })
            }
          </div>
          
          <div className="orphanate-details-content">
            <h1>{orphanate.name}</h1>
            <p>{orphanate.about}</p>

            <div className="map-container">
              <Map 
                center={[orphanate.latitude, orphanate.longitude]}
                zoom={16} 
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer 
                  url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
                <Marker interactive={false} icon={happyMapIcon} position={[orphanate.latitude, orphanate.longitude]} />
              </Map>

              <footer>
                <a target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${orphanate.latitude},${orphanate.longitude}`}>Ver rotas no Google Maps</a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{orphanate.instructions}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#5C8599" />
                Segunda à Sexta <br />
                {orphanate.opening_hours}
              </div>
              {
                orphanate.open_on_weekend ? (
                  <div className="open-on-weekends">
                    <FiInfo size={32} color="#39CC83" />
                    Atendemos <br />
                    fim de semana
                  </div>
                ) : (
                  <div className="open-on-weekends closed">
                    <FiInfo size={32} color="#FF669F" />
                    Não atendemos <br />
                    fim de semana
                  </div>
                )
              }
            </div>

            {/* <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button> */}
          </div>
        </div>
      </main>
    </div>
  );
}