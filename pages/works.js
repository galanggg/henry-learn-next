import { Container, Flex, Box, Heading, Link, Text, Button } from '@chakra-ui/core';
// Dynamic Data
import Prismic from 'prismic-javascript';
import { RichText, Date } from 'prismic-reactjs';
import { Client } from '@/utils/prismicHelpers';
import Router, { withRouter, useRouter } from 'next/router';
import Masonry from '@/components/Masonry';
import ReactPaginate from 'react-paginate';
// import styles from '@/components/CSSModule/Pagination.module.css';
import styles from '@/components/CSSModule/Pagination.module.scss';

export async function getStaticProps({ preview = null, previewData = {} }) {
  const { ref } = previewData;

  const client = Client();

  const projects = await client.query(Prismic.Predicates.at('document.type', 'project'), {
    orderings: '[my.project.date desc]',
    pageSize: 4,
    ...(ref ? { ref } : null)
  });

  const pathni = projects.total_pages;
  let pathstatic = [];
  let i;
  for (i = 0; i < pathni; i++) {
    pathstatic.push(i + 1);
  }
  let pathmap = pathstatic.map((doc) => `/blog/${doc}`);

  return {
    props: {
      projects: projects ? projects.results : [],
      preview,
      debug: pathmap,
      totalpages: pathni
    },
    revalidate: 1
  };
}

const Works = ({ projects, debug, totalpages }) => {
  const router = useRouter();
  return (
    <>
      <Container maxW="xl">
        <Flex direction="row" py={24}>
          <Heading width={{ base: 'full', md: '4/5' }} size="lg" fontWeight="light">
            Work page
          </Heading>
        </Flex>
      </Container>

      <Masonry projects={projects} buttonmore={false} />

      <ReactPaginate
        // previousLabel={'PREV'}
        previousLabel={
          <Button
            borderWidth="1px"
            borderColor="lightgrey"
            fontSize="12px"
            borderRadius="0"
            variant="outline"
            _hover={{
              color: 'palletGoldSoft',
              bg: 'palletBlue'
            }}
          >
            Prev
          </Button>
        }
        nextLabel={
          <Button
            borderWidth="1px"
            borderColor="lightgrey"
            fontSize="12px"
            borderRadius="0"
            variant="outline"
            _hover={{
              color: 'palletGoldSoft',
              bg: 'palletBlue'
            }}
          >
            Next
          </Button>
        }
        breakLabel={'...'}
        breakClassName={'break-me'}
        activeClassName={styles.active}
        containerClassName={styles.pagination}
        // subContainerClassName={'pages pagination'}
        pageCount={totalpages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        // Khusus di first.
        forcePage={0}
        onPageChange={(page) => router.push('/works/' + (page.selected + 1))}
      />
    </>
  );
};

export default Works;
