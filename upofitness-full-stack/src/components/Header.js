import PropTypes from 'prop-types';

const Header = ({title, options}) => {
    return (
        <header className='header'>
            <h1>{title}</h1>
            <li>
                <a href='/'>{options}</a>
            </li>
        </header>
    )
}

export default Header