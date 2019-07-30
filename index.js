const express = require('express');
const fs = require('fs');

const app = express();
app.listen(process.env.PORT || 4000, () => console.log("Listening... at 2000"));
app.use(express.static("public"));

app.get('/monsters', async (request, response) => {
    const rawData = fs.readFileSync('5e-database/5e-SRD-Monsters.json');
    const monsters = JSON.parse(rawData);
    response.json(monsters);
});

app.get('/monsters/:id', async (request, response) => {
    const id = request.params.id;
    const rawData = fs.readFileSync('5e-database/5e-SRD-Monsters.json');
    const monsters = JSON.parse(rawData);
    response.json(monsters[id]);
});