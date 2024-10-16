const fs = require('fs');
const path = require('path');

const votesFilePath = path.join(__dirname, '../data/votes.json');

// Function to read votes from votes.json
const readVotes = () => {
    try {
        const data = fs.readFileSync(votesFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading votes:', error);
        return {};
    }
};

// Function to write votes to votes.json
const writeVotes = (votes) => {
    try {
        fs.writeFileSync(votesFilePath, JSON.stringify(votes, null, 2));
    } catch (error) {
        console.error('Error writing votes:', error);
    }
};

module.exports = async (req, res) => {
    if (req.method === 'POST') {
        const { team, players } = req.body;

        // Read current votes from the file
        const votes = readVotes();

        // Initialize team if it doesn't exist
        if (!votes[team]) {
            votes[team] = {};
        }

        // Increment the vote count for each selected player
        players.forEach(player => {
            if (!votes[team][player]) {
                votes[team][player] = 0;
            }
            votes[team][player] += 1;
        });

        // Save the updated votes back to votes.json
        writeVotes(votes);

        res.status(200).json({ message: 'Vote submitted successfully!' });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
