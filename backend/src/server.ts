import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001; // Directly set the port
let latestData = '';

app.use(cors());
app.use(express.json());

app.post('/api/create-answer', (req: Request, res: Response) => {
    const { data } = req.body;
    if (typeof data === 'string') {
        latestData = data;
        console.log(`Received: ${latestData}`);
        res.status(200).json({ message: 'Data received successfully.' });
        return;
    }
    res.status(400).json({ error: 'Invalid data format.' });
});

app.get('/api/answer-shezam', (req: Request, res: Response) => {
    res.json({ answer: latestData });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});



