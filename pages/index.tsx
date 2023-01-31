import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import LocaleSwitcher from '@/src/LocaleSwitcher';

interface Project {
	id: string;
	name: string;
}

export default function Home(
	props: InferGetStaticPropsType<typeof getStaticProps>
) {
	const { t } = useTranslation();

	return (
		<>
			<Head>
				<title>Donations POC</title>
				<meta name="description" content="Donations POC" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className={styles.main}>
				<LocaleSwitcher
					initialLanguage={props._nextI18Next?.initialLocale || 'en'}
				/>
				<div className={styles.description}>{t('common:hello')}</div>
				<ol>
					{props.projects.map((project) => {
						return <li key={project.id}>{project.name}</li>;
					})}
				</ol>
				<Link href={'/test'}>{t('common:test')}</Link>
			</main>
		</>
	);
}

export const getStaticProps = async ({ locale }: { locale: string }) => {
	let projects: Project[] = [];
	await fetch(
		'https://app-staging.plant-for-the-planet.org/app/projects?' +
			new URLSearchParams({
				_scope: 'map',
				locale,
			})
	)
		.then((res) => res.json())
		.then((response) => {
			projects = response.map((item: { properties: {} }) => {
				return {
					id: (item.properties as Project).id,
					name: (item.properties as Project).name,
				};
			});
		});

	return {
		props: {
			...(await serverSideTranslations(locale || 'en', ['common'])),
			projects,
		},
		revalidate: 30,
	};
};
