import { Schema, model } from 'mongoose';

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    username: {
        type: String,
        required: true
    },
    reactions: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Reaction'
        }
    ]
},
{
    toJSON: {
        virtuals: true
    },
    id: false
}
);

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

export default Thought;