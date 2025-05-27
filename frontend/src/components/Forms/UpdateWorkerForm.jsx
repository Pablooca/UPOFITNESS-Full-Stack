import {useState, useEffect} from 'react'
import {FaSignInAlt} from 'react-icons/fa'

function UpdateUserForm() {
    const [formData, setFormData] = useState({
        dni:'',
        user_name:'',
        birth_date:'',
        direction:'',
        iban:'',
        phone_number:'',
        email:'',
        user: '',
        password: '',
        id_gym:''
    })

    const {direction, iban, phone_number, email, password} = formData

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
                    <FaSignInAlt /> Update your user information
                </h1>
            </section>
            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input type="text" className="form-control" id="dni" name="dni" value={dni} readOnly />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" id="name" name="name" value={user_name} readOnly />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" id="birth_date" name="birth_date" value={birth_date} readOnly />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" id="direction" name="direction" value={direction} placeholder='Enter your direction' />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" id="iban" name="iban" value={iban} placeholder='Enter your iban' />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" id="phone_number" name="phone_number" value={phone_number} placeholder='Enter your phone number' />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" id="email" name="email" value={email} placeholder='Enter your email' />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" id="user" name="user" value={user} placeholder='Enter your user' readOnly />
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" id="password" name="password" value={password} placeholder='Enter your password' onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" id="id_gym" name="id_gym" value={id_gym} placeholder='Enter your gym id' />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-block">Submit</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default UpdateUserForm
