import { MainPage } from '@/pages/main';
import { GameDetailsWidget } from '@/widgets/games-details';
import type { ReactNode } from 'react';

interface PageProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function SearchRoute(props: PageProps): Promise<ReactNode> {
  const searchParams = await props.searchParams;
  const detailsId = searchParams.details;

  return (
    <MainPage searchParams={searchParams}>
      {detailsId ? <GameDetailsWidget searchParams={searchParams} /> : null}
    </MainPage>
  );
}
