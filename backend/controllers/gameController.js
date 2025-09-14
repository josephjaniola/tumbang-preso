let scores = [];

// Get scores
const getHighScores = (req, res) => {
  res.json(scores);
};

// Save score
const saveScore = (req, res) => {
  const { player, score } = req.body;
  if (player && score !== undefined) {
    scores.push({ player, score });
    scores.sort((a, b) => b.score - a.score);
    res.json({ message: "Score saved!", scores });
  } else {
    res.status(400).json({ message: "Invalid data" });
  }
};

module.exports = { getHighScores, saveScore };
