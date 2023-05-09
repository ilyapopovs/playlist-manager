import { useRouter } from 'next/router'
import Link, { type LinkProps } from 'next/link'
import React, { type PropsWithChildren, useState, useEffect } from 'react'

type ActiveLinkProps = LinkProps & {
  className?: string
  activeClassName: string
}

/**
 * Add `activeClassName` when `as`/`href` match the current url \
 * Mostly from https://github.com/vercel/next.js/blob/canary/examples/active-class-name/components/ActiveLink.tsx
 */
export const ActiveLink = ({
  children,
  activeClassName,
  className,
  ...props
}: PropsWithChildren<ActiveLinkProps>) => {
  const { pathname: currentPath, isReady } = useRouter()
  const [computedClassName, setComputedClassName] = useState(className)

  useEffect(() => {
    if (isReady) {
      const declaredPath = new URL(
        (props.as || props.href) as string,
        location.href,
      ).pathname

      const newClassName =
        declaredPath === currentPath
          ? `${className ?? ''} ${activeClassName}`.trim()
          : className

      if (newClassName !== computedClassName) {
        setComputedClassName(newClassName)
      }
    }
  }, [
    currentPath,
    isReady,
    props.as,
    props.href,
    activeClassName,
    className,
    computedClassName,
  ])

  return (
    <Link className={computedClassName} {...props}>
      {children}
    </Link>
  )
}
