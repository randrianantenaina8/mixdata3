import { Box } from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const MapsLayout = ({ lat = 47.34303428008865 , long = 8.950620802410516 , name }) => {
  return (
    <Box sx={{ height: "100%" }}>
      <MapContainer center={[lat, long]} zoom={23} scrollWheelZoom={false} style={{ height: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, long]}>
          <Popup>
            {name}
          </Popup>
        </Marker>
      </MapContainer>
    </Box>
  )
}
export default MapsLayout;
