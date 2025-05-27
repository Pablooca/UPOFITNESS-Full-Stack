import { useState } from 'react'

function AddAppointmentForm() {
    const [formData, setFormData] = useState({
        date: '',
        worker_id: '',
        user_id: ''
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
        // Aquí puedes enviar los datos al backend con fetch o axios
        console.log('Cita enviada:', formData)
    }

    return (
        <>
            <section className="addAppointmentForm">
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
                            placeholder="Enter the worker ID"
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            id="user_id"
                            name="user_id"
                            value={user_id}
                            placeholder="Enter the user ID"
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-block">Submit</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default AddAppointmentForm
