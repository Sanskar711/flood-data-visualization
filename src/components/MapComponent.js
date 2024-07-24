import React, { useContext } from 'react';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import { DataContext } from '../context/DataContext';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet's default icon issues
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const MapComponent = () => {
  const { data, loading } = useContext(DataContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
        subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
      />
      <GeoJSON data={data.states} />
      {data.df1.map((row, index) => (
        <Marker key={index} position={[row.Latitude, row.Longitude]}>
          <Popup>
            <div>
              <h4>GaugeID: {row.GaugeID}</h4>
              <p>State: {row.State}</p>
              <p>Latitude: {row.Latitude}</p>
              <p>Longitude: {row.Longitude}</p>
              <a href={`/${row.GaugeID}`}>View Flood Events</a>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
