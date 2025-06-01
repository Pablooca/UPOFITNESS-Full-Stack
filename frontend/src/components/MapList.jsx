import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import GymItem from '../components/GymItem';
import { getGym, reset } from '../features/gyms/gymSlice';

// Fix para los iconos por defecto en Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const GEOCODING_API_KEY = '2b868bb6282e4fd4a9243daacf773dde';

function MapList() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [gymLocations, setGymLocations] = useState([]);
    const [loadingCoords, setLoadingCoords] = useState(true);

    const gymState = useSelector((state) => state.gyms);
    const { gyms, isLoading, isError, message } = gymState;

    useEffect(() => {
        if (isError) {
            console.error('ERROR:', message);
        }

        dispatch(getGym());

        return () => {
            dispatch(reset());
        };
    }, [dispatch]);

    useEffect(() => {
        const fetchCoordinates = async () => {
            if (gyms.length === 0) return;

            const locations = await Promise.all(
                gyms.map(async (gym) => {
                    const query = `${gym.direction}, ${gym.city}`;
                    try {
                        const response = await fetch(
                            `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(query)}&key=${GEOCODING_API_KEY}`
                        );
                        const data = await response.json();
                        if (data.results.length > 0) {
                            const { lat, lng } = data.results[0].geometry;
                            return { ...gym, lat, lng };
                        } else {
                            console.warn(`No se encontraron coordenadas para: ${query}`);
                            return null;
                        }
                    } catch (error) {
                        console.error(`Error al geocodificar ${query}:`, error);
                        return null;
                    }
                })
            );

            setGymLocations(locations.filter(Boolean));
            setLoadingCoords(false);
        };

        fetchCoordinates();
    }, [gyms]);

    if (isLoading || loadingCoords) {
        return <h1>Loading...</h1>;
    }

    const defaultCenter = [40.4168, -3.7038];

    return (
        <section className="content">
            <h1>Gyms</h1>

            {gymLocations.length > 0 ? (
                <>
                    <div style={{ height: '400px', marginBottom: '20px' }}>
                        <MapContainer center={defaultCenter} zoom={6} style={{ height: '100%', width: '100%' }}>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            {gymLocations.map((gym) => (
                                <Marker key={gym.id} position={[gym.lat, gym.lng]}>
                                    <Popup>
                                        <strong>{gym.name}</strong><br />
                                        {gym.direction}<br />
                                        {gym.city}
                                    </Popup>
                                </Marker>
                            ))}
                        </MapContainer>
                    </div>

                    <table className="gym-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Direction</th>
                                <th>City</th>
                                <th>Timetable</th>
                            </tr>
                        </thead>
                        <tbody>
                            {gyms.map((gym) => (
                                <GymItem key={gym.id} gym={gym} />
                            ))}
                        </tbody>
                    </table>
                </>
            ) : (
                <h3>No gyms found</h3>
            )}
        </section>
    );
}

export default MapList;
