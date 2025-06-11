import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getAppointmentByUser, reset } from '../features/appointments/appointmentSlice'
import AppointmentItem from './AppointmentItem'

function AppointmentList() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { appointments, isLoading, isError, message } = useSelector(
        (state) => state.appointment
    )

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))

        if (!user) {
            navigate('/login')
            return
        }

        if (isError) {
            console.error('ERROR:', message)
        }

        dispatch(getAppointmentByUser())

        return () => {
            dispatch(reset())
        }
    }, [dispatch, navigate, isError, message])

    if (isLoading) {
        return <h1>Loading</h1>
    }

    return (
        <section className="content">
            <h1>Appointments</h1>
            {appointments.length > 0 ? (
                <table className="appointment-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Date</th>
                            <th>Worker ID</th>
                            <th>User ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((appointment) => (
                            <AppointmentItem key={appointment.id} appointment={appointment} />
                        ))}
                    </tbody>
                </table>
            ) : (
                <h3>You don't have any appointment</h3>
            )}
        </section>
    )
}

export default AppointmentList
