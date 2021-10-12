import { Field as FormikField, ErrorMessage } from 'formik';
import styled from 'styled-components';
import FieldError from './FieldError';
import { inputStyles } from './styles';

const Field = styled(FormikField)`
	${inputStyles};
`;
const Fieldset = styled.fieldset`
	padding: 0 0 1rem 0;
	border: none;
	width: 100%;
	height: auto;
	display: flex;
	flex-flow: column nowrap;
`;

export const Input = ({ children, label, name, error, ...rest }) => {
	return (
		<Fieldset>
			<label htmlFor={name}>{label}</label>
			<Field id={name} name={name} error={error ? 1 : 0} {...rest} />
			<ErrorMessage name={name} component={FieldError} />
		</Fieldset>
	);
};

export default Input;
