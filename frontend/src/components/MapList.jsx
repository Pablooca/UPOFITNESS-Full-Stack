import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGyms, reset } from '../features/gyms/gymSlice';

const MapList = () => {
    const dispatch = useDispatch();
    const { gyms, isLoading, isError, message } = useSelector((state) => state.gyms);

    useEffect(() => {
        dispatch(getGyms());

        return () => {
            dispatch(reset());
        };
    }, [dispatch]);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (isError) {
        return <p>Error: {message}</p>;
    }

    return (
        <div>
            <h1>Gym List</h1>
            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Location</th>
                    </tr>
                </thead>
                <tbody>
                    {gyms.map((gym) => (
                        <tr key={gym.id}>
                            <td>{gym.id}</td>
                            <td>{gym.name}</td>
                            <td>{gym.location}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MapList;