import express, {Express} from "express";
import cors from 'cors';
import routes from './routes/ganador.route.ts';
import * as path from "path";

const app: Express = express();
const PORT = process.env.PORT || 3000;


app.use(express.static('client'));

app.use(cors());
app.use(express.json());
app.use('/api/ganador', routes);
app.use((_req, res) => {
    const error = new Error('Ruta no encontrada');
    return res.status(404).json({
        message: error.message
    });
});
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/index.html'));
});

app.listen(PORT, () => {
    console.log(`⚡️[servidor]: El servidor está corriendo en http://localhost:${PORT}`);
});

