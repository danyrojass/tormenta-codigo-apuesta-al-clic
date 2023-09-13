import express, {Express, Request, Response} from "express";
import cors from 'cors';
import routes from './routes/ganador.route.ts';

const app: Express = express();
const PORT = process.env.PORT || 3000;

app.get('/', (_req: Request, res: Response) => {
    res.status(200).send("Allons-y!");
})

app.use(cors());
app.use(express.json());
app.use('/ganador', routes);
app.use((_req, res) => {
    const error = new Error('Ruta no encontrada');
    return res.status(404).json({
        message: error.message
    });
});

app.listen(PORT, () => {
    console.log(`⚡️[servidor]: El servidor está corriendo en http://localhost:${PORT}`);
});

