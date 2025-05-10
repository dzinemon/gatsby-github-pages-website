<p align="center">
  <a href="https://www.gatsbyjs.com/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter-ts">
    <img alt="Gatsby" src="https://www.gatsbyjs.com/Gatsby-Monogram.svg" width="60" />
  </a>
</p>
<h1 align="center">
  Gatsby Minimal TypeScript Starter
</h1>

## 🚀 Quick start

1.  **Create a Gatsby site.**

    Use the Gatsby CLI to create a new site, specifying the minimal TypeScript starter.

    ```shell
    # create a new Gatsby site using the minimal TypeScript starter
    npm init gatsby -- -ts
    ```

2.  **Start developing.**

    Navigate into your new site’s directory and start it up.

    ```shell
    cd my-gatsby-site/
    npm run develop
    ```

3.  **Open the code and start customizing!**

    Your site is now running at http://localhost:8000!

    Edit `src/pages/index.tsx` to see your site update in real-time!

4.  **Learn more**

    - [Documentation](https://www.gatsbyjs.com/docs/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter-ts)
    - [Tutorials](https://www.gatsbyjs.com/docs/tutorial/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter-ts)
    - [Guides](https://www.gatsbyjs.com/docs/how-to/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter-ts)
    - [API Reference](https://www.gatsbyjs.com/docs/api-reference/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter-ts)
    - [Plugin Library](https://www.gatsbyjs.com/plugins?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter-ts)
    - [Cheat Sheet](https://www.gatsbyjs.com/docs/cheat-sheet/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter-ts)

## 🚀 Quick start (Netlify)

Deploy this starter with one click on [Netlify](https://app.netlify.com/signup):

[<img src="https://www.netlify.com/img/deploy/button.svg" alt="Deploy to Netlify" />](https://app.netlify.com/start/deploy?repository=https://github.com/gatsbyjs/gatsby-starter-minimal-ts)

# Contributing Content

## Adding New Content to the Website

There are two main ways to contribute new tools, videos, or lessons to this website:

### Option 1: Proposing Content via GitHub Issues

If you're not comfortable with creating pull requests directly, you can propose new content through GitHub Issues:

1. Navigate to the "Issues" tab in the GitHub repository
2. Click the "New Issue" button
3. Choose one of the content templates:
   - **New Tool Submission**: For adding AI tools for educators
   - **New Video Submission**: For adding educational videos
   - **New Lesson Submission**: For adding teaching lessons
4. Fill in the form with the required information
5. Click "Submit new issue"
6. A project maintainer will review your submission and create the content file

### Option 2: Direct Content Contribution (Recommended)

For a more direct approach, you can contribute content by creating the markdown files yourself:

1. Fork this repository
2. Create a new markdown file in the appropriate directory:
   - Tools: `src/content/tools/`
   - Videos: `src/content/videos/`
   - Lessons: `src/content/lessons/`
3. Name your file using kebab-case (e.g., `ai-writing-assistant.md`)
4. Add the required frontmatter and content (see templates below)
5. Submit a pull request with your changes

## Content Templates

### Tool Template
```markdown
---
title: "Tool Name"
description: "A short description of the tool (1-2 sentences)"
tags: ["tag1", "tag2", "tag3"]
github: "https://github.com/user/repo" # Optional
date: "YYYY-MM-DD"
---

## About this Tool

Detailed description of the tool and its purpose.

## Features

- Feature 1
- Feature 2
- Feature 3

## How to Use

Instructions on how to use the tool in an educational setting.
```

### Video Template
```markdown
---
title: "Video Title"
description: "A short description of the video (1-2 sentences)"
tags: ["tag1", "tag2", "tag3"]
youtubeLink: "https://www.youtube.com/watch?v=videoId"
date: "YYYY-MM-DD"
---

## About this Video

Detailed description of the video content.

## Key Topics

- Topic 1
- Topic 2
- Topic 3
```

### Lesson Template
```markdown
---
title: "Lesson Title"
description: "A short description of the lesson (1-2 sentences)"
tags: ["tag1", "tag2", "tag3"]
youtubeLink: "https://www.youtube.com/watch?v=videoId" # Optional
slideLink: "https://docs.google.com/presentation/d/slideId/edit" # Optional
date: "YYYY-MM-DD"
---

## Lesson Overview

Detailed description of the lesson and its objectives.

## Quiz Questions

1. Question 1
   - A) Answer option
   - B) Answer option
   - C) Answer option
   - D) Answer option

2. Question 2
   - A) Answer option
   - B) Answer option
   - C) Answer option
   - D) Answer option

## Additional Resources

- [Resource 1](https://example.com/resource1)
- [Resource 2](https://example.com/resource2)

## Implementation Notes

Advice for teachers on how to implement this lesson in their classroom.
```
