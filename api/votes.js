const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'data', 'votes.json');

// Check if votes.json exists; if not, create it with an empty object
if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify({}), 'utf-8');
}

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const newVote = req.body; // Expected to be { team: 'Team Name', players: ['Player1', 'Player2'] }

        // Read existing votes
        const votes = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

        // Update votes
        if (!votes[newVote.team]) {
            votes[newVote.team] = {};
        }
        newVote.players.forEach(player => {
            votes[newVote.team][player] = (votes[newVote.team][player] || 0) + 1;
        });

        // Save updated votes back to file
        fs.writeFileSync(filePath, JSON.stringify(votes, null, 2));
        res.status(200).json({ success: true, votes });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
