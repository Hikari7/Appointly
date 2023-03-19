import axiosClient from "./axiosClient";

const authApi = {
  signup: (params) => axiosClient.post("auth/signup", params),
  login: (params) => axiosClient.post("auth/login", params),
  //✅not sure wheter using Redux or API
  //✅MongoDBの_idでuserの_id(uid)が取れるようになればuseParams使える？useParamsに関してはAPIの操作の方がいい？
  // getOne: (id) => axiosClient.get(`auth//${id}`),
};

export default authApi;

// exports.getOne = async (req, res) => {
//   const { userId } = req.params;
//   try {
//     const user = await User.findOne({ user: req.user._id, _id: userId });
//     if (!user) return res.status(404).json("any user is not created yet");
//     res.status(200).json(user);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };
