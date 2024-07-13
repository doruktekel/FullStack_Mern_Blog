import bcryptjs from "bcryptjs";

const hashPassword = async (pass) => {
  try {
    return await bcryptjs.hash(pass, 12);
  } catch (error) {
    console.log(error);
  }
};

export { hashPassword };
