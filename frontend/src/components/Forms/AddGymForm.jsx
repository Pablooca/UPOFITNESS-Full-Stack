function AddGymForm() {
    const [formData, setFormData] = useState({
        name:'',
        direction:'',
        city:'',
        timetable:''
    })

    const {name, direction, city, timetable} = formData

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
            <section className="addGymForm">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input type="text" className="form-control" id="name" value={name} placeholder='Enter the name of the gym' onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" id="direction" value={direction} placeholder='Enter the direction of the gym' onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" id="city" value={city} placeholder='Enter the city of the gym' onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" id="timetable" value={timetable} placeholder='Enter the timetable of the gym' onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-block">Submit</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default AddGymForm