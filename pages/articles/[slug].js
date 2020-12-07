import client from '../../lib/contentful-client'
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { BLOCKS } from '@contentful/rich-text-types'
import Image from 'next/image'

export async function getStaticPaths() {
  let data = await client.getEntries({
    content_type: 'article',
  });

  return {
    paths: data.items.map((item) => ({
      params: { slug: item.fields.slug },
    })),
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  let data = await client.getEntries({
    content_type: 'article',
    'fields.slug': params.slug
  })

  return { 
    props: {
      article: data.items[0],
    },
  };
}

export default function Article({ article }) {
  console.log(article)

  return (
    <>
      <h1>{article.fields.title}</h1>
      <div>{documentToReactComponents(article.fields.content, {
        renderNode: {
          [BLOCKS.EMBEDDED_ASSET]: node =>
            <Image 
              src={'https://'+node.data.target.fields.file.url} 
              width={node.data.target.fields.file.details.image.width} 
              height={node.data.target.fields.file.details.image.height} />
        }
      })}</div>
    </>
  )
}