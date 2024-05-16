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
                    formData(values)
                    resetForm()
                    setSubmitting(false)
                }, 100)
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
                                type={item.type}
                                values={values.name}
                                inputProps={item.inputProps}
                            />
                        ))}
                        <Button disabled={isSubmitting} type='submit' variant="contained">Adicionar</Button>
                    </FormControl>
                </form>
            )}
        </Formik>
    )
}