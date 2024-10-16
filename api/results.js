const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'data', 'votes.json'); // Adjust path as needed

export default function handler(req, res) {
    const votes = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    res.status(200).json(votes);
}
