import PropTypes from 'prop-types'
import React, { useState } from 'react'

const Login = ({ }) => {
    const [isAdmin, setIsAdmin] = useState(false)
    const [isUser, setIsUser] = useState(false)

    const handleAdminChange = () => {
        setIsAdmin(!isAdmin)
        if (!isAdmin) {
            setIsUser(false)
        }
    }

    const handleUserChange = () => {
        setIsUser(!isUser)
        if (!isUser) {
            setIsAdmin(false)
        }
    }

    const checkLogin = (event) => {
        event.preventDefault()
        // Aquí puedes agregar la lógica para verificar el login
        console.log('Login button pressed')
    }

    return (
        <div className='login'>
            <h1>Login</h1>
            <form className='login-form' onSubmit={checkLogin}>
                <label htmlFor='email'>Email</label><br/>
                <input type='email' id='email' name='email' required /><br/>
                <label htmlFor='password'>Password</label><br/>
                <input type='password' id='password' name='password' required /><br/>
                <label>
                    <input type='checkbox' name='admin' checked={isAdmin} onChange={handleAdminChange} />
                    Administrator
                </label><br/>
                <label>
                    <input type='checkbox' name='user' checked={isUser} onChange={handleUserChange} />
                    User
                </label><br/>
                <button type='submit'>Login</button>
            </form>
        </div>
    )
}

export default Login