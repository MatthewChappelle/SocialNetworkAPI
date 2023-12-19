const {Schema, model} = require("mongoose");

// creates userSchema using the userSchema
const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        // validates email format
        match: [
            /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
            "Please enter a valid email address",
        ]
    },

    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Thought"
        },
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
    ]
}, {
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});

// finds length of friendCount array
userSchema.virtual("friendCount").get(function () {
    return this.friends.length;
  });

// Create user using the userSchema
const User = model("User", userSchema);
module.exports = User;