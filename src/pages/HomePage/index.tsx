import { ChangeEvent, useEffect, useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Link,
  ListItem,
  Stack,
  Tag,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import { ArrowBackIcon, ArrowForwardIcon, StarIcon } from '@chakra-ui/icons';
import { useQuery, useQueryClient } from 'react-query';

import { CircleIcon } from 'components';

import { fetchRepositories } from 'apis/repositories';

import styles from './styles.module.scss';

const maxPostPage = 1;

const HomePage = () => {
  const queryClient = useQueryClient();
  const [value, setValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (currentPage < maxPostPage) {
      const nextPage = currentPage + 1;
      queryClient.prefetchQuery(['posts', nextPage], () =>
        fetchRepositories(value, nextPage),
      );
    }
  }, [currentPage, queryClient, value]);

  const { data, error, isError, isLoading, isPreviousData } = useQuery(
    ['repositories', currentPage],
    () => fetchRepositories(value, currentPage),
    {
      keepPreviousData: true,
      staleTime: 2000,
    },
  );

  if (isLoading) {
    return <span>Loading ...</span>;
  }

  if (isError) {
    return <span>Error: </span>;
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div className={styles.container}>
      <FormControl className={styles.searchFormContainer}>
        <FormLabel>Github repository name</FormLabel>
        <Input
          placeholder='Input Github repository name'
          onChange={handleChange}
          value={value}
        />
      </FormControl>

      <UnorderedList className={styles.repositoriesContainer} spacing={6}>
        {data?.items.map((item: any, index: number) => (
          <ListItem className={styles.repositoryWrapper} key={item.id}>
            <Link color='teal.400' href='#' fontWeight='bold' fontSize={16}>
              {item.full_name}
            </Link>
            <Text fontSize={14} mb={1}>
              {item.description}
            </Text>
            {item.topics.map((topic: string) => (
              <Tag className={styles.topicTag} fontSize={12} mb={1}>
                {topic}
              </Tag>
            ))}
            <Stack direction='row' alignItems='center' fontSize={12}>
              <StarIcon />
              <Text>{item.stargazers_count}</Text>
              <CircleIcon /> <Text>{item.language}</Text>
            </Stack>
          </ListItem>
        ))}
      </UnorderedList>

      <Stack
        spacing={4}
        direction='row'
        align='center'
        justify='flex-end'
        className={styles.pages}
      >
        <Button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          leftIcon={<ArrowBackIcon />}
        >
          Previous
        </Button>

        <span>{currentPage}</span>
        <Button
          disabled={isPreviousData || currentPage === maxPostPage}
          onClick={() => {
            if (!isPreviousData) {
              setCurrentPage(currentPage + 1);
            }
          }}
          rightIcon={<ArrowForwardIcon />}
        >
          Next
        </Button>
      </Stack>
    </div>
  );
};

export default HomePage;
