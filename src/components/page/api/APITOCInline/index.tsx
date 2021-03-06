import React from 'react';
import TOCInline from '@theme/TOCInline';

/**
 * Docusaurus has an issue with parsing custom headings in markdown files that are introduced
 * from importing another MDX file.
 * - https://github.com/facebook/docusaurus/issues/3915
 * - https://github.com/facebook/docusaurus/issues/6201
 *
 * This component is a workaround for this issue.
 *
 * This component accepts the autogenerated markdown files and reads their contents
 * to autogenerate TOC items in the primary TOC.
 *
 * Markdown files without contents are ignored.
 */
export default function APITocInline({ toc, minHeadingLevel, maxHeadingLevel, autogenerated }): JSX.Element {
  for (const mdxContent of autogenerated) {
    const contents = mdxContent({});
    if (contents?.props?.children?.length > 0) {
      const id = contents.props.children[0].props.id;
      const value = contents.props.children[0].props.children;

      if (!toc.find((item) => item.id === id)) {
        toc.push({
          id,
          value,
          level: 2,
          children: [],
        });
      }
    }
  }
  return <TOCInline toc={toc} minHeadingLevel={minHeadingLevel} maxHeadingLevel={maxHeadingLevel} />;
}
