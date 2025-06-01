import { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

function UpdateUserForm() {
    const navigate = useNavigate()
    const [userData, setUserData] = useState(null)
    const [formData, setFormData] = useState(null)

    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        if (!storedUser) {
            navigate('/login')
        } else {
            try {
                const parsed = JSON.parse(storedUser)
                if (!parsed) {
                    navigate('/login')
                } else {
                    setUserData(parsed)
                }
            } catch (err) {
                console.error("Error parsing user data:", err)
                navigate('/login')
            }
        }
    }, [navigate])

    useEffect(() => {
        if (userData) {
            setFormData({
                dni: userData.dni,
                name: userData.name,
                birth_date: userData.birth_date,
                direction: userData.direction,
                phone_number: userData.phone_number,
                email: userData.email,
                user_name: userData.username,
                password: '',
            })
        }
    }, [userData])

    if (!formData) return null // o un spinner

    const {
        dni,
        name,
        birth_date,
        direction,
        phone_number,
        email,
        user_name,
        password
    } = formData

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value, 
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()
        // Aquí puedes enviar formData al backend
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
                        <input type="text" className="form-control" id="name" name="name" value={name} readOnly />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" id="birth_date" name="birth_date" value={birth_date} readOnly />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            id="direction"
                            name="direction"
                            value={direction}
                            placeholder="Enter your direction"
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            id="phone_number"
                            name="phone_number"
                            value={phone_number}
                            placeholder="Enter your phone number"
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            id="email"
                            name="email"
                            value={email}
                            placeholder="Enter your email"
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            id="user_name"
                            name="user_name"
                            value={user_name}
                            placeholder="Enter your user"
                            readOnly
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={password}
                            placeholder="Enter your password"
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

export default UpdateUserForm