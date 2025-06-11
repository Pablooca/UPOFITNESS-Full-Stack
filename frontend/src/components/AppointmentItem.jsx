function AppointmentItem({ appointment }) {
    return (
        <tr>
            <td>{appointment.id}</td>
            <td>{appointment.date}</td> 
            <td>{appointment.id_worker}</td>
            <td>{appointment.id_user}</td>
        </tr>
    )
}

export default AppointmentItem
