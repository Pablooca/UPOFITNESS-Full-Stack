import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import GymItem from '../components/GymItem'
import { getGym, reset } from '../features/gyms/gymSlice';

function MapList() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const gymState = useSelector((state) => state.gyms);
    const { gyms, isLoading, isError, message } = gymState;

    useEffect(() => {
        if (isError) {
            console.error('ERROR:', message)
        }

        dispatch(getGym())

        return () => {
            dispatch(reset())
        }
    }, [dispatch])

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    return (
        <section className='content'>
            <h1>Gyms</h1>
            {gyms.length > 0 ? (
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
            ) : (
                <h3>No gyms found</h3>
            )}
        </section>
    )
}

export default MapList
