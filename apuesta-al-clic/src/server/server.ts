import express, {Express, Request, Response} from "express";
import cors from 'cors';
import routes from './routes/ganador.route.ts';
import * as path from "path";

const app: Express = express();
const PORT = process.env.PORT || 3000;


app.use(express.static('dist/client'));

app.use(cors());
app.use(express.json());
app.use('/ganador', routes);
app.use((_req, res) => {
    const error = new Error('Ruta no encontrada');
    return res.status(404).json({
        message: error.message
    });
});
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/client/index.html'));
});

app.listen(PORT, () => {
    console.log(`⚡️[servidor]: El servidor está corriendo en http://localhost:${PORT}`);
});

