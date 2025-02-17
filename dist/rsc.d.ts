/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import React from 'react'
import { MDXRemoteSerializeResult, SerializeOptions } from './types'
import { VFileCompatible } from 'vfile'
import { MDXProvider } from '@mdx-js/react'
export declare type MDXRemoteProps = {
  source: VFileCompatible
  options?: SerializeOptions
  /**
   * An object mapping names to React components.
   * The key used will be the name accessible to MDX.
   *
   * For example: `{ ComponentName: Component }` will be accessible in the MDX as `<ComponentName/>`.
   */
  components?: React.ComponentProps<typeof MDXProvider>['components']
}
export { MDXRemoteSerializeResult }
export declare type CompileMDXResult<TFrontmatter = Record<string, unknown>> = {
  content: React.ReactElement
  frontmatter: TFrontmatter
}
export declare function compileMDX<TFrontmatter = Record<string, unknown>>({
  source,
  options,
  components,
}: MDXRemoteProps): Promise<CompileMDXResult<TFrontmatter>>
/**
 * Renders compiled source from next-mdx-remote/serialize.
 */
export declare function MDXRemote(
  props: MDXRemoteProps
): Promise<React.ReactElement<any, string | React.JSXElementConstructor<any>>>
