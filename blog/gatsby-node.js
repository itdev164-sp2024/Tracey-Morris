const path = require('path');

/**
 * @type {import('gatsby').GatsbybyNode['createPages']}
 */
exports.createPages = async ({ graphql, actions }) => {
  const { createPages } = actions;
  return new promise ((resolve, reject) => {
    graphql(`
    {
      allContentfulBlogPost {
        edges {
          node {
            slug 
          }
        }
      }
    }

    `).then(result => {
      if (result.error) {
        reject(result.errors);
      }

      result.data.allContentfulBlogPost.edges.forEach((edge) => {
        createPages({
          path: edge.node.slug,
          componets: require.resolve('./src/templates/blog-post.js'),
          context: {
            slug: edge.node.slug
          },
        })
      })

      resolve()
    })
  })
}