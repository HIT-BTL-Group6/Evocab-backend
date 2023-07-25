const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const Schema = mongoose.Schema;

const topicSchema = new Schema(
    {
        nameTopic: {
            type: String,
            required: [true, 'Please provide the nameTopic!'],
            trim: true,
        },
        words: [{ type: Schema.Types.ObjectId, ref: 'Word' }],
    },
    {
        timestamps: true,
    }
);
// add plugin that converts mongoose to json
topicSchema.plugin(toJSON);
topicSchema.plugin(paginate);

const Topic = mongoose.model('Topic', topicSchema);

module.exports = Topic;
