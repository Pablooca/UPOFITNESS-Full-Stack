// Algoritmo de Encriptación --> AES-256-ECB
// Usuario --> pocagal
// Contraseña --> upofitness-full-stack-user
// Usuario Admin --> pocagal-admin
// Contraseña Admin --> upofitness-full-stack-admin

const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(require("./routes/gym"));
app.use(require("./routes/user"));
app.use(require("./routes/worker"));
app.use(require("./routes/appointment"));

app.listen(process.env.PORT || 8000, () => {
    console.log("Servidor corriendo en el puerto 8000");
})