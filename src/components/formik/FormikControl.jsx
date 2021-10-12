import Input from './Input';
import Textarea from './Textarea';

export const FormikControl = ({
	control,
	counterProps,
	stripe,
	onAddress,
	...props
}) => {
	switch (control) {
		case 'input':
			return <Input {...props} />;
		case 'textarea':
			return <Textarea {...props} />;
		default:
			return null;
	}
};

export default FormikControl;
