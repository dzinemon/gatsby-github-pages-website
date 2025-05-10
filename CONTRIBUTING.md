# Contributing to this Website

Thank you for your interest in contributing to our educational resources website! This document provides detailed instructions for adding new tools, videos, or lessons to the site.

## Content Types

The website features three main types of content:

1. **Tools** - AI and technology tools useful for educators
2. **Videos** - Educational videos about using AI in education
3. **Lessons** - Detailed lesson plans and teaching resources

## How to Contribute Content

### Prerequisites

- A GitHub account
- Basic knowledge of Markdown

### Option 1: Proposing Content via Issues

If you're not familiar with Git/GitHub workflows, you can propose content through our issue templates:

1. Go to the [Issues tab](https://github.com/yourusername/gatsby-github-pages-website/issues) of the repository
2. Click the "New Issue" button
3. Select one of our content templates:
   - **New Tool Submission**
   - **New Video Submission**
   - **New Lesson Submission**
4. Fill out all the required information in the form
5. Submit the issue
6. A project maintainer will review your submission and add the content

### Option 2: Contributing Directly (Recommended)

For a more direct approach:

1. Fork the repository to your own GitHub account
2. Clone your fork to your local machine:
   ```
   git clone https://github.com/your-username/gatsby-github-pages-website.git
   cd gatsby-github-pages-website
   ```

3. Create a new branch for your content:
   ```
   git checkout -b add-new-content
   ```

4. Create a new markdown file in the appropriate directory:
   - Tools: `src/content/tools/`
   - Videos: `src/content/videos/`
   - Lessons: `src/content/lessons/`

5. Name your file using kebab-case (lowercase with hyphens):
   - Example: `ai-writing-assistant.md`

6. Add your content using the templates below

7. Commit your changes:
   ```
   git add .
   git commit -m "Add new [tool/video/lesson]: Title"
   ```

8. Push to your fork:
   ```
   git push origin add-new-content
   ```

9. Create a pull request from your branch to the main repository

## Detailed Content Templates

### Tool Template

```markdown
---
title: "Tool Name"
description: "A short description of the tool (1-2 sentences)"
tags: ["tag1", "tag2", "tag3"]
github: "https://github.com/user/repo" # Optional link to GitHub repository
date: "YYYY-MM-DD" # Today's date
---

## About this Tool

Detailed description of the tool and its purpose. Explain what problem it solves
for educators and how it can be used in educational settings.

## Features

- Feature 1: Brief explanation
- Feature 2: Brief explanation
- Feature 3: Brief explanation

## How to Use

Step-by-step instructions on how to use the tool:

1. First step
2. Second step
3. Third step

### Example Use Case

Provide a concrete example of how an educator might use this tool in practice.
```

### Video Template

```markdown
---
title: "Video Title"
description: "A short description of the video (1-2 sentences)"
tags: ["tag1", "tag2", "tag3"]
youtubeLink: "https://www.youtube.com/watch?v=videoId"
date: "YYYY-MM-DD" # Today's date
---

## About this Video

Detailed description of the video content. Explain what viewers will learn
and why this content is valuable for educators.

## Key Topics

- Topic 1: Brief explanation
- Topic 2: Brief explanation
- Topic 3: Brief explanation

## Time Stamps

- 0:00 - Introduction
- 1:30 - First main topic
- 5:45 - Second main topic
- 10:20 - Conclusion
```

### Lesson Template

```markdown
---
title: "Lesson Title"
description: "A short description of the lesson (1-2 sentences)"
tags: ["tag1", "tag2", "tag3"]
youtubeLink: "https://www.youtube.com/watch?v=videoId" # Optional
slideLink: "https://docs.google.com/presentation/d/slideId/edit" # Optional
date: "YYYY-MM-DD" # Today's date
---

## Lesson Overview

Detailed description of the lesson and its objectives. Explain what students
will learn and how this lesson fits into a broader curriculum.

## Learning Objectives

By the end of this lesson, students will be able to:

- Objective 1
- Objective 2
- Objective 3

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

- [Resource 1](https://example.com/resource1): Brief description
- [Resource 2](https://example.com/resource2): Brief description

## Implementation Notes

Advice for teachers on how to implement this lesson in their classroom.
Include information about required preparation, time needed, and any
adaptations for different grade levels or learning environments.
```

## Style Guide

- Use clear, concise language
- Include specific examples where possible
- Add relevant tags to help with discoverability
- Include links to external resources when appropriate

## Tag Recommendations

Consider using tags from these categories:

- **Grade levels**: elementary, middle-school, high-school, higher-ed
- **Subject areas**: math, science, english, social-studies, computer-science
- **AI concepts**: machine-learning, natural-language-processing, computer-vision
- **Pedagogical approaches**: project-based, inquiry-based, collaborative-learning

## Questions?

If you have questions about contributing, please open an issue in the repository or contact the maintainers directly.

Thank you for helping to expand our collection of educational resources!