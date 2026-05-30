import LockIcon from '../assets/icons/LockIcon';
import MailIcon from '../assets/icons/MailIcon';
import UserIcon from '../assets/icons/UserIcon';

const iconByKey = {
	user: UserIcon,
	mail: MailIcon,
	lock: LockIcon,
};

export function mapFieldsWithIcons(fields) {
	return fields.map((field) => ({
		...field,
		Icon: iconByKey[field.iconKey],
	}));
}
