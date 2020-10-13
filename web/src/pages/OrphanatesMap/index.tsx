import React from 'react';
import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import { Map, TileLayer } from 'react-leaflet';

import mapMarketImg from '../../assets/images/map_market.svg'

import 'leaflet/dist/leaflet.css';
import "./styles.css";

function OrphanatesMap() {
    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarketImg} alt="Happy"/>

                    <h2>Escolha um orfanato no mapa</h2>

                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>

                <footer>
                    <strong>Mongaguá</strong>
                    São Paulo
                </footer>
            </aside>
            <Map
                center={[-24.100864, -46.6485248]}
                zoom={14}
                style={{ width: '100%', height: '100%'}}
            >    
                {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
                <TileLayer
                    url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
            </Map>

            <Link to="/" className="create-orphanate">
                <FiPlus size={32} color="#FFF" />
            </Link>
        </div>
    );
}

export default OrphanatesMap;