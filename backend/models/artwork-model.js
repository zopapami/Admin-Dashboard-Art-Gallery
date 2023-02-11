module.exports = mongoose => {
  // schema
  let schema = mongoose.Schema(
    {
      artist: String,
      category: String, //collection
      description: String,
      imageURL: String,
      title: String,
      year: Number
    },
    { timestamps: true }
  );
  // method
  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });
  // model
  const Artwork = mongoose.model("artwork", schema);
  return Artwork;
};
