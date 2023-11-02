const { Schema, model, Types } = require('mongoose');

const Reaction = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
    required: true,
  },
  reactionBody: { type: String, required: true },
  createdAt:{
      type: Schema.Types.Date,
      default: Date.now(),
      get: (date) => {return date.format("%Y-%m-%d %H:%M:%S");}
    },
    username:{
      type: Schema.Types.String,
      required: true,
    },
});

// Schema to create User model
const thoughtSchema = new Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
      required: true,
    },
    thoughtText:{
      type: Schema.Types.String,
      required: true,
      validate:
        properLength = function(string){
          if (string.length >= 1 && string.length <= 280){
            return true;
          }
          return false;
        
      }
    },
    createdAt:{
      type: Schema.Types.Date,
      default: Date.now(),
      get: (date) => {return date.format("%Y-%m-%d %H:%M:%S");}
    },
    username:{
      type: Schema.Types.String,
      required: true,
    },
    reactions: [Reaction]
  },
  {
    // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `fullName` that gets and sets the user's full name
thoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return this.reactions.length;
  });

// Initialize our User model
const Thought = model('Thought', thoughtSchema);

module.exports = {Thought, Reaction};
