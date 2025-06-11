import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import DietItem from '../components/DietItem';
import { getDiet, reset } from '../features/diets/dietSlice';

function DietList() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const dietState = useSelector((state) => state.diet);
    const { diets, isLoading, isError, message } = dietState;

    useEffect(() => {

        const user = JSON.parse(localStorage.getItem('user'));

        if (!user){
            navigate('/login');
            return;
        }

        if (isError) {
            console.error('ERROR:', message);
        }

        dispatch(getDiet());

        return () => {
            dispatch(reset());
        };
    }, [dispatch]);

    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    return (
        <section className='content'>
            <h1>Diets</h1>
            {diets.length > 0 ? (
                <table className="diet-table">
                    <thead>
                        <tr>
                            <th>Worker ID</th>
                            <th>Meals</th>
                        </tr>
                    </thead>
                    <tbody>
                        {diets.map((diet) => (
                            <DietItem key={diet.worker_id} diet={diet} />
                        ))}
                    </tbody>
                </table>
            ) : (
                <h3>No diets found</h3>
            )}
        </section>
    );

}

export default DietList;