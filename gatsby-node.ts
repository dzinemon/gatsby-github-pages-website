import path from "path";
import { GatsbyNode, CreatePagesArgs } from "gatsby";
import { createFilePath } from "gatsby-source-filesystem";

// Add custom schema to ensure all fields are recognized
export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] = ({ actions }) => {
  const { createTypes } = actions;
  
  // Define the schema types for our custom fields
  const typeDefs = `
    type MarkdownRemarkFrontmatter {
      title: String!
      description: String
      tags: [String!]
      github: String
      youtubeLink: String
      slideLink: String
      date: Date @dateformat
    }
  `;
  
  createTypes(typeDefs);
};

// Add slug field to each markdown node
export const onCreateNode: GatsbyNode["onCreateNode"] = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  
  if (node.internal.type === "MarkdownRemark") {
    // Create slug based on the file path
    let slug;
    const filePath = node.fileAbsolutePath as string | undefined;
    
    if (filePath && filePath.includes("/content/tools/")) {
      slug = `/tools${createFilePath({ node, getNode, basePath: "src/content/tools" })}`;
    } else if (filePath && filePath.includes("/content/videos/")) {
      slug = `/videos${createFilePath({ node, getNode, basePath: "src/content/videos" })}`;
    } else if (filePath && filePath.includes("/content/lessons/")) {
      slug = `/lessons${createFilePath({ node, getNode, basePath: "src/content/lessons" })}`;
    }
    
    if (slug) {
      createNodeField({
        node,
        name: "slug",
        value: slug,
      });
    }
  }
};

// Function to extract tags from markdown nodes
const extractTags = async (graphql: CreatePagesArgs["graphql"]): Promise<string[]> => {
  const result = await graphql(`
    query {
      allMarkdownRemark {
        group(field: {frontmatter: {tags: SELECT}}) {
          fieldValue
        }
      }
    }
  `);

  const tags = (result.data as any).allMarkdownRemark.group.map(
    (tag: { fieldValue: string }) => tag.fieldValue
  );

  return tags;
};

export const createPages: GatsbyNode["createPages"] = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;
  
  // Templates
  const toolTemplate = path.resolve("src/templates/tool.tsx");
  const videoTemplate = path.resolve("src/templates/video.tsx");
  const tagTemplate = path.resolve("src/templates/tag.tsx");
  const lessonTemplate = path.resolve("src/templates/lesson.tsx");
  
  // Query for markdown nodes to use in creating pages
  const result = await graphql(`
    query {
      allMarkdownRemark {
        nodes {
          id
          fields {
            slug
          }
          frontmatter {
            tags
          }
          fileAbsolutePath
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild("Error loading markdown files", result.errors);
    return;
  }

  // Create pages for each markdown file
  const posts = (result.data as any).allMarkdownRemark.nodes;

  posts.forEach((post: any) => {
    if (!post.fields?.slug) {
      return;
    }
    
    let template;
    const filePath = post.fileAbsolutePath as string | undefined;
    
    // Determine which template to use based on the file path
    if (filePath && filePath.includes("/content/tools/")) {
      template = toolTemplate;
    } else if (filePath && filePath.includes("/content/videos/")) {
      template = videoTemplate;
    } else if (filePath && filePath.includes("/content/lessons/")) {
      template = lessonTemplate;
    }
    
    if (template) {
      createPage({
        path: post.fields.slug,
        component: template,
        context: {
          id: post.id,
          relatedTools: post.frontmatter.tags // Used for finding related tools in lesson pages
        },
      });
    }
  });
  
  // Create tag pages
  const tags = await extractTags(graphql);
  
  tags.forEach(tag => {
    createPage({
      path: `/tags/${tag}`,
      component: tagTemplate,
      context: {
        tag,
      },
    });
  });
};