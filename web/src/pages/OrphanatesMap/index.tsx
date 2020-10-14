import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import mapMarketImg from '../../assets/images/map_marker.svg'
import happyMapIcon from '../../utils/mapIcon';
import api from '../../services/api';

import "./styles.css";

interface Orphanate {
    id: number;
    latitude: number;
    longitude: number;
    name: string;
}

function OrphanatesMap() {
    const [orphanates, setOrphanates] = useState<Orphanate[]>([]);
    useEffect(() => {
        api.get('orphanates')
            .then(response => {
                setOrphanates(response.data);
            })
    }, []);


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

                {
                    orphanates.map(orphanate => {
                        return (
                            <Marker
                                key={orphanate.id}
                                position={[orphanate.latitude, orphanate.longitude]}
                                icon={happyMapIcon}
                            >
                                <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                                    {orphanate.name}
                                    <Link to={`/orphanates/${orphanate.id}`}>
                                        <FiArrowRight size={20} color="#FFF" />
                                    </Link>
                                </Popup>
                            </Marker>
                        );
                    })
                }
            </Map>

            <Link to="/orphanates/create" className="create-orphanate">
                <FiPlus size={32} color="#FFF" />
            </Link>
        </div>
    );
}

export default OrphanatesMap;