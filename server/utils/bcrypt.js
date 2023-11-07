import { hash,compare } from "bcrypt";

const hashPassword = async(password)=>{
    try {
        return await hash(password,10);
    } catch (error) {
        console.log(error);
    }
}

const comparePassword = async(givenPassword,originalPassword)=>{
    try {
        return await compare(givenPassword,originalPassword);
    } catch (error) {
        console.log(error);
    }
}

export {hashPassword,comparePassword};