module.exports = mongoose => {
  // schema
  let schema = mongoose.Schema(
    {
      address: String,
      bio: String,
      email: String,
      facebook: String,
      imageURL: String,
      instagram: String,
      name: String,
      phone: String
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
  const Info = mongoose.model("info", schema);
  return Info;
};
