const { Thought } = require("../models");

const thoughtController = {

  // create Thought
  async createThought({ params, body }, res) {
    try {
      const { _id } = await Thought.create(body);
      const dbUserData = await User.findOneAndUpdate(
        { _id: body.userId },
        { $push: { thoughts: _id } },
        { new: true }
      );

      if (!dbUserData) {
        return res
          .status(404)
          .json({ message: "Thought created but no user with this id!" });
      }

      res.json({ message: "Thought successfully created!" });
    } catch (err) {
      res.json(err);
    }
  },

  // get all Thoughts
  async getAllThoughts(req, res) {
    try {
      const dbThoughtData = await Thought.find({})
        .populate({ path: "reactions", select: "-__v" })
        .select("-__v")
        .sort({ _id: -1 });
      res.json(dbThoughtData);
    } catch (err) {
      console.log(err);
      res.sendStatus(400);
    }
  },

  // get one Thought by id
  async getThoughtById({ params }, res) {
    try {
      const dbThoughtData = await Thought.findOne({ _id: params.id })
        .populate({
          path: "reactions",
          select: "-__v",
        })
        .select("-__v");
      if (!dbThoughtData) {
        return res.status(404).json({ message: "No thought with this id!" });
      }
      res.json(dbThoughtData);
    } catch (err) {
      console.log(err);
      res.sendStatus(400);
    }
  },

  // update Thought by id
  async updateThought({ params, body }, res) {
    try {
      const dbThoughtData = await Thought.findOneAndUpdate({ _id: params.id }, body, {
        new: true,
        runValidators: true,
      });

      if (!dbThoughtData) {
        return res.status(404).json({ message: "No thought found with this id!" });
      }

      res.json(dbThoughtData);
    } catch (err) {
      res.json(err);
    }
  },

  // delete Thought
  async deleteThought({ params }, res) {
    try {
      const dbThoughtData = await Thought.findOneAndDelete({ _id: params.id });

      if (!dbThoughtData) {
        return res.status(404).json({ message: "No thought found with this id!" });
      }

      res.json(dbThoughtData);
    } catch (err) {
      res.json(err);
    }
  },

  // add reaction
  async addReaction({ params, body }, res) {
    try {
      const dbThoughtData = await Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $addToSet: { reactions: body } },
        { new: true, runValidators: true }
      );

      if (!dbThoughtData) {
        return res.status(404).json({ message: "No thought with this id" });
      }

      res.json(dbThoughtData);
    } catch (err) {
      res.json(err);
    }
  },

  // delete reaction
  async removeReaction({ params }, res) {
    try {
      const dbThoughtData = await Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $pull: { reactions: { reactionId: params.reactionId } } },
        { new: true }
      );

      if (!dbThoughtData) {
        return res.status(404).json({ message: "No thought with this id" });
      }

      res.json(dbThoughtData);
    } catch (err) {
      res.json(err);
    }
  },
};

module.exports = thoughtController;
