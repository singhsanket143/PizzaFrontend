import { useState } from "react";
import toast from "react-hot-toast";
import SignUpPresentation from "./SignupPresentation";
import { useDispatch } from "react-redux";
import { createAccount } from "../../Redux/Slices/AuthSlice";
import { useNavigate } from "react-router-dom";
// Container for the Signup page
function Signup() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [signUpState, setSignUpState] = useState({
        firstName: '',
        email: '',
        mobileNumber: '',
        password: ''
    });

    function handleUserInput(e) {
       const {name, value} = e.target;
       setSignUpState({
        ...signUpState,
        [name]: value
       })
    }

    async function handleFormSubmit(e) {
        e.preventDefault(); // prevent the form from reloading the page
        console.log(signUpState);

        // Add validations for the form input
        if(!signUpState.email || !signUpState.mobileNumber || !signUpState.password || !signUpState.firstName) {
            toast.error("Missing values from the form")
            return;
        }

        if(signUpState.firstName.length < 5 || signUpState.firstName.length > 20) {
            toast.error("First name should be atleast 5 characters long and maximum 20 characters long")
            return;
        }

        // check email
        if(!signUpState.email.includes('@') || !signUpState.email.includes('.')) {
            toast.error("Invalid email address")
            return;
        }

        // check mobile number length to be between 10-12
        if(signUpState.mobileNumber.length < 10 || signUpState.mobileNumber.length > 12) {
            toast.error("Mobile number should be between 10-12 characters")
            return;
        }

        const apiReponse = await dispatch(createAccount(signUpState));
        console.log("Api response", apiReponse);
        if(apiReponse.payload.data.success) {
            navigate('/auth/login');
        }
    }

    return (
        <SignUpPresentation 
            handleFormSubmit={handleFormSubmit} 
            handleUserInput={handleUserInput} 
            
        />
    )
}

export default Signup;