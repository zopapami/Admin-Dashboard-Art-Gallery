module.exports = (mongoose) => {
  // schema
  let schema = mongoose.Schema(
    {
      collection: String,
      creator: String,
      description: String,
      onShop: Boolean,
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
  const Painting = mongoose.model("painting", schema);
  
  return Painting;
};
