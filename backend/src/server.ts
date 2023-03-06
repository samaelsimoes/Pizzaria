import express, { Request, Response, NextFunction } from 'express';
import { router } from './routes';
import 'express-async-errors';
import cors from 'cors';
import path from 'path';

const app = express();
app.use(express.json());
app.use(cors());

app.use(router);

//Rota para abrir a imagem, passando a url com o caminho da imagem
app.use(
    '/files',
    express.static(path.resolve(__dirname, '..', 'tmp'))
)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Error) {
        // se for uma instancia de um error
        return res.status(400).json({
            error: err.message
        });
    }

    return res.status(500).json({
        status: 'error',
        message: 'Internal server error'
    })
});

app.listen(3333, () => console.log('On server'));
