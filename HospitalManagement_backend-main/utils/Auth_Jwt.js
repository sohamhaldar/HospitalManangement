import jwt from "jsonwebtoken";

const verifyToken=(token,key)=>{
    try{
        if(!token) return null;
        jwt.verify(token,key);    
    }catch(error) {
        console.log("Some error occured in token verification: ",error);
    }
    
}