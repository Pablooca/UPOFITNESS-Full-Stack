const checkEmail = (req, res, next) => {
    const email = req.body.email;
    if (!email) {
        throw new Error('Email is required');
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|outlook\.com)$/;
    if (!emailRegex.test(email)) {
        throw new Error('Invalid email domain. Only @gmail.com and @outlook.com are allowed.');
    }

    next();
}

const checkDNI = (req, res, next) => {
    const dni = req.body.dni;

    if (!dni) {
        throw new Error('DNI is required')
    }

    else {
        const letras = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E']
        dniNum = dni.slice(0, dni.length - 1);
        dniPartido = dni.slice(dni.length - 1);

        resto = dniNum % 23;

        letra = letras[resto];

        if (letra === dniPartido) {
            return true;
        } else {
            throw new Error('Invalid DNI');
        }
        
    }

    next();
}

const checkBirthDate = (req, res, next) => {
    const birthDate = req.body.birth_date;
    if (!birthDate) {
        throw new Error('Birth date is required');
    }

    const birthDateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!birthDateRegex.test(birthDate)) {
        throw new Error('Invalid birth date format. The correct format is YYYY-MM-DD.');
    }

    next();
}

module.exports = {
    checkEmail,
    checkDNI,
    checkBirthDate
}