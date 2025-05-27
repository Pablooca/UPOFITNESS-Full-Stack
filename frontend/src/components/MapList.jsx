import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import GymItem from '../components/GymItem'
import { getGym, reset } from '../features/gyms/gymSlice';

function MapList() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const gymState = useSelector((state) => state.gyms);
    const { gyms, isLoading, isError, isSuccess, message } = gymState;

    useEffect(() => {
        if (isError) {
            console.log('ERROR:', message)
        }

        dispatch(getGym())

        return () => {
            dispatch(reset())
        }
    }, [dispatch])

    if (isLoading){
        return <h1>Loading...</h1>
    }

    return (
        <>
            <section className ='content'>
                <h1>Gyms</h1>
                {gyms.length > 0 ? (
                    <div className='gyms'>
                        {gyms.map((gym) => (
                            <GymItem key={gym.id} gym={gym} />
                        ))}
                    </div>
                ) : (
                    <h3>No gyms found</h3>
                )}
            </section>
        </>
    )

}

export default MapList
