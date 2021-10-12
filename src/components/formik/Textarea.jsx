import { Field as FormikField, ErrorMessage } from 'formik';
import styled from 'styled-components';
import FieldError from './FieldError';
import { inputStyles } from './styles';

const Field = styled(FormikField)`
	${inputStyles};
`;

export const Textarea = ({ label, name, error, ...rest }) => (
	<fieldset>
		<label htmlFor={name}>{label}</label>
		<Field
			component='textarea'
			id={name}
			name={name}
			error={error ? 1 : 0}
			{...rest}
		/>
		<ErrorMessage name={name} component={FieldError} />
	</fieldset>
);

export default Textarea;
