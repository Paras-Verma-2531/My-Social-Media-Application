const {success}=require('../Utils/responseWrapper');
const getAllPostController = async (req, res) => {
  return res.send(success(200,"these are all your post"));
};
module.exports = getAllPostController;
