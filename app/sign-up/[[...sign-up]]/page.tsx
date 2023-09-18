import { SignUp } from "@clerk/nextjs";

const SignUpPAge = ()=>{
    return <SignUp afterSignUpUrl={"/new-user"} redirectUrl={"/new-user"}></SignUp>
}

export default SignUpPAge