import User from "@/models/user";
import connectDb from "@/middleware/mongoose";

connectDb();

export async function handler(req, res) {
  try {
    const reqBody = await req.body;
    const { token } = reqBody;
  

    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if(!user){
        return res.status(400).json({error:"Invalid token"});
    }

   

    user.isVerified = true;
    user.verifyToken=undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();

    return res.status(200).json({
        message: "Email verified successfully",
        success:true
    })


  } catch (error) {
    console.log(error);
    return res.status(200).json({ error: error.message });
  }
}
