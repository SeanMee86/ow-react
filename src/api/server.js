const express = require('express');
const app = express();
const mongoose = require('mongoose');
const heroSchema = require('./heroSchema');
const Hero = mongoose.model('hero', heroSchema, 'hero');
require('dotenv').config();

async function createHero(hero) {
    return new Hero({
        id: hero.id,
        name: hero.name,
        picture_name: hero.picture_name,
        description: hero.description,
        age: hero.age,
        affiliation: hero.affiliation,
        base_of_operations: hero.base_of_operations,
        abilities: hero.abilities
    }).save()
}

async function findOneHero(id) {
    return Hero.findOne({id});
}

async function findAllHeroes() {
    return Hero.find({});
}

app.use(express.json());
app.use(express.urlencoded());

app.get('/heroes', (req, res) => {
    (async () => {
        const connector = mongoose.connect(process.env.CONNECTION_STRING);
        let heroes = await connector.then(async () => {
            return findAllHeroes()
        });
        res.send(heroes);
    })()
});

app.get('/api/v1/hero', (req, res) => {
    (async () => {
        const connector = mongoose.connect(process.env.CONNECTION_STRING);
        const id = 3;

        let hero = await connector.then(async () => {
            return findOneHero(id)
        });

        if(!hero) {
            hero = await createHero({
                id,
                name: 'Soldier 76',
                picture_name: 'soldier-76',
                description: 'Armed with cutting-edge weaponry, including an experimental pulse rifle that’s capable of firing spirals of high-powered Helix Rockets, Soldier: 76 has the speed and support know-how of a highly trained warrior.',
                age: 0,
                affiliation: 'Overwatch',
                base_of_operations: 'Unknown',
                abilities: [
                    {
                        name: 'HEAVY PULSE RIFLE',
                        description: 'Soldier: 76’s rifle remains particularly steady while unloading fully-automatic pulse fire.',
                        is_ultimate: false
                    }, {
                        name: 'HELIX ROCKETS',
                        description: 'Tiny rockets spiral out of Soldier: 76’s Pulse Rifle in a single burst. The rockets’ explosion damages enemies in a small radius.',
                        is_ultimate: false
                    }, {
                        name: 'SPRINT',
                        description: `Whether he needs to evade a firefight or get back into one, Soldier: 76 can rush ahead in a burst of speed. His sprint ends if he takes an action other than charging forward.`,
                        is_ultimate: false
                    },{
                        name: 'BIOTIC FIELD',
                        description: `Soldier: 76 plants a biotic emitter on the ground. Its energy projection restores health to 76 and any of his squadmates within the field.`,
                        is_ultimate: false
                    }, {
                        name: 'TACTICAL VISOR',
                        description: `Soldier: 76’s pinpoint targeting visor “locks” his aim on the threat closest to his crosshairs. If an enemy leaves his line of sight, Soldier: 76 can quickly switch to another target.`,
                        is_ultimate: true
                    }
                ]
            })
        }
        console.log(hero);
    })();
});

app.post('/api/v1/hero', (req, res) => {
    console.log(req);
});

app.listen(4000, () => console.log(`Listening on Port: 4000`));