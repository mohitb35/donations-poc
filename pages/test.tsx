import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import LocaleSwitcher from '@/src/LocaleSwitcher';

export default function TestPage(
	props: InferGetStaticPropsType<typeof getStaticProps>
) {
	const { t } = useTranslation();

	return (
		<>
			<Head>
				<title>Test - Donations POC</title>
				<meta name="description" content="Test Page - Donations POC" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className={styles.main}>
				<LocaleSwitcher
					initialLanguage={props._nextI18Next?.initialLocale || 'en'}
				/>
				<div className={styles.description}>{t('common:test')}</div>
				<Link href={'/'}>{t('common:back')}</Link>
			</main>
		</>
	);
}

export const getStaticProps = async ({ locale }: { locale: string }) => {
	return {
		props: {
			...(await serverSideTranslations(locale || 'en', ['common'])),
		},
	};
};
