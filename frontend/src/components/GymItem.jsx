function GymItem({ gym }) {
    return (
        <tr>
            <td>{gym.name}</td>
            <td>{gym.direction}</td>
            <td>{gym.city}</td>
            <td>{gym.timetable}</td>
        </tr>
    )
}

export default GymItem
