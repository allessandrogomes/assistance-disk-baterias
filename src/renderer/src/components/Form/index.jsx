import { Button, FormControl, Typography } from "@mui/material"
import { Formik } from "formik"
import TextFieldForm from "../TextFieldForm"


export default function Form({ initialValues, schema, formTitle, formFields, formStyle, formData }) {
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                setTimeout(() => {
                    console.log(values.name)
                    formData(values)
                    resetForm()
                    setSubmitting(false)
                }, 2000)
            }}
        >

            {({
                values,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting
            }) => (
                <form onSubmit={handleSubmit}>
                    <Typography component="h2" variant="h6" textAlign="center">{formTitle}</Typography>
                    <FormControl sx={formStyle}>
                        {formFields.map(item => (
                            <TextFieldForm
                                key={item.name}
                                name={item.name}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                title={item.title}
                                value={values[item.name] || ''}
                                type={item.type}
                                inputProps={item.inputProps}
                            />
                        ))}
                        <Button sx={{ position: "relative", left: "150px", mt: "10px", backgroundColor: "#000", '&:hover': { backgroundColor: "#2A2D38" } }} disabled={isSubmitting} type='submit' variant="contained">Adicionar</Button>
                    </FormControl>
                </form>
            )}
        </Formik>
    )
}