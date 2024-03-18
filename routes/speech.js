const express = require("express");
const PlayHT = require("playht");
const router = express.Router();
require("dotenv").config();
router.post("/", async (req, res) => {
  const { userInput } = req.body;
  res.setTimeout(27000, async () => {
    console.log(userInput);
    try {
      PlayHT.init({
        apiKey: process.env.PLAYCHAT_API_KEY,
        userId: process.env.PLAYCHAT_USER_ID,
        defaultVoiceId:
          "s3://peregrine-voices/oliver_narrative2_parrot_saad/manifest.json",
        defaultVoiceEngine: "PlayHT2.0",
      });

      const generated = await PlayHT.generate(userInput, {
        voiceEngine: "PlayHT2.0",
        voiceId:
          "s3://peregrine-voices/oliver_narrative2_parrot_saad/manifest.json",
        outputFormat: "mp3",
        temperature: 1.5,
        quality: "high",
        speed: 0.8,
      });

      // Grab the generated file URL
      const { audioUrl } = generated;

      console.log("The url for the audio file is", audioUrl);
      res.status(200).send({ audiourl: audioUrl, userInput: userInput });
    } catch (error) {
      console.error("Error generating speech:", error.message);
      res.status(500).json({ error: "Error generating speech" });
    }
  });
});
module.exports = router;
