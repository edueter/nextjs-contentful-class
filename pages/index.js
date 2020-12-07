import Head from 'next/head'
import Link from 'next/link'
import client from '../lib/contentful-client'

export async function getStaticProps() {
  let data = await client.getEntries({
    content_type: "article"
  })
  return {
    props: {
      articles: data.items
    },
    revalidate: 60
  }
}

export default function Home({ articles }) {
  console.log(articles)
  return (
    <div >
      <Head>
        <title>NextJS + Contentful</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>This is a blog</h1>
        <ul>
          {articles.map(article => (
            <li key={article.sys.id}>
              <Link href={'/articles/' + article.fields.slug}>
                <a>
                  {article.fields.title}
                </a>
              </Link>
            </li>
          ))}
        </ul>

      </main>
      
    </div>
  )
}
