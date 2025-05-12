import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import GymItem from '../components/GymItem'
import { getGym, reset } from '../features/gyms/gymSlice';

function MapList() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { gyms, isLoading, isError, message } = useSelector(
        (state) => state.gyms
    )

    useEffect(() => {
        if (isError) {
            console.log(message)
        }

        dispatch(getGym())

        return () => {
            dispatch(reset())
        }
    }, [navigate, isError, message, dispatch])

    if (isLoading){
        return <h1>Loading...</h1>
    }

    return (
        <>
            <section className ='content'>
                {gyms.length > 0 ? (
                    <div className='gyms'>
                        {gyms.map((gym) => (
                            <GymItem key={gym._id} gym={gym} />
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
