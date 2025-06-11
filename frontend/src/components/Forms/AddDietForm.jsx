import { useState } from 'react'

function AddDietForm() {
    const [formData, setFormData] = useState({
        user_id: '',
        worker_id: '',
        diet: ''
    })

    const { user_id, worker_id, diet } = formData

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <>
            <section className="addDietForm">
                <form onSubmit={onSubmit}>
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
                        <textarea
                            className="form-control"
                            id="diet"
                            name="diet"
                            value={diet}
                            placeholder="Enter the diet"
                            onChange={onChange}
                            rows={5}
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

export default AddDietForm
