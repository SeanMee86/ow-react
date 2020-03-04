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
        const id = 5;

        let hero = await connector.then(async () => {
            return findOneHero(id)
        });

        if(!hero) {
            createHero({
                id,
                name: 'Baptiste',
                description: 'Baptiste wields an assortment of experimental devices and weaponry to keep allies alive and eliminate threats under fierce conditions. A battle-hardened combat medic, he is just as capable of saving lives as he is taking out the enemy.',
                age: 36,
                affiliation: 'Caribbean Coalition',
                base_of_operations: 'Tortuga, Haiti',
                abilities: [
                    {
                        name: 'BIOTIC LAUNCHER',
                        description: 'Baptiste’s three-round-burst Biotic Launcher rewards accuracy and recoil control with significant damage output. It also doubles as a healing device, lobbing projectiles that heal allies near the point of impact.',
                        is_ultimate: false
                    }, {
                        name: 'REGENERATIVE BURST',
                        description: 'Baptiste activates an intense regenerative burst that heals himself and nearby allies over time.',
                        is_ultimate: false
                    }, {
                        name: 'IMMORTALITY FIELD',
                        description: `Baptiste uses a device to create a field that prevents allies from dying. The generator can be destroyed.`,
                        is_ultimate: false
                    }, {
                        name: 'AMPLIFICATION MATRIX',
                        description: `Baptiste creates a matrix that doubles the damage and healing effects of friendly projectiles that pass through it.`,
                        is_ultimate: true
                    }, {
                        name: 'EXO BOOTS',
                        description: `By first crouching, Baptiste can jump higher.`,
                        is_ultimate: false
                    }
                ]
            }).then(async () => {
                const heroes = await findAllHeroes();
                res.send(heroes);
            });
        }
    })();
});

app.post('/api/v1/hero', (req, res) => {
    console.log(req);
});

app.listen(4000, () => console.log(`Listening on Port: 4000`));