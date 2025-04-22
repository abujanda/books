import type { FC } from 'react';
import Head from 'next/head';

interface SeoProps {
  title?: string;
}

export const Seo: FC<SeoProps> = (props) => {
  const { title } = props;

  const fullTitle = title
    ? title + ' | My Book App'
    : 'My Book App';

  return (
    <Head>
      <title>
        {fullTitle}
      </title>
    </Head>
  );
};