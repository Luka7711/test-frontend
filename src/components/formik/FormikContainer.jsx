import { Formik, Form as FormikForm } from 'formik';
import FormikControl from './FormikControl';
import styled from 'styled-components';

export const Form = styled(FormikForm)`
	margin: 0 auto;
	padding: 1rem 2rem;
	position: relative;
	width: 50%;
`;

export const FormikContainer = ({
	children,
	initialValues,
	validationSchema,
	formHeader,
	headerMsg,
	onSubmit,
	fields,
	btnText,
	...props
}) => {
	return (
		<Formik initialValues={initialValues} onSubmit={onSubmit}>
			{formik => {
				return (
					<Form>
						<h1>{formHeader}</h1>
						{headerMsg ? <p>{headerMsg}</p> : null}
						{fields.map(field => (
							<FormikControl
								key={field.name}
								options={field.options}
								control={field.control}
								type={field.type}
								label={field.label}
								name={field.name}
								error={formik.errors[field.name] && formik.touched[field.name]}
								{...field}
								{...props}
							/>
						))}
						{children}
						{/* <button type='submit'>{btnText}</button> */}
					</Form>
				);
			}}
		</Formik>
	);
};

export default FormikContainer;
