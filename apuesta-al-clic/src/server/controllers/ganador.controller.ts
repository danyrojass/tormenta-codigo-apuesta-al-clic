import {Request, Response} from 'express';
import axios from 'axios';

export let ganador: string | null = null;
const yaGane = async (_req: Request, res: Response) => {
    const {number} = _req.body;
    const randomNumber = Math.floor(Math.random() * 11);

    if (number === randomNumber) {

        try {
            const response = await axios.get('https://zenquotes.io/api/random');
            if (Array.isArray(response.data) && response.data.length > 0) {
                const quote = response.data[0].q;
                res.json({message: 'Número correcto, sesión iniciada', quote});
            } else {
                res.status(500).json({error: 'No se pudo obtener la cita'});
            }
        } catch (error) {
            res.status(500).json({error: 'Error al realizar la solicitud'});
        }
    } else {
        res.status(401).json({message: 'Número incorrecto'});
    }
};
const resetearGanador = (_req: Request, res: Response) => {
    ganador = null;
    res.json({ message: 'Juego reiniciado y sesión cerrada' });
};

export default {yaGane, resetearGanador};
