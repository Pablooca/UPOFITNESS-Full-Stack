import { useState } from 'react'

function EditAppointmentForm({ initialData }) {
    const [formData, setFormData] = useState({
        date: initialData.date || '',
        worker_id: initialData.worker_id || '',
        user_id: initialData.user_id || ''
    })

    const { date, worker_id, user_id } = formData

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()
        // Aquí iría la lógica para actualizar la cita (por ejemplo, PUT con fetch o axios)
        console.log('Cita modificada:', formData)
    }

    return (
        <>
            <section className="editAppointmentForm">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input
                            type="date"
                            className="form-control"
                            id="date"
                            name="date"
                            value={date}
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            id="worker_id"
                            name="worker_id"
                            value={worker_id}
                            readOnly
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            id="user_id"
                            name="user_id"
                            value={user_id}
                            readOnly
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-block">Update</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default EditAppointmentForm
