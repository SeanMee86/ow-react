const express = require('express');
const app = express();
const mongoose = require('mongoose');
const heroSchema = require('./heroSchema');
const Hero = mongoose.model('hero', heroSchema, 'hero');
const path = require('path');
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

findAllHeroes = async () => {
    return Hero.find({});
};

app.use(express.json());
app.use(express.urlencoded());

app.get('/heroes', (req, res) => {
    (async () => {
        const connector = mongoose.connect(process.env.CONNECTION_STRING);
        const heroes = await connector.then(async () => {
            return findAllHeroes()
        });
        res.send(heroes);
    })()
});

app.get('/api/v1/hero', (req, res) => {
    (async () => {
        const connector = mongoose.connect(process.env.CONNECTION_STRING);
        const id = 6;

        const hero = await connector.then(async () => {
            return findOneHero(id)
        });

        if(!hero) {
            createHero({
                id,
                name: 'Bastion',
                description: 'Repair protocols and the ability to transform between stationary Assault, mobile Recon and devastating Tank configurations provide Bastion with a high probability of victory.',
                age: 30,
                affiliation: 'None',
                base_of_operations: 'Unknown',
                abilities: [
                    {
                        name: 'CONFIGURATION: RECON',
                        description: 'In Recon mode, Bastion is fully mobile, outfitted with a submachine gun that fires steady bursts of bullets at medium range.',
                        is_ultimate: false
                    }, {
                        name: 'CONFIGURATION: SENTRY',
                        description: 'In Sentry mode, Bastion is a stationary powerhouse equipped with a gatling gun capable of unleashing a hail of bullets. The gun\'s aim can be "walked" across multiple targets, dealing devastating damage at short to medium range.',
                        is_ultimate: false
                    }, {
                        name: 'RECONFIGURE',
                        description: `Bastion transforms between its two primary combat modes to adapt to battlefield conditions.`,
                        is_ultimate: false
                    }, {
                        name: 'SELF-REPAIR',
                        description: `Bastion restores its health; it cannot fire weapons while the repair process is in effect.`,
                        is_ultimate: false
                    }, {
                        name: 'CONFIGURATION: TANK',
                        description: `In Tank mode, Bastion extends wheeled treads and a powerful long-range cannon. The cannon’s explosive shells demolish targets in a wide blast radius, but Bastion can only remain in this mode for a limited time.`,
                        is_ultimate: true
                    }
                ]
            }).then(async () => {
                const heroes = await findAllHeroes();
                res.send(heroes);
            });
        }
    })();
});

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('/client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Listening on Port: ${port}`));