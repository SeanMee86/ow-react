const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: [
            true,
            'Id is required'
        ]
    },
    name: {
        type: String,
        required: [
            true,
            'Name is Required'
        ]
    },
    picture_name: {
        type: String,
        required: [
            false,
        ]
    },
    description: {
        type: String,
        required: [
            true,
            'Description is Required'
        ]
    },
    age: {
        type: Number,
        required: [
            false
        ]
    },
    affiliation: {
        type: String,
        required: [
            false
        ]
    },
    base_of_operations: {
        type: String,
        required: [
            false
        ]
    },
    abilities: {
        type: [
            {
                name: {
                    type: String,
                    required: [
                        true,
                        'Name of ability is required'
                    ]
                },
                description: {
                    type: String,
                    required: [
                        true,
                        'Description of ability is required'
                    ]
                },
                is_ultimate: {
                    type: Boolean,
                    required: [
                        true,
                        'Must define if is ultimate ability'
                    ]
                }
            }
        ]
    }

});

module.exports = heroSchema;