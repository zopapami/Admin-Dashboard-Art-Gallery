module.exports = mongoose => {
  // schema
  let schema = mongoose.Schema(
    {
      description: String,
      imageURL: String,
      title: String,
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
  const Collection = mongoose.model("collection", schema);
  return Collection;
};
