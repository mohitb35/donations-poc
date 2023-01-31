import { useRouter } from 'next/router';
import { ReactElement, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';

interface Props {
	initialLanguage: string;
}

const LocaleSwitcher = ({ initialLanguage }: Props): ReactElement => {
	const router = useRouter();
	const { t } = useTranslation();

	const handleLanguageChange = (lang: string) => {
		const { pathname, query, asPath } = router;
		document.cookie = `NEXT_LOCALE=${lang}; max-age=31536000; path=/`;
		// change just the locale and maintain all other route information including href's query
		router.push({ pathname, query }, asPath, { locale: lang });
	};

	return (
		<div>
			<select
				value={initialLanguage}
				onChange={(event) => handleLanguageChange(event.target.value)}
			>
				<option value="en">{t('common:english')}</option>
				<option value="de">{t('common:german')}</option>
			</select>
		</div>
	);
};

export default LocaleSwitcher;
