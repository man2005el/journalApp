import { useState, useEffect, useMemo } from "react";



export const useForm = (initialForm = {}, formValidations = {}) => {
    
    const [formState, setFormState] = useState(initialForm)
    const [formValidation, setFormValidation] = useState({})

    useEffect(() => {
        createValidators();

    }, [formState])

    useEffect(() => {
        setFormState(initialForm)
    }, [initialForm])

    const isFormValid = useMemo(() => {

        for ( const formValue of Object.keys(formValidation)) {
            if (formValidation[formValue] !== null ) return false;
        }

        return true;
    }, [formValidation])

    const onInputChange = ({target}) => {
        const {name, value} = target;
        setFormState({
            ...formState,
            [ name ]: value,
        });
        
    }

    const onReset = () => {
        setFormState(initialForm);
        
    }

    const createValidators = () => {
        const formCheckedValues = {}

        for (const formField of Object.keys(formValidations)) {
            const [fn, errorMessage] = formValidations[formField];

            formCheckedValues[`${ formField }Valid`] = fn( formState[formField] ) ? null : errorMessage;
            
        }

        setFormValidation(formCheckedValues);

    }



    //useEffect(() => {console.log('UE Called')}, [])
    //useEffect(() => {console.log('FS Called')}, [formState])
//useEffect(() => {console.log('EM Called')}, [email]) 
    
    return{
        ...formState,formState, onInputChange, onReset,  ...formValidation, isFormValid
    } 
    
}
