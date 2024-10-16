const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'data', 'votes.json');

export default function handler(req, res) {
    try {
        const votes = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        res.status(200).json(votes);
    } catch (error) {
        console.error('Error reading votes:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}
