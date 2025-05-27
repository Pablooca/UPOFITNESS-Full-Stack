import {useState, useEffect} from 'react'
import {FaUser} from 'react-icons/fa'

function RegisterWorkerForm() {
    const [formData, setFormData] = useState({
        dni: '',
        name: '',
        birth_date: '',
        direction: '',
        iban: '',
        phone_number: '',
        email: '',
        user: '',
        password: '',
        password2: '',
        id_gym:''
    })

    const {dni, name, birth_date, direction, iban, phone_number, email, user, password, password2, id_gym} = formData

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
            <section className="heading">
                <h1>
                    <FaUser /> Register
                </h1>
                <p>Please create an account</p>
            </section>

            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input type="text" className="form-control" id="dni" name="dni" value={dni} placeholder='Enter your dni' onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" id="name" name="name" value={name} placeholder='Enter your name' onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <input type="date" className="form-control" id="birth_date" name="birth_date" value={birth_date} placeholder='Enter your birth date' onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" id="direction" name="direction" value={direction} placeholder='Enter your direction' onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" id="iban" name="iban" value={iban} placeholder='Enter your iban' onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" id="phone_number" name="phone_number" value={phone_number} placeholder='Enter your phone number' onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <input type="email" className="form-control" id="email" name="email" value={email} placeholder='Enter your email' onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" id="user" name="user" value={user} placeholder='Enter your user' onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" id="password" name="password" value={password} placeholder='Enter your password' onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" id="password2" name="password2" value={password2} placeholder='Confirm your password' onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" id="id_gym" name="id_gym" value={id_gym} placeholder='Enter your gym id' onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-block">Submit</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default RegisterWorkerForm
