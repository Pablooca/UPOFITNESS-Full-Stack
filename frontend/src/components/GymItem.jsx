import { useDispatch } from 'react-redux'

function GymItem({ gym }) {
    const dispatch = useDispatch()
    
    return (
        <div>
            <div className='gym-content'>
                <div className='gym-info'>
                    <h2>{gym.name}</h2>
                    <p>{gym.direction}</p>
                    <p>{gym.city}</p>
                    <p>{gym.timetable}</p>
                </div>
            </div>
        </div>
    )
}

export default GymItem
