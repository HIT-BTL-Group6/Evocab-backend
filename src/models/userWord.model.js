const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const Schema = mongoose.Schema;
const userWordSchema = new mongoose.Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Please provide the userID!'],
        },
        words: [{ type: Schema.Types.ObjectId, ref: 'Word', required: [true, 'Please provide the wordID!'] }],
    },
    {
        timestamps: true,
    }
);
// add plugin that converts mongoose to json
userWordSchema.plugin(toJSON);
userWordSchema.plugin(paginate);

const UserWord = mongoose.model('UseWord', userWordSchema);

module.exports = UserWord;
