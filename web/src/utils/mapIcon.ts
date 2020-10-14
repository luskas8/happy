import Leaflet from 'leaflet';

import mapMarkerImg from '../assets/images/map_marker.svg';

const happyMapIcon = Leaflet.icon({
    iconUrl: mapMarkerImg,
  
    iconSize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [((2*68)+29), 0]
})

export default happyMapIcon;