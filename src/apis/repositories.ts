const GITHUB_API = 'https://api.github.com/search/repositories';
const NUMBER_OF_REPOSITORIES_PER_PAGE = 10;

export async function fetchRepositories(
  query: string,
  page: number,
  perPage: number = NUMBER_OF_REPOSITORIES_PER_PAGE,
) {
  if (!query) return;
  const response = await fetch(
    `${GITHUB_API}?q=${query}&per_page=${perPage}&page=${page}`,
  );
  return response.json();
}
