import type { FC } from 'react';
import Head from 'next/head';

interface SeoProps {
  title?: string;
}

export const Seo: FC<SeoProps> = (props) => {
  const { title } = props;

  const fullTitle = title
    ? title + ' | Book Notes'
    : 'Book Notes';

  return (
    <Head>
      <title>
        {fullTitle}
      </title>
    </Head>
  );
};