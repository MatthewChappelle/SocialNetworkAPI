const {Schema, model, Types} = require("mongoose");
const dateFormat = require("../utils/dateFormat");

// creates reactionSchema using the reactionSchema
const reactionSchema = new Schema(
    {
      reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
      },
      reactionBody: {
        type: String,
        required: true,
        maxlength: 1000,
      },
      username: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal),
      }
    },
    {
      toJSON: {
        getters: true,
      }
    }
  );

// creates thought using the thoughtSchema
const thoughtSchema = new Schema(
    {
      thoughtText: {
        type: String,
        required: true,
        maxlength: 280,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal),
      },
      username: {
        type: String,
        required: true,
      },
      reactions: [reactionSchema],
    },
    {
      toJSON: {
        virtuals: true,
        getters: true,
      },
      id: false,
    }
  );

// creates reactionCount that finds length of reactions array
thoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
  });
  
  const Thought = model("Thought", thoughtSchema);
  
  module.exports = Thought;